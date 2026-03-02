import { motion, useScroll, useTransform } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

export default function Hero() {

  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598514983318-2f64f8f4796c')] bg-cover bg-center"
      ></motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center text-white max-w-3xl px-6"
      >

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Growing the Future of
          <span className="block text-accent">
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
            className="flex items-center justify-center gap-2 bg-accent px-7 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition"
          >
            Explore Services
            <FaArrowRight />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-white text-black px-7 py-3 rounded-xl hover:scale-105 transition"
          >
            Contact Us
          </a>

        </div>

      </motion.div>

    </section>
  )
}