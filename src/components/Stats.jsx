import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Stats() {

  const stats = [
    { value: 20, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Farmers Supported" },
    { value: 50, suffix: "+", label: "Acres Cultivated" },
    { value: 10, suffix: "K+", label: "Plants Supplied" }
  ]

  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {

    const intervals = stats.map((stat, index) => {

      let start = 0
      const end = stat.value
      const duration = 2000
      const incrementTime = 20
      const step = end / (duration / incrementTime)

      return setInterval(() => {

        start += step

        setCounts(prev => {
          const newCounts = [...prev]
          newCounts[index] = Math.min(Math.floor(start), end)
          return newCounts
        })

        if (start >= end) clearInterval(intervals[index])

      }, incrementTime)

    })

    return () => intervals.forEach(clearInterval)

  }, [])

  return (

    <section className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-500">

      <div className="text-center max-w-3xl mx-auto mb-16">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
          Supporting Farmers Across Sri Lanka
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          Empowering farmers with modern agricultural knowledge,
          high-quality plants, and sustainable farming solutions.
        </p>

      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

        {stats.map((stat, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow hover:shadow-xl transition"
          >

            <h3 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400">
              {counts[index]}{stat.suffix}
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              {stat.label}
            </p>

          </motion.div>

        ))}

      </div>

    </section>

  )
}