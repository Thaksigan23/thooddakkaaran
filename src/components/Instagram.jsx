import { motion } from "framer-motion"
import { FaInstagram } from "react-icons/fa"

export default function Instagram() {
  const images = [
    { src: "/images/insta1.jpg" },
    { src: "/images/insta2.png" },
    { src: "/images/insta3.png" },
  ]

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
          Social Media
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Instagram Updates
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Follow our farming journey and explore how we cultivate premium
          fruits across Sri Lanka.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-2xl"
          >
            <img
              src={img.src}
              alt="Instagram Post"
              className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <FaInstagram className="text-white text-3xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-red-500 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
        >
          <FaInstagram />
          Follow on Instagram
        </a>
      </div>
    </section>
  )
}