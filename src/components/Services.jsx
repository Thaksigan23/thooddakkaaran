"use client"

import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function Services() {
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
            Farming Services
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white leading-tight">
            Expert Support for Sri Lankan Farmers
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Thooddakkaaran is more than a fruit farm. We work closely with
            farmers across Sri Lanka, sharing our knowledge, saplings, and
            hands-on experience to help you grow premium fruits successfully and
            sustainably.
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
        <motion.div
          variants={fadeUp()}
          className="rounded-3xl border border-green-100 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Farm Consultation
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Guidance for farmers starting or improving pomegranate, dragon fruit,
            or guava cultivation. Available on-site in Jaffna and remotely
            across Sri Lanka.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm mb-8">
            {[
              "Soil suitability assessment",
              "Irrigation planning for dry and intermediate zones",
              "Fertilisation and nutrient guidance",
              "Pest and disease management",
              "Yield planning and harvest guidance",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Book a Farm Consultation
            <FaArrowRight className="text-sm" />
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp()}
          className="rounded-3xl border border-green-100 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            High-Yield Sapling Supply
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            We supply high-quality saplings from our Jaffna nursery, selected and
            grown to suit Sri Lanka&apos;s climate and ensure reliable yield.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm mb-8">
            {[
              "Grafted saplings for faster fruiting and consistent yield",
              "Field-ready plants (3–6 months old)",
              "Bulk supply for commercial farms",
              "Planting guidance included",
              "Minimum order: 25 saplings",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Request Sapling Availability
            <FaArrowRight className="text-sm" />
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp()}
          className="rounded-3xl border border-green-100 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sustainable Farming Practices
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            We help farmers build healthier soil and reduce reliance on
            chemicals using practical, field-tested methods.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            {[
              "Low-chemical pest control approaches",
              "Drip irrigation guidance for water efficiency",
              "Composting and organic soil improvement",
              "Mulching techniques for moisture retention",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp()}
          className="rounded-3xl border border-green-100 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Management Support
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Ongoing support from planting to harvest, so you are never managing
            your farm alone.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            {[
              "Custom crop calendars based on region",
              "Monthly farm visits (Jaffna and nearby areas)",
              "Remote support via WhatsApp",
              "Post-harvest handling and storage guidance",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
