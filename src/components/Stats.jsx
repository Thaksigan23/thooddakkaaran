import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function Stats() {
  const stats = [
    { value: 20, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Farmers Supported" },
    { value: 50, suffix: "+", label: "Acres Cultivated" },
    { value: 10, suffix: "K+", label: "Plants Supplied" },
  ]

  const [counts, setCounts] = useState([0, 0, 0, 0])
  const [startCount, setStartCount] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!startCount) return

    const intervals = stats.map((stat, index) => {
      let start = 0
      const end = stat.value
      const duration = 2000
      const incrementTime = 20
      const step = end / (duration / incrementTime)

      return setInterval(() => {
        start += step

        setCounts((prev) => {
          const updated = [...prev]
          updated[index] = Math.min(Math.floor(start), end)
          return updated
        })

        if (start >= end) {
          clearInterval(intervals[index])
        }
      }, incrementTime)
    })

    return () => intervals.forEach(clearInterval)
  }, [startCount])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      <Reveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            Our Impact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Supporting Farmers Across Sri Lanka
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Empowering farmers with modern agricultural knowledge,
            high-quality plants, and sustainable farming solutions.
          </p>
        </div>
      </Reveal>

      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeUp()}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <div className="h-full rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 shadow-md hover:shadow-2xl transition duration-300">
              <h3 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400">
                {counts[index]}
                {stat.suffix}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                {stat.label}
              </p>

              <div className="mt-5 w-12 h-1 mx-auto rounded-full bg-green-500 group-hover:w-20 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}