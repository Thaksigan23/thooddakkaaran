## Why

The Thooddakkaaran marketing site is currently a React 19 single-page app served by Vite. Because the page is shipped as a client-rendered SPA, search engines, social crawlers, and slow Sri Lankan mobile networks all pay for the same hydration cost before they can see content, OG tags, or JSON-LD. The site already lives on Vercel and depends on a Vercel serverless function for the Instagram feed, so moving to Next.js gives us first-class SSR/SSG, real per-route metadata, image optimisation, and a unified runtime for the existing API — without changing hosting or design.

## What Changes

- **BREAKING**: Replace Vite 8 with Next.js 15 (App Router) as the build and dev toolchain; remove `vite`, `@vitejs/plugin-react`, and the custom `inject-site-meta` plugin.
- **BREAKING**: Rename every public env var from `VITE_*` to `NEXT_PUBLIC_*` and update all `import.meta.env` references to `process.env`; server-only vars (`INSTAGRAM_*`, `ALLOWED_CORS_ORIGINS`) keep their names.
- **BREAKING**: Delete `index.html` and the `src/main.jsx` bootstrap; move the page tree under `app/` with a single root `app/layout.jsx` + `app/page.jsx`, and add `"use client"` to every interactive component (the existing 25 components in `src/components/` all use hooks, Framer Motion, or browser globals).
- Replace the Vite plugin's HTML placeholder injection (`__SITE_URL__`, `__INSTAGRAM_URL__`) and JSON-LD block with Next.js Metadata API (`metadata` / `generateMetadata`) and a typed JSON-LD `<script>` inside `app/layout.jsx`.
- Replace the plugin's `closeBundle` emission of `robots.txt` and `sitemap.xml` with `app/robots.js` and `app/sitemap.js` route conventions.
- Move `api/instagram.js` to `app/api/instagram/route.js` as a Next.js Route Handler, preserving its response shape (`{ configured, posts, error?, message? }`), CORS allow-list, and cache headers (`s-maxage=1800, stale-while-revalidate=3600`).
- Load Poppins via `next/font/google` instead of the Google Fonts `<link>` tag, and use `next/image` for the hero/logo/gallery images in `public/images/` to cut LCP.
- Update Playwright (`webServer` command + port `3000`), ESLint config (drop `eslint-plugin-react-refresh`, add `eslint-config-next`), Tailwind `content` globs (`./app/**/*`, `./src/**/*`), and `vercel.json` (Next.js auto-detects, but security headers stay).
- Update `.env.example`, `README.md`, and `.gitignore` (add `.next/`, drop `dist/`).

## Capabilities

### New Capabilities

- `web-app-framework`: Next.js 15 App Router as the build/dev/deploy toolchain — rendering strategy (SSG by default, ISR where data is dynamic), routing layout, env var contract, client/server component boundary, and Vercel deployment defaults.
- `seo-metadata`: Per-page metadata generation — `<title>`, description, canonical URL, Open Graph, Twitter card, theme color, Organization JSON-LD, `robots.txt`, and `sitemap.xml` — all derived from `NEXT_PUBLIC_SITE_URL` at build time.
- `instagram-feed-api`: Server-side `/api/instagram` Route Handler that proxies Instagram Graph API, with allow-listed CORS, graceful unconfigured/error responses, and cache headers aligned with the chosen ISR window.

### Modified Capabilities

<!-- None — this is the first OpenSpec change in the repo, so there are no existing specs to modify. -->

## Impact

- **Code**: every file under `src/` is touched (hook directives, env var renames, `next/link` + `next/image` where applicable); `index.html`, `src/main.jsx`, `vite.config.js` are removed; new `app/` and `next.config.js` are added; `api/instagram.js` is moved into `app/api/instagram/route.js`.
- **Dependencies**: add `next`; remove `vite`, `@vitejs/plugin-react`; swap `eslint-plugin-react-refresh` for `eslint-config-next`. React 19, Tailwind 3.4, Framer Motion, i18next, AOS, react-icons, EmailJS, react-countup, react-parallax, yet-another-react-lightbox all stay.
- **Tooling**: `npm run dev` switches to `next dev`, `build` to `next build`, `preview` to `next start`; Playwright `webServer.url` becomes `http://127.0.0.1:3000`.
- **Deployment**: Vercel auto-detects Next.js — remove the explicit Vite build settings if any are configured in the dashboard; keep `vercel.json` for security headers (or migrate to `next.config.js` `headers()`).
- **Env vars**: Vercel project env must be re-keyed from `VITE_*` to `NEXT_PUBLIC_*` for any public values; server-only `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`, and `ALLOWED_CORS_ORIGINS` are unchanged.
- **SEO**: improved (server-rendered HTML, real per-route metadata) but the production deploy must be re-crawled and existing inbound links / `og:image` paths must remain valid.
- **Tests**: existing Playwright smoke tests should pass unchanged once `baseURL` is updated; new tests can be added for `/robots.txt`, `/sitemap.xml`, and `/api/instagram` later.
- **Out of scope**: TypeScript migration, Tailwind v4 upgrade, retail e-commerce, content/translation overhaul, image format conversion to AVIF/WebP at source.
