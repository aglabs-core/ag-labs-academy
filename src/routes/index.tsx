import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "../lib/supabase";

const PAGE_TITLE = "Arsenal de Automação com IA — Kit gratuito | AG LABS IA Academy";
const PAGE_DESCRIPTION =
  "Receba gratuitamente o arsenal de templates de IA e automações validadas no campo de batalha pela AG LABS. Para quem quer automatizar a empresa ou trabalhar com IA.";

// FAQ em JSON-LD: melhora SEO e a captação por mecanismos de resposta (AEO/GEO),
// como Google AI Overviews, ChatGPT, Claude, Gemini e Perplexity.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o arsenal de automação da AG LABS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "É um kit gratuito com templates de IA e automações já validadas no dia a dia da AG LABS, prontos para você aplicar na sua empresa ou na sua carreira.",
      },
    },
    {
      "@type": "Question",
      name: "O acesso é realmente gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. O acesso ao kit é imediato e gratuito. Basta preencher seu nome, e-mail e WhatsApp para liberar o material.",
      },
    },
    {
      "@type": "Question",
      name: "Para quem é indicado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para quem quer automatizar a própria empresa com inteligência artificial e para quem deseja trabalhar profissionalmente com IA e automação.",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqLd),
      },
    ],
  }),
  component: Index,
});

const EMPTY_FORM = { nome: "", email: "", whatsapp: "", objetivo: "" };

function Index() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const { error } = await supabase.from("leads_institucional").insert({
      nome: form.nome.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: form.whatsapp.trim(),
      objetivo: form.objetivo,
    });

    if (error) {
      setLoading(false);
      console.error("Erro ao salvar lead", error);
      setErrorMessage("Não foi possível enviar agora. Tente novamente em instantes.");
      return;
    }

    // Cadastro salvo — leva o usuário à página de entrega do bônus.
    setForm(EMPTY_FORM);
    navigate({ to: "/acesso" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080b] text-white antialiased">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-brand-dim/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 pb-24 pt-24 text-center">
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          Desbloqueie o{" "}
          <span className="bg-gradient-to-r from-brand via-brand/70 to-brand-dim bg-clip-text text-transparent">
            arsenal de automação
          </span>{" "}
          da AG LABS.
        </h1>

        <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-white/60 md:text-lg">
          Acesso imediato e gratuito a templates de IA e automações validadas no campo de batalha.
        </p>

        <div className="mt-10 w-full">
          <div className="relative">
            <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-brand/40 via-transparent to-brand-dim/40 opacity-60 blur-sm" />
            <form
              onSubmit={handleSubmit}
              className="relative rounded-sm border border-white/10 bg-[#0c0c10]/90 p-6 text-left backdrop-blur-xl md:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                    Acesso exclusivo
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    Receba seu kit agora
                  </h2>
                </div>
                <span className="rounded-sm bg-brand/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                  Grátis
                </span>
              </div>

              <div className="space-y-4">
                <Field
                  label="Nome completo"
                  type="text"
                  placeholder="Seu nome e sobrenome"
                  value={form.nome}
                  onChange={(v) => setForm({ ...form, nome: v })}
                />
                <Field
                  label="E-mail"
                  type="email"
                  placeholder="voce@empresa.com"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/70">WhatsApp</label>
                  <div className="flex items-stretch overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] transition focus-within:border-brand/60 focus-within:bg-white/[0.05]">
                    <span className="border-r border-white/10 px-3 py-2.5 text-sm text-white/50">
                      +55
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 90000-0000"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/70">
                    Seu principal objetivo
                  </label>
                  <select
                    required
                    value={form.objetivo}
                    onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                    className="w-full rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white transition focus:border-brand/60 focus:bg-white/[0.05] focus:outline-none"
                  >
                    <option value="" className="bg-[#0c0c10]">
                      Selecione uma opção
                    </option>
                    <option value="automatizar" className="bg-[#0c0c10]">
                      Quero automatizar minha empresa
                    </option>
                    <option value="trabalhar" className="bg-[#0c0c10]">
                      Quero trabalhar com IA e automação
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-brand to-brand-dim px-5 py-3.5 text-sm font-semibold text-[#08080b] transition hover:brightness-110 disabled:opacity-60"
              >
                <span className="relative">
                  {loading ? "Liberando acesso…" : "Desbloquear acesso imediato"}
                </span>
                <svg
                  className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-4 rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-center text-xs text-red-300"
                >
                  {errorMessage}
                </p>
              )}

              <p className="mt-4 text-center text-[11px] text-white/40">
                Ao continuar você concorda em receber comunicações da AG LABS e com a{" "}
                <a
                  href="https://aglabs.ia.br/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-white/70"
                >
                  Política de Privacidade
                </a>
                . Sem spam — cancele quando quiser.
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} AG LABS IA Academy · Todos os direitos reservados
      </footer>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/70">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/30 transition focus:border-brand/60 focus:bg-white/[0.05] focus:outline-none"
      />
    </div>
  );
}
