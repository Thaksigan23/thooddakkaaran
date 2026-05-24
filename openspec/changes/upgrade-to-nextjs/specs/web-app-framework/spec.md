## ADDED Requirements

### Requirement: Next.js App Router toolchain

The project SHALL use Next.js 15 with the App Router as the sole build, dev, and production runtime. `vite`, `@vitejs/plugin-react`, `index.html`, and `src/main.jsx` SHALL NOT exist in the repository after this change.

#### Scenario: Dev server starts on default port
- **WHEN** a developer runs `npm run dev`
- **THEN** Next.js starts and serves the site at `http://localhost:3000` with hot reload enabled

#### Scenario: Production build succeeds
- **WHEN** `npm run build` is executed in a clean checkout with valid env vars
- **THEN** Next.js produces a `.next/` output directory and the command exits with status 0

#### Scenario: Production server serves the build
- **WHEN** `npm start` is run after a successful build
- **THEN** the site is served at `http://localhost:3000` using the prerendered output

### Requirement: Single-page marketing layout under `app/`

The marketing site SHALL be served from `app/page.jsx` rendered inside `app/layout.jsx`, preserving the existing section order: Hero, About, Services, Products, WhyChooseUs, Stats, VisionMission, Testimonials, Gallery, Instagram, Map, Contact, plus Navbar/Footer chrome and Loader/ScrollProgress/Whatsapp/BackToTop/CookieConsent overlays.

#### Scenario: Root route renders the full marketing page
- **WHEN** a user requests `GET /`
- **THEN** the response contains the `#main-content` landmark and all twelve sections in the order listed above

#### Scenario: 404 route exists
- **WHEN** a user requests a non-existent path such as `/this-page-does-not-exist`
- **THEN** Next.js returns HTTP 404 and renders the framework's default or a custom not-found page

### Requirement: Client/server component boundary

Every component that uses React hooks (`useState`, `useEffect`, `useRef`), Framer Motion, AOS, or browser globals (`window`, `document`, `localStorage`, `navigator`) SHALL start with the `"use client"` directive. Components that do not use any of these SHALL remain server components.

#### Scenario: Interactive component is a client component
- **WHEN** the `Navbar` component is opened (it uses `useState` and `window`)
- **THEN** its first line of source code is `"use client"`

#### Scenario: Hydration is silent
- **WHEN** the page loads in a browser
- **THEN** the React console emits no hydration mismatch warnings

### Requirement: Public environment variable contract

All public env vars exposed to the browser SHALL use the `NEXT_PUBLIC_` prefix and SHALL be read via `process.env.NEXT_PUBLIC_*`. The existing keys `VITE_SITE_URL`, `VITE_INSTAGRAM_PROFILE_URL`, `VITE_INSTAGRAM_FEED_API_URL`, `VITE_GA_MEASUREMENT_ID`, `VITE_EMAILJS_*`, `VITE_CONTACT_*`, `VITE_FACTORY_*`, `VITE_WHATSAPP_LINK`, and `VITE_ECOMMERCE_STORE_URL` SHALL be renamed to their `NEXT_PUBLIC_*` equivalents. Server-only keys (`INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`, `ALLOWED_CORS_ORIGINS`) SHALL keep their unprefixed names and SHALL NOT be exposed to the client bundle.

#### Scenario: Server-only secret never reaches the client
- **WHEN** the production bundle (`.next/static/`) is inspected
- **THEN** the literal value of `INSTAGRAM_ACCESS_TOKEN` does not appear anywhere

#### Scenario: Public env var resolves at build time
- **WHEN** `NEXT_PUBLIC_SITE_URL=https://thooddakkaaran.vercel.app` is set and the site is built
- **THEN** rendered HTML contains `https://thooddakkaaran.vercel.app` in the canonical link and JSON-LD

### Requirement: Vercel deployment compatibility

The project SHALL deploy to Vercel using Vercel's auto-detected Next.js preset, with no `buildCommand` override required. Security headers from the current `vercel.json` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) SHALL be preserved either through `vercel.json` or `next.config.js` `headers()`.

#### Scenario: Vercel build uses Next.js preset
- **WHEN** the repository is connected to a Vercel project with no custom build settings
- **THEN** Vercel detects Next.js and runs `next build` automatically

#### Scenario: Security headers are present on every response
- **WHEN** any path is requested from the production deployment
- **THEN** response headers include `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Requirement: Static prerender by default

The home route SHALL be statically prerendered at build time (SSG). Routes that depend on dynamic data (such as `/api/instagram`) SHALL opt in to dynamic or revalidated behavior explicitly via Next.js segment config or Route Handler options.

#### Scenario: Home page is prerendered
- **WHEN** `npm run build` completes
- **THEN** the build output marks `/` as `○ (Static)` or `● (SSG)` in the Next.js build summary

### Requirement: Tailwind and design tokens preserved

Tailwind CSS 3.4 SHALL continue to drive styling with the existing tokens defined in `tailwind.config.js` (`primary`, `secondary`, `accent`, `soft`, `darkbg`, `darksection`, `darkcard`, `darkfooter`) and `darkMode: "class"`. The `content` glob SHALL be updated to include `./app/**/*.{js,jsx}` in addition to `./src/**/*.{js,jsx}`.

#### Scenario: Custom utility resolves
- **WHEN** a component uses `className="bg-primary text-soft"`
- **THEN** the rendered element has the green farm primary background and the soft cream foreground from the design tokens

#### Scenario: Dark mode toggles via class
- **WHEN** the `<html>` element has the `dark` class
- **THEN** `dark:` Tailwind variants apply

### Requirement: Static assets served from `public/`

Existing static assets (`/favicon.png`, `/images/*`) SHALL remain accessible at the same URLs without modification, served from the Next.js `public/` directory.

#### Scenario: Existing image URL still resolves
- **WHEN** the browser requests `/images/farm1.jpg`
- **THEN** the existing image is returned with HTTP 200
