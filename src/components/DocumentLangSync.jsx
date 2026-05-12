import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const LANG_MAP = {
  en: "en",
  ta: "ta",
  si: "si",
}

export default function DocumentLangSync() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const code = i18n.language?.split("-")[0] || "en"
    document.documentElement.lang = LANG_MAP[code] || code
  }, [i18n.language])

  return null
}
