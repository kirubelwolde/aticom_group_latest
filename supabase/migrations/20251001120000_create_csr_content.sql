-- Create schema and table for Corporate Social Responsibility (CSR) content
create schema if not exists csr;

create table if not exists public.csr_content (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Corporate Social Responsibility',
  subtitle text,
  main_title text,
  initiatives jsonb not null default '[]'::jsonb,
  image_url text,
  hero_image text,
  cta_text text default 'Learn More About Our CSR Initiatives',
  cta_link text default '/csr',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure required extension for gen_random_uuid()
create extension if not exists pgcrypto;

-- Indexes
create index if not exists idx_csr_content_active on public.csr_content (active);

-- Row Level Security
alter table public.csr_content enable row level security;

-- Policies: allow public read of active rows
create policy if not exists "Public can read active CSR content" on public.csr_content
for select using (active = true);

-- Policies: authenticated users can full CRUD
create policy if not exists "Authenticated can manage CSR content" on public.csr_content
for all to authenticated using (true) with check (true);

-- Trigger to auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_timestamp on public.csr_content;
create trigger set_timestamp
before update on public.csr_content
for each row execute procedure public.set_updated_at();

-- Seed a default row if none exists
insert into public.csr_content (title, subtitle, main_title, initiatives, image_url, hero_image, cta_text, cta_link, active)
select
  'Corporate Social Responsibility',
  'Committed to making a positive impact in Ethiopian communities through sustainable development and social initiatives',
  'We Are Active At Community Development',
  '[
    {"icon":"Heart","title":"Community Housing Projects","description":"Renovating houses for underprivileged residents in Akaki Qaliti Subdistrict 10, improving living conditions and community welfare.","color":"green-500"},
    {"icon":"Users","title":"Local Employment","description":"Creating sustainable employment opportunities for local communities through our diverse business operations.","color":"blue-500"},
    {"icon":"Leaf","title":"Environmental Sustainability","description":"Implementing eco-friendly practices in our agro-processing operations and promoting sustainable farming methods.","color":"amber-500"}
  ]'::jsonb,
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
  'Learn More About Our CSR Initiatives',
  '/csr',
  true
where not exists (select 1 from public.csr_content);


