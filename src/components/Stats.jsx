import { motion } from "framer-motion"

export default function Stats() {

  const stats = [
    { number: "20+", text: "Years Experience" },
    { number: "500+", text: "Farmers Supported" },
    { number: "50+", text: "Acres Cultivated" },
    { number: "10K+", text: "Plants Supplied" }
  ]

  return (
    <section className="py-20 text-center bg-white">

      <h2 className="text-4xl font-bold text-center mb-12">
  Supporting Farmers Across Sri Lanka
</h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">

        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-6"
          >

            <h1 className="text-5xl font-bold text-green-700">
              {item.number}
            </h1>

            <p className="mt-2 text-gray-600">
              {item.text}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  )
}