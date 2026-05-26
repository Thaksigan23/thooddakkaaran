## Context

The Thooddakkaaran site (now Next.js 15 / App Router on Vercel after the `upgrade-to-nextjs` change) currently sends contact-form messages with EmailJS via `@emailjs/browser`. The integration lives entirely in `src/components/Contact.jsx`:

```16:54:src/components/Contact.jsx
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
// ...
emailjs
  .sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    form.current,
    EMAILJS_PUBLIC_KEY
  )
```

That means three keys ship in the JS bundle and the EmailJS endpoint is the only thing standing between any visitor and our quota. We already own `app/api/instagram/route.js` as a reference Route Handler pattern (CORS allow-list, unconfigured fallback, edge-cached JSON envelope) — the natural move is to add a sibling `app/api/contact/route.js` that owns email delivery server-side, and let the form become a plain `fetch` call.

The form lives in a `"use client"` component that already has a working honeypot (`company_website`), localized strings via `react-i18next`, ARIA semantics, and a success / loading / error state machine. We want to preserve all of that — only the network call changes.

## Goals / Non-Goals

**Goals:**

- Ship the Resend API key as a **server-only** secret. The client bundle must contain no EmailJS / Resend credentials of any kind.
- Preserve the contact form's existing UX: same fields, same honeypot, same loading/success/error states, same i18n strings, same accessibility annotations.
- Match the patterns we already established in `/api/instagram`: a Next.js Route Handler with `OPTIONS` + `POST` + 405 for everything else, a JSON-only response envelope, an unconfigured-server fallback, and `console.error` on failures.
- Add basic abuse defenses (server-side honeypot re-check + per-IP rate limit) so flipping the switch doesn't open us up to spam against the Resend quota.
- Keep the diff small and reviewable: one new route, one rewritten component, one dependency swap, env/docs touch-ups.

**Non-Goals:**

- React Email templates / designed HTML mail (plain-text + minimal HTML for v1).
- Captcha (hCaptcha, Turnstile, reCAPTCHA). Honeypot + rate limit + Resend's built-in anti-abuse is the v1 stance.
- Persisting submissions in a database / Supabase table for an in-app inbox.
- Multi-recipient routing, attachment uploads, or inbound email parsing.
- Switching `/api/instagram` or any other route at the same time.
- TypeScript migration of the route handler (codebase is JS today; `upgrade-to-nextjs` already deferred TS to its own change).

## Decisions

### Resend over alternatives (Postmark, SendGrid, AWS SES)

- **Choice**: Use Resend.
- **Why**: User explicitly asked for it. Resend has the cleanest Node SDK (single `new Resend(key).emails.send({...})` call, no boilerplate), excellent transactional deliverability, generous free tier (100 emails/day, 3000/month) which is far above contact-form volume, and first-class DKIM/SPF setup wizard. Postmark and SES would also work but require more setup ceremony; the user named Resend.
- **Alternatives rejected**:
  - **Stay on EmailJS**: leaves credentials in the bundle, client-side rate limiting only.
  - **Self-hosted SMTP via Nodemailer**: requires us to operate an MTA / handle bounces / monitor reputation. No.
  - **Vercel Email integration**: not GA at the time of writing and locks us into a single host.

### Use the official `resend` Node SDK, not raw `fetch`

- **Choice**: `import { Resend } from "resend"` and call `resend.emails.send({...})`.
- **Why**: The SDK handles auth header, error normalization, and response typing. It's ~5 kB on the server and never reaches the browser. Maintenance cost is nil — Resend ships SDK updates only when the API surface changes.
- **Alternative considered**: Direct `fetch("https://api.resend.com/emails", { headers: { Authorization: \`Bearer ${key}\` } })`. Saves one dependency but loses error-message normalization and we'd reimplement the SDK shape. Not worth it for one call site.

### Route shape: `app/api/contact/route.js`, JSON in / JSON out

- **Choice**: New Route Handler at `app/api/contact/route.js`. Exports `POST(request)` and `OPTIONS(request)`; everything else returns 405.
- **Request body**: `application/json` with `{ name: string, email: string, message: string, company_website?: string }` (last field is the honeypot — must be empty/undefined).
- **Response body**: `{ ok: true }` on success, `{ ok: false, error: "<machine_code>" }` on every failure. The client maps `error` codes (`"unconfigured" | "invalid" | "rate_limited" | "send_failed"`) to existing i18n strings (`contact.form.configError`, `contact.form.sendError`, etc.). The server **never** returns a localized string; that's the client's job.
- **Why JSON not FormData**: easier to validate, smaller wire size, lets us reject spurious fields up front, and matches `/api/instagram`'s response style.

### Status code matrix

| Outcome | Status | Body |
| --- | --- | --- |
| Success | 200 | `{ ok: true }` |
| Validation failure (missing/invalid field, honeypot tripped server-side) | 400 | `{ ok: false, error: "invalid" }` |
| `RESEND_API_KEY` missing on the server | 503 | `{ ok: false, error: "unconfigured" }` |
| Per-IP rate limit exceeded | 429 | `{ ok: false, error: "rate_limited" }` |
| Resend API returned an error (4xx/5xx upstream) | 502 | `{ ok: false, error: "send_failed" }` |
| Unexpected exception | 500 | `{ ok: false, error: "send_failed" }` |
| Wrong HTTP method | 405 | `Method Not Allowed` (text body) |

Mirrors `/api/instagram`'s 502/500 split between "upstream said no" and "we crashed."

### Honeypot is server-validated, not just client-validated

- **Choice**: Even though the client short-circuits to a fake-success state when `company_website` is non-empty, the server **also** rejects requests where `company_website` is non-empty (returns 200 `{ ok: true }` without sending mail — looks identical to a real success so bots don't learn).
- **Why**: Defense in depth. A bot that bypasses the React form and posts directly to `/api/contact` still gets silently sinkholed.

### Per-IP rate limit: in-memory token bucket, 5 req / 10 min

- **Choice**: A `Map<ip, { count, resetAt }>` lives in module scope. Each `POST` increments the IP's bucket; over the limit returns 429. The IP is read from `request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()` (Vercel always sets this), falling back to `"unknown"` to bucket all unknown sources together.
- **Why**: Zero new infrastructure, "good enough" abuse mitigation for a marketing site that gets <100 legitimate submissions/month. Cold starts reset the map but that's acceptable because (a) the honeypot still catches scripted spam, (b) Resend has its own anti-abuse on top, and (c) the rate limit's job is to slow a single attacker down, not to be cryptographically perfect.
- **Alternative considered**: Upstash Redis or Vercel KV for a durable counter. Rejected as out-of-scope infra; can be added later by swapping the implementation behind the same interface (`checkRateLimit(ip): { allowed, retryAfter }`).

### Runtime: Node, not Edge

- **Choice**: Default Node runtime on Vercel (no `export const runtime = "edge"`).
- **Why**: Matches `/api/instagram`. Resend's SDK works on edge, but Node keeps the route consistent and avoids surprises around module compatibility. We don't need Edge's globally distributed cold-starts for a contact form (form submission latency is dominated by Resend's API call, not first-byte from Vercel).
- **Cost**: Node serverless cold starts are ~150 ms vs ~30 ms on edge. Negligible for a form submission.

### Sender / recipient / reply-to

- `from`: `process.env.RESEND_FROM_EMAIL` (e.g. `Thooddakkaaran <noreply@thooddakkaaran.com>`). MUST be on a Resend-verified domain.
- `to`: `[process.env.RESEND_TO_EMAIL]` (defaults to `info@thooddakkaaran.com` if env is unset and key is present — this is the documented contact email already in `.env.example`).
- `replyTo`: the visitor's submitted `email`. So pressing Reply in the inbox replies to them, not to `noreply@`.
- `subject`: `Thooddakkaaran website contact — <name>` (English; the website's three locales all read it from the inbox, not from the user, so a single English subject is fine).
- `text`: plain-text body with `Name`, `Email`, `Message`, and a `Submitted via thooddakkaaran.com` footer. No HTML in v1.

### Same-origin only — no CORS allow-list

- **Choice**: `/api/contact` does not set `Access-Control-Allow-Origin`. The form is same-origin with the API; nothing else should be calling it.
- **Why**: `/api/instagram` exposes CORS because external sites might want the IG feed. The contact form is private to the marketing site. Removing CORS is a tiny security win (browsers reject cross-origin POSTs without preflight).
- **OPTIONS**: still implemented, returns 204 with `Allow: POST, OPTIONS`. This handles browser preflight on local dev edge cases (e.g., Storybook on a different port) without opening cross-origin POSTs in production.

### Client: `fetch` with JSON, AbortController on unmount

- **Choice**: `Contact.jsx` builds a JSON object from form refs (or controlled state — cheaper to keep it ref-based since the existing component is ref-based), POSTs it to `/api/contact`, and maps the response.
- **AbortController**: a `useEffect` cleanup aborts an in-flight request if the component unmounts. Avoids React warnings about state updates on unmounted components and prevents double-sends.
- **i18n mapping**:
  - `error === "unconfigured"` → `t("contact.form.configError")`
  - `error === "invalid"` → `t("contact.form.invalidError")` (new key — see Open Questions)
  - `error === "rate_limited"` → `t("contact.form.rateLimitError")` (new key)
  - `error === "send_failed"` or unknown → `t("contact.form.sendError")`
- The success branch and the honeypot short-circuit branch are unchanged.

### Env contract

| Key | Scope | Required? | Notes |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | server-only | yes (else 503 unconfigured) | Restricted scope ("Send emails only") in Resend dashboard. |
| `RESEND_FROM_EMAIL` | server-only | yes | Must use a verified Resend domain. Example: `Thooddakkaaran <noreply@thooddakkaaran.com>`. |
| `RESEND_TO_EMAIL` | server-only | no (defaults to `info@thooddakkaaran.com`) | Recipient inbox. |

The keys do **not** start with `NEXT_PUBLIC_`, so Next.js never inlines them into the client bundle. The `web-app-framework` spec's existing invariant ("server-only secret never reaches the client") covers this automatically — we only need to update the requirement text to remove `VITE_EMAILJS_*` from the rename list and add the three new server-only keys to the protected set.

### Testing strategy

- **Playwright contract tests** (no live email):
  - `POST /api/contact` with no body → 400.
  - `POST /api/contact` with honeypot filled → 200 `{ ok: true }` without sending mail (cannot directly assert "no mail sent" but the server treats it identically).
  - `GET /api/contact` → 405.
  - `OPTIONS /api/contact` → 204.
- **Local manual smoke**: with `RESEND_API_KEY` in `.env.local`, fill the form, confirm a real email lands in `RESEND_TO_EMAIL`'s inbox.
- **Preview deploy**: same as local manual smoke, on the Vercel preview URL.
- **Unit tests**: deferred — the codebase has zero unit tests today (only Playwright). Adding a vitest harness for one validator is out of scope.

## Risks / Trade-offs

- **[Risk] DNS / domain verification blocks the cutover.** Resend requires SPF + DKIM TXT records on `thooddakkaaran.com`. DNS can take up to 48 hours to propagate.
  → **Mitigation**: Add Resend domain + DNS records as the first migration step, before merging the code. The PR can be reviewed and approved while DNS settles.

- **[Risk] In-memory rate limit resets every cold start, leaving small windows where an attacker can burst.** Vercel cold starts a Node lambda after ~5 min idle.
  → **Mitigation**: Acceptable for v1 (honeypot + Resend abuse detection still apply). The interface is small; swapping to Vercel KV / Upstash later is a contained refactor.

- **[Risk] Honeypot can be defeated by bots that read the DOM.** Sophisticated scrapers will see `tabIndex={-1}` and skip the field.
  → **Mitigation**: Acknowledged; out of scope. Captcha is the next escalation if abuse appears in Resend logs.

- **[Risk] Resend API outage drops user messages.** No queue/retry layer.
  → **Mitigation**: Server returns `{ ok: false, error: "send_failed" }`, client shows a localized error so the user retries. Vercel logs the failure for ops.

- **[Risk] Env-var cutover gap on Vercel.** The deploy that ships this change will fail if `RESEND_API_KEY` isn't set on production yet.
  → **Mitigation**: Set the three Resend env vars on Production and Preview scopes **before** merging. The unconfigured-server branch (503) keeps the rest of the page working even if a key is briefly missing.

- **[Risk] Client tries to read removed `NEXT_PUBLIC_EMAILJS_*` and breaks the build.** If any other component still references those keys, removal will fail silently (`process.env.X` returns `undefined`) or surface in lint.
  → **Mitigation**: `grep -r "NEXT_PUBLIC_EMAILJS\|EMAILJS_SERVICE_ID\|EMAILJS_TEMPLATE_ID\|EMAILJS_PUBLIC_KEY"` shows the only references are in `src/components/Contact.jsx`. Keeping the search step in `tasks.md` ensures we don't miss a stale reference (e.g., in `src/constants/`).

- **[Trade-off] Plain-text email body, no React Email design.** Recipient inbox sees a no-frills message.
  → **Mitigation**: Acceptable. This is an internal lead notification, not a marketing email. React Email is a follow-up.

- **[Trade-off] Adding `resend` (~150 kB unpacked) to `dependencies`.** Next.js bundles it server-only because the import is in a Route Handler.
  → **Mitigation**: Verified by checking `.next/static/` is unchanged in size. Net delta: client bundle gets **smaller** (EmailJS gone), server bundle gets ~150 kB heavier — invisible to users, free-tier-friendly on Vercel.

- **[Trade-off] Two new i18n keys (`contact.form.invalidError`, `contact.form.rateLimitError`).** All three locales (en/ta/si) need translations.
  → **Mitigation**: We supply English defaults + Tamil + Sinhala in the same PR. Translation keys are listed explicitly in `tasks.md` so the PR reviewer can sanity-check them.

## Migration Plan

1. **Resend account setup (manual, ops):** sign up, add `thooddakkaaran.com`, copy SPF + DKIM records into the DNS provider, wait for verification (status reaches "verified" in Resend dashboard).
2. **API key (manual, ops):** in Resend, create a restricted-scope key (`Send emails only`), copy the value, set it as `RESEND_API_KEY` on the Vercel project (Production + Preview scopes). Set `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` at the same time.
3. **Branch and deps (code):** `git checkout -b chore/replace-emailjs-with-resend`. `npm uninstall @emailjs/browser`, `npm install resend`. Commit `package.json` + `package-lock.json`.
4. **Add the route handler (code):** create `app/api/contact/route.js` with `POST`, `OPTIONS`, 405-everything-else. Implement validation, honeypot re-check, rate limit, Resend send. Commit alone for an isolated review.
5. **Rewrite the client component (code):** swap `Contact.jsx` from `emailjs.sendForm` to `fetch("/api/contact", ...)`. Add the two new i18n keys to all three locale files. Commit.
6. **Docs and env (code):** update `.env.example` (remove `NEXT_PUBLIC_EMAILJS_*`, add `RESEND_*`), update `.env` for the local dev (clean stale `VITE_EMAILJS_*` lines too), update `README.md` Stack and Env sections.
7. **Local verification:** `npm run dev`. Submit the form with a valid payload → email arrives in `RESEND_TO_EMAIL`. Submit with invalid email → localized error renders. Submit honeypot → fake success. Spam 6 submissions in 10 min → 6th renders rate-limit error.
8. **Playwright:** add the contract tests for `POST /api/contact` (400 with no body, 405 on GET, 204 on OPTIONS). `npm run test:e2e` passes.
9. **PR:** push, create PR, request review. Vercel builds a preview deployment; verify on the preview URL that a real submission lands in the inbox.
10. **Merge:** ship to main; production deploy. Submit one production form to confirm.
11. **Cleanup (after 7 days stable):** delete `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` from Vercel project settings. Cancel the EmailJS account if no longer in use.

**Rollback:**

- Revert the merge commit. Vercel redeploys the previous EmailJS-based build. As long as the old `NEXT_PUBLIC_EMAILJS_*` keys are still set in Vercel (we don't delete them until step 11), the previous deploy boots cleanly.

## Open Questions

- **Should the route handler also persist submissions to Supabase?** The marketing site already imports a Supabase MCP tool (per workspace MCP config). Logging submissions would give us an inbox + retry visibility. **Recommendation: defer** — out of scope; do it after this change is stable.
- **Should `RESEND_FROM_EMAIL` differ between Preview and Production?** E.g. `preview@` vs `noreply@`, so test emails are visually distinguishable. **Recommendation: defer** — easy to add later by setting different values per Vercel scope; no code change needed.
- **Should we add an `X-Form-Token` header (CSRF defense)?** Same-origin POST without credentials is already protected by the browser's same-origin policy + `SameSite=Lax` cookies (we don't read any). **Recommendation: not needed** — captcha is the appropriate next defense, not CSRF tokens.
- **Should we log the visitor's IP / user agent to Resend's email body for triage?** Useful for spotting scrapers, but adds PII to inbox. **Recommendation: log to Vercel only**, not the email body. Already covered by `console.error`.
