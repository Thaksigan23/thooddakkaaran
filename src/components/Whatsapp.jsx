import { useState } from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"

export default function Whatsapp() {

  const [show, setShow] = useState(true)

  return (
    <div className="fixed bottom-5 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat Preview Bubble */}
      {show && (
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-4 max-w-xs relative border border-gray-200 dark:border-gray-700">

          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={12} />
          </button>

          <p className="text-sm text-gray-700 dark:text-gray-200">
            👋 Need help with pomegranate farming?
          </p>

          <p className="text-sm text-green-600 font-medium mt-1">
            Chat with us on WhatsApp
          </p>

        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full text-2xl shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp />
      </a>

    </div>
  )
}