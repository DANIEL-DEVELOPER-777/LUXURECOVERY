# Supabase Setup Guide — Luxurecovery Admin

## 1 · Configure Your Credentials

Open `src/lib/supabaseClient.ts` and `src/lib/formspreeClient.ts` and swap in your real values.

### `supabaseClient.ts`
Find these two lines and replace the placeholders:
```ts
const SUPABASE_URL   = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY_HERE";
```
**Where to find them:** Supabase Dashboard → your project → **Settings → API → Project URL & anon public key**

### `formspreeClient.ts`
```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```
Go to [formspree.io](https://formspree.io), create a free form, set the **recipient email** to `contact@luxurecovery.com`, and paste the form ID.

---

## 2 · Create the Database Table

In **Supabase Dashboard → SQL Editor**, run the following SQL exactly:

```sql
-- Create the unified submissions table
create table public.form_submissions (
  id              uuid        default gen_random_uuid() primary key,
  created_at      timestamptz default now() not null,

  -- Which form submitted this row
  form_origin     text        not null,  -- 'Home' | 'Contact' | 'Surgeons' | 'Regenerative'

  -- Common fields (all forms)
  full_name       text,
  email           text,
  phone           text,

  -- Home & Contact page fields
  procedure       text,
  surgery_date    date,
  surgeon_name    text,
  location        text,
  preferred_package text,
  notes           text,

  -- Surgeons page fields
  practice_name   text,
  message         text,

  -- Regenerative (WaitlistForm) fields
  tier            text,
  is_current_client text,
  referral_source text
);
```

---

## 3 · Enable Row Level Security (RLS)

This allows **anyone** (the public) to **insert** rows but only **authenticated admins** to **read** them.

```sql
-- 1. Enable RLS on the table
alter table public.form_submissions enable row level security;

-- 2. Public INSERT policy (form submissions from the site)
create policy "Public can insert submissions"
  on public.form_submissions
  for insert
  to anon
  with check (true);

-- 3. Authenticated-only SELECT policy (admin dashboard)
create policy "Admin can read all submissions"
  on public.form_submissions
  for select
  to authenticated
  using (true);
```

> **Why this works:** The site uses your `anon` key which matches the `anon` role. The admin dashboard is accessed after signing in with Supabase Auth, which switches the token role to `authenticated`.

---

## 4 · Create the Admin User

In **Supabase Dashboard → Authentication → Users → Invite user**:

1. Click **"Invite user"**
2. Enter the admin email (e.g., `admin@luxurecovery.com`)
3. Supabase sends a magic-link invite — click it and set your password
4. You can now sign in at `/admin/login` on your deployed site

---

## 5 · How to Access the Admin Dashboard

| URL | Description |
|-----|-------------|
| `/admin/login` | Login page (email + password) |
| `/admin` | Protected dashboard — redirects to login if not signed in |

The dashboard lets you:
- View all form submissions in one table
- Filter by **Home**, **Contact**, **Surgeons**, or **Regenerative**
- See submission counts per form at a glance
- **Change your password** from within the dashboard

---

## 6 · File Structure Reference

```
src/
├── lib/
│   ├── supabaseClient.ts    ← Supabase client (set your credentials here)
│   └── formspreeClient.ts   ← Formspree helper (set your form ID here)
├── pages/
│   ├── admin/
│   │   ├── Login.tsx        ← Admin login page
│   │   ├── Dashboard.tsx    ← Admin dashboard
│   │   └── ProtectedRoute.tsx  ← Auth guard
│   ├── Index.tsx            ← Home form (form_origin: "Home")
│   ├── Contact.tsx          ← Contact form (form_origin: "Contact")
│   └── Surgeons.tsx         ← Surgeons form (form_origin: "Surgeons")
└── components/
    └── WaitlistForm.tsx     ← Regenerative form (form_origin: "Regenerative")
```

---

## 7 · Form Field Reference

The table below maps every form field to its database column.

| Form | Field | DB Column |
|------|-------|-----------|
| Home, Contact | Full Name | `full_name` |
| Home, Contact | Procedure / Surgery Type | `procedure` |
| Home, Contact | Surgery Date | `surgery_date` |
| Home, Contact, Surgeons | Surgeon Name | `surgeon_name` |
| Home, Contact | Location | `location` |
| Home, Contact | Preferred Package | `preferred_package` |
| Home, Contact | Notes / Special Requests | `notes` |
| Surgeons | Practice Name | `practice_name` |
| Surgeons | Email | `email` |
| Surgeons | Phone | `phone` |
| Surgeons | Message | `message` |
| Regenerative | Full Name | `full_name` |
| Regenerative | Email | `email` |
| Regenerative | Phone | `phone` |
| Regenerative | Tier | `tier` |
| Regenerative | Current Client? | `is_current_client` |
| Regenerative | How did you hear? | `referral_source` |
| Regenerative | Notes | `notes` |
| All forms | *(automatic)* | `form_origin`, `id`, `created_at` |
