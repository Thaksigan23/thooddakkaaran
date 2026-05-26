"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+94 70 000 0000"
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@thooddakkaaran.com"
const CONTACT_LOCATION = process.env.NEXT_PUBLIC_CONTACT_LOCATION || "Mirusuvil, Sri Lanka"
const FACTORY_LOCATION = process.env.NEXT_PUBLIC_FACTORY_LOCATION || "Factory Location - Add in .env"
const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`
const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`

export default function Contact() {
  const { t } = useTranslation()
  const form = useRef()
  const abortRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort()
        abortRef.current = null
      }
    }
  }, [])

  const errorMessageFor = (code) => {
    switch (code) {
      case "unconfigured":
        return t("contact.form.configError")
      case "invalid":
        return t("contact.form.invalidError")
      case "rate_limited":
        return t("contact.form.rateLimitError")
      default:
        return t("contact.form.sendError")
    }
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    setError("")

    const formEl = form.current
    if (!formEl) return

    const elements = formEl.elements
    const honeypot = elements.namedItem("company_website")
    if (honeypot && "value" in honeypot && honeypot.value) {
      setSuccess(true)
      formEl.reset()
      return
    }

    const name = elements.namedItem("name")?.value || ""
    const email = elements.namedItem("email")?.value || ""
    const message = elements.namedItem("message")?.value || ""

    setLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
        signal: controller.signal,
      })

      let body = null
      try {
        body = await res.json()
      } catch {
        body = null
      }

      if (res.ok && body?.ok === true) {
        setSuccess(true)
        formEl.reset()
        return
      }

      setError(errorMessageFor(body?.error))
    } catch (err) {
      if (err?.name === "AbortError") return
      setError(t("contact.form.sendError"))
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null
      }
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("contact.headline")}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("contact.intro")}
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp()} className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t("contact.getInTouch")}
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-green-600" />
                  <a
                    href={CONTACT_PHONE_HREF}
                    aria-label={t("contact.callAria", { phone: CONTACT_PHONE })}
                    className="hover:text-green-600 transition-colors"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-green-600" />
                  <a
                    href={CONTACT_EMAIL_HREF}
                    aria-label={t("contact.emailAria", { email: CONTACT_EMAIL })}
                    className="hover:text-green-600 transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{CONTACT_LOCATION}</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {t("common.factory")}:
                    </span>{" "}
                    {FACTORY_LOCATION}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {t("contact.whyContact")}
              </h3>

              <p className="text-sm text-green-100">
                {t("contact.whyContactBody")}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp()}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            {success ? (
              <div className="text-center py-10" role="status" aria-live="polite">
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  {t("contact.form.successTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("contact.form.successBody")}
                </p>
              </div>
            ) : (
              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
                aria-busy={loading}
              >
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute opacity-0 left-[-9999px] top-0 h-px w-px overflow-hidden"
                />

                <label htmlFor="contact-name" className="sr-only">
                  {t("contact.form.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder={t("contact.form.name")}
                  required
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "contact-form-error" : undefined}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label htmlFor="contact-email" className="sr-only">
                  {t("contact.form.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder={t("contact.form.email")}
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "contact-form-error" : undefined}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label htmlFor="contact-message" className="sr-only">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder={t("contact.form.message")}
                  required
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "contact-form-error" : undefined}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  aria-disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
                >
                  {loading ? t("contact.form.sending") : t("contact.form.send")}
                </button>
                <p className="sr-only" aria-live="polite">
                  {loading ? t("contact.form.sendingAria") : ""}
                </p>
                {error ? (
                  <p
                    id="contact-form-error"
                    role="alert"
                    className="text-sm text-red-600 dark:text-red-400"
                  >
                    {error}
                  </p>
                ) : null}
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
