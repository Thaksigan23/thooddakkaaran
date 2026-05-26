/**
 * Next.js Route Handler — accepts contact form submissions and delivers them
 * via the Resend transactional email API. The API key MUST live in
 * server-only env (`RESEND_API_KEY`) and MUST NOT be referenced from any
 * client component.
 *
 * Server-only env contract (set in Vercel → Project → Settings → Env Vars):
 *   RESEND_API_KEY        Resend API key (restricted scope: send emails only)
 *   RESEND_FROM_EMAIL     Verified sender, e.g. `Thooddakkaaran <noreply@thooddakkaaran.com>`
 *   RESEND_TO_EMAIL       Recipient inbox (defaults to info@thooddakkaaran.com)
 *
 * Response envelope: `{ ok: boolean, error?: "unconfigured" | "invalid" | "rate_limited" | "send_failed" }`.
 * The client maps `error` codes to localized strings via react-i18next.
 */

import { Resend } from "resend"

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const NAME_MAX = 100
const MESSAGE_MIN = 10
const MESSAGE_MAX = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rateLimitBuckets = new Map()

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  })
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return "unknown"
}

function checkRateLimit(ip) {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ip)

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    }
  }

  bucket.count += 1
  return { allowed: true }
}

function validateBody(body) {
  if (!body || typeof body !== "object") return { ok: false }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""

  if (name.length < 1 || name.length > NAME_MAX) return { ok: false }
  if (!EMAIL_RE.test(email)) return { ok: false }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return { ok: false }
  }

  return { ok: true, data: { name, email, message } }
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid" })
  }

  if (typeof body?.company_website === "string" && body.company_website.length > 0) {
    return jsonResponse(200, { ok: true })
  }

  const validated = validateBody(body)
  if (!validated.ok) {
    return jsonResponse(400, { ok: false, error: "invalid" })
  }
  const { data } = validated

  const ip = getClientIp(request)
  const limit = checkRateLimit(ip)
  if (!limit.allowed) {
    return jsonResponse(
      429,
      { ok: false, error: "rate_limited" },
      limit.retryAfter ? { "Retry-After": String(limit.retryAfter) } : {}
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return jsonResponse(503, { ok: false, error: "unconfigured" })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = process.env.RESEND_TO_EMAIL || "info@thooddakkaaran.com"

  if (!fromEmail) {
    return jsonResponse(503, { ok: false, error: "unconfigured" })
  }

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `Thooddakkaaran website contact — ${data.name}`,
      text:
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n\n` +
        `${data.message}\n\n` +
        `— Submitted via thooddakkaaran.com`,
    })

    if (result?.error) {
      console.error("[api/contact] Resend error:", result.error)
      return jsonResponse(502, { ok: false, error: "send_failed" })
    }

    return jsonResponse(200, { ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error"
    console.error("[api/contact] Unexpected error:", message)
    return jsonResponse(500, { ok: false, error: "send_failed" })
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  })
}

export async function GET() {
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

export async function HEAD() {
  return new Response("Method Not Allowed", { status: 405 })
}
