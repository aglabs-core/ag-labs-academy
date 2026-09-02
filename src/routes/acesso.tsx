import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FolderOpen } from "lucide-react";

import { hasBonusAccess } from "../lib/lead-capture";

// Pasta do Google Drive com os workflows entregues como bônus.
const DRIVE_URL =
  "https://drive.google.com/drive/folders/1ROUwflqTHNcQuupegc24q9PWD69ISzrs?usp=drive_link";

export const Route = createFileRoute("/acesso")({
  beforeLoad: async () => {
    if (!(await hasBonusAccess())) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Acesso liberado — AG LABS IA Academy" },
      {
        name: "description",
        content: "Seu arsenal de automação está liberado. Acesse os workflows da AG LABS.",
      },
      // Página de entrega pós-cadastro — fora dos índices de busca.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Acesso,
});

function Acesso() {
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
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Acesso liberado
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          Seu{" "}
          <span className="bg-gradient-to-r from-brand via-brand/70 to-brand-dim bg-clip-text text-transparent">
            arsenal de automação
          </span>{" "}
          está pronto.
        </h1>

        <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-white/60 md:text-lg">
          Clique no botão abaixo para abrir a pasta no Google Drive com todos os workflows e
          templates. Salve uma cópia para acessar quando quiser.
        </p>

        <div className="mt-10 w-full">
          <div className="relative">
            <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-brand/40 via-transparent to-brand-dim/40 opacity-60 blur-sm" />
            <div className="relative rounded-sm border border-white/10 bg-[#0c0c10]/90 p-6 text-left backdrop-blur-xl md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-brand/10 text-brand">
                  <FolderOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Workflows AG LABS</h2>
                  <p className="text-xs text-white/50">Pasta no Google Drive</p>
                </div>
              </div>

              <a
                href={DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-brand to-brand-dim px-5 py-3.5 text-sm font-semibold text-[#08080b] transition hover:brightness-110"
              >
                <span>Abrir pasta no Google Drive</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>

              <p className="mt-4 text-center text-[11px] text-white/40">
                Não consegue abrir? Copie o link:{" "}
                <a
                  href={DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-brand/80 underline-offset-2 hover:underline"
                >
                  {DRIVE_URL}
                </a>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-md text-sm text-white/50">
          Seu acesso fica disponível neste dispositivo por 30 dias. Salve uma cópia dos materiais
          no seu Google Drive para consultar quando quiser.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o início
        </Link>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} AG LABS IA Academy · Todos os direitos reservados
      </footer>
    </div>
  );
}
