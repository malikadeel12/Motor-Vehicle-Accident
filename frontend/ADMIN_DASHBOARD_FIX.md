# Admin Dashboard Fix - Steps to Show Leads

## Problem
Form submissions work (data saves to Supabase), but Admin Dashboard shows "No leads found" because **Row Level Security (RLS) blocks anonymous reads**.

## Root Cause
- `leads` table has `ALTER TABLE leads ENABLE ROW LEVEL SECURITY` 
- No policy exists to allow `anon` role to `SELECT` from `leads`
- Admin dashboard uses anon key → reads are blocked

## Fix (Run in Supabase SQL Editor)

```sql
-- Disable RLS on leads table (writes use service_role which bypasses RLS anyway)
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
```

## Alternative (If you want to keep RLS enabled)

```sql
-- Keep RLS enabled but add read policy for anon
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read access" ON public.leads
  FOR SELECT TO anon
  USING (true);
```

## Verification

1. Run the SQL above in **Supabase → SQL Editor → Run**
2. Refresh **Admin Dashboard** (`/admin/dashboard`)
3. Should see 5+ leads with `claim_status: retained`

## Current Lead Data (for reference)

| ID | Name | Email | Status | TrustedForm |
|----|------|-------|--------|-------------|
| 5 | Fav Person | favperson659@gmail.com | retained | ✅ |
| 4 | testing data | testing@gmail.com | retained | ✅ |
| 3 | Adeel Dev | adeelriaz384@gmail.com | retained | ✅ |
| 2 | Adeel Riaz | adeelriaz384@gmail.com | retained | ✅ |
| 1 | Adeel Dev | adeelriaz384@gmail.com | retained | ✅ |

## Environment Variables (Already Configured)

### Frontend (Vercel - REACT_APP_*)
- `REACT_APP_ADMIN_USERNAME=admin`
- `REACT_APP_ADMIN_PASSWORD=admin123`
- `REACT_APP_SUPABASE_URL=https://vqzbouddkyxixjxrrgbm.supabase.co`
- `REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (anon key)

### Backend (Vercel - Server only)
- `SUPABASE_URL=https://vqzbouddkyxixjxrrgbm.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (service role)
- `TRUSTEDFORM_API_KEY=7263dc01065c523f94c5574755b46cd2`
- `TRUSTEDFORM_VENDOR=Accident Case Win`

## Admin Access
- URL: `https://your-domain.vercel.app/admin/login`
- Username: `admin`
- Password: `admin123`

## Vercel Deployment Notes
- `vercel.json` handles SPA routing (rewrites to `index.html`)
- After adding env vars, **redeploy**: `vercel --prod`