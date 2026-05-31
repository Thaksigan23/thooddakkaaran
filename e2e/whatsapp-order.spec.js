import { test, expect } from "@playwright/test"

test.describe("WhatsApp product ordering", () => {
  test("adds product, fills details, and builds wa.me link to contact phone", async ({
    page,
  }) => {
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    const section = page.locator("section#products")
    const firstCard = section.locator('[data-testid="catalogue-card"]').first()
    await firstCard.locator('[data-testid="order-add-btn"]').click()

    await page.locator('[data-testid="order-view-btn"]').click()
    await expect(page.locator('[data-testid="order-drawer"]')).toBeVisible()

    const customerName = "Asha Perera"
    await page.locator('[data-testid="order-name"]').fill(customerName)
    await page.locator('[data-testid="order-phone"]').fill("+94 77 123 4567")
    await page
      .locator('[data-testid="order-delivery"]')
      .fill("Colombo 05, Sri Lanka")

    const sendBtn = page.locator('[data-testid="order-send-btn"]')
    const href = await sendBtn.getAttribute("data-href")
    expect(href).toBeTruthy()
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)

    const phoneDigits = href.match(/^https:\/\/wa\.me\/(\d+)\?text=/)?.[1]
    expect(phoneDigits?.length).toBeGreaterThanOrEqual(9)

    const decoded = decodeURIComponent(href.split("text=")[1])
    expect(decoded).toContain(customerName)
    expect(decoded).toMatch(/Pomegranate|× 1/)
  })

  test("floating WhatsApp opens order drawer when cart has items", async ({
    page,
  }) => {
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    await page
      .locator('section#products [data-testid="order-add-btn"]')
      .first()
      .click()

    await page.locator('[data-testid="whatsapp-float-btn"]').click()
    await expect(page.locator('[data-testid="order-drawer"]')).toBeVisible()
  })

  test("order drawer is usable on mobile viewport", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    await page
      .locator('section#products [data-testid="order-add-btn"]')
      .first()
      .click()
    await page.locator('[data-testid="order-view-btn"]').click()

    const drawer = page.locator('[data-testid="order-drawer"]')
    await expect(drawer).toBeVisible()
    await expect(drawer.getByRole("button", { name: /Send order via WhatsApp/i })).toBeVisible()
    await expect(drawer.getByLabel(/Increase quantity/i).first()).toBeVisible()
  })

  test("navbar cart shows badge and opens drawer", async ({ page }) => {
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    const cartBtn = page.locator('[data-testid="navbar-cart-btn"]').first()
    await cartBtn.click()
    await expect(page.locator('[data-testid="order-drawer"]')).toBeVisible()
    await expect(
      page.getByText(/Add products from the catalogue to start an order/i)
    ).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(page.locator('[data-testid="order-drawer"]')).toBeHidden()

    await page
      .locator('section#products [data-testid="order-add-btn"]')
      .first()
      .click()

    await expect(page.locator('[data-testid="navbar-cart-badge"]').first()).toHaveText(
      "1"
    )

    await cartBtn.click()
    await expect(page.locator('[data-testid="order-drawer"]')).toBeVisible()
  })

  test("Tamil locale renders order UI strings", async ({ page }) => {
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    await page.locator('button[data-lang="ta"]').first().click()

    await page
      .locator('section#products [data-testid="order-add-btn"]')
      .first()
      .click()
    await page.locator('[data-testid="order-view-btn"]').click()

    await expect(page.getByRole("heading", { name: /உங்கள் ஆர்டர்/ })).toBeVisible()
    await expect(
      page.getByRole("button", { name: /WhatsApp வழியாக ஆர்டர் அனுப்பவும்/ })
    ).toBeVisible()
  })
})
