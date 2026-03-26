import { useState } from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"

export default function Whatsapp() {
  const [show, setShow] = useState(true)

  return (
    <div className="fixed bottom-5 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat Bubble */}
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-4 pr-10 max-w-xs relative border border-gray-200 dark:border-gray-700 backdrop-blur-md"
        >
          {/* Close Button */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
          >
            <FaTimes size={14} />
          </button>

          {/* Message */}
          <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
            👋 Need help with farming?
          </p>

          <p className="text-sm text-green-600 font-semibold mt-1">
            Chat with us on WhatsApp
          </p>
        </motion.div>
      )}

      {/* WhatsApp Button */}
      <div className="relative">

        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>

        <a
          href="https://wa.me/94771234567"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full text-2xl shadow-xl flex items-center justify-center transition transform hover:scale-110"
        >
          <FaWhatsapp />
        </a>

      </div>

    </div>
  )
}