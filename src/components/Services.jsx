"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaArrowRight } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function Services() {
  const { t } = useTranslation()

  const cards = [
    {
      key: "consultation",
      title: t("services.consultation.title"),
      description: t("services.consultation.description"),
      items: t("services.consultation.items", { returnObjects: true }),
      cta: t("services.consultation.cta"),
    },
    {
      key: "saplings",
      title: t("services.saplings.title"),
      description: t("services.saplings.description"),
      items: t("services.saplings.items", { returnObjects: true }),
      cta: t("services.saplings.cta"),
    },
    {
      key: "sustainable",
      title: t("services.sustainable.title"),
      description: t("services.sustainable.description"),
      items: t("services.sustainable.items", { returnObjects: true }),
    },
    {
      key: "cropManagement",
      title: t("services.cropManagement.title"),
      description: t("services.cropManagement.description"),
      items: t("services.cropManagement.items", { returnObjects: true }),
    },
  ]

  return (
    <section
      id="services"
      className="relative py-24 px-6 bg-green-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-300/20 dark:bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-300/20 dark:bg-red-500/10 rounded-full blur-3xl" />

      <Reveal>
        <div className="relative text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            {t("services.tag")}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white leading-tight">
            {t("services.headline")}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            {t("services.intro")}
          </p>
        </div>
      </Reveal>

      <motion.div
        variants={staggerContainer(0.12, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="relative max-w-7xl mx-auto grid gap-10 lg:grid-cols-2"
      >
        {cards.map((card) => (
          <motion.div
            key={card.key}
            variants={fadeUp()}
            className="rounded-3xl border border-green-100 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {card.description}
            </p>
            <ul
              className={`space-y-3 text-gray-600 dark:text-gray-400 text-sm ${
                card.cta ? "mb-8" : ""
              }`}
            >
              {(Array.isArray(card.items) ? card.items : []).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {card.cta ? (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                {card.cta}
                <FaArrowRight className="text-sm" />
              </a>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
