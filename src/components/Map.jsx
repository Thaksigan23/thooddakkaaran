import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa"

export default function Map() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            Our Location
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Visit Our Farm
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Visit our farm in Mirusuvil, Sri Lanka, where we cultivate premium
            pomegranates and support farmers with modern agricultural solutions.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-red-400 text-white text-2xl flex items-center justify-center mb-6 shadow-lg">
              <FaMapMarkerAlt />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Thooddakkaaran Farm
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-7 mb-6">
              Located in Mirusuvil, Sri Lanka, our farm is dedicated to premium
              fruit cultivation, sustainable agriculture, and farmer support.
            </p>

            <div className="space-y-3 text-gray-600 dark:text-gray-400 mb-8">
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Location:
                </span>{" "}
                Mirusuvil, Sri Lanka
              </p>

              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Speciality:
                </span>{" "}
                Pomegranate & Fruit Cultivation
              </p>
            </div>

            <a
              href="https://www.google.com/maps?q=Mirusuvil,Sri Lanka"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
            >
              Get Directions
              <FaArrowRight className="text-sm" />
            </a>
          </motion.div>

          {/* Right Map */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 min-h-[420px]"
          >
            <iframe
              title="Thooddakkaaran Farm Location"
              src="https://www.google.com/maps?q=Mirusuvil,Sri Lanka&output=embed"
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}