export const WHATSAPP_LINK =
  import.meta.env.VITE_WHATSAPP_LINK || "https://wa.me/94771234567"

export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE || "+94 70 000 0000"

export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`
