## ADDED Requirements

### Requirement: Order cart state

The site SHALL maintain an in-session order cart containing zero or more catalogue line items. Each line item SHALL be identified by the catalogue product `key` (e.g. `pomegranate`, `setYogurt`) and a positive integer `quantity`. Adding a product that is already in the cart SHALL increment its quantity by one unless the user explicitly sets a different quantity via the quantity control.

#### Scenario: Add product from catalogue card
- **WHEN** a visitor clicks "Add to order" on a catalogue card for `pomegranate`
- **THEN** the cart contains one line item `{ key: "pomegranate", quantity: 1 }`
- **AND** a visible order entry point indicates at least one item in the cart

#### Scenario: Increment quantity for existing line item
- **WHEN** the cart already contains `{ key: "pomegranate", quantity: 2 }` and the visitor increases quantity to 3 via the stepper
- **THEN** the cart contains `{ key: "pomegranate", quantity: 3 }`

#### Scenario: Remove line item
- **WHEN** the visitor sets a line item's quantity to 0 or clicks remove
- **THEN** that product key is absent from the cart

### Requirement: Order drawer with customer details

The site SHALL provide an order panel (drawer or equivalent) reachable from the products section when the cart is non-empty. The panel SHALL display all cart line items with localized product titles, quantity controls, and a customer form with fields: `name` (required), `phone` (required), `delivery` (required), and `notes` (optional).

#### Scenario: Open order panel from cart indicator
- **WHEN** the cart has at least one item and the visitor activates the order entry control
- **THEN** the order panel opens and lists each cart line with its localized title and quantity

#### Scenario: Required fields block send
- **WHEN** the visitor activates "Send order via WhatsApp" with an empty `name`, `phone`, or `delivery` field
- **THEN** the WhatsApp handoff does not occur
- **AND** inline validation messages are shown for the invalid fields

### Requirement: Customer field validation

Before WhatsApp handoff, the client SHALL validate: `name` trimmed length between 2 and 100 characters; `phone` containing between 9 and 15 digits after removing spaces and common separators; `delivery` trimmed length between 5 and 300 characters; `notes` optional with maximum 500 characters after trim. The cart SHALL contain at least one line item with `quantity >= 1`.

#### Scenario: Invalid phone rejected
- **WHEN** the visitor submits with `phone` value `"abc"` or `"12"`
- **THEN** handoff is blocked and a localized phone validation error is displayed

#### Scenario: Valid submission passes validation
- **WHEN** the cart has items, `name` is `"Kumar"`, `phone` is `"+94 77 123 4567"`, and `delivery` is `"Jaffna, Nallur"`
- **THEN** validation succeeds and handoff proceeds

### Requirement: WhatsApp deep link targets contact phone

Order handoff SHALL open a new browser context (via `<a target="_blank">` or equivalent) to a URL of the form `https://wa.me/<digits>?text=<url-encoded-message>` where `<digits>` are derived exclusively from `NEXT_PUBLIC_CONTACT_PHONE` by removing all characters except digits (no `+` in the path segment). The order flow SHALL NOT use `NEXT_PUBLIC_WHATSAPP_LINK` for the send-order action.

#### Scenario: Phone normalization from env
- **WHEN** `NEXT_PUBLIC_CONTACT_PHONE` is `"+94 77 123 4567"` and the visitor completes a valid order
- **THEN** the handoff URL path begins with `https://wa.me/94771234567`

#### Scenario: Message is URL-encoded
- **WHEN** the visitor completes a valid order with notes containing spaces and punctuation
- **THEN** the `text` query parameter is percent-encoded and decodes to a human-readable multi-line message

### Requirement: Structured order message content

The pre-filled WhatsApp message SHALL include labelled sections for order items, customer details, and optional notes. Each line item SHALL appear as `• <localized product title> × <quantity>`. Customer block SHALL include name, phone, and delivery address/area. Section headings SHALL use localized strings from the active `react-i18next` locale (`en`, `ta`, or `si`).

#### Scenario: Message contains order and customer data
- **WHEN** the cart holds `pomegranate × 2`, customer name `"Asha"`, phone `"+94 70 111 2222"`, delivery `"Colombo 05"`, and notes `"Morning delivery"`
- **THEN** the decoded message body contains the localized product title for pomegranate, the quantity `2`, the name `Asha`, the phone, the delivery text, and the notes text

#### Scenario: Empty notes omitted or marked optional
- **WHEN** the visitor leaves `notes` empty and submits a valid order
- **THEN** the message either omits a notes section or includes a notes section with an empty/placeholder line without blocking send

### Requirement: Catalogue integration

Each catalogue card in `Products` SHALL offer an order action instead of linking to `#contact` for enquiry. The products section bottom CTA SHALL include a control to open the order panel when the cart is non-empty. When the cart is empty, the existing WhatsApp CTA in the products section MAY continue to open a general chat link.

#### Scenario: Card order action adds to cart
- **WHEN** the visitor clicks the order action on the `guava` catalogue card
- **THEN** `guava` is added to the cart without navigating away from the products section

### Requirement: Floating WhatsApp widget behavior

The floating WhatsApp widget SHALL open the order panel when the cart contains items. When the cart is empty, it SHALL continue to link to the general WhatsApp URL (`WHATSAPP_LINK` or equivalent).

#### Scenario: Widget with items opens order panel
- **WHEN** the cart has at least one item and the visitor activates the floating WhatsApp control
- **THEN** the order panel opens instead of immediately navigating to WhatsApp

#### Scenario: Widget with empty cart opens general chat
- **WHEN** the cart is empty and the visitor activates the floating WhatsApp control
- **THEN** the browser navigates to the general WhatsApp link in a new tab

### Requirement: Accessibility

The order panel SHALL trap focus while open, restore focus to the triggering control on close, expose cart updates to assistive technology via a live region, and provide keyboard-operable quantity controls with visible focus indicators consistent with the rest of the site.

#### Scenario: Escape closes panel
- **WHEN** the order panel is open and the visitor presses Escape
- **THEN** the panel closes and focus returns to the element that opened it

### Requirement: Internationalization

All user-visible order UI strings (buttons, labels, validation errors, message section headings) SHALL be defined in `src/i18n/locales/en.json`, `ta.json`, and `si.json` under a `products.order` namespace (or equivalent nested key).

#### Scenario: Tamil locale renders order UI
- **WHEN** the active locale is `ta` and the order panel is open
- **THEN** order form labels and the primary send button display Tamil translations, not English fallbacks
