"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaArrowUp } from "react-icons/fa"

export default function BackToTop() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {

    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)

  }, [])

  const scrollToTop = () => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    })
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        aria-label={t("back_to_top.label")}
        title={t("back_to_top.label")}
        className="fixed bottom-5 right-7 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 z-50"
      >
        <FaArrowUp />
      </button>
    )
  )
}