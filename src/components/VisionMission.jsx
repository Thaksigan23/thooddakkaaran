"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaEye, FaBullseye, FaCheckCircle } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function VisionMission() {
  const { t } = useTranslation()
  const missionPoints = t("vision_mission.mission.points", {
    returnObjects: true,
  })

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900 transition">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
              {t("vision_mission.tag")}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("vision_mission.headline")}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {t("vision_mission.intro")}
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.18, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div
            variants={fadeUp()}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-md hover:shadow-xl transition"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 text-white text-2xl flex items-center justify-center mb-6 shadow-lg">
              <FaEye />
            </div>

            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("vision_mission.vision.title")}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {t("vision_mission.vision.description")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp()}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-md hover:shadow-xl transition"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-green-500 text-white text-2xl flex items-center justify-center mb-6 shadow-lg">
              <FaBullseye />
            </div>

            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("vision_mission.mission.title")}
            </h3>

            <ul className="space-y-4">
              {(Array.isArray(missionPoints) ? missionPoints : []).map(
                (point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                    <span className="text-lg leading-relaxed">{point}</span>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
