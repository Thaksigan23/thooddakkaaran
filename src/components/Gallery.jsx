import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer, scaleIn } from "../utils/animations"

export default function Gallery() {
  const images = [
    { src: "/images/gal1.png", title: "Premium Fruit Cultivation" },
    { src: "/images/gal2.png", title: "Healthy Farm Growth" },
    { src: "/images/gal3.png", title: "Quality Harvesting" },
    { src: "/images/gal4.png", title: "Modern Farming Techniques" },
    { src: "/images/gal5.png", title: "Sustainable Agriculture" },
    { src: "/images/gal6.png", title: "Farmer Support Services" },
  ]

  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section
      id="gallery"
      className="py-24 px-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-500"
    >
      <Reveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            Our Gallery
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Farm Gallery
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Explore our farms, fruit cultivation, and the sustainable
            agricultural practices that support farmers across Sri Lanka.
          </p>
        </div>
      </Reveal>

      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={fadeUp()}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(img)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-2xl"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="absolute bottom-0 left-0 p-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-white text-lg font-semibold">
                {img.title}
              </h3>
              <p className="text-green-200 text-sm mt-1">
                Click to preview
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
              aria-label="Close preview"
            >
              <FaTimes />
            </button>

            <motion.div
              variants={scaleIn(0, 0.3)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />

              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}