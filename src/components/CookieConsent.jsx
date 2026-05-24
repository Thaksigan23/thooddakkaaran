"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "thooddakkaaran_analytics_consent"
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-CL1706T4YQ"

function injectGa() {
  if (typeof window === "undefined" || window.gtag) return
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag("js", new Date())
  gtag("config", GA_ID)
}

function readConsentBannerOpen() {
  const host = window.location.hostname
  if (host === "localhost" || host === "127.0.0.1") return false
  const choice = localStorage.getItem(STORAGE_KEY)
  return choice !== "granted" && choice !== "denied"
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Client-only state — must be derived after mount so server HTML is stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(readConsentBannerOpen())
    const host = window.location.hostname
    if (host === "localhost" || host === "127.0.0.1") return
    if (localStorage.getItem(STORAGE_KEY) === "granted") injectGa()
  }, [])

  const grant = () => {
    localStorage.setItem(STORAGE_KEY, "granted")
    setOpen(false)
    injectGa()
  }

  const deny = () => {
    localStorage.setItem(STORAGE_KEY, "denied")
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center p-4 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="pointer-events-auto max-w-lg w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl p-5 text-gray-900 dark:text-gray-100">
        <h2 id="cookie-consent-title" className="text-lg font-semibold mb-2">
          Analytics cookies
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          We use Google Analytics to understand how visitors use this site. This is optional —
          you can continue with essential cookies only.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            onClick={deny}
          >
            Essential only
          </button>
          <button
            type="button"
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
            onClick={grant}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  )
}
