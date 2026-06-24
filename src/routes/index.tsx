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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit", form);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Desbloqueie o{" "}
          <span className="text-[#22d3ee]">Arsenal de Automação</span> da AG LABS IA Academy
        </h1>

        <p className="mt-8 text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Acesso imediato e GRATUITO a templates de IA e automações validadas no campo de batalha.
          Construa, implemente ou revenda projetos de alto impacto.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Preencha seus dados abaixo para receber seu acesso exclusivo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 md:p-8 text-left space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-center mb-2">Nome:</label>
            <input
              type="text"
              required
              placeholder="Digite seu nome e sobrenome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22d3ee] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-center mb-2">E-mail para Contato:</label>
            <input
              type="email"
              required
              placeholder="Seu melhor e-mail (para acesso)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22d3ee] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-center mb-2">
              Seu WhatsApp para recebimento:
            </label>
            <div className="flex items-stretch border border-white/15 rounded-md overflow-hidden focus-within:border-[#22d3ee] transition">
              <span className="px-4 py-3 text-gray-400 border-r border-white/15">+55</span>
              <input
                type="tel"
                required
                placeholder="DDD + Número"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-center mb-2">
              Seu principal objetivo:
            </label>
            <select
              required
              value={form.objetivo}
              onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/15 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#22d3ee] transition"
            >
              <option value="">Selecione uma opção</option>
              <option value="automatizar">Quero automatizar minha empresa</option>
              <option value="trabalhar">Quero trabalhar com IA e automação</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold py-4 rounded-full transition shadow-lg shadow-green-500/20"
          >
            DESBLOQUEAR ACESSO IMEDIATO
          </button>
        </form>
      </div>
    </div>
  );
}
