"use client"

import { useEffect, useState } from "react"
import { I18nextProvider } from "react-i18next"
import { MotionConfig } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"

import i18n, { syncLanguageFromStorage } from "../../i18n/i18n"
import Loader from "../Loader"

export default function AppProviders({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    syncLanguageFromStorage()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    AOS.init({ disable: reduced })

    let cancelled = false
    const minShow = reduced ? 150 : 400
    const maxShow = reduced ? 400 : 1000

    const fonts =
      document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve(undefined)

    const t0 = performance.now()
    Promise.all([fonts, new Promise((r) => setTimeout(r, minShow))]).then(() => {
      if (cancelled) return
      const elapsed = performance.now() - t0
      const remaining = Math.max(0, maxShow - elapsed)
      setTimeout(() => {
        if (!cancelled) setLoading(false)
      }, remaining)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="user">
        {loading ? <Loader /> : null}
        {children}
      </MotionConfig>
    </I18nextProvider>
  )
}
