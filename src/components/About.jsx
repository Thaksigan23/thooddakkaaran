import { motion } from "framer-motion"

export default function About() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 transition">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT - Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="/images/gal5.png"
            alt="Farm"
            className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
          />

          {/* small overlay box */}
          <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold text-green-600">
              Sustainable Farming
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Modern + Traditional Techniques
            </p>
          </div>
        </motion.div>

        {/* RIGHT - Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            About Thooddakkaaran
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            Thooddakkaaran Private Limited is a leading agri-based company in
            Sri Lanka specializing in premium pomegranate and dragon fruit
            cultivation. We combine traditional farming knowledge with modern
            agricultural techniques to ensure high-quality, nutritious produce.
          </p>

          {/* Points */}
          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-green-500"></span>
              <p className="text-gray-600 dark:text-gray-400">
                Sustainable and eco-friendly farming practices
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-green-500"></span>
              <p className="text-gray-600 dark:text-gray-400">
                Premium quality fruit cultivation
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-green-500"></span>
              <p className="text-gray-600 dark:text-gray-400">
                Expert support for Sri Lankan farmers
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}