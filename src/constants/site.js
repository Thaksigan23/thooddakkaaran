/** Public site base (no trailing slash). Match NEXT_PUBLIC_SITE_URL / build for SEO. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thooddakkaaran.vercel.app"
).replace(/\/+$/, "")
