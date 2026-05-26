## ADDED Requirements

### Requirement: Server-side contact email delivery via Resend

The site SHALL deliver contact-form submissions through the Resend transactional email API from a server-side Next.js Route Handler at `app/api/contact/route.js`. The Resend API key SHALL be read from the server-only env var `RESEND_API_KEY` and SHALL NOT be referenced in any client component, in any `NEXT_PUBLIC_*` variable, or in any file under `public/`.

#### Scenario: Successful submission delivers an email
- **WHEN** a `POST /api/contact` request arrives with body `{ "name": "Asha", "email": "asha@example.com", "message": "Hello" }` and `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` are all set
- **THEN** the handler calls `resend.emails.send` with `from = RESEND_FROM_EMAIL`, `to = [RESEND_TO_EMAIL]`, `replyTo = "asha@example.com"`, a non-empty `subject`, and a non-empty `text` body containing the submitted name, email, and message
- **AND** the response status is 200 with body `{ "ok": true }`

#### Scenario: Resend API key never reaches the client bundle
- **WHEN** the production bundle (`.next/static/`) is built and inspected
- **THEN** the literal value of `RESEND_API_KEY` does not appear anywhere in the client output

### Requirement: POST `/api/contact` request validation

The route handler SHALL accept JSON request bodies with the schema `{ name: string, email: string, message: string, company_website?: string }`. It SHALL respond with HTTP 400 and `{ "ok": false, "error": "invalid" }` when the body is not valid JSON, when any of `name`/`email`/`message` is missing, when `name` is empty after trim or longer than 100 characters, when `email` does not match an RFC-5322-style email pattern, or when `message` is shorter than 10 characters or longer than 5000 characters.

#### Scenario: Missing required field rejected
- **WHEN** the request body is `{ "name": "Asha", "email": "asha@example.com" }` (no `message`)
- **THEN** the response status is 400 with body `{ "ok": false, "error": "invalid" }`
- **AND** no email is sent

#### Scenario: Invalid email rejected
- **WHEN** the request body is `{ "name": "Asha", "email": "not-an-email", "message": "Hello there." }`
- **THEN** the response status is 400 with body `{ "ok": false, "error": "invalid" }`

#### Scenario: Empty body rejected
- **WHEN** the request body is empty or non-JSON
- **THEN** the response status is 400 with body `{ "ok": false, "error": "invalid" }`

### Requirement: Honeypot bot trap

The route handler SHALL treat any request whose `company_website` field is a non-empty string as a bot submission. It SHALL respond with HTTP 200 and `{ "ok": true }` **without** calling Resend, so the bot cannot distinguish a sinkholed submission from a delivered one.

#### Scenario: Honeypot field tripped
- **WHEN** the request body is `{ "name": "Asha", "email": "asha@example.com", "message": "Hello there.", "company_website": "http://spammer.test" }`
- **THEN** the response status is 200 with body `{ "ok": true }`
- **AND** no email is sent through Resend

### Requirement: Per-IP rate limiting

The route handler SHALL enforce a per-IP rate limit of at most 5 successful or attempted POSTs in any rolling 10-minute window. The IP SHALL be read from the first comma-separated value of the `x-forwarded-for` request header. When the limit is exceeded, the handler SHALL respond with HTTP 429 and `{ "ok": false, "error": "rate_limited" }`.

#### Scenario: Sixth request from the same IP within ten minutes is throttled
- **WHEN** five `POST /api/contact` requests have already been processed from `x-forwarded-for: 203.0.113.7` in the previous 600 seconds and a sixth arrives
- **THEN** the response status is 429 with body `{ "ok": false, "error": "rate_limited" }`
- **AND** no email is sent for the sixth request

### Requirement: Unconfigured-server fallback

The route handler SHALL detect when `RESEND_API_KEY` is missing or empty and respond with HTTP 503 and `{ "ok": false, "error": "unconfigured" }` instead of attempting an email send or crashing. This SHALL allow Preview deployments without the production secret to surface the form's failure mode without 500s.

#### Scenario: Missing API key returns unconfigured fallback
- **WHEN** a `POST /api/contact` request arrives with a valid body and `RESEND_API_KEY` is unset
- **THEN** the response status is 503 with body `{ "ok": false, "error": "unconfigured" }`

### Requirement: HTTP method handling

The route handler SHALL accept only `POST` and `OPTIONS`. Any other method (including `GET`, `PUT`, `DELETE`, `PATCH`, `HEAD`) SHALL receive HTTP 405 `Method Not Allowed`. `OPTIONS` SHALL respond with HTTP 204, an `Allow: POST, OPTIONS` header, and SHALL NOT set `Access-Control-Allow-Origin` (the route is same-origin only).

#### Scenario: GET is rejected
- **WHEN** a `GET /api/contact` request is made
- **THEN** the response status is 405

#### Scenario: OPTIONS preflight is supported
- **WHEN** an `OPTIONS /api/contact` request is made
- **THEN** the response status is 204
- **AND** the response includes the header `Allow: POST, OPTIONS`
- **AND** the response does not include any `Access-Control-Allow-Origin` header

### Requirement: Response envelope and machine-readable error codes

Every JSON response from `/api/contact` SHALL conform to the envelope `{ ok: boolean, error?: "unconfigured" | "invalid" | "rate_limited" | "send_failed" }`. The server SHALL NOT return localized strings; the client maps the `error` code to a translated message via `react-i18next`.

#### Scenario: Upstream Resend error maps to send_failed
- **WHEN** the Resend SDK throws or returns an error response while sending
- **THEN** the route returns HTTP 502 with body `{ "ok": false, "error": "send_failed" }`

#### Scenario: Unexpected exception maps to send_failed
- **WHEN** the route handler throws an unhandled exception while processing a valid request
- **THEN** the route returns HTTP 500 with body `{ "ok": false, "error": "send_failed" }`

### Requirement: Client form submits via fetch

The `Contact` component (`src/components/Contact.jsx`) SHALL submit the form by calling `fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) })`. It SHALL NOT import `@emailjs/browser`, SHALL NOT reference `process.env.NEXT_PUBLIC_EMAILJS_*`, and SHALL NOT include any third-party email-sending SDK in the client bundle.

#### Scenario: Successful submit shows the success card
- **WHEN** a user fills the form with valid name, email, and message and the server responds with 200 `{ "ok": true }`
- **THEN** the form is replaced by the localized success card (`contact.form.successTitle` + `contact.form.successBody`)
- **AND** the form's `loading` state is cleared

#### Scenario: Network or server error shows localized message
- **WHEN** the fetch call rejects, times out, or the server returns a non-200 response
- **THEN** the form remains visible
- **AND** the error region (`role="alert"`) renders the i18n string corresponding to the `error` code (`contact.form.configError`, `contact.form.invalidError`, `contact.form.rateLimitError`, or `contact.form.sendError`)
- **AND** the form's `loading` state is cleared

#### Scenario: Honeypot tripped client-side
- **WHEN** the hidden `company_website` field is non-empty when the form is submitted
- **THEN** the component short-circuits to the success card without making a network request

### Requirement: Server-only Resend env vars

The application SHALL read all Resend configuration (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`) from server-only env vars. None of these keys SHALL be prefixed with `NEXT_PUBLIC_`, SHALL be referenced in any file outside `app/api/contact/route.js`, or SHALL appear in any document committed to the repository other than `.env.example` and `README.md`.

#### Scenario: Vars are absent from the client bundle
- **WHEN** the production bundle (`.next/static/`) is grepped for `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, or `RESEND_TO_EMAIL`
- **THEN** none of these strings appear

#### Scenario: `.env.example` documents the new keys
- **WHEN** a developer reads `.env.example`
- **THEN** the file contains entries for `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` (without `NEXT_PUBLIC_` prefix and without committed values)
- **AND** the file does not contain `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, or `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
