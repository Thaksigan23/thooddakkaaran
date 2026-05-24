import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import ta from "./locales/ta.json"
import si from "./locales/si.json"

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "si", label: "Sinhala", nativeLabel: "සිංහල" },
]

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code)
export const DEFAULT_LANGUAGE = "en"
export const STORAGE_KEY = "thooddakkaaran_language"

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  si: { translation: si },
}

function detectInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED_LANGUAGE_CODES.includes(stored)) return stored
  } catch {
    // localStorage may be unavailable (privacy mode); fall through.
  }

  const navigatorLang =
    typeof window.navigator !== "undefined" && window.navigator.language
      ? window.navigator.language.toLowerCase().split("-")[0]
      : ""

  if (SUPPORTED_LANGUAGE_CODES.includes(navigatorLang)) return navigatorLang
  return DEFAULT_LANGUAGE
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false },
  })
}

export function syncLanguageFromStorage() {
  if (typeof window === "undefined") return
  const detected = detectInitialLanguage()
  if (i18n.language !== detected) {
    i18n.changeLanguage(detected)
  }
}

export function persistLanguage(code) {
  if (typeof window === "undefined") return
  if (!SUPPORTED_LANGUAGE_CODES.includes(code)) return
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // ignore
  }
}

export default i18n
