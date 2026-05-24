/** Public profile link for “Follow on Instagram” buttons */
export const INSTAGRAM_PROFILE_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL?.trim() ||
  "https://www.instagram.com/"

/**
 * Where to load the live feed JSON from.
 * Default is the same-origin Next.js Route Handler at `app/api/instagram/route.js`.
 * Override with `NEXT_PUBLIC_INSTAGRAM_FEED_API_URL` to point at a remote endpoint.
 */
export const INSTAGRAM_FEED_API_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_FEED_API_URL?.trim() || "/api/instagram"
