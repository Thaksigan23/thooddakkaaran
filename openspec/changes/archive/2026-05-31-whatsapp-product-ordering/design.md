## Context

The Thooddakkaaran marketing site (Next.js 15 / App Router) displays an 11-item product catalogue in `src/components/Products.jsx`. Each card currently links "Enquire" to `#contact`, and WhatsApp entry points (`WHATSAPP_LINK` in `src/constants/contact.js`, floating widget in `src/components/Whatsapp.jsx`) open a generic `wa.me` chat with no order context.

Business operations already run on WhatsApp. The site should guide visitors through selecting products and entering delivery details, then open WhatsApp with a structured pre-filled message to the number in `NEXT_PUBLIC_CONTACT_PHONE` (already used for display/tel links in `Contact.jsx` and `Footer.jsx`).

This is entirely client-side: WhatsApp Web/App deep links (`https://wa.me/<digits>?text=<encoded>`) require no API keys, no server route, and no new dependencies.

## Goals / Non-Goals

**Goals:**

- Provide an in-session order cart tied to catalogue product keys (same `CATALOGUE` array as today).
- Collect customer name, phone, delivery address/area, and optional notes before handoff.
- Generate a WhatsApp deep link whose recipient is derived from `NEXT_PUBLIC_CONTACT_PHONE` (strip non-digits except leading `+`, E.164-style digits only in the `wa.me` path).
- Format the message with labelled sections (order lines with quantity, customer block, notes) using i18n labels from the active locale.
- Replace per-card "Enquire" with "Add to order" / quantity controls; expose a persistent order summary entry point (FAB or header chip in the products section).
- Preserve accessibility: focus trap in the order panel, keyboard operable quantity steppers, `aria-live` for cart updates.
- Add Playwright coverage that asserts link shape and message content without actually opening WhatsApp.

**Non-Goals:**

- WhatsApp Business API, order webhooks, or automated replies.
- Server-side order storage, authentication, or payment.
- Price calculation (catalogue has no prices today — message lists product titles and quantities only).
- Variant/SKU picker beyond what badges already imply (v1: user selects product card; optional free-text note covers flavour/size requests).
- Replacing the email contact form — it remains for general enquiries.

## Decisions

### Client-only cart via React Context, not URL state or localStorage

- **Choice**: `OrderProvider` context wrapping the page (or layout) holding `{ items: { key, quantity }[], customer: {...} }`.
- **Why**: Order is ephemeral for a single visit; no persistence requirement. Context avoids prop drilling across `Products`, `Whatsapp`, and the order drawer. Simpler than zustand for one feature.
- **Alternative rejected**: `localStorage` persistence — useful later but adds GDPR/consent nuance for PII; defer until requested.

### Order UI: slide-over drawer anchored to products section + global FAB

- **Choice**: `OrderDrawer` component (right-side on desktop, bottom sheet on mobile) opened from:
  1. "View order" chip when `items.length > 0`
  2. Floating cart badge on the products section CTA bar
  3. Floating WhatsApp widget when cart non-empty (opens drawer first; send step is inside drawer)
- **Why**: Keeps users in the catalogue context; matches existing modal/drawer patterns (Framer Motion already in use). Bottom sheet works on mobile where WhatsApp handoff is most common.
- **Alternative rejected**: Separate `/order` page — breaks single-page marketing flow and hurts `#products` deep links.

### WhatsApp link builder: single utility derived from `CONTACT_PHONE`

- **Choice**: Add `buildWhatsAppOrderLink({ phone, message })` in `src/utils/whatsapp.js` (or extend `src/constants/contact.js` with `WHATSAPP_ORDER_BASE` derived from `CONTACT_PHONE`).
- **Phone normalization**: `CONTACT_PHONE.replace(/[^\d+]/g, "").replace(/^\+/, "")` → digits for `wa.me/<digits>`.
- **Message template** (example English):

  ```
  *New order — Thooddakkaaran*

  *Items:*
  • Pomegranate × 2
  • Set Yogurt (80g) × 1

  *Customer:*
  Name: …
  Phone: …
  Delivery: …

  *Notes:*
  …
  ```

  Labels come from `t('products.order.message.*')` so Tamil/Sinhala headings render correctly.

- **Why**: User requirement explicitly targets `NEXT_PUBLIC_CONTACT_PHONE`. Today `WHATSAPP_LINK` may point elsewhere; order links MUST use contact phone. General widget can keep `WHATSAPP_LINK` for empty-cart greeting or be aligned in a follow-up.
- **Alternative rejected**: `whatsapp://send?phone=` scheme — less reliable on desktop; `wa.me` is the established pattern already in the codebase.

### Validation before opening WhatsApp

- **Choice**: Require at least one line item with `quantity >= 1`, customer `name` (trim, 2–100 chars), `phone` (Sri Lanka-friendly: 9–15 digits after stripping spaces), and `delivery` (trim, 5–300 chars). Notes optional (max 500 chars).
- **Why**: Prevents empty handoffs; mirrors contact form validation style. No server round-trip.
- **UX**: Inline field errors via i18n; primary CTA disabled until valid.

### Catalogue card CTA change

- **Choice**: Replace `#contact` "Enquire" button with "Add to order" that increments quantity (or adds line). Show inline quantity stepper when item is in cart.
- **Why**: Direct path from product discovery to order; "Enquire" duplicated the contact form without product context.

### Testing strategy

- **Choice**: New `e2e/whatsapp-order.spec.js`:
  - Add product from catalogue → open drawer → fill customer fields → intercept `window.open` or read `href` on the send button before navigation.
  - Assert URL matches `/wa\.me\/\d+/` with digits from test env `NEXT_PUBLIC_CONTACT_PHONE`.
  - Assert encoded message contains product title and customer name.
- **Why**: End-to-end proof of the user story without mobile WhatsApp installed in CI.

## Risks / Trade-offs

- **[Message length limits]** WhatsApp URLs have practical length caps (~2000 chars) → Mitigation: cap total line items display at 20; show validation if message exceeds safe length and prompt user to shorten notes.
- **[No order confirmation on site]** Handoff leaves the site; staff may not receive if user abandons WhatsApp compose → Mitigation: clear copy that user must tap Send in WhatsApp; acceptable for v1.
- **[Phone env mismatch]** `WHATSAPP_LINK` and `CONTACT_PHONE` may differ today → Mitigation: order flow always uses `CONTACT_PHONE`; document in README that both should match the business number.
- **[Desktop without WhatsApp]** `wa.me` opens web.whatsapp.com → Mitigation: same as existing WhatsApp buttons; no change in behavior.
- **[PII in URL query string]** Order details appear in browser history → Mitigation: ephemeral session only; no logging; user explicitly initiates send.

## Migration Plan

1. Ship feature behind no flag (purely additive UI).
2. Verify `NEXT_PUBLIC_CONTACT_PHONE` is set in Vercel Production/Preview (already required for contact section).
3. Smoke-test on mobile: add item → send → confirm message in WhatsApp compose screen.
4. **Rollback**: revert component changes; catalogue returns to Enquire → `#contact` links.

## Open Questions

- Should generic `WHATSAPP_LINK` be deprecated in favor of always deriving from `CONTACT_PHONE`? (Recommend yes in a small follow-up, not blocking this change.)
- Do we want a minimum quantity per SKU or wholesale-only products flagged differently? (Defer — badges already communicate wholesale; notes field covers edge cases.)
