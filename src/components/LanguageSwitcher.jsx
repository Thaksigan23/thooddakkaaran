import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {

  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center gap-3 text-sm">

      <button
        onClick={() => changeLanguage("en")}
        className="hover:text-green-500"
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("ta")}
        className="hover:text-green-500"
      >
        தமிழ்
      </button>

      <button
        onClick={() => changeLanguage("si")}
        className="hover:text-green-500"
      >
        සිංහල
      </button>

    </div>
  )
}