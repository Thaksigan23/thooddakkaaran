import { test, expect } from "@playwright/test"

test.describe("minimal catalogue", () => {
  test("renders all 11 cards by default and filters to dairy on chip click", async ({
    page,
  }) => {
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    const section = page.locator("section#products")
    await expect(section).toBeVisible()

    const grid = section.locator("#catalogue-grid")
    await expect(grid).toHaveAttribute(
      "aria-labelledby",
      "catalogue-tab-all"
    )

    const cards = section.locator('[data-testid="catalogue-card"]')
    await expect(cards).toHaveCount(11)

    const dairyTab = section.locator('button[role="tab"][data-cat="dairy"]')
    await expect(dairyTab).toHaveAttribute("aria-selected", "false")
    await dairyTab.click()

    await expect(dairyTab).toHaveAttribute("aria-selected", "true")
    await expect(grid).toHaveAttribute(
      "aria-labelledby",
      "catalogue-tab-dairy"
    )
    await expect(cards).toHaveCount(3)
    await expect(
      section.locator('[data-testid="catalogue-card"][data-category="dairy"]')
    ).toHaveCount(3)
  })

  test("filter chips are keyboard-navigable with arrow keys", async ({
    page,
  }) => {
    await page.goto("/#products")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    const allTab = page.locator('button[role="tab"][data-cat="all"]')
    await allTab.focus()
    await expect(allTab).toBeFocused()

    await page.keyboard.press("ArrowRight")
    const fruitsTab = page.locator('button[role="tab"][data-cat="fruits"]')
    await expect(fruitsTab).toBeFocused()
    await expect(fruitsTab).toHaveAttribute("aria-selected", "true")

    const cards = page.locator(
      'section#products [data-testid="catalogue-card"]'
    )
    await expect(cards).toHaveCount(4)
  })
})
