"use client"

import { motion } from "framer-motion"

export default function About() {
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
            alt="Thooddakkaaran farm in Jaffna"
            className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold text-green-600">
              Our Story
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Jaffna · Northern Province
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Our Story
          </h2>

          <div className="space-y-5 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            <p>
              Thooddakkaaran, which means &quot;the one who tends the
              garden&quot; in Tamil, was built on a straightforward idea: Sri
              Lanka deserves premium-quality fruits and natural products grown
              right here on our own soil.
            </p>
            <p>
              Based in Jaffna, Northern Province, we cultivate pomegranates,
              dragon fruit, watermelon, and guava using sustainable farming
              practices that respect both the land and the people who work it.
              What started as a farming operation has grown into something
              broader — a trusted agricultural brand with its own line of
              natural products including pure cow ghee, drinking yogurt, and
              freshly pressed pomegranate juice, all crafted from the fruits and
              produce of our own farm.
            </p>
            <p>
              We work with wholesale buyers, retailers, hotels, individual
              consumers, and fellow farmers across Sri Lanka. Whatever your need
              — whether it is a weekly fruit order, a bulk supply agreement,
              quality saplings, or expert farm consultation — Thooddakkaaran is
              your partner from the ground up.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
