create extension if not exists "pgcrypto";

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text,
  marketing_consent boolean not null default false,
  consent_timestamp timestamptz,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referral_code text unique,
  referrer_id uuid references public.waitlist_signups(id),
  created_at timestamptz not null default now()
);

create table if not exists public.investor_intent (
  id uuid primary key default gen_random_uuid(),
  signup_id uuid references public.waitlist_signups(id) on delete cascade,
  investment_range text not null,
  experience_level text not null,
  goals text[] not null default '{}',
  preferred_property_types text[] not null default '{}',
  cities text[] not null default '{}',
  other_city text,
  liquidity_preference text,
  update_frequency text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;
alter table public.investor_intent enable row level security;
alter table public.contact_messages enable row level security;

create policy "waitlist_insert" on public.waitlist_signups
  for insert
  with check (true);

create policy "intent_insert" on public.investor_intent
  for insert
  with check (true);

create policy "contact_insert" on public.contact_messages
  for insert
  with check (true);
