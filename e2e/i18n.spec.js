import { test, expect } from "@playwright/test"

async function clickLanguage(page, code) {
  await page.locator(`nav button[data-lang="${code}"]`).first().click()
}

test.describe("i18n", () => {
  test("language switcher updates UI, html lang, and persists across reload", async ({
    page,
  }) => {
    await page.goto("/")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    // English by default
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(
      page.locator("nav").getByRole("link", { name: "About Us" }).first()
    ).toBeVisible()

    // Switch to Tamil
    await clickLanguage(page, "ta")
    await expect(page.locator("html")).toHaveAttribute("lang", "ta")
    await expect(
      page.locator("nav").getByRole("link", { name: "எங்களைப் பற்றி" }).first()
    ).toBeVisible()

    // Switch to Sinhala
    await clickLanguage(page, "si")
    await expect(page.locator("html")).toHaveAttribute("lang", "si")
    await expect(
      page.locator("nav").getByRole("link", { name: "අප ගැන" }).first()
    ).toBeVisible()

    // Reload — language persists
    await page.reload()
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })
    await expect(page.locator("html")).toHaveAttribute("lang", "si")
    await expect(
      page.locator("nav").getByRole("link", { name: "අප ගැන" }).first()
    ).toBeVisible()

    // Reset to English so other tests start clean
    await clickLanguage(page, "en")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
  })

  test("hero translation flips when changing language", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })

    const heroHeading = page.locator("section#home h1").first()
    await expect(heroHeading).toContainText(
      /Sri Lanka.s Fruit Farm, Rooted in Jaffna/
    )

    await clickLanguage(page, "ta")
    await expect(heroHeading).toContainText("யாழ்ப்பாணத்தில்")

    await clickLanguage(page, "si")
    await expect(heroHeading).toContainText("යාපනයේ")

    await clickLanguage(page, "en")
    await expect(heroHeading).toContainText(
      /Sri Lanka.s Fruit Farm, Rooted in Jaffna/
    )
  })
})
