# GoDaddy Deployment Guide — Luxurecovery

## Before You Deploy — One-Time Setup

### 1. Fill In Your Credentials (do this first)

Edit `src/lib/supabaseClient.ts`:
```ts
const SUPABASE_URL   = "https://YOURPROJECT.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
```

Edit `src/lib/formspreeClient.ts`:
```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

Then rebuild:
```bash
npm run build
```

---

## Deployment Steps (GoDaddy Shared Hosting / cPanel)

### Step 1 — Run the Build

```bash
npm run build
```

This generates the `dist/` folder in your project root.

### Step 2 — Connect to GoDaddy via FTP or File Manager

**Option A — File Manager (easiest)**
1. Log in to [GoDaddy Dashboard](https://account.godaddy.com)
2. Go to **Web Hosting → Manage → cPanel → File Manager**
3. Navigate to `public_html/`

**Option B — FTP Client (FileZilla)**
1. In cPanel → **FTP Accounts**, create an FTP account
2. Open FileZilla, connect with your FTP credentials
3. Navigate to `public_html/` on the remote side

### Step 3 — Upload the `dist/` Contents

> ⚠️ Upload the **contents** of `dist/`, not the folder itself.

Upload these files/folders to `public_html/`:
```
public_html/
├── index.html
├── .htaccess          ← critical for routing — don't skip
└── assets/
    ├── index-xxxx.js
    ├── index-xxxx.css
    └── (all image files)
```

**In File Manager:** Select all contents inside `dist/`, compress to `.zip`, upload, then **Extract** in `public_html/`.

**In FileZilla:** Drag the contents of your local `dist/` folder into the remote `public_html/` pane.

### Step 4 — Verify `.htaccess` Was Uploaded

In cPanel File Manager, make sure `public_html/.htaccess` exists.

> If you can't see it, click **Settings → Show Hidden Files** in the top-right of File Manager.

### Step 5 — Test Your Site

Visit your domain. Test:
- [ ] Home page loads
- [ ] Navigating to `/surgeons`, `/contact`, `/regenerative` works
- [ ] Refreshing a deep page (e.g. `/surgeons`) does NOT show a 404
- [ ] `/admin/login` loads the admin screen

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page / 404 on refresh | `.htaccess` wasn't uploaded, or `mod_rewrite` isn't enabled on your plan |
| Assets 404 (images/JS/CSS broken) | You uploaded the `dist` folder itself instead of its contents |
| `/admin` shows 404 | Same as above — `.htaccess` routing issue |
| Form submission error | Supabase/Formspree credentials not filled in `src/lib/` before building |

---

## Re-Deploying After Changes

```bash
npm run build
```
Then re-upload the `dist/` contents to `public_html/`, overwriting existing files. That's it.

---

## What's Already Configured for You

| File | What it does |
|------|-------------|
| `vite.config.ts` | `base: "/"` → all asset paths are absolute (required for GoDaddy) |
| `public/.htaccess` | Apache rewrites → all routes served by `index.html` |
| `public/.htaccess` | Gzip compression + 1-year cache headers for images/JS/CSS |
