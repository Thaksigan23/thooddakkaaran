import { motion } from "framer-motion"

export default function Stats() {

  const stats = [
    { number: "20+", text: "Years Experience" },
    { number: "500+", text: "Farmers Supported" },
    { number: "50+", text: "Acres Cultivated" },
    { number: "10K+", text: "Plants Supplied" }
  ]

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-500">

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
          Supporting Farmers Across Sri Lanka
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          Empowering farmers with modern agricultural knowledge,
          high-quality plants, and sustainable farming solutions.
        </p>

      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

        {stats.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow hover:shadow-xl transition"
          >

            {/* Number */}
            <h3 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 group-hover:scale-110 transition">
              {item.number}
            </h3>

            {/* Label */}
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              {item.text}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  )
}