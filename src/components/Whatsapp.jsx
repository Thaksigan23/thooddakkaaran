import { FaWhatsapp } from "react-icons/fa"

export default function Whatsapp() {
  return (
    <a
      href="https://wa.me/94700000000"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full text-2xl shadow-lg hover:scale-110 transition"
    >
      <FaWhatsapp />
    </a>
  )
}