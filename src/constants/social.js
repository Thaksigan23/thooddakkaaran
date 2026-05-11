/** Public profile link for “Follow on Instagram” buttons */
export const INSTAGRAM_PROFILE_URL =
  import.meta.env.VITE_INSTAGRAM_PROFILE_URL?.trim() ||
  "https://www.instagram.com/"

/**
 * Where to load the live feed JSON from.
 * Production on Vercel: same-origin `/api/instagram` works with `api/instagram.js`.
 * Local Vite (`npm run dev`): use `vercel dev`, or set this to your deployed API URL.
 */
export const INSTAGRAM_FEED_API_URL =
  import.meta.env.VITE_INSTAGRAM_FEED_API_URL?.trim() || "/api/instagram"
