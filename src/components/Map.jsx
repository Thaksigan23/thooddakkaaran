"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa"

const FARM_LOCATION = process.env.NEXT_PUBLIC_CONTACT_LOCATION || "Mirusuvil, Sri Lanka"
const FACTORY_LOCATION = process.env.NEXT_PUBLIC_FACTORY_LOCATION || "Factory Location, Sri Lanka"
const FACTORY_MAP_URL = process.env.NEXT_PUBLIC_FACTORY_MAP_URL
const FARM_MAP_QUERY = encodeURIComponent(FARM_LOCATION)
const FACTORY_MAP_QUERY = encodeURIComponent(FACTORY_LOCATION)

export default function Map() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            {t("map.tag")}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("map.headline")}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            {t("map.intro")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
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
              {t("map.farmTitle")}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-7 mb-6">
              {t("map.farmDescription")}
            </p>

            <div className="space-y-3 text-gray-600 dark:text-gray-400 mb-8">
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t("common.farm")}:
                </span>{" "}
                {FARM_LOCATION}
              </p>

              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t("common.factory")}:
                </span>{" "}
                {FACTORY_LOCATION}
              </p>

              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t("common.speciality")}:
                </span>{" "}
                {t("map.speciality")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps?q=${FARM_MAP_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
              >
                {t("map.farmDirections")}
                <FaArrowRight className="text-sm" />
              </a>
              <a
                href={FACTORY_MAP_URL || `https://www.google.com/maps?q=${FACTORY_MAP_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-green-200 dark:border-white/20 bg-white dark:bg-white/5 text-green-700 dark:text-white px-6 py-3 rounded-xl font-semibold transition hover:bg-green-50 dark:hover:bg-white/10"
              >
                {t("map.factoryDirections")}
                <FaArrowRight className="text-sm" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 min-h-[420px]"
          >
            <iframe
              title={t("map.iframeTitle")}
              src={`https://www.google.com/maps?q=${FARM_MAP_QUERY}&output=embed`}
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
