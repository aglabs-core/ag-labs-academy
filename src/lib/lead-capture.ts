import { createServerFn } from "@tanstack/react-start";

const BONUS_ACCESS_COOKIE = "ag_labs_bonus_access";
const BONUS_ACCESS_VALUE = "granted";
const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir seu cadastro agora. Verifique sua conexão e tente novamente.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadInput = {
  nome: string;
  email: string;
  whatsapp: string;
  objetivo: string;
};

type ValidatedLeadInput = Omit<LeadInput, "objetivo"> & {
  objetivo: "automatizar" | "trabalhar";
};

type LeadValidationResult = { ok: true; data: ValidatedLeadInput } | { ok: false; message: string };

export function validateLeadInput(input: unknown): LeadValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Revise os dados informados." };
  }

  const candidate = input as Partial<Record<keyof LeadInput, unknown>>;
  const nome = typeof candidate.nome === "string" ? candidate.nome.trim() : "";
  const email = typeof candidate.email === "string" ? candidate.email.trim().toLowerCase() : "";
  const whatsappDigits =
    typeof candidate.whatsapp === "string" ? candidate.whatsapp.replace(/\D/g, "") : "";
  const objetivo = candidate.objetivo;

  if (nome.length < 2) return { ok: false, message: "Informe seu nome completo." };
  if (nome.length > 120) return { ok: false, message: "O nome informado é muito longo." };
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { ok: false, message: "Informe um e-mail válido." };
  }

  const hasValidWhatsappLength =
    (whatsappDigits.length >= 10 && whatsappDigits.length <= 11) ||
    (whatsappDigits.startsWith("55") && whatsappDigits.length >= 12 && whatsappDigits.length <= 13);

  if (!hasValidWhatsappLength) {
    return { ok: false, message: "Informe um WhatsApp válido com DDD." };
  }

  if (objetivo !== "automatizar" && objetivo !== "trabalhar") {
    return { ok: false, message: "Selecione seu principal objetivo." };
  }

  return {
    ok: true,
    data: {
      nome,
      email,
      whatsapp: `+${whatsappDigits.startsWith("55") ? whatsappDigits : `55${whatsappDigits}`}`,
      objetivo,
    },
  };
}

type CaptureLeadResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
    };

type SupabaseInsertError = {
  code?: string;
  message?: string;
};

function isLegacyLeadSchemaError(error: SupabaseInsertError | null): boolean {
  if (!error || error.code !== "PGRST204") return false;

  return /'(nome|objetivo)' column/.test(error.message ?? "");
}

export const captureLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const result = validateLeadInput(input);
    if (!result.ok) throw new Error(result.message);
    return result.data;
  })
  .handler(async ({ data }): Promise<CaptureLeadResult> => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Configuração do Supabase ausente no servidor.");
        return { ok: false, message: GENERIC_ERROR_MESSAGE };
      }

      const [{ createClient }, { setCookie }] = await Promise.all([
        import("@supabase/supabase-js"),
        import("@tanstack/react-start/server"),
      ]);

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      let { error } = await supabase.from("leads_institucional").insert({
        nome: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
        objetivo: data.objetivo,
      });

      // Algumas instalações antigas da tabela possuem `notes`, mas não
      // `nome`/`objetivo`. Mantemos a captura operacional até a migração de
      // reconciliação ser aplicada, sem perder esses dados do formulário.
      if (isLegacyLeadSchemaError(error)) {
        console.warn("Esquema legado de leads detectado; usando campo notes.");
        const legacyInsert = await supabase.from("leads_institucional").insert({
          email: data.email,
          whatsapp: data.whatsapp,
          notes: `Nome: ${data.nome}\nObjetivo: ${data.objetivo}\nOrigem: bonus.aglabs.ia.br`,
        });
        error = legacyInsert.error;
      }

      if (error) {
        console.error("Falha ao registrar lead no Supabase.", {
          code: error.code,
          message: error.message,
        });
        return { ok: false, message: GENERIC_ERROR_MESSAGE };
      }

      setCookie(BONUS_ACCESS_COOKIE, BONUS_ACCESS_VALUE, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      return { ok: true };
    } catch (error) {
      console.error("Erro inesperado ao capturar lead.", error);
      return { ok: false, message: GENERIC_ERROR_MESSAGE };
    }
  });

export const hasBonusAccess = createServerFn({ method: "GET" }).handler(async () => {
  const { getCookie } = await import("@tanstack/react-start/server");
  return getCookie(BONUS_ACCESS_COOKIE) === BONUS_ACCESS_VALUE;
});
