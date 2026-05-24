/**
 * Next.js Route Handler — fetches recent posts from the Instagram Graph API.
 * Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in Vercel
 * project → Settings → Environment Variables (never commit tokens).
 *
 * Optional: ALLOWED_CORS_ORIGINS=comma,separated,origins for cross-origin GET.
 *
 * Meta docs: https://developers.facebook.com/docs/instagram-api/
 */

function getAllowedOrigins() {
  return (process.env.ALLOWED_CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function corsHeadersFor(origin) {
  const headers = {}
  if (origin && getAllowedOrigins().includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin
    headers["Vary"] = "Origin"
  }
  return headers
}

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  })
}

export async function OPTIONS(request) {
  const origin = request.headers.get("origin")
  const headers = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Max-Age": "86400",
    ...corsHeadersFor(origin),
  }
  return new Response(null, { status: 204, headers })
}

export async function GET(request) {
  const origin = request.headers.get("origin")
  const cors = corsHeadersFor(origin)

  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

  if (!token || !userId) {
    return jsonResponse(
      200,
      {
        configured: false,
        posts: [],
        message:
          "Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID on the server (e.g. Vercel env).",
      },
      cors
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
      return jsonResponse(
        502,
        { configured: true, posts: [], error: msg },
        cors
      )
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

    return jsonResponse(
      200,
      { configured: true, posts },
      {
        ...cors,
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error"
    console.error("[api/instagram] Unexpected error:", message)
    return jsonResponse(
      500,
      { configured: true, posts: [], error: message },
      cors
    )
  }
}

export async function POST() {
  return new Response("Method Not Allowed", { status: 405 })
}

export async function PUT() {
  return new Response("Method Not Allowed", { status: 405 })
}

export async function DELETE() {
  return new Response("Method Not Allowed", { status: 405 })
}

export async function PATCH() {
  return new Response("Method Not Allowed", { status: 405 })
}
