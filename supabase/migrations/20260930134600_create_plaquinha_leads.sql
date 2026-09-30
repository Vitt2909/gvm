-- Lista de interesse e pedidos da plaquinha NFC + QR Code (página /placa).
-- Já aplicada no projeto Supabase "gvm-digital" (ref ijvaccyksfxstomnhztz).
-- Fica aqui como registro e para recriar a tabela em outro projeto.

create table public.plaquinha_leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  fase text not null check (fase in ('pre-venda', 'venda')),
  nome text not null check (char_length(btrim(nome)) between 2 and 120),
  negocio text not null check (char_length(btrim(negocio)) between 2 and 120),
  whatsapp text not null check (whatsapp ~ '^[0-9]{10,13}$'),
  cor text check (cor in ('branca', 'preta', 'indeciso')),
  quantidade smallint not null default 1 check (quantidade between 1 and 50),
  observacao text check (char_length(observacao) <= 500),
  origem text check (char_length(origem) <= 200),
  consentimento boolean not null check (consentimento),
  contatado boolean not null default false
);

comment on table public.plaquinha_leads is
  'Lista de interesse (fase pre-venda) e pedidos (fase venda) da plaquinha NFC + QR Code. Preenchida pelo site /placa.';
comment on column public.plaquinha_leads.contatado is
  'Marque true no painel depois de falar com a pessoa.';

-- Um cadastro por WhatsApp em cada fase: repetir o envio não duplica a lista.
create unique index plaquinha_leads_whatsapp_fase_key on public.plaquinha_leads (whatsapp, fase);
create index plaquinha_leads_created_at_idx on public.plaquinha_leads (created_at desc);

alter table public.plaquinha_leads enable row level security;

-- O site (chave pública) só insere. Não existe política de leitura, alteração
-- ou exclusão para anon: a lista só é vista no painel do Supabase.
create policy "site insere cadastros"
  on public.plaquinha_leads
  for insert
  to anon
  with check (contatado = false);

revoke all on public.plaquinha_leads from anon, authenticated;
grant insert (fase, nome, negocio, whatsapp, cor, quantidade, observacao, origem, consentimento)
  on public.plaquinha_leads to anon;
