import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { I18nextProvider } from "react-i18next"
import "./index.css"
import App from "./App.jsx"
import i18n from "./i18n/i18n"
import AOS from "aos"
import "aos/dist/aos.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>
)

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
AOS.init({ disable: reduceMotion })
