import { motion, useScroll, useTransform } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import {
  fadeUp,
  slideLeft,
  floatingAnimation,
} from "../utils/animations"

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 120])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background */}
      <motion.div
        style={{
          y,
          backgroundImage: "url('/images/hero.png')",
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/45 to-black/70" />

      {/* Soft glow */}
      <motion.div
        className="absolute top-10 right-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"
        {...floatingAnimation}
      />

      <motion.div
        className="absolute bottom-0 right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-center lg:justify-end">
          <motion.div
            variants={slideLeft(0, 0.9)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp(0.15, 0.6)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-green-100 font-medium">
                Sustainable Agriculture in Sri Lanka
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp(0.25, 0.7)}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white"
            >
              Growing Premium
              <span className="block text-accent">
                Pomegranate & Dragon Fruit
              </span>
              <span className="block text-white">
                with Sustainable Farming Solutions
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={fadeUp(0.35, 0.7)}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg md:text-xl text-green-100/95 leading-relaxed mb-8"
            >
              Thooddakkaaran Private Limited supports farmers across Sri Lanka
              with expert farm consultation, premium fruit cultivation, quality
              saplings, and practical agricultural solutions for long-term yield
              and growth.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp(0.45, 0.7)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
              >
                Explore Services
                <FaArrowRight className="text-sm" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  )
}