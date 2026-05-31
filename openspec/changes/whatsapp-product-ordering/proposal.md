## Why

The product catalogue today only links to the contact form or a generic WhatsApp chat — visitors cannot specify what they want, how much, or where to deliver. For a farm business that already handles orders over WhatsApp, we need a guided ordering flow that collects line items and customer details, then hands off a structured message to the business number (`NEXT_PUBLIC_CONTACT_PHONE`) so staff can fulfil orders without back-and-forth typing.

## What Changes

- Add an end-to-end **WhatsApp product ordering** flow on the marketing site: browse catalogue → add items to an order → enter customer details → open WhatsApp with a pre-filled order summary addressed to `NEXT_PUBLIC_CONTACT_PHONE`.
- Replace per-card "Enquire" links (currently `#contact`) with **Order** actions that add the product to an in-session order list (quantity adjustable).
- Add an **order panel** (drawer or modal) showing line items, subtotals where applicable, customer fields (name, phone, delivery address/area, optional notes), validation, and a **Send order via WhatsApp** CTA.
- Add a shared utility to build a `wa.me` deep link from `NEXT_PUBLIC_CONTACT_PHONE` and an URL-encoded order message template (English default; respects active i18n locale for labels where practical).
- Wire the products section CTA WhatsApp button and floating WhatsApp widget to open the order flow when the cart has items, or fall back to a general greeting when empty.
- Add localized copy for order UI in `en`, `ta`, and `si` locale files.
- Add Playwright e2e coverage for the happy path: add product → fill details → assert the generated WhatsApp link targets the configured phone and contains order fields.

## Capabilities

### New Capabilities

- `whatsapp-ordering`: Client-side product order collection, cart state, customer detail form, WhatsApp deep-link generation from `NEXT_PUBLIC_CONTACT_PHONE`, and catalogue integration (per-card order, section CTA, floating widget behavior).

### Modified Capabilities

- _(none — no published baseline specs in `openspec/specs/` yet)_

## Impact

- **Code**: `src/components/Products.jsx` (order actions, order panel trigger), new order components/hooks under `src/components/` or `src/features/order/`, new helper in `src/constants/contact.js` or `src/utils/whatsapp.js`, updates to `src/components/Whatsapp.jsx` for order-aware deep link.
- **i18n**: new keys under `products.order.*` (and shared validation messages) in `en.json`, `ta.json`, `si.json`.
- **Env**: reuses existing `NEXT_PUBLIC_CONTACT_PHONE`; no new secrets. Optionally align generic `NEXT_PUBLIC_WHATSAPP_LINK` with the same number for consistency (non-breaking if kept as fallback).
- **Dependencies**: none — pure client-side `wa.me` links, no WhatsApp Business API.
- **Tests**: extend `e2e/catalogue.spec.js` or add `e2e/whatsapp-order.spec.js` for order flow and link assertion.
- **Out of scope**: payment processing, inventory/stock checks, order persistence server-side, WhatsApp Business API webhooks, admin dashboard, email duplicate of orders.
