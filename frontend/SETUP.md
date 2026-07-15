# Lead capture setup (Supabase + Vercel + TrustedForm)

The case-review form captures a **TrustedForm certificate URL** in the browser and
POSTs the lead to `/api/lead`, a Vercel serverless function that **stores the lead
in Supabase** and **claims the certificate** server-side with your API key.

```
Browser form ──POST /api/lead──▶ Vercel function ──▶ Supabase (store)
 (TrustedForm script                              └─▶ TrustedForm (claim cert)
  fills xxTrustedFormCertUrl)
```

> **Security:** the browser never sees your Supabase service-role key or your
> TrustedForm API key. They live only as Vercel environment variables and are
> used by `api/lead.js`. Do **not** prefix them with `REACT_APP_`.

---

## 1. Supabase

1. Create a project at supabase.com (or use an existing one).
2. In **SQL Editor**, run:

   ```sql
   create table if not exists public.leads (
     id                     uuid primary key default gen_random_uuid(),
     created_at             timestamptz not null default now(),
     first_name             text not null,
     last_name              text not null,
     phone                  text not null,
     email                  text not null,
     zip                    text not null,
     state                  text not null,
     trusted_form_cert_url  text,
     consent_text           text,
     consent_at             timestamptz,
     page_url               text,
     user_agent             text,
     ip                     text,
     claim_status           text default 'pending',
     claim_response         jsonb
   );

   -- Keep the table private. The serverless function uses the service_role key,
   -- which bypasses RLS, so no public policies are needed. Do NOT add a public
   -- insert policy — that would let anyone write straight to your database.
   alter table public.leads enable row level security;
   ```

3. From **Project Settings → API**, copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** secret → `SUPABASE_SERVICE_ROLE_KEY` (server-only!)

## 2. TrustedForm

- The tracking script is already installed in `public/index.html`
  (`use_tagged_consent=true`), and the form already tags the consent language
  (`data-tf-consent`) and masks sensitive fields (`data-tf-sensitive`). Nothing
  to change there.
- From your ActiveProspect/TrustedForm account, copy your **API key** →
  `TRUSTEDFORM_API_KEY`.
- `api/lead.js` is configured for the **Retain** product (it POSTs a `retain`
  object to the certificate URL). If a row shows `claim_status = failed`, inspect
  its `claim_response` JSON in Supabase. The raw cert URL is always stored, so you
  can also retain from the ActiveProspect dashboard as a fallback.

## 3. Vercel

1. Import the repo at vercel.com. Framework preset auto-detects **Create React
   App** (build: `npm run build`, output: `build/`). The `api/` folder is
   deployed as a serverless function automatically — no extra config.
2. **Settings → Environment Variables**, add (Production + Preview):

   | Name | Value |
   |------|-------|
   | `SUPABASE_URL` | your Supabase project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role secret |
   | `TRUSTEDFORM_API_KEY` | your TrustedForm API key |
   | `TRUSTEDFORM_VENDOR` | `Accident Case Win` (optional) |

3. Deploy. Submit the live form, then confirm a row appears in the Supabase
   `leads` table with a `trusted_form_cert_url` and `claim_status = retained`.

## 4. Local development

- `npm start` (or `yarn start`) runs the frontend only — `/api/lead` won't exist,
  so submissions will show the form's error state. That's expected.
- To exercise the full flow locally, use the Vercel CLI:
  ```bash
  cp .env.example .env      # fill in the values (this file is git-ignored)
  npx vercel dev
  ```

---

### Files involved
- `src/components/landing/CaseForm.jsx` — the form; captures the cert URL + consent and POSTs.
- `api/lead.js` — Vercel serverless function; stores the lead and claims the cert.
- `.env.example` — the environment variables to set.
- `public/index.html` — TrustedForm + PostHog scripts.
