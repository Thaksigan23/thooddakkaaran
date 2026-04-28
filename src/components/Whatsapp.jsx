import { useState } from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"

const WHATSAPP_LINK = import.meta.env.VITE_WHATSAPP_LINK || "https://wa.me/94771234567"

export default function Whatsapp() {
  const [show, setShow] = useState(true)

  return (
    <div className="fixed bottom-5 left-7 z-50 flex items-center gap-3">

      {/* WhatsApp Button */}
      <div className="relative">

        {/* Pulse */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full text-2xl shadow-xl flex items-center justify-center"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Chat Bubble (RIGHT side of button) */}
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-3 pr-8 max-w-xs relative border"
        >
          {/* Close */}
          <button
            onClick={() => setShow(false)}
            aria-label="Close WhatsApp prompt"
            className="absolute top-1 right-2 text-gray-400"
          >
            <FaTimes size={12} />
          </button>

          <p className="text-sm">👋 Need help with farming?</p>
          <p className="text-green-600 text-sm font-semibold">
            Chat with us on WhatsApp
          </p>
        </motion.div>
      )}

    </div>
  )
}