import { motion, useScroll, useTransform } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

export default function Hero() {

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (

    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >

      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center"
      />

      {/* Floating Color Blobs */}

      <motion.div
        className="absolute w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-30 top-20 left-20"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-30 bottom-10 right-20"
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-20 top-40 right-40"
        animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 dark:from-black/80 dark:via-black/60 dark:to-black/40"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center text-white max-w-3xl px-6"
      >

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
Sustainable Farming Solutions
<span className="block text-accent">
Premium Fruit Cultivation in Sri Lanka
</span>
</h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
Thooddakkaaran Private Limited empowers farmers across Sri Lanka with
sustainable agriculture solutions, premium pomegranate and dragon fruit
cultivation, expert farm consultation, and high-yield fruit saplings.
</p>

        <div className="flex flex-col md:flex-row justify-center gap-4">

          <a
            href="#services"
            className="flex items-center justify-center gap-2 bg-red-500 px-7 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition"
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