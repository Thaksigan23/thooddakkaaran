import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Farmer – Jaffna",
      text: "Thooddakkaaran helped improve my pomegranate farm productivity. Their guidance and plant quality significantly increased my harvest.",
    },
    {
      name: "Farmer – Kilinochchi",
      text: "Healthy plants and professional agricultural consultation. I highly recommend Thooddakkaaran for sustainable fruit farming.",
    },
    {
      name: "Farmer – Vavuniya",
      text: "Their modern farming techniques and crop management support helped improve both crop quality and farm income.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Farmers Say
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Hear from farmers across Sri Lanka who trust our farming solutions,
            high-quality plants, and expert consultation services.
          </p>
        </div>
      </Reveal>

      <motion.div
        variants={staggerContainer(0.18, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp()}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300"
          >
            <div className="flex gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
              “{item.text}”
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Verified Farmer
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}