# Netlify + Supabase Setup

This repository is a static multi-page site. It does not use React, Vite, or an npm build step.

What is already wired in this repo:
- The public contact form posts to `/api/contact`.
- `netlify/functions/contact-submit.js` stores submissions in Supabase using the service role key on the server only.
- `supabase/contact_submissions.sql` creates the contact table and now also adds the CRM fields, admin allowlist table, grants, and RLS policies.
- `/admin` is a static CRM page that signs in with Supabase Auth and reads or updates leads through RLS.

## Files involved

- `netlify.toml`
- `netlify/functions/contact-submit.js`
- `netlify/functions/admin-config.js`
- `supabase/contact_submissions.sql`
- `.env.example`
- `admin/index.html`
- `admin/admin.js`
- `admin/admin.css`

## Netlify environment variables

Set all of these in Netlify for the deployed site:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGINS`

Example `ALLOWED_ORIGINS` value:
- `https://tbilisigrowthstudio.ge,https://www.tbilisigrowthstudio.ge`

## Supabase steps

1. Create a Supabase project on the free plan.
2. Open `Project Settings -> API` and copy:
   - `Project URL`
   - `anon/public key`
   - `service_role key`
3. Open `SQL Editor -> New query`.
4. Paste the full contents of `supabase/contact_submissions.sql` and run it.
5. Run this once with your real admin email substituted:

```sql
insert into public.crm_admins (email)
values ('you@example.com')
on conflict (email) do nothing;
```

6. Open `Authentication -> Providers` and make sure Email is enabled.
7. Create your admin user in Supabase Auth with the same email you inserted into `crm_admins`.

## Netlify steps

1. In Netlify, choose `Add new site -> Import an existing project`.
2. Select the GitHub repo `Vornato/Tbilisigrowthstudio`.
3. Set these values:
   - Production branch: your chosen branch
   - Build command: leave blank
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
4. Add the four environment variables listed above.
5. Deploy the site.

## Admin URL

- `/admin`

## Security notes

- Keep `SUPABASE_SERVICE_ROLE_KEY` in Netlify only. Never put it in browser JavaScript.
- The browser-side admin page only receives the public anon key and still relies on Supabase RLS for data access.
- Public visitors cannot read submissions from Supabase.
- Only authenticated emails listed in `crm_admins` can view or update CRM records.
- The hidden `website` field is the existing honeypot trap for basic spam filtering.