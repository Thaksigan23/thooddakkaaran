import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      home: "Home",
      services: "Services",
      contact: "Contact"
    }
  },
  ta: {
    translation: {
      home: "முகப்பு",
      services: "சேவைகள்",
      contact: "தொடர்பு"
    }
  },
  si: {
    translation: {
      home: "මුල් පිටුව",
      services: "සේවාවන්",
      contact: "සම්බන්ධ වන්න"
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
})

export default i18n