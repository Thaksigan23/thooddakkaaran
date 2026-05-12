/**
 * Vercel Serverless Function — fetches recent posts from Instagram Graph API.
 * Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in Vercel
 * project → Settings → Environment Variables (never commit tokens).
 *
 * Optional: ALLOWED_CORS_ORIGINS=comma,separated,origins for cross-origin GET.
 *
 * Meta docs: https://developers.facebook.com/docs/instagram-api/
 */

function applyCors(req, res) {
  const origin = req.headers.origin
  const list = (process.env.ALLOWED_CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  if (origin && list.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
    res.setHeader("Vary", "Origin")
  }
}

export default async function handler(req, res) {
  applyCors(req, res)

  if (req.method === "OPTIONS") {
    res.statusCode = 204
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    if (req.headers.origin) {
      const list = (process.env.ALLOWED_CORS_ORIGINS || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      if (list.includes(req.headers.origin)) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
      }
    }
    res.setHeader("Access-Control-Max-Age", "86400")
    return res.end()
  }

  if (req.method !== "GET") {
    res.statusCode = 405
    return res.end("Method Not Allowed")
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

  if (!token || !userId) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    return res.end(
      JSON.stringify({
        configured: false,
        posts: [],
        message:
          "Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID on the server (e.g. Vercel env).",
      })
    )
  }

  try {
    const url = new URL(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(userId)}/media`
    )
    url.searchParams.set(
      "fields",
      "id,media_type,media_url,permalink,thumbnail_url,caption,timestamp"
    )
    url.searchParams.set("access_token", token)
    url.searchParams.set("limit", "9")

    const igRes = await fetch(url.toString(), { method: "GET" })
    const json = await igRes.json()

    if (!igRes.ok || json.error) {
      const msg = json.error?.message || igRes.statusText || "Instagram API error"
      console.error("[api/instagram] Graph API error:", msg)
      res.statusCode = 502
      res.setHeader("Content-Type", "application/json")
      return res.end(JSON.stringify({ configured: true, posts: [], error: msg }))
    }

    const rows = (json.data || []).map((item) => {
      const type = item.media_type || ""
      let src =
        type === "VIDEO"
          ? item.thumbnail_url || item.media_url
          : item.media_url || item.thumbnail_url
      if (type === "CAROUSEL_ALBUM" && !src) {
        src = item.thumbnail_url
      }
      return {
        id: item.id,
        src: src || "",
        permalink: item.permalink || "",
        caption: (item.caption || "").slice(0, 200),
        mediaType: type,
      }
    })

    const posts = rows.filter((p) => p.src && p.permalink)

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=3600"
    )
    return res.end(JSON.stringify({ configured: true, posts }))
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error"
    console.error("[api/instagram] Unexpected error:", message)
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    return res.end(
      JSON.stringify({
        configured: true,
        posts: [],
        error: message,
      })
    )
  }
}
