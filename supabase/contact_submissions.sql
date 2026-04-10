create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  business text not null,
  contact text not null,
  service text,
  message text not null,
  source_page text,
  page_language text,
  origin text,
  user_agent text,
  ip_hash text,
  submitted_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.contact_submissions
  add column if not exists status text not null default 'new',
  add column if not exists notes text,
  add column if not exists follow_up_at timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contact_submissions_status_check'
  ) then
    alter table public.contact_submissions
      add constraint contact_submissions_status_check
      check (status in ('new', 'contacted', 'qualified', 'won', 'lost'));
  end if;
end
$$;

create index if not exists contact_submissions_submitted_at_idx
  on public.contact_submissions (submitted_at desc);
create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);
create index if not exists contact_submissions_follow_up_at_idx
  on public.contact_submissions (follow_up_at);

create table if not exists public.crm_admins (
  email text primary key,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.contact_submissions enable row level security;
alter table public.crm_admins enable row level security;

revoke all on public.contact_submissions from anon, authenticated;
revoke all on public.crm_admins from anon, authenticated;

grant usage on schema public to authenticated;
grant select on public.crm_admins to authenticated;
grant select on public.contact_submissions to authenticated;
grant update (status, notes, follow_up_at) on public.contact_submissions to authenticated;

drop policy if exists "admins can read submissions" on public.contact_submissions;
create policy "admins can read submissions"
on public.contact_submissions
for select
to authenticated
using (
  exists (
    select 1
    from public.crm_admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
);

drop policy if exists "admins can update submissions" on public.contact_submissions;
create policy "admins can update submissions"
on public.contact_submissions
for update
to authenticated
using (
  exists (
    select 1
    from public.crm_admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
)
with check (
  exists (
    select 1
    from public.crm_admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
);

drop policy if exists "admins can read own admin row" on public.crm_admins;
create policy "admins can read own admin row"
on public.crm_admins
for select
to authenticated
using (
  lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

comment on table public.contact_submissions is
  'Stores contact form submissions and CRM follow-up state for the Tbilisi Growth Studio website.';

comment on table public.crm_admins is
  'Email allowlist for CRM administrators authenticated through Supabase Auth.';

-- After running this file, replace the email below with your real admin address and run it once.
-- insert into public.crm_admins (email)
-- values ('you@example.com')
-- on conflict (email) do nothing;