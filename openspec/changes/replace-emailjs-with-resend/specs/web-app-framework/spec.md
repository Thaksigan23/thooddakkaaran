## MODIFIED Requirements

### Requirement: Public environment variable contract

All public env vars exposed to the browser SHALL use the `NEXT_PUBLIC_` prefix and SHALL be read via `process.env.NEXT_PUBLIC_*`. The existing keys `VITE_SITE_URL`, `VITE_INSTAGRAM_PROFILE_URL`, `VITE_INSTAGRAM_FEED_API_URL`, `VITE_GA_MEASUREMENT_ID`, `VITE_CONTACT_*`, `VITE_FACTORY_*`, `VITE_WHATSAPP_LINK`, and `VITE_ECOMMERCE_STORE_URL` SHALL be renamed to their `NEXT_PUBLIC_*` equivalents. The previously listed `VITE_EMAILJS_*` family (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`) SHALL be **removed entirely** rather than renamed — contact-form delivery moves to the server-only Resend route handler defined by the `contact-form` capability. Server-only keys (`INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`, `ALLOWED_CORS_ORIGINS`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`) SHALL keep their unprefixed names and SHALL NOT be exposed to the client bundle.

#### Scenario: Server-only Instagram secret never reaches the client
- **WHEN** the production bundle (`.next/static/`) is inspected
- **THEN** the literal value of `INSTAGRAM_ACCESS_TOKEN` does not appear anywhere

#### Scenario: Server-only Resend secret never reaches the client
- **WHEN** the production bundle (`.next/static/`) is inspected
- **THEN** the literal value of `RESEND_API_KEY` does not appear anywhere

#### Scenario: EmailJS public env vars are removed
- **WHEN** the repository is searched for `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, or `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (or their legacy `VITE_EMAILJS_*` counterparts)
- **THEN** no source file, no `.env.example` entry, and no `README.md` line references any of those keys

#### Scenario: Public env var resolves at build time
- **WHEN** `NEXT_PUBLIC_SITE_URL=https://thooddakkaaran.vercel.app` is set and the site is built
- **THEN** rendered HTML contains `https://thooddakkaaran.vercel.app` in the canonical link and JSON-LD
