export const WHATSAPP_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/94771234567"

export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "+94 70 000 0000"

export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`
