# TrustedForm Integration Setup

## Status: ✅ Already Implemented

The TrustedForm integration is correctly wired in the codebase. No code changes needed.

---

## What's Already Working

| File | Line(s) | Purpose |
|------|---------|---------|
| `public/index.html` | 144–157 | Loads TrustedForm script with `field=xxTrustedFormCertUrl&use_tagged_consent=true` |
| `src/components/landing/CaseForm.jsx` | 215 | Hidden input `xxTrustedFormCertUrl` (uncontrolled — React won't overwrite) |
| `src/components/landing/CaseForm.jsx` | 217 | Consent text with `data-tf-consent="true"` |
| `api/lead.js` | 124–170 | Server-side certificate claim via Basic Auth with `match_lead` + `retain` |

---

## Required: Create Supabase `leads` Table

Run this SQL in **Supabase Dashboard → SQL Editor**:

```sql
CREATE TABLE IF NOT EXISTS public.leads (
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    zip TEXT NOT NULL,
    state TEXT NOT NULL,
    trusted_form_cert_url TEXT,
    consent_text TEXT,
    consent_at TIMESTAMPTZ,
    page_url TEXT,
    user_agent TEXT,
    ip INET,
    claim_status TEXT DEFAULT 'pending',
    claim_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_claim_status ON public.leads(claim_status);
```

---

## Required: Vercel Environment Variables

Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Value | Scope |
|----------|-------|-------|
| `SUPABASE_URL` | `https://vqzbouddkyxixjxrrgbm.supabase.co` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (from `.env`) | Production, Preview, Development |
| `TRUSTEDFORM_API_KEY` | `7263dc01065c523f94c5574755b46cd2` | Production, Preview, Development |
| `TRUSTEDFORM_VENDOR` | `Accident Case Win` | Production, Preview, Development |

> **Note:** These are already in `.env` locally. Add them to Vercel for deployment.

---

## Flow Summary

1. **User lands on page** → TrustedForm script loads, creates certificate
2. **User submits form** → Hidden field `xxTrustedFormCertUrl` populated by TF script
3. **Frontend POSTs** → `/api/lead` with `trustedFormCertUrl` + lead data
4. **Backend (`api/lead.js`)**:
   - Saves lead to Supabase (`claim_status: 'pending'`)
   - Claims certificate via `POST` to cert URL with Basic Auth (`API:TRUSTEDFORM_API_KEY`)
   - Sends `match_lead` (email + digits-only phone) + `retain` (reference + vendor)
   - Updates lead row with `claim_status: 'retained'` or `'failed'`

---

## Verification

After deploying:
1. Submit a test form
2. Check **Supabase → Table Editor → leads** — new row should appear
3. `claim_status` should be `retained`
4. `claim_response` should contain TrustedForm outcome
5. Check **TrustedForm Dashboard** — certificate should show as retained

---

## Optional Enhancements

- Add client-side check: warn if `xxTrustedFormCertUrl` empty before submit
- Add fallback: submit anyway, flag for manual review if cert missing
- Add `data-tf-priority="high"` to consent element for faster capture