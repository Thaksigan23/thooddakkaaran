# Thooddakkaaran — Official Site

Marketing site for Thooddakkaaran (Pvt) Ltd, built with [Next.js 15](https://nextjs.org/) (App Router), React 19, and Tailwind CSS, deployed on Vercel.

## Stack

- Next.js 15 (App Router, React Server Components)
- React 19
- Tailwind CSS 3.4
- Framer Motion, AOS (animations)
- i18next + react-i18next (English / Tamil / Sinhala)
- EmailJS (contact form)
- Vercel (hosting + Instagram Graph API proxy at `/api/instagram`)

## Layout

```
app/
  layout.jsx          Server component: <html>, <head>, metadata, JSON-LD, fonts
  page.jsx            Home page — composes the section components from src/components/
  globals.css         Tailwind + global tokens
  robots.js           /robots.txt
  sitemap.js          /sitemap.xml
  api/
    instagram/
      route.js        GET/OPTIONS handler for the Instagram feed
src/
  components/         All UI components (each marked "use client")
  components/providers/AppProviders.jsx   Client-side bootstrap (i18n, AOS, loader)
  constants/          Env-driven config (site URL, contact, social)
  i18n/i18n.js        i18next setup
  utils/              Small helpers (Framer Motion variants)
public/
  images/             Static assets (hero, gallery, logo)
e2e/
  smoke.spec.js       Playwright smoke tests
```

## Scripts

```bash
npm run dev       # Start Next.js dev server on http://localhost:3000
npm run build     # Production build to .next/
npm run start     # Serve the production build (after `build`)
npm run lint      # ESLint with eslint-config-next
npm run test:e2e  # Playwright smoke tests (auto-builds + starts the server)
```

## Environment variables

Public values that ship to the browser are prefixed `NEXT_PUBLIC_*`. Server-only secrets have no prefix and are only readable from server components, route handlers, and during the build. See `.env.example` for the full list. Add the same keys to the Vercel project (Production + Preview scope) before deploying.

Required server-only keys for the live Instagram feed:

- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`

Optional: `ALLOWED_CORS_ORIGINS` for cross-origin `/api/instagram` access.

## Deployment

Vercel auto-detects Next.js and runs `next build`. Security headers are set at the Vercel edge via `vercel.json` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy).
