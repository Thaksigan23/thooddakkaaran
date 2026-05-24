/** Public site base (no trailing slash). Match NEXT_PUBLIC_SITE_URL / build for SEO. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thooddakkaaran.vercel.app"
).replace(/\/+$/, "")

/** When your separate retail e-commerce site goes live, set this in .env to show a link. */
export const ECOMMERCE_STORE_URL =
  process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL?.trim() || ""
