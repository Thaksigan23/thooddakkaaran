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
})
