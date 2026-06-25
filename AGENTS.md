# AG LABS IA Academy

Landing page de captação de leads (TanStack Start + React 19 + Vite + Tailwind).
Produção: https://bonus.aglabs.ia.br

## Stack

- **Framework:** TanStack Start (SSR) + TanStack Router
- **UI:** React 19, Tailwind CSS v4, shadcn/ui (Radix)
- **Dados:** Supabase (`src/lib/supabase.ts`) — leads gravados em `leads_institucional`
- **Build/Deploy:** Vite + Nitro (preset `vercel`) → Vercel (integração Git, deploy automático)

## Scripts

- `bun dev` — servidor de desenvolvimento
- `bun run build` — build de produção (Nitro gera `.vercel/output` via Build Output API)
- `bun run lint` / `bun run format`

## Deploy (Vercel)

Conecte o repositório na Vercel (New Project → importar do GitHub). A Vercel
detecta o output do Nitro automaticamente (zero-config) e faz deploy a cada push
na `main`, com Preview Deployments para PRs. Configure as variáveis
`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em Project → Settings →
Environment Variables.

## Banco de dados

Migrations em `supabase/migrations/`. Aplique via Supabase CLI
(`supabase db push`) ou cole o SQL no SQL Editor do painel.

## Variáveis de ambiente

`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (ver `.env.local`). Em produção,
configure-as em Project → Settings → Environment Variables na Vercel.
