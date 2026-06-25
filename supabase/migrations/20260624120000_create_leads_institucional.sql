-- Migration: cria a tabela de captação de leads do site institucional.
-- Tabela: public.leads_institucional

create extension if not exists "pgcrypto";

create table if not exists public.leads_institucional (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  email       text not null,
  whatsapp    text not null,
  objetivo    text not null,
  created_at  timestamptz not null default now()
);

comment on table public.leads_institucional is 'Leads captados pelo formulário do site institucional da AG LABS.';

-- Índices úteis para consulta/exportação dos leads.
create index if not exists leads_institucional_created_at_idx
  on public.leads_institucional (created_at desc);

create index if not exists leads_institucional_email_idx
  on public.leads_institucional (email);

-- Habilita Row Level Security: nenhum acesso é permitido até existir uma policy.
alter table public.leads_institucional enable row level security;

-- Permite que visitantes anônimos (anon key usada no front-end) cadastrem leads.
-- Apenas INSERT é liberado; leitura/edição ficam restritas a roles privilegiadas
-- (service_role / acesso autenticado no painel), evitando vazamento de leads.
drop policy if exists "anon pode inserir leads" on public.leads_institucional;
create policy "anon pode inserir leads"
  on public.leads_institucional
  for insert
  to anon, authenticated
  with check (true);
