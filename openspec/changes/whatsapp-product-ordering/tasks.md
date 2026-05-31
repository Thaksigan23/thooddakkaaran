## 1. Utilities and shared state

- [x] 1.1 Add `src/utils/whatsapp.js` with `normalizeWhatsAppPhone(phone)` (digits-only for `wa.me` path) and `buildWhatsAppOrderLink({ phone, message })` returning `https://wa.me/<digits>?text=<encoded>`
- [x] 1.2 Add `formatOrderMessage({ items, customer, t })` in the same module (or adjacent) that builds the multi-line message using `products.order.message.*` i18n keys and localized catalogue titles via `products.catalogue.<key>.title`
- [x] 1.3 Create `src/context/OrderContext.jsx` (or `src/components/order/OrderProvider.jsx`) exporting `OrderProvider`, `useOrder()`, cart actions (`addItem`, `setQuantity`, `removeItem`, `clearCart`), and customer field state

## 2. Order UI components

- [x] 2.1 Create `OrderDrawer` with line-item list, quantity steppers, customer form (name, phone, delivery, notes), validation display, and primary "Send order via WhatsApp" button
- [x] 2.2 Implement focus trap, Escape-to-close, focus restore, and `aria-live` region for cart count updates per design accessibility requirements
- [x] 2.3 Add cart indicator / "View order" control visible when `items.length > 0` (products section header or sticky chip)

## 3. Catalogue and widget integration

- [x] 3.1 Wrap the home page (or layout) with `OrderProvider` in `app/page.jsx` or `app/layout.jsx` so `Products` and `Whatsapp` share cart state
- [x] 3.2 Update `src/components/Products.jsx`: replace per-card `#contact` Enquire link with Add to order / inline quantity stepper; wire products section CTA to open order drawer when cart non-empty
- [x] 3.3 Update `src/components/Whatsapp.jsx`: when cart has items, open order drawer on click instead of navigating directly; preserve general `WHATSAPP_LINK` behavior when cart is empty
- [x] 3.4 On valid submit in `OrderDrawer`, open `buildWhatsAppOrderLink` using `CONTACT_PHONE` from `src/constants/contact.js` in a new tab

## 4. Internationalization

- [x] 4.1 Add `products.order.*` keys to `src/i18n/locales/en.json` (buttons, labels, validation errors, message section headings)
- [x] 4.2 Add matching Tamil translations in `src/i18n/locales/ta.json`
- [x] 4.3 Add matching Sinhala translations in `src/i18n/locales/si.json`
- [x] 4.4 Replace hardcoded "Enquire" usage on catalogue cards with `t('products.order.add')` or equivalent

## 5. Testing and documentation

- [x] 5.1 Add `e2e/whatsapp-order.spec.js`: add product → open drawer → fill customer fields → assert send link matches `wa.me/<digits from NEXT_PUBLIC_CONTACT_PHONE>` and encoded message contains product title and customer name
- [x] 5.2 Verify existing `e2e/catalogue.spec.js` still passes after card CTA changes (update selectors if Enquire button role/label changed)
- [x] 5.3 Document in `.env.example` / README that order WhatsApp handoff uses `NEXT_PUBLIC_CONTACT_PHONE` and should match the business WhatsApp number

## 6. Manual verification

- [x] 6.1 Local smoke test: add multiple products, submit order, confirm WhatsApp compose screen shows structured message to the configured number
- [x] 6.2 Mobile viewport check: drawer renders as usable bottom sheet; quantity controls are tappable
- [x] 6.3 Locale switch smoke test (`en` / `ta` / `si`): order UI and message headings render in active language
