import { test, expect } from "@playwright/test"

test.describe("smoke", () => {
  test("home loads with main landmark", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })
    await expect(page).toHaveTitle(/Thooddakkaaran/i)
  })

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })
    const skip = page.getByRole("link", { name: /skip to main content/i })
    await expect(skip).toBeAttached()
    await skip.focus()
    await expect(skip).toBeFocused()
  })

  test("robots.txt is reachable", async ({ request }) => {
    const res = await request.get("/robots.txt")
    expect(res.ok()).toBeTruthy()
    const text = await res.text()
    expect(text).toMatch(/User-agent/i)
    expect(text).toMatch(/Sitemap:/i)
  })
})
