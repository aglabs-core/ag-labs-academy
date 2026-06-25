import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Variáveis de ambiente do Supabase ausentes. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Estrutura de um registro da tabela `leads_institucional`. */
export type LeadInstitucional = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  objetivo: string;
  created_at: string;
};

/** Campos enviados pelo formulário (sem colunas geradas pelo banco). */
export type LeadInstitucionalInput = Pick<
  LeadInstitucional,
  "nome" | "email" | "whatsapp" | "objetivo"
>;
