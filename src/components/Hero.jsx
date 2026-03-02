import { motion } from "framer-motion"
import { FaArrowRight, FaChevronDown } from "react-icons/fa"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1603569283847-aa295f0d016a')] bg-cover bg-center"
    >

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center text-white max-w-4xl px-6"
      >

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Growing the Future of
          <span className="block text-red-500">
            Sustainable Agriculture
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Premium pomegranate farming and sustainable agriculture
          solutions helping farmers grow better crops across Sri Lanka.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">

          <a
            href="#services"
            className="flex items-center justify-center gap-2 bg-red-600 px-7 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Explore Services
            <FaArrowRight />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-white text-black px-7 py-3 rounded-xl hover:scale-105 transition-all duration-300"
          >
            Contact Us
          </a>

        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 flex justify-center w-full"
      >
        <a href="#services" className="text-white text-2xl hover:text-red-400 transition">
          <FaChevronDown />
        </a>
      </motion.div>

    </section>
  )
}