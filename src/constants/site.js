/** Public site base (no trailing slash). Match VITE_SITE_URL / build for SEO. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://thooddakkaaran.vercel.app"
).replace(/\/+$/, "")

/** When your separate retail e-commerce site goes live, set this in .env to show a link. */
export const ECOMMERCE_STORE_URL =
  import.meta.env.VITE_ECOMMERCE_STORE_URL?.trim() || ""
