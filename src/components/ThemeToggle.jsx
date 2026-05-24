"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaMoon, FaSun } from "react-icons/fa"

export default function ThemeToggle() {
  const { t } = useTranslation()
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Client-only state — must be derived after mount so server HTML is stable.
    const saved = localStorage.getItem("theme")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(saved === "dark")
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (darkMode) {
      document.documentElement.classList.add("dark")
      return
    }

    document.documentElement.classList.remove("dark")
  }, [darkMode, mounted])

  const toggleTheme = () => {

    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }

    setDarkMode(!darkMode)
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={
        darkMode
          ? t("theme_toggle.switchToLight")
          : t("theme_toggle.switchToDark")
      }
      title={
        darkMode
          ? t("theme_toggle.switchToLight")
          : t("theme_toggle.switchToDark")
      }
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 transition"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  )
}