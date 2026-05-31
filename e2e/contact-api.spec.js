import { test, expect } from "@playwright/test"

test.describe("/api/contact", () => {
  test("POST with empty body returns 400 invalid", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "Content-Type": "application/json" },
      data: "",
    })
    expect(res.status()).toBe(400)
    const body = await res.json()
    expect(body).toEqual({ ok: false, error: "invalid" })
  })

  test("GET is rejected with 405", async ({ request }) => {
    const res = await request.get("/api/contact")
    expect(res.status()).toBe(405)
  })

  test("OPTIONS returns 204 with Allow header and no CORS origin", async ({
    request,
  }) => {
    const res = await request.fetch("/api/contact", { method: "OPTIONS" })
    expect(res.status()).toBe(204)
    const headers = res.headers()
    expect(headers["allow"] || "").toMatch(/POST/i)
    expect(headers["allow"] || "").toMatch(/OPTIONS/i)
    expect(headers["access-control-allow-origin"]).toBeUndefined()
  })

  test("POST with invalid email returns 400 invalid", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "Content-Type": "application/json" },
      data: {
        name: "Test User",
        email: "foo",
        message: "Valid length message for invalid email test.",
      },
    })
    expect(res.status()).toBe(400)
    const body = await res.json()
    expect(body).toEqual({ ok: false, error: "invalid" })
  })

  test("POST with honeypot field returns 200 ok", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "Content-Type": "application/json" },
      data: {
        name: "Bot",
        email: "bot@example.com",
        message: "Honeypot trap message text.",
        company_website: "https://spam.example",
      },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ ok: true })
  })

  test("POST without Resend env returns 503 unconfigured", async ({
    request,
  }) => {
    const res = await request.post("/api/contact", {
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.100",
      },
      data: {
        name: "Test User",
        email: "test@example.com",
        message: "Unconfigured server check from e2e.",
      },
    })
    expect(res.status()).toBe(503)
    const body = await res.json()
    expect(body).toEqual({ ok: false, error: "unconfigured" })
  })

  test("sixth POST from same IP returns 429 rate_limited", async ({
    request,
  }) => {
    const headers = {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.99",
    }
    const payload = {
      name: "Rate Test",
      email: "rate@example.com",
      message: "Rate limit verification message body.",
    }

    for (let i = 0; i < 5; i++) {
      const res = await request.post("/api/contact", { headers, data: payload })
      expect(res.status()).toBe(503)
    }

    const sixth = await request.post("/api/contact", { headers, data: payload })
    expect(sixth.status()).toBe(429)
    const body = await sixth.json()
    expect(body).toEqual({ ok: false, error: "rate_limited" })
  })
})
