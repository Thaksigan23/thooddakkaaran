import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+94 70 000 0000"
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "info@thooddakkaaran.com"
const CONTACT_LOCATION = import.meta.env.VITE_CONTACT_LOCATION || "Mirusuvil, Sri Lanka"
const FACTORY_LOCATION = import.meta.env.VITE_FACTORY_LOCATION || "Factory Location - Add in .env"
const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`
const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`

export default function Contact() {
  const form = useRef()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const sendEmail = (e) => {
    e.preventDefault()
    setError("")

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("Contact form is not configured yet. Please try WhatsApp or email.")
      return
    }

    setLoading(true)

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false)
          setSuccess(true)
          form.current.reset()
        },
        () => {
          setLoading(false)
          setError("Failed to send message. Please try again.")
        }
      )
  }

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Enquire about fruits, dairy, and beverages, request wholesale
              pricing, book a farm consultation, or ask about saplings — we
              supply and deliver across Sri Lanka.
            </p>
          </div>
        </Reveal>

        {/* Layout */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >

          {/* LEFT */}
          <motion.div variants={fadeUp()} className="space-y-6">

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Get in Touch
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">

                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-green-600" />
                  <a
                    href={CONTACT_PHONE_HREF}
                    aria-label={`Call us at ${CONTACT_PHONE}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-green-600" />
                  <a
                    href={CONTACT_EMAIL_HREF}
                    aria-label={`Email us at ${CONTACT_EMAIL}`}
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
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Factory:</span>{" "}
                    {FACTORY_LOCATION}
                  </span>
                </div>

              </div>
            </div>

            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                Why Contact Us?
              </h3>

              <p className="text-sm text-green-100">
                From supply enquiries and bulk pricing to saplings and on-farm
                guidance — tell us what you need and we will respond promptly.
              </p>
            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp()}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >

            {success ? (
              <div className="text-center py-10" role="status" aria-live="polite">
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  ✅ Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We will contact you soon.
                </p>
              </div>
            ) : (

              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
                aria-busy={loading}
              >

                <label htmlFor="contact-name" className="sr-only">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "contact-form-error" : undefined}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label htmlFor="contact-email" className="sr-only">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "contact-form-error" : undefined}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label htmlFor="contact-message" className="sr-only">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder="Your Message"
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
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <p className="sr-only" aria-live="polite">
                  {loading ? "Sending your message" : ""}
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