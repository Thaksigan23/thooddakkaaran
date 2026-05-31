const MAX_MESSAGE_LENGTH = 1800

export function normalizeWhatsAppPhone(phone) {
  return String(phone ?? "").replace(/\D/g, "")
}

export function buildWhatsAppOrderLink({ phone, message }) {
  const digits = normalizeWhatsAppPhone(phone)
  if (!digits) return ""
  const encoded = encodeURIComponent(message ?? "")
  return `https://wa.me/${digits}?text=${encoded}`
}

export function formatOrderMessage({ items, customer, t }) {
  const lines = []
  lines.push(t("products.order.message.title"))
  lines.push("")
  lines.push(t("products.order.message.itemsHeading"))

  for (const item of items) {
    if (!item?.key || item.quantity < 1) continue
    const title = t(`products.catalogue.${item.key}.title`)
    lines.push(`• ${title} × ${item.quantity}`)
  }

  lines.push("")
  lines.push(t("products.order.message.customerHeading"))
  lines.push(`${t("products.order.message.name")}: ${customer.name.trim()}`)
  lines.push(`${t("products.order.message.phone")}: ${customer.phone.trim()}`)
  lines.push(`${t("products.order.message.delivery")}: ${customer.delivery.trim()}`)

  const notes = customer.notes?.trim()
  if (notes) {
    lines.push("")
    lines.push(t("products.order.message.notesHeading"))
    lines.push(notes)
  }

  return lines.join("\n")
}

export function validateOrder({ items, customer }) {
  const errors = {}
  const name = customer.name?.trim() ?? ""
  const phone = customer.phone?.trim() ?? ""
  const delivery = customer.delivery?.trim() ?? ""
  const notes = customer.notes?.trim() ?? ""

  const activeItems = items.filter((item) => item.quantity >= 1)
  if (activeItems.length === 0) {
    errors.cart = "empty"
  }

  if (name.length < 2 || name.length > 100) {
    errors.name = "invalid"
  }

  const phoneDigits = phone.replace(/\D/g, "")
  if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    errors.phone = "invalid"
  }

  if (delivery.length < 5 || delivery.length > 300) {
    errors.delivery = "invalid"
  }

  if (notes.length > 500) {
    errors.notes = "invalid"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    activeItems,
  }
}

export function isOrderMessageTooLong(message) {
  return message.length > MAX_MESSAGE_LENGTH
}
