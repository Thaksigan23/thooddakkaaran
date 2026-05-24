"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"
import { WHATSAPP_LINK } from "../constants/contact"

export default function Whatsapp() {
  const { t } = useTranslation()
  const [show, setShow] = useState(true)

  return (
    <div className="fixed bottom-5 left-7 z-50 flex items-center gap-3">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label={t("whatsapp.buttonAria")}
          title={t("whatsapp.buttonTitle")}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full text-2xl shadow-xl flex items-center justify-center"
        >
          <FaWhatsapp />
        </a>
      </div>

      {show && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-3 pr-8 max-w-xs relative border"
        >
          <button
            onClick={() => setShow(false)}
            aria-label={t("whatsapp.closeAria")}
            className="absolute top-1 right-2 text-gray-400"
          >
            <FaTimes size={12} />
          </button>

          <p className="text-sm">{t("whatsapp.promptLine1")}</p>
          <p className="text-green-600 text-sm font-semibold">
            {t("whatsapp.promptLine2")}
          </p>
        </motion.div>
      )}
    </div>
  )
}
