-- Reconcilia instalações antigas da tabela com o formulário atual.
-- A migração inicial usa CREATE TABLE IF NOT EXISTS, que não adiciona colunas
-- quando a tabela já existe com um esquema legado.

alter table public.leads_institucional
  add column if not exists nome text,
  add column if not exists objetivo text;

-- Permite aplicar NOT NULL sem descartar ou invalidar leads antigos.
update public.leads_institucional
set nome = 'Lead legado'
where nome is null or btrim(nome) = '';

update public.leads_institucional
set objetivo = 'não informado'
where objetivo is null or btrim(objetivo) = '';

alter table public.leads_institucional
  alter column nome set not null,
  alter column objetivo set not null;

-- Garante que o PostgREST enxergue o esquema novo imediatamente após o deploy.
notify pgrst, 'reload schema';
