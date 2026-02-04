# Fractional Keys – Launch MVP

A production-ready Next.js (TypeScript) MVP for the Fractional Keys waitlist,
marketing site, and admin dashboard.

## Local setup

```bash
npm install
npm run dev
```

The app uses the Next.js App Router and Tailwind CSS.

## Supabase setup

1. Create a new Supabase project.
2. Apply the migration in `supabase/migrations/001_init.sql`.
3. Enable Row Level Security (already in the migration) and ensure policies are
   active.
4. Copy your Supabase project URL and keys into `.env.local` based on
   `.env.example`.

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_PROVIDER=
```

- `SUPABASE_SERVICE_ROLE_KEY` is used only on the server to read admin data and
  write waitlist/survey/contact records.
- `ADMIN_PASSWORD` enables the fallback admin login if you are not using
  Supabase Auth.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` supports `console` by default; replace with
  PostHog/GA once integrated.

## Waitlist + survey flow

- `/waitlist` creates a signup record and redirects to `/survey?signup_id=<id>`.
- `/survey` saves investor intent data linked to the signup.
- `/thank-you` confirms completion and generates an optional referral link.

## Admin dashboard

- Visit `/admin` and sign in with `ADMIN_PASSWORD`.
- Admin data is fetched server-side using the Supabase service role key.
- Filters, search, and CSV export are available from the dashboard UI.

## CSV export

Use the **Export CSV** button in `/admin` to download filtered results. Columns
include signup metadata and the latest investor intent responses.

## Rate limiting and spam protection

- Simple in-memory rate limiting is applied to waitlist and contact forms.
- Honeypot fields help block basic spam submissions.
- For production, replace the in-memory limiter with an edge-friendly store
  (Upstash Redis or Vercel KV) and adjust `src/lib/rate-limit.ts`.

## Compliance notes

- The legal pages include neutral disclaimers and GDPR-friendly language.
- Requests to delete data can be handled manually via the contact page.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Set the environment variables listed above in the Vercel dashboard.
4. Deploy.

## Admin auth options

- **Preferred:** Supabase Auth for admin users with RLS policies.
- **Fallback:** Password-based login using `ADMIN_PASSWORD` (current default).

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```
