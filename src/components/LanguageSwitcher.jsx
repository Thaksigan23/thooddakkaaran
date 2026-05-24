"use client"

import { useTranslation } from "react-i18next"
import { SUPPORTED_LANGUAGES, persistLanguage } from "../i18n/i18n"

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const activeCode = (i18n.language || "en").split("-")[0]

  const changeLanguage = (lng) => {
    if (lng === activeCode) return
    i18n.changeLanguage(lng)
    persistLanguage(lng)
  }

  return (
    <div
      className="flex items-center gap-2 text-sm"
      role="group"
      aria-label={t("language_switcher.label")}
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = activeCode === lang.code
        const label = t(`language_switcher.${lang.code}`)
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            aria-pressed={isActive}
            data-lang={lang.code}
            lang={lang.code}
            title={lang.label}
            className={`px-2 py-1 rounded-md transition ${
              isActive
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
