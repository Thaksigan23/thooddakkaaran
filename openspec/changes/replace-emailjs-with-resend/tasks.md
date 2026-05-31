## 1. Resend account and DNS (manual ops, before any code merge)

- [ ] 1.1 Create a Resend account at https://resend.com and add `thooddakkaaran.com` as a sending domain
- [ ] 1.2 Add the SPF and DKIM TXT records Resend prints into the domain's DNS provider (Vercel DNS, Cloudflare, or whichever is in use); wait for the domain status to reach "verified"
- [ ] 1.3 In the Resend dashboard, create a restricted-scope API key (`Send emails only`); store the value in a password manager — it is shown only once
- [ ] 1.4 Confirm that a manual `curl https://api.resend.com/emails` smoke test using the key delivers a test message to `info@thooddakkaaran.com`

## 2. Vercel project environment

- [ ] 2.1 In Vercel → Project → Settings → Environment Variables, add `RESEND_API_KEY` (server-only, no `NEXT_PUBLIC_` prefix) on Production and Preview scopes with the value from 1.3
- [ ] 2.2 Add `RESEND_FROM_EMAIL` (e.g. `Thooddakkaaran <noreply@thooddakkaaran.com>`) on Production and Preview
- [ ] 2.3 Add `RESEND_TO_EMAIL` (e.g. `info@thooddakkaaran.com`) on Production and Preview
- [ ] 2.4 Leave the existing `NEXT_PUBLIC_EMAILJS_*` keys in place for rollback safety; they will be deleted in Phase 13 only after the new system is stable

## 3. Branch, dependency swap, and local env

- [x] 3.1 `git checkout -b chore/replace-emailjs-with-resend` — implementation landed on `chore/upgrade-to-nextjs`; no separate branch required unless splitting the PR
- [x] 3.2 `npm uninstall @emailjs/browser`
- [x] 3.3 `npm install resend` (resolved to `^6.12.4`, current major)
- [x] 3.4 In `package.json`, confirm `dependencies` no longer lists `@emailjs/browser` and now lists `resend`; `package-lock.json` is regenerated
- [ ] 3.5 Create or update `.env.local` (gitignored) with `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` for local dev; remove any local `NEXT_PUBLIC_EMAILJS_*` lines — deferred: requires the real Resend key from Phase 1

## 4. Server route handler — `app/api/contact/route.js`

- [x] 4.1 Create `app/api/contact/route.js` and export `POST(request)`, `OPTIONS(request)`, plus `GET`/`PUT`/`DELETE`/`PATCH`/`HEAD` stubs returning HTTP 405
- [x] 4.2 Add a tiny in-module helper `getClientIp(request)` that reads the first comma-separated value of the `x-forwarded-for` header, trims whitespace, and falls back to `"unknown"`
- [x] 4.3 Add a `checkRateLimit(ip)` helper backed by a module-scope `Map<string, { count: number, resetAt: number }>` enforcing 5 requests per 600,000 ms; returns `{ allowed: boolean, retryAfter?: number }`
- [x] 4.4 Add a `validateBody(body)` helper that returns `{ ok: true, data }` or `{ ok: false }` after enforcing: `name` is a string trimmed to length 1–100, `email` matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, `message` is a string trimmed to length 10–5000, `company_website` is either undefined or empty string
- [x] 4.5 In `POST(request)`: parse JSON; on parse failure return `400 { ok: false, error: "invalid" }`
- [x] 4.6 In `POST`, if `body.company_website` is a non-empty string, return `200 { ok: true }` immediately (honeypot sinkhole) without touching Resend
- [x] 4.7 In `POST`, run `validateBody`; on failure return `400 { ok: false, error: "invalid" }`
- [x] 4.8 In `POST`, run `checkRateLimit(getClientIp(request))`; on `allowed === false` return `429 { ok: false, error: "rate_limited" }` (with `Retry-After` header when known)
- [x] 4.9 In `POST`, if `process.env.RESEND_API_KEY` is missing or empty, return `503 { ok: false, error: "unconfigured" }` (also returns 503 unconfigured when `RESEND_FROM_EMAIL` is missing — required by Resend SDK)
- [x] 4.10 In `POST`, instantiate `new Resend(process.env.RESEND_API_KEY)` and call `await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL, to: [process.env.RESEND_TO_EMAIL || "info@thooddakkaaran.com"], replyTo: data.email, subject: \`Thooddakkaaran website contact — ${data.name}\`, text: \`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}\n\n— Submitted via thooddakkaaran.com\` })`
- [x] 4.11 If `resend.emails.send` resolves with `{ error }`, log via `console.error("[api/contact] Resend error:", error)` and return `502 { ok: false, error: "send_failed" }`
- [x] 4.12 Wrap 4.10–4.11 in `try/catch`; on caught exception, log and return `500 { ok: false, error: "send_failed" }`
- [x] 4.13 In `OPTIONS`, respond `204` with header `Allow: POST, OPTIONS` and **no** `Access-Control-Allow-Origin` header
- [x] 4.14 In `GET`/`PUT`/`DELETE`/`PATCH`/`HEAD`, return `new Response("Method Not Allowed", { status: 405 })`
- [x] 4.15 Confirm the file has no `import`s of `@emailjs/browser`, no `NEXT_PUBLIC_*` reads, and no React or framer-motion symbols

## 5. Client component rewrite — `src/components/Contact.jsx`

- [x] 5.1 Remove `import emailjs from "@emailjs/browser"` and the three `EMAILJS_*` constants at the top of the file
- [x] 5.2 Remove the `EMAILJS_SERVICE_ID || EMAILJS_TEMPLATE_ID || EMAILJS_PUBLIC_KEY` configuration check; the server now owns the unconfigured fallback
- [x] 5.3 Replace the `emailjs.sendForm(...)` block with an async submit handler that builds `{ name, email, message, company_website }` from the form refs and calls `fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal })`
- [x] 5.4 Add a `useEffect` that creates an `AbortController`, passes its `signal` to in-flight fetches, and aborts on unmount (controller stored in `abortRef`, aborted from the cleanup function)
- [x] 5.5 On the response, parse JSON and branch:
  - `res.ok && body.ok === true` → `setSuccess(true)`, reset the form
  - `body.error === "unconfigured"` → `setError(t("contact.form.configError"))`
  - `body.error === "invalid"` → `setError(t("contact.form.invalidError"))`
  - `body.error === "rate_limited"` → `setError(t("contact.form.rateLimitError"))`
  - any other case (including network/abort errors that aren't `AbortError`) → `setError(t("contact.form.sendError"))`
- [x] 5.6 Always clear `setLoading(false)` in a `finally` block; ignore `AbortError` so the unmount path doesn't flash an error
- [x] 5.7 Keep the existing honeypot client-side short-circuit (`company_website` non-empty → `setSuccess(true)` without fetching)
- [x] 5.8 Confirm the component still uses the same JSX (label structure, `aria-busy`, `role="alert"`, `id="contact-form-error"`, success card text, etc.) — no UI regressions
- [x] 5.9 `grep -r "@emailjs\|NEXT_PUBLIC_EMAILJS\|emailjs.sendForm" src app` returns zero matches

## 6. i18n updates

- [x] 6.1 In `src/i18n/locales/en.json`, under `contact.form`, add `"invalidError": "Please check the name, email, and message fields and try again."` and `"rateLimitError": "You've sent several messages already — please wait a few minutes and try again."`
- [x] 6.2 In `src/i18n/locales/ta.json`, under `contact.form`, add Tamil translations for `invalidError` and `rateLimitError` (best-effort native translations supplied; native speaker should review before final merge)
- [x] 6.3 In `src/i18n/locales/si.json`, under `contact.form`, add Sinhala translations for `invalidError` and `rateLimitError` (best-effort native translations supplied; native speaker should review before final merge)
- [x] 6.4 Run `npm run build` and confirm no missing-key warnings appear from i18next when the form mounts (`npm run build` exited 0; build summary printed `/api/contact` as `ƒ (Dynamic)` and home as `○ (Static)`, no i18next warnings emitted)

## 7. Docs and example env

- [x] 7.1 Update `.env.example`: delete the three `NEXT_PUBLIC_EMAILJS_*` lines; add a new "Contact form (Resend)" section with commented entries for `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, each with a one-line comment explaining the value
- [x] 7.2 Update local `.env`: remove the stale `VITE_EMAILJS_*` lines so the file matches `.env.example`'s post-migration shape (the file still drives local dev for some contributors)
- [x] 7.3 Update `README.md` "Stack" list: replace `EmailJS (contact form)` with `Resend (contact form, server-side via /api/contact)`
- [x] 7.4 Update `README.md` "Layout" snippet so `app/api/` shows both `instagram/route.js` and `contact/route.js`
- [x] 7.5 Update `README.md` "Environment variables" section so the "Required server-only keys" list includes `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` alongside the Instagram keys

## 8. Playwright contract tests

- [x] 8.1 Create `e2e/contact-api.spec.js` with three tests using `request` fixture (no browser):
  - `POST /api/contact` with empty body → expect `status === 400` and `body.error === "invalid"`
  - `GET /api/contact` → expect `status === 405`
  - `OPTIONS /api/contact` → expect `status === 204` and the response header `allow` includes `POST` and `OPTIONS`
- [x] 8.2 Run `npm run test:e2e`; confirm all existing smoke tests still pass and the contact contract + form tests pass (18/18 passed — 7 contact-api + 4 contact-form + 2 catalogue + 3 smoke + 2 i18n)

## 9. Local verification

- [x] 9.1 `npm run dev`; load `http://localhost:3000/#contact`; the contact section renders unchanged — covered by `e2e/contact-form.spec.js` against production build on :4173
- [ ] 9.2 Submit the form with valid inputs; observe `200 { ok: true }` in the network tab and the success card appears — requires `RESEND_*` in `.env.local` (Phase 1–2)
- [ ] 9.3 Confirm a real email arrives in the `RESEND_TO_EMAIL` inbox with `Reply-To` set to the submitted email — requires verified Resend domain and API key
- [x] 9.4 Submit with a malformed email (`foo`); observe `400 { ok: false, error: "invalid" }` and the localized invalid-error message in the form — `e2e/contact-api.spec.js` + `e2e/contact-form.spec.js`
- [x] 9.5 Submit with the honeypot `company_website` field filled (use browser devtools to set the value before submit); observe `200 { ok: true }` in the network tab, the success card appears, and **no email** arrives in the inbox — client short-circuit in `e2e/contact-form.spec.js`; server honeypot in `e2e/contact-api.spec.js`
- [x] 9.6 Submit six times in under ten minutes; the sixth observes `429 { ok: false, error: "rate_limited" }` and the localized rate-limit message — `e2e/contact-api.spec.js` + `e2e/contact-form.spec.js`
- [x] 9.7 Temporarily unset `RESEND_API_KEY` in `.env.local`, restart `npm run dev`, submit valid inputs; observe `503 { ok: false, error: "unconfigured" }` and the localized config-error message — verified via `e2e/contact-api.spec.js` (no `.env.local` in CI/local e2e run)
- [ ] 9.8 Restore `RESEND_API_KEY` and confirm normal operation resumes — blocked until Phase 1–2 supplies a real key

## 10. Build, lint, security audit

- [x] 10.1 `npm run lint` exits 0; no new warnings introduced by the new file or the rewritten component (only the two pre-existing `import/no-anonymous-default-export` warnings on `postcss.config.js` and `tailwind.config.js`)
- [x] 10.2 `npm run build` succeeds; the build summary shows `/api/contact` as `ƒ (Dynamic)` and `/api/instagram` continues to render
- [x] 10.3 `grep -r "RESEND_API_KEY\|RESEND_FROM_EMAIL\|RESEND_TO_EMAIL" .next/static` returns zero matches
- [x] 10.4 `grep -r "@emailjs\|EMAILJS_SERVICE_ID\|EMAILJS_TEMPLATE_ID\|EMAILJS_PUBLIC_KEY\|NEXT_PUBLIC_EMAILJS\|VITE_EMAILJS" .` (excluding `node_modules` and the OpenSpec change folder) returns zero matches

## 11. Pull request

- [x] 11.1 Commit per-phase: dependency swap, route handler, client rewrite, i18n + docs, tests — five commits on `chore/upgrade-to-nextjs` (`7edcd5d` … `95d6f21`); extend with contact-form e2e commit when pushed
- [ ] 11.2 `git push -u origin chore/replace-emailjs-with-resend`
- [ ] 11.3 Open the PR with a Summary linking to `openspec/changes/replace-emailjs-with-resend/proposal.md` and a Test Plan referencing Section 9 of this file
- [ ] 11.4 On the Vercel preview URL, repeat 9.2–9.7 (real email this time goes to a test alias, not the production inbox, if `RESEND_TO_EMAIL` is overridden in Preview scope) — confirm parity with local

## 12. Production cutover

- [ ] 12.1 Merge the PR to `main`; watch the production deploy succeed
- [ ] 12.2 Submit one real form on `https://thooddakkaaran.vercel.app` and confirm the email arrives in `info@thooddakkaaran.com`
- [ ] 12.3 In Vercel function logs, confirm no `[api/contact] Resend error:` entries appear in the first 24 hours

## 13. Cleanup (after seven days of stable production)

- [ ] 13.1 In Vercel project settings, delete `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` from Production and Preview scopes
- [ ] 13.2 In the EmailJS dashboard, deactivate the template and delete the service (or downgrade/cancel the EmailJS account if no other project depends on it)
- [ ] 13.3 Open a follow-up OpenSpec change (or a small docs PR) noting that `npm prune` shows no dangling EmailJS-related entries; archive `replace-emailjs-with-resend` via `openspec archive`

## 14. Archive

- [ ] 14.1 After 13.3 lands and the change has been fully implemented and verified in production, run `openspec archive replace-emailjs-with-resend` so the requirements roll into `openspec/specs/web-app-framework/spec.md` and a new `openspec/specs/contact-form/spec.md` is created
