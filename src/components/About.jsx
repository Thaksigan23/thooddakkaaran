"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

export default function About() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="py-24 px-6 bg-white dark:bg-gray-950 transition"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="/images/gal5.png"
            alt={t("about.imageAlt")}
            className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold text-green-600">
              {t("about.story")}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("about.location")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            {t("about.headline")}
          </h2>

          <div className="space-y-5 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
