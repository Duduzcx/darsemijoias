-- Rode este script no SQL Editor do seu projeto Supabase (dashboard > SQL Editor > New query > Run).
create table if not exists public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  produto_id text not null,
  nome text not null,
  nota smallint not null check (nota between 1 and 5),
  comentario text,
  aprovado boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists avaliacoes_produto_id_idx on public.avaliacoes (produto_id);

alter table public.avaliacoes enable row level security;

-- Qualquer visitante pode enviar uma avaliação (fica pendente até aprovação manual).
create policy "avaliacoes_insert_publico"
  on public.avaliacoes for insert
  to anon
  with check (aprovado = false);

-- Público só enxerga avaliações já aprovadas.
create policy "avaliacoes_select_aprovadas"
  on public.avaliacoes for select
  to anon
  using (aprovado = true);

-- Não há policy de update/delete para "anon": aprovação é feita manualmente
-- pelo dono da loja direto no Table Editor do Supabase (Settings > Table Editor > avaliacoes),
-- marcando "aprovado" = true na linha desejada. Isso evita expor um endpoint que
-- permitiria qualquer visitante aprovar avaliações via anon key.
