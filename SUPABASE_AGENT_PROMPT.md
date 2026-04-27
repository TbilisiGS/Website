Copy and send the prompt below to the other agent:

```text
I need you to finish the Supabase CRM setup for my existing static website repo.

Context:
- Repo path: D:\Extenstion\TbilisiGS\Website
- Hosting: Netlify
- Backend pattern: Netlify Functions only
- Requirement: store all contact form submissions securely in Supabase
- Requirement: the database must not be directly writable or readable from the public frontend
- Requirement: keep the Supabase service role key server-side only
- Requirement: use Supabase free plan
- Requirement: there is already a basic CRM admin page in this repo

Important:
- Do not redesign the architecture if the existing repo already supports the correct pattern.
- Prefer reusing the current implementation.
- Only the Supabase anon key may be used in browser code, and only where RLS protects the data.
- The Supabase service role key must stay in Netlify environment variables only.
- Public visitors must never be able to query submissions from the frontend.

What I want you to do:
1. Inspect the repo and confirm the existing contact flow.
2. Reuse the existing Netlify function for form submission if present.
3. Reuse the existing admin CRM page if present.
4. Set up the required Supabase tables, policies, and admin allowlist using the SQL already in the repo if available.
5. Verify the setup is secure:
   - submissions inserted server-side only
   - RLS enabled
   - anon users cannot read submissions
   - only authenticated admin emails in the allowlist can read/update CRM records
6. Tell me exactly which secrets and dashboard values I need to paste into Netlify.
7. Give me a final checklist to verify the production deployment.

Files that likely matter:
- netlify/functions/contact-submit.js
- netlify/functions/admin-config.js
- supabase/contact_submissions.sql
- admin/index.html
- admin/admin.js
- CONTACT_SETUP.md
- .env.example
- netlify.toml

Expected end state:
- Form submissions from the website are stored in Supabase table `public.contact_submissions`
- CRM admins sign in through Supabase Auth
- Only admins listed in `public.crm_admins` can view/update leads
- `/admin` works as a lead inbox
- Netlify has the correct environment variables

If anything is missing, add only the minimum required code and explain why.

When you answer, structure it like this:
1. What already exists in the repo
2. What still needs to be done in Supabase
3. What still needs to be done in Netlify
4. Exact SQL to run if needed
5. Exact env vars to set
6. Final verification steps
7. Any security gaps or recommended hardening
```
