## Why

The contact form on the marketing site sends mail through EmailJS from the browser, which forces us to ship the EmailJS service ID, template ID, and "public" key in the JS bundle (`NEXT_PUBLIC_EMAILJS_*`). That key is publicly readable, abusable for spam from any origin, and tied to EmailJS's free quota — which is hit during every modest traffic spike. We already migrated to Next.js 15 with App Router and own a server runtime on Vercel, so we should send transactional mail server-side through Resend, where the API key never reaches the client, deliverability is materially better (DKIM/SPF on our own domain), and per-IP rate limiting becomes possible.

## What Changes

- **BREAKING**: Remove the `@emailjs/browser` dependency, the `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` / `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` env keys, and the `emailjs.sendForm(...)` call site in `src/components/Contact.jsx`.
- **BREAKING**: Introduce three server-only env vars — `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — that the browser must never see (no `NEXT_PUBLIC_` prefix).
- Add a new Next.js Route Handler at `app/api/contact/route.js` that validates the submitted form (name, email, message, honeypot), enforces a per-IP rate limit, sends the message through the Resend Node SDK, and returns a JSON `{ ok: boolean }` envelope with appropriate status codes (`200`, `400`, `405`, `429`, `500`, `502`).
- Rework `src/components/Contact.jsx` to `fetch("/api/contact", { method: "POST", body: JSON })` instead of calling EmailJS, preserving the existing UX (honeypot, loading state, success card, localized error messages, ARIA semantics).
- Add `resend` to `dependencies` and remove `@emailjs/browser`.
- Update `.env.example`, `.env`, and `README.md` to document the new server-only Resend keys and remove every reference to EmailJS / `VITE_EMAILJS_*`.
- Add a Playwright smoke test that posts to `/api/contact` with a valid stub payload (and a separate one for the unconfigured-server fallback) so the form's contract is regression-tested without spamming Resend.

## Capabilities

### New Capabilities

- `contact-form`: Server-side contact form pipeline — `POST /api/contact` validation contract, honeypot/rate-limit defenses, Resend delivery, JSON response envelope, and the unconfigured-server fallback that mirrors `/api/instagram`'s pattern. The matching client-side form behavior (hooks, optimistic UX, error rendering) is also captured here.

### Modified Capabilities

- `web-app-framework`: The "Public environment variable contract" requirement currently lists `VITE_EMAILJS_*` → `NEXT_PUBLIC_EMAILJS_*` among the keys that survive the Next.js migration. Those keys are being **removed** (not renamed), and three new server-only keys (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`) are joining the existing server-only set (`INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`, `ALLOWED_CORS_ORIGINS`). The requirement's invariant — that no server-only secret leaks into the client bundle — must continue to hold for the Resend key.

## Impact

- **Code**: `src/components/Contact.jsx` is rewritten (drops EmailJS import, switches to `fetch`), `app/api/contact/route.js` is added, no other component changes.
- **Dependencies**: add `resend` (latest stable Node SDK); remove `@emailjs/browser`. No other dependency churn.
- **Env vars**: remove `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (and the stale `VITE_EMAILJS_*` lines in `.env`); add server-only `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`. Vercel project env must be updated in Production + Preview before the deploy that ships this change.
- **DNS / Resend setup**: a one-time manual step — create a Resend account, verify the sending domain (SPF + DKIM TXT records on `thooddakkaaran.com`), and provision a restricted-scope API key. Documented in the migration plan; not part of the code diff.
- **Bundle size**: the client bundle shrinks (~30 kB minified gzipped from `@emailjs/browser`); `resend` runs server-only and never reaches the browser.
- **Runtime**: `/api/contact` runs in the Node runtime on Vercel (Resend SDK uses Node `fetch` + crypto). Cold-start cost is comparable to `/api/instagram`.
- **Tests**: existing Playwright smoke tests stay green (`Contact` still renders, form fields still present); a new test verifies `POST /api/contact` returns 200 in a configured environment and 503-style fallback when Resend keys are absent (using the existing test env, no live email).
- **Out of scope**: switching to React Email templates, multi-recipient routing, attachment uploads, in-app inbox, audit logging, captcha (hCaptcha/Turnstile) — all worth doing later but not in this change.
