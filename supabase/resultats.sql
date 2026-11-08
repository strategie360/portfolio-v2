-- Compteur de résultats. À exécuter une fois dans l'éditeur SQL de Supabase.
-- Aucune donnée personnelle : ni nom, ni téléphone, ni e-mail.

create table result_clients (
  slug text primary key,
  name text not null,
  starts_on date not null,
  key_hash text not null unique
);

create table result_events (
  id bigint generated always as identity primary key,
  client_slug text not null references result_clients (slug),
  ref text not null,
  kind text not null check (kind in ('reservation', 'rendez-vous', 'devis', 'vente')),
  amount_cents integer check (amount_cents > 0),
  status text not null default 'compte' check (status in ('compte', 'ecarte')),
  occurred_at timestamptz not null default now(),
  unique (client_slug, ref)
);

create index result_events_month on result_events (client_slug, occurred_at);

-- Sans règle d'accès, seule la clé de service (côté serveur) peut lire et écrire.
alter table result_clients enable row level security;
alter table result_events enable row level security;
