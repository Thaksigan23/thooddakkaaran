import { test, expect } from "@playwright/test"

const INVALID_ERROR =
  /Please check the name, email, and message fields and try again/i
const CONFIG_ERROR =
  /Contact form is not configured yet|WhatsApp or email/i
const RATE_LIMIT_ERROR =
  /several messages already|wait a few minutes/i

test.describe("contact form", () => {
  test.describe.configure({ mode: "serial" })

  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact")
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 15_000 })
    await expect(page.locator("section#contact")).toBeVisible()
  })

  test("contact section renders with the form", async ({ page }) => {
    await expect(page.locator('section#contact form')).toBeVisible()
    await expect(page.locator("#contact-name")).toBeVisible()
    await expect(page.locator("#contact-email")).toBeVisible()
    await expect(page.locator("#contact-message")).toBeVisible()
  })

  test("shows localized invalid error for malformed email", async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector("section#contact form")?.setAttribute("novalidate", "")
    })
    await page.locator("#contact-name").fill("Test User")
    await page.locator("#contact-email").fill("foo")
    await page
      .locator("#contact-message")
      .fill("Valid length message for invalid email UI test.")
    await page.locator('section#contact button[type="submit"]').click()

    await expect(page.locator("#contact-form-error")).toBeVisible()
    await expect(page.locator("#contact-form-error")).toHaveText(INVALID_ERROR)
  })

  test("client honeypot short-circuit shows success without API call", async ({
    page,
  }) => {
    let apiCalled = false
    await page.route("**/api/contact", async (route) => {
      apiCalled = true
      await route.continue()
    })

    await page.locator('input[name="company_website"]').evaluate((el) => {
      el.classList.remove("left-[-9999px]")
      el.value = "https://spam.example"
    })
    await page.locator("#contact-name").fill("Bot")
    await page.locator("#contact-email").fill("bot@example.com")
    await page.locator("#contact-message").fill("Should not reach the server.")
    await page.locator('section#contact button[type="submit"]').click()

    await expect(page.locator('section#contact [role="status"]')).toBeVisible({
      timeout: 5_000,
    })
    expect(apiCalled).toBe(false)
  })

  test("shows localized rate limit error after five submissions", async ({
    page,
  }) => {
    await page.locator("#contact-name").fill("Rate Test")
    await page.locator("#contact-email").fill("rate-ui@example.com")
    await page
      .locator("#contact-message")
      .fill("Rate limit UI verification message body.")

    const submit = page.locator('section#contact button[type="submit"]')

    for (let i = 0; i < 5; i++) {
      await submit.click()
      await expect(page.locator("#contact-form-error")).toHaveText(CONFIG_ERROR, {
        timeout: 10_000,
      })
    }

    await submit.click()
    await expect(page.locator("#contact-form-error")).toHaveText(RATE_LIMIT_ERROR, {
      timeout: 10_000,
    })
  })
})
