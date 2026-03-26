import { motion } from "framer-motion"
import { FaLeaf, FaSeedling, FaUsers, FaChartLine } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaLeaf />,
      title: "5+ Years of Farming Experience",
      desc: "Our team understands the realities of modern agriculture and sustainable farming practices across Sri Lanka.",
    },
    {
      icon: <FaSeedling />,
      title: "Farm-to-Product Integrity",
      desc: "Because we grow our own fruits, we ensure freshness, purity, and natural quality in every product.",
    },
    {
      icon: <FaUsers />,
      title: "Strategic Farmer Partnerships",
      desc: "We work closely with local farmers, building long-term partnerships that support collective agricultural growth.",
    },
    {
      icon: <FaChartLine />,
      title: "Eco-Friendly Agriculture",
      desc: "Our sustainable farming methods improve soil health, conserve resources, and increase long-term productivity.",
    },
  ]

  return (
    <section className="relative py-24 px-6 bg-gray-50 dark:bg-gray-900 transition overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 dark:bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-200/20 dark:bg-red-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
              Why Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white leading-tight">
              Why Choose Thooddakkaaran
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We deliver reliable farming solutions and trusted produce that
              reflect the true value of sustainable agriculture in Sri Lanka.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp()}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group h-full"
            >
              <div className="h-full bg-white/90 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-red-400 text-white text-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-7">
                  {item.desc}
                </p>

                <div className="mt-6 w-12 h-1 rounded-full bg-green-500 group-hover:w-20 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}