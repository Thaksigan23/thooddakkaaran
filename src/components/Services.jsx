import { motion } from "framer-motion"
import { FaSeedling, FaLeaf, FaTractor, FaTree } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function Services() {
  const services = [
    {
      title: "Premium Fruit Cultivation",
      description:
        "Sustainable cultivation of pomegranates, dragon fruits, watermelons, and guavas using modern agricultural techniques.",
      icon: <FaSeedling />,
    },
    {
      title: "Farm Consultation",
      description:
        "Professional guidance for Sri Lankan farmers including soil preparation, irrigation planning, and crop management.",
      icon: <FaTractor />,
    },
    {
      title: "High-Yield Plant Saplings",
      description:
        "We supply premium pomegranate and fruit saplings bred for Sri Lankan soil and climate conditions.",
      icon: <FaTree />,
    },
    {
      title: "Sustainable Agriculture",
      description:
        "Eco-friendly farming practices that improve soil fertility and increase harvest productivity.",
      icon: <FaLeaf />,
    },
  ]

  return (
    <section
      id="services"
      className="relative py-24 px-6 bg-green-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-300/20 dark:bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-300/20 dark:bg-red-500/10 rounded-full blur-3xl" />

      <Reveal>
        <div className="relative text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            Our Services
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white leading-tight">
            Our Farming Solutions
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Supporting farmers across Sri Lanka with sustainable agriculture
            solutions, expert consultation, and high-quality plant supply.
          </p>
        </div>
      </Reveal>

      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeUp()}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <div className="h-full rounded-3xl border border-green-100 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 shadow-md hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-red-400 text-white text-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-7">
                {service.description}
              </p>

              <div className="mt-6 w-12 h-1 rounded-full bg-green-500 group-hover:w-20 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}