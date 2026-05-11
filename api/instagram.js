/**
 * Vercel Serverless Function — fetches recent posts from Instagram Graph API.
 * Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in Vercel
 * project → Settings → Environment Variables (never commit tokens).
 *
 * Meta docs: https://developers.facebook.com/docs/instagram-api/
 */

export default async function handler(req, res) {
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
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    return res.end(
      JSON.stringify({
        configured: true,
        posts: [],
        error: e instanceof Error ? e.message : "Unknown error",
      })
    )
  }
}
