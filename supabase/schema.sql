-- ────────────────────────────────────────────────────────────────────────────
--  PhysioFit — Phase 2 : table des demandes de rendez-vous
--  À exécuter dans Supabase → SQL Editor (une seule fois).
-- ────────────────────────────────────────────────────────────────────────────

-- Statut d'une demande
do $$
begin
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type booking_status as enum ('pending', 'confirmed', 'declined');
  end if;
end$$;

create table if not exists public.booking_requests (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  phone          text not null,
  reason         text not null,
  is_first_visit boolean not null default true,
  preferred_date date not null,
  preferred_slot text not null,
  message        text,
  status         booking_status not null default 'pending',
  locale         text not null default 'fr'
);

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);
create index if not exists booking_requests_status_idx
  on public.booking_requests (status);

-- Sécurité : on ACTIVE RLS et on ne crée AUCUNE policy publique.
-- → anon / authenticated n'ont aucun accès.
-- → la route serveur utilise la clé service_role, qui contourne les RLS.
-- → l'espace admin (Phase 3) lira via une session authentifiée dédiée.
alter table public.booking_requests enable row level security;
