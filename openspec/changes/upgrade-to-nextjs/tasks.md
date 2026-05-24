## 1. Branch and dependency swap

- [ ] 1.1 Create branch `chore/upgrade-to-nextjs` from `main`
- [ ] 1.2 `npm uninstall vite @vitejs/plugin-react eslint-plugin-react-refresh`
- [ ] 1.3 `npm install next@^15 eslint-config-next@^15`
- [ ] 1.4 Confirm `react@^19`, `react-dom@^19`, Tailwind 3.4, Framer Motion, i18next, AOS, react-icons, EmailJS, react-countup, react-parallax, yet-another-react-lightbox are still pinned and untouched in `package.json`
- [ ] 1.5 Rewrite `package.json` scripts: `dev: "next dev"`, `build: "next build"`, `start: "next start"`, `lint: "next lint"`, keep `test:e2e: "playwright test"`

## 2. Next.js scaffold

- [ ] 2.1 Create `next.config.js` with `reactStrictMode: true` and `images.remotePatterns` allowing `scontent-*.cdninstagram.com` and `instagram.f*.fbcdn.net` for the Instagram feed
- [ ] 2.2 Create `app/layout.jsx` as a server component that renders `<html lang="en" translate="no">`, `<body>`, the skip link `<a class="skip-link" href="#main-content">Skip to main content</a>`, and wraps children in `<AppProviders>`
- [ ] 2.3 Export `metadata` from `app/layout.jsx` covering title, description, keywords, authors, themeColor (`#166534`), viewport, robots, `metadataBase` from `NEXT_PUBLIC_SITE_URL`, `alternates.canonical: "/"`, full `openGraph` and `twitter` objects, and `icons.icon: "/favicon.png"` (values copied verbatim from current `index.html`)
- [ ] 2.4 In `app/layout.jsx`, inline the Organization JSON-LD via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({...}) }} />`, building all URLs from `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL`
- [ ] 2.5 Load Poppins via `next/font/google` with weights `[300, 400, 500, 600, 700]`, `display: "swap"`, and attach its `className` to `<body>`
- [ ] 2.6 Create `app/page.jsx` as a server component that imports `Navbar`, `Hero`, `About`, `Services`, `Products`, `WhyChooseUs`, `Stats`, `VisionMission`, `Testimonials`, `Gallery`, `Instagram`, `Map`, `Contact`, `Footer`, `Whatsapp`, `BackToTop`, `CookieConsent`, `ScrollProgress`, `Loader`, `ErrorBoundary`, `DocumentLangSync`, and renders them inside the existing main/section structure from `src/App.jsx`
- [ ] 2.7 Move `src/index.css` to `app/globals.css` (or keep at `src/` and import it from `app/layout.jsx`); ensure `@tailwind base/components/utilities` directives stay at the top

## 3. Tailwind, ESLint, Playwright, gitignore

- [ ] 3.1 Update `tailwind.config.js` `content` to `["./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"]`; remove `"./index.html"`
- [ ] 3.2 Replace `eslint.config.js` `eslint-plugin-react-refresh` block with `eslint-config-next` (flat compat) and drop the `vite.config.js` / `playwright.config.js` Node-globals blocks that are no longer needed (Playwright already keeps its own)
- [ ] 3.3 Update `playwright.config.js`: change `webServer.command` to `npm run build && npm run start -- -p 4173` (keep port 4173 to avoid touching tests) or change `baseURL` to `http://127.0.0.1:3000`
- [ ] 3.4 Update `.gitignore`: add `.next/`, `next-env.d.ts`, and remove `dist/` if present
- [ ] 3.5 Run `npm run lint` and fix any new `eslint-config-next` warnings (likely `@next/next/no-img-element` on `Gallery`, `Instagram`, `Hero` — suppress with inline disables for this migration; full `next/image` sweep is out of scope)

## 4. Component port

- [ ] 4.1 Create `src/components/providers/AppProviders.jsx` as a client component (`"use client"`) that wraps children in `<StrictMode>` + `<I18nextProvider i18n={i18n}>` and runs `AOS.init({ disable: reduceMotion })` inside `useEffect`
- [ ] 4.2 Add `"use client"` as the first line to every file in `src/components/*.jsx` (25 files: `About`, `BackToTop`, `Contact`, `CookieConsent`, `DocumentLangSync`, `ErrorBoundary`, `Footer`, `Gallery`, `GrowSectionImage`, `Hero`, `Instagram`, `LanguageSwitcher`, `Loader`, `Map`, `Navbar`, `Products`, `Reveal`, `ScrollProgress`, `Services`, `Stats`, `Testimonials`, `ThemeToggle`, `VisionMission`, `Whatsapp`, `WhyChooseUs`)
- [ ] 4.3 In `src/components/CookieConsent.jsx`, rename `import.meta.env.VITE_GA_MEASUREMENT_ID` to `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] 4.4 In `src/components/Map.jsx`, rename `VITE_CONTACT_LOCATION`, `VITE_FACTORY_LOCATION`, `VITE_FACTORY_MAP_URL` to their `NEXT_PUBLIC_*` equivalents
- [ ] 4.5 In `src/components/Contact.jsx`, rename `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL`, `VITE_CONTACT_LOCATION`, `VITE_FACTORY_LOCATION` to `NEXT_PUBLIC_*`
- [ ] 4.6 In `src/constants/site.js`, rename `VITE_SITE_URL` and `VITE_ECOMMERCE_STORE_URL` to `NEXT_PUBLIC_*`
- [ ] 4.7 In `src/constants/social.js`, rename `VITE_INSTAGRAM_PROFILE_URL` and `VITE_INSTAGRAM_FEED_API_URL` to `NEXT_PUBLIC_*`
- [ ] 4.8 In `src/constants/contact.js`, rename `VITE_WHATSAPP_LINK` and `VITE_CONTACT_PHONE` to `NEXT_PUBLIC_*`
- [ ] 4.9 Audit each `"use client"` component for synchronous `window` / `document` / `localStorage` / `navigator` access on first render; move any such access into `useEffect` or guard with `typeof window !== "undefined"`
- [ ] 4.10 Replace the `<img src="/images/logo.png" />` in `src/components/Loader.jsx` and the hero background image (if `<img>`-based) in `src/components/Hero.jsx` with `next/image` `<Image />`, supplying explicit `width`/`height` or `fill` + `sizes`
- [ ] 4.11 Delete `src/App.jsx` and `src/main.jsx` (their responsibilities now live in `app/layout.jsx`, `app/page.jsx`, and `AppProviders`)

## 5. SEO routes

- [ ] 5.1 Create `app/robots.js` exporting `default function robots()` returning `{ rules: [{ userAgent: "*", allow: "/" }], sitemap: \`${NEXT_PUBLIC_SITE_URL}/sitemap.xml\` }`
- [ ] 5.2 Create `app/sitemap.js` exporting `default function sitemap()` returning `[{ url: NEXT_PUBLIC_SITE_URL + "/", changeFrequency: "weekly", priority: 1.0 }]`
- [ ] 5.3 Verify `GET /robots.txt` and `GET /sitemap.xml` return the expected bodies in `next dev`

## 6. Instagram API Route Handler

- [ ] 6.1 Create `app/api/instagram/route.js` exporting async `GET(request)` and `OPTIONS(request)` (and reject other methods with `new Response("Method Not Allowed", { status: 405 })`)
- [ ] 6.2 Port the CORS allow-list logic from `api/instagram.js` to read `request.headers.get("origin")` and `process.env.ALLOWED_CORS_ORIGINS`
- [ ] 6.3 Port the unconfigured-server branch (returns `{ configured: false, posts: [], message }` with HTTP 200) when `INSTAGRAM_ACCESS_TOKEN` or `INSTAGRAM_BUSINESS_ACCOUNT_ID` is missing
- [ ] 6.4 Port the Graph API fetch (`https://graph.facebook.com/v21.0/<id>/media?fields=...&access_token=...&limit=9`) and the post normalisation (VIDEO → `thumbnail_url`, filter empties)
- [ ] 6.5 Port error handling: Graph error → HTTP 502 `{ configured: true, posts: [], error }`; unexpected exception → HTTP 500
- [ ] 6.6 On successful 200 responses, set `Cache-Control: public, s-maxage=1800, stale-while-revalidate=3600` and `Content-Type: application/json`
- [ ] 6.7 Delete `api/instagram.js`

## 7. Cleanup

- [ ] 7.1 Delete `index.html`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, `vite.config.js`, and `postcss.config.js` if not still needed by Next.js (Next.js bundles PostCSS; keep `postcss.config.js` only if a Tailwind plugin needs it — it does, keep it)
- [ ] 7.2 Update `.env.example`: rename every `VITE_*` key to its `NEXT_PUBLIC_*` equivalent; keep `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`, and `ALLOWED_CORS_ORIGINS` unchanged; update comments that mention Vite-specific behaviour
- [ ] 7.3 Update `README.md` to describe Next.js scripts (`dev`, `build`, `start`), the `app/` directory, and the env var rename; remove the Vite/React/HMR boilerplate
- [ ] 7.4 Leave `vercel.json` as-is (security headers remain at the Vercel edge) and confirm it does not override the framework preset

## 8. Local verification

- [ ] 8.1 `npm run dev` and open `http://localhost:3000`; confirm no console errors, no hydration warnings, and every section from `app/page.jsx` is visible in the expected order
- [ ] 8.2 Toggle language via `LanguageSwitcher` and confirm the visible UI updates and `<html lang>` changes
- [ ] 8.3 Toggle theme via `ThemeToggle` and confirm Tailwind dark mode classes apply
- [ ] 8.4 `npm run build` and confirm the build summary marks `/` as static and lists `/robots.txt`, `/sitemap.xml`, `/api/instagram` as routes
- [ ] 8.5 `npm run start` then `curl -i http://localhost:3000/robots.txt` and `/sitemap.xml` and `/api/instagram` and assert the response bodies/status codes match the `instagram-feed-api` and `seo-metadata` specs
- [ ] 8.6 `curl -s http://localhost:3000/ | rg "og:image|application/ld\\+json|canonical|theme-color"` to confirm SEO tags are present in server-rendered HTML
- [ ] 8.7 `npm run lint` is clean
- [ ] 8.8 `npm run test:e2e` passes against the local server (smoke tests for `#main-content`, skip link, `/robots.txt`)

## 9. Deployment cutover

- [ ] 9.1 In Vercel project settings, add every `NEXT_PUBLIC_*` env var (Production + Preview scope) with the same value as its existing `VITE_*` counterpart; leave the old `VITE_*` keys in place for rollback
- [ ] 9.2 Push the branch and open a PR; review the Vercel preview deployment URL
- [ ] 9.3 On the preview URL, manually verify: hero renders, language/theme toggles work, Instagram feed loads or shows the configured fallback, contact form submits, security headers are present (`curl -I`)
- [ ] 9.4 Merge to `main` and watch the production deploy
- [ ] 9.5 After 7 days of stable production with no rollback, delete the obsolete `VITE_*` env vars in the Vercel dashboard (no code change)
