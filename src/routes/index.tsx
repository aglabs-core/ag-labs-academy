import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AG LABS IA Academy — Arsenal de Automação" },
      {
        name: "description",
        content:
          "Acesso imediato e gratuito a templates de IA e automações validadas no campo de batalha pela AG LABS IA Academy.",
      },
      { property: "og:title", content: "AG LABS IA Academy — Arsenal de Automação" },
      {
        property: "og:description",
        content:
          "Acesso imediato e gratuito a templates de IA e automações validadas no campo de batalha.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", objetivo: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("submit", form);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080b] text-white antialiased">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#22d3ee]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#a855f7]/10 blur-[120px]" />
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
          <span className="bg-gradient-to-r from-[#22d3ee] via-[#60a5fa] to-[#a855f7] bg-clip-text text-transparent">
            arsenal de automação
          </span>{" "}
          da AG LABS.
        </h1>

        <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-white/60 md:text-lg">
          Acesso imediato e gratuito a templates de IA e automações validadas
          no campo de batalha.
        </p>

        <div className="mt-10 w-full">
          <div className="relative">
            <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-[#22d3ee]/40 via-transparent to-[#a855f7]/40 opacity-60 blur-sm" />
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
                <span className="rounded-sm bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
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
                  <label className="mb-1.5 block text-xs font-medium text-white/70">
                    WhatsApp
                  </label>
                  <div className="flex items-stretch overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] transition focus-within:border-[#22d3ee]/60 focus-within:bg-white/[0.05]">
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
                    className="w-full rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white transition focus:border-[#22d3ee]/60 focus:bg-white/[0.05] focus:outline-none"
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
                className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#22d3ee] to-[#a855f7] px-5 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_-6px_rgba(34,211,238,0.5)] transition hover:shadow-[0_12px_40px_-6px_rgba(168,85,247,0.6)] disabled:opacity-60"
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

              <p className="mt-4 text-center text-[11px] text-white/40">
                Ao continuar você concorda em receber comunicações da AG LABS.
                Sem spam — cancele quando quiser.
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
        className="w-full rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/30 transition focus:border-[#22d3ee]/60 focus:bg-white/[0.05] focus:outline-none"
      />
    </div>
  );
}
