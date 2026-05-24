## 1. Branch and dependency swap

- [x] 1.1 Create branch `chore/upgrade-to-nextjs` from `main`
- [x] 1.2 `npm uninstall vite @vitejs/plugin-react eslint-plugin-react-refresh`
- [x] 1.3 `npm install next@^15 eslint-config-next@^15`
- [x] 1.4 Confirm `react@^19`, `react-dom@^19`, Tailwind 3.4, Framer Motion, i18next, AOS, react-icons, EmailJS, react-countup, react-parallax, yet-another-react-lightbox are still pinned and untouched in `package.json`
- [x] 1.5 Rewrite `package.json` scripts: `dev: "next dev"`, `build: "next build"`, `start: "next start"`, `lint: "next lint"`, keep `test:e2e: "playwright test"`

## 2. Next.js scaffold

- [x] 2.1 Create `next.config.js` with `reactStrictMode: true` and `images.remotePatterns` allowing `scontent-*.cdninstagram.com` and `instagram.f*.fbcdn.net` for the Instagram feed
- [x] 2.2 Create `app/layout.jsx` as a server component that renders `<html lang="en" translate="no">`, `<body>`, the skip link `<a class="skip-link" href="#main-content">Skip to main content</a>`, and wraps children in `<AppProviders>`
- [x] 2.3 Export `metadata` from `app/layout.jsx` covering title, description, keywords, authors, themeColor (`#166534`), viewport, robots, `metadataBase` from `NEXT_PUBLIC_SITE_URL`, `alternates.canonical: "/"`, full `openGraph` and `twitter` objects, and `icons.icon: "/favicon.png"` (values copied verbatim from current `index.html`)
- [x] 2.4 In `app/layout.jsx`, inline the Organization JSON-LD via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({...}) }} />`, building all URLs from `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL`
- [x] 2.5 Load Poppins via `next/font/google` with weights `[300, 400, 500, 600, 700]`, `display: "swap"`, and attach its `className` to `<body>`
- [x] 2.6 Create `app/page.jsx` as a server component that imports the chrome (`Navbar`, `Footer`, `ScrollProgress`, `Whatsapp`, `BackToTop`, `CookieConsent`, `DocumentLangSync`, `ErrorBoundary`) and the twelve content sections, mirroring the structure from `src/App.jsx`. The loader-gating logic (previously inline in `App.jsx`) moves into `AppProviders` so the SSR HTML contains real section markup for crawlers.
- [x] 2.7 Move `src/index.css` to `app/globals.css` (Tailwind directives at top, font-family declaration removed in favour of `next/font` applied via `<body>` className)

## 3. Tailwind, ESLint, Playwright, gitignore

- [x] 3.1 Update `tailwind.config.js` `content` to `["./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"]`; remove `"./index.html"`
- [x] 3.2 Replace `eslint.config.js` `eslint-plugin-react-refresh` block with `eslint-config-next` via `@eslint/eslintrc` flat-compat; keep `react-hooks`, drop `vite.config.js` block, scope Node-globals to `playwright.config.js` / `next.config.js` / `postcss.config.js` and `app/api/**`.
- [x] 3.3 Update `playwright.config.js`: `webServer.command` now starts Next (`npm run build && npm run start -- -H 127.0.0.1 -p 4173`) and `baseURL` stays at `http://127.0.0.1:4173` so smoke tests stay untouched; bumped startup timeout to 240s for Next's first build.
- [x] 3.4 Update `.gitignore`: add `.next/`, `out/`, `next-env.d.ts`; remove `dist`/`dist-ssr` entries
- [ ] 3.5 Run `npm run lint` and fix any new `eslint-config-next` warnings — deferred to Phase 8 after components are ported (otherwise it floods on `VITE_*` references)

## 4. Component port

- [x] 4.1 Create `src/components/providers/AppProviders.jsx` as a client component (`"use client"`) — holds `I18nextProvider`, `MotionConfig`, AOS init, and the loader-gating effect that previously lived in `App.jsx`. `<StrictMode>` is omitted because `next.config.js` `reactStrictMode: true` already wraps the tree.
- [x] 4.2 Add `"use client"` as the first line to every file in `src/components/*.jsx` (all 25 files)
- [x] 4.3 In `src/components/CookieConsent.jsx`, rename `import.meta.env.VITE_GA_MEASUREMENT_ID` to `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [x] 4.4 In `src/components/Map.jsx`, rename `VITE_CONTACT_LOCATION`, `VITE_FACTORY_LOCATION`, `VITE_FACTORY_MAP_URL` to their `NEXT_PUBLIC_*` equivalents
- [x] 4.5 In `src/components/Contact.jsx`, rename all `VITE_EMAILJS_*` / `VITE_CONTACT_*` / `VITE_FACTORY_LOCATION` to `NEXT_PUBLIC_*`
- [x] 4.6 In `src/constants/site.js`, rename `VITE_SITE_URL` and `VITE_ECOMMERCE_STORE_URL` to `NEXT_PUBLIC_*`
- [x] 4.7 In `src/constants/social.js`, rename `VITE_INSTAGRAM_PROFILE_URL` and `VITE_INSTAGRAM_FEED_API_URL` to `NEXT_PUBLIC_*`; refreshed the JSDoc comment to reference the Next.js Route Handler.
- [x] 4.8 In `src/constants/contact.js`, rename `VITE_WHATSAPP_LINK` and `VITE_CONTACT_PHONE` to `NEXT_PUBLIC_*`
- [x] 4.9 Audited browser-global usage. Fixed two SSR hazards: `ThemeToggle` initialised `useState` from `localStorage` (server crash) — now reads in `useEffect`; `CookieConsent` initialised `useState` from a function that touched `window` — same treatment. Other components only touch browser globals inside `useEffect` or click handlers, which is SSR-safe.
- [x] 4.10 Converted `Loader.jsx` `motion.img` → `<Image>` wrapped in `motion.div` (logo is 3750×3750 square, rendered at 64×64 with `priority`). Hero uses a CSS `background-image` for its parallax effect, so per the conditional in the task it stays as-is. (Note: the existing `og:image` references `/images/farm1.jpg`, which is missing from `public/images/`; this is a pre-existing bug carried over unchanged and should be fixed in a follow-up.)
- [x] 4.11 Delete `src/App.jsx` and `src/main.jsx`

## 5. SEO routes

- [x] 5.1 Create `app/robots.js` exporting `default function robots()` returning `{ rules: [{ userAgent: "*", allow: "/" }], sitemap, host }`
- [x] 5.2 Create `app/sitemap.js` exporting `default function sitemap()` returning a single home URL entry with `changeFrequency: "weekly"`, `priority: 1.0`, and `lastModified: new Date()`
- [ ] 5.3 Verify `GET /robots.txt` and `GET /sitemap.xml` return the expected bodies in `next dev` — deferred to Phase 8 (curl-based verification)

## 6. Instagram API Route Handler

- [x] 6.1 Create `app/api/instagram/route.js` exporting async `GET(request)`, `OPTIONS(request)`, and method-rejecting `POST/PUT/DELETE/PATCH` handlers returning HTTP 405
- [x] 6.2 Port the CORS allow-list logic to read `request.headers.get("origin")` and `process.env.ALLOWED_CORS_ORIGINS`
- [x] 6.3 Port the unconfigured-server branch (returns `{ configured: false, posts: [], message }` with HTTP 200) when `INSTAGRAM_ACCESS_TOKEN` or `INSTAGRAM_BUSINESS_ACCOUNT_ID` is missing
- [x] 6.4 Port the Graph API fetch and post normalisation (VIDEO → `thumbnail_url`, filter empties)
- [x] 6.5 Port error handling: Graph error → HTTP 502 `{ configured: true, posts: [], error }`; unexpected exception → HTTP 500
- [x] 6.6 On successful 200 responses, set `Cache-Control: public, s-maxage=1800, stale-while-revalidate=3600` and `Content-Type: application/json`
- [x] 6.7 Delete `api/instagram.js` and the now-empty `api/` directory

## 7. Cleanup

- [x] 7.1 Deleted `index.html`, `src/App.css`, `src/index.css`, and `vite.config.js`. `postcss.config.js` kept (Tailwind needs it). `src/App.jsx` + `src/main.jsx` were already deleted in 4.11.
- [x] 7.2 Updated `.env.example`: every public key now `NEXT_PUBLIC_*`; server-only `INSTAGRAM_*` and `ALLOWED_CORS_ORIGINS` unchanged; comments refreshed to mention Next.js / route handler instead of Vite.
- [x] 7.3 Rewrote `README.md` to describe the Next.js stack, scripts (`dev`, `build`, `start`, `lint`, `test:e2e`), and the `app/` + `src/` layout; removed the Vite/React boilerplate.
- [x] 7.4 Confirmed `vercel.json` only sets security headers (no `buildCommand`/`framework` override) so Vercel's Next.js auto-detection takes over.

## 8. Local verification

- [x] 8.1 `npm run dev` and open `http://localhost:3000`; no console errors, no hydration warnings, every section visible in the expected order — **user-verified**
- [x] 8.2 Language switcher updates UI and `<html lang>` — **user-verified**
- [x] 8.3 Theme toggle applies Tailwind dark mode classes — **user-verified**
- [x] 8.4 `npm run build` succeeds; summary shows `/` as `○ (Static)`, `/_not-found` static, `/api/instagram` as `ƒ (Dynamic)`, and `/robots.txt` + `/sitemap.xml` as static. First Load JS for `/` = 187 kB.
- [x] 8.5 `npm run start -- -p 4173` + `curl -i`: `/robots.txt` → 200 `text/plain` with `User-Agent: *`, `Allow: /`, correct `Sitemap:`; `/sitemap.xml` → 200 `application/xml` with the home `<loc>`; `/api/instagram` → 200 `application/json` with the unconfigured-server payload (matching spec scenario exactly).
- [x] 8.6 `curl -s http://127.0.0.1:4173/` contains `theme-color #166534`, full description / keywords, `canonical https://thooddakkaaran.vercel.app`, og:title/description/url/image/locale, twitter:card=summary_large_image, JSON-LD Organization schema, `class="skip-link" href="#main-content"`, and `id="main-content" tabindex="-1"`.
- [x] 8.7 `npm run lint` exits 0 (two pre-existing `import/no-anonymous-default-export` warnings on `postcss.config.js` / `tailwind.config.js`; not introduced by this change).
- [x] 8.8 `npm run test:e2e`: 3/3 smoke tests pass (`home loads with main landmark`, `skip link targets main content`, `robots.txt is reachable`). Playwright Chromium installed during this run; no hydration warnings observed in the Next.js server log.

## 9. Deployment cutover

- [ ] 9.1 In Vercel project settings, add every `NEXT_PUBLIC_*` env var (Production + Preview scope) with the same value as its existing `VITE_*` counterpart; leave the old `VITE_*` keys in place for rollback
- [ ] 9.2 Push the branch and open a PR; review the Vercel preview deployment URL
- [ ] 9.3 On the preview URL, manually verify: hero renders, language/theme toggles work, Instagram feed loads or shows the configured fallback, contact form submits, security headers are present (`curl -I`)
- [ ] 9.4 Merge to `main` and watch the production deploy
- [ ] 9.5 After 7 days of stable production with no rollback, delete the obsolete `VITE_*` env vars in the Vercel dashboard (no code change)
