"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaArrowRight, FaWhatsapp } from "react-icons/fa"
import Reveal from "./Reveal"
import GrowSectionImage from "./GrowSectionImage"
import { fadeUp, staggerContainer } from "../utils/animations"
import { WHATSAPP_LINK } from "../constants/contact"
import { ECOMMERCE_STORE_URL } from "../constants/site"

const FRUIT_KEYS = ["pomegranate", "dragonFruit", "watermelon", "guava"]
const FRUIT_IMAGES = {
  pomegranate: {
    image: "/images/grow/pomegranate.png",
    imageWebp: "/images/grow/pomegranate.webp",
    imageFallback: "/images/gal1.png",
  },
  dragonFruit: {
    image: "/images/grow/dragon-fruit.png",
    imageWebp: "/images/grow/dragon-fruit.webp",
    imageFallback: "/images/gal2.png",
  },
  watermelon: {
    image: "/images/grow/watermelon.png",
    imageWebp: "/images/grow/watermelon.webp",
    imageFallback: "/images/gal3.png",
  },
  guava: {
    image: "/images/grow/guava.png",
    imageWebp: "/images/grow/guava.webp",
    imageFallback: "/images/gal4.png",
  },
}

const RANGE_KEYS = ["setYogurt", "drinkingYogurt", "fruitDrinks", "cordials"]
const DAIRY_KEYS = ["curd", "ghee", "paneer"]

export default function Products() {
  const { t } = useTranslation()

  const fruits = FRUIT_KEYS.map((key) => ({
    key,
    title: t(`products.fruits.${key}.title`),
    description: t(`products.fruits.${key}.description`),
    ...FRUIT_IMAGES[key],
  }))

  const productRanges = RANGE_KEYS.map((key) => ({
    key,
    title: t(`products.ranges.${key}.title`),
    intro: t(`products.ranges.${key}.intro`),
    flavoursLabel: t(`products.ranges.${key}.flavoursLabel`),
    items: t(`products.ranges.${key}.items`, { returnObjects: true }),
  }))

  const dairyProducts = DAIRY_KEYS.map((key) => ({
    key,
    title: t(`products.dairy.${key}.title`),
    intro: t(`products.dairy.${key}.intro`),
    sizes: t(`products.dairy.${key}.sizes`, { returnObjects: true }),
  }))

  return (
    <section
      id="products"
      className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white"
    >
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-16 left-10 h-56 w-56 rounded-full bg-emerald-300/70 dark:bg-emerald-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-lime-300/60 dark:bg-lime-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-white/15 bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200 mb-5">
              {t("products.tag")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              {t("products.headline")}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-8">
              {t("products.intro")}
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-7 mt-5 max-w-2xl mx-auto border-t border-emerald-200/60 dark:border-white/10 pt-5">
              {t("products.ecommerceNote")}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t("products.fruitsHeadline")}
            </h3>
            <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 leading-8 mb-12">
              {t("products.fruitsIntro")}
            </p>

            <motion.div
              variants={staggerContainer(0.12, 0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {fruits.map((fruit) => (
                <motion.div
                  key={fruit.key}
                  variants={fadeUp()}
                  className="rounded-[1.75rem] border border-emerald-100 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-xl"
                >
                  <GrowSectionImage
                    primarySrc={fruit.image}
                    alternateSrc={fruit.imageWebp}
                    fallbackSrc={fruit.imageFallback}
                    alt={fruit.title}
                    className="h-52 sm:h-56 w-full object-cover"
                  />
                  <div className="p-8">
                    <h4 className="text-xl font-bold mb-3">{fruit.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-7 mb-6">
                      {fruit.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        {t("products.fruitsCtaSupply")}
                      </a>
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-xl border border-emerald-200 dark:border-white/20 bg-white/70 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-200 transition hover:bg-emerald-50 dark:hover:bg-white/10"
                      >
                        {t("products.fruitsCtaSaplings")}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {t("products.naturalHeadline")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-8">
              {t("products.naturalIntro")}
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.1, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {productRanges.map((range) => (
            <motion.div
              key={range.key}
              variants={fadeUp()}
              className="rounded-[1.75rem] border border-emerald-100 dark:border-white/10 bg-white/80 dark:bg-black/20 p-8 backdrop-blur-md shadow-xl"
            >
              <h4 className="text-xl font-bold mb-3">{range.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-7 mb-4">
                {range.intro}
              </p>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                {range.flavoursLabel}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-6">
                {(Array.isArray(range.items) ? range.items : []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t("common.enquire")}
                <FaArrowRight className="text-xs" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("products.dairyHeadline")}
          </h3>
          <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 leading-8 mb-10">
            {t("products.dairyIntro")}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.1, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {dairyProducts.map((d) => (
            <motion.div
              key={d.key}
              variants={fadeUp()}
              className="rounded-[1.75rem] border border-emerald-100 dark:border-white/10 bg-white/80 dark:bg-black/20 p-8 backdrop-blur-md shadow-xl"
            >
              <h4 className="text-xl font-bold mb-3">{d.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-7 mb-4">
                {d.intro}
              </p>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                {t("common.available_sizes")}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-6">
                {(Array.isArray(d.sizes) ? d.sizes : []).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t("common.enquire")}
                <FaArrowRight className="text-xs" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-emerald-200 dark:border-white/10 bg-emerald-600/10 dark:bg-emerald-900/30 px-8 py-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t("products.ctaHeadline")}
          </h3>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8 leading-8">
            {t("products.ctaIntro")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              {t("products.ctaContact")}
              <FaArrowRight className="text-sm" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 dark:border-emerald-400 bg-white/90 dark:bg-white/10 px-8 py-3.5 font-semibold text-emerald-800 dark:text-emerald-200 transition hover:bg-white dark:hover:bg-white/15"
            >
              <FaWhatsapp className="text-lg" />
              {t("products.ctaWhatsapp")}
            </a>
            {ECOMMERCE_STORE_URL ? (
              <a
                href={ECOMMERCE_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/80 dark:bg-white/5 px-8 py-3.5 font-semibold text-emerald-900 dark:text-emerald-100 transition hover:bg-emerald-100/80 dark:hover:bg-white/10"
              >
                {t("products.ctaShop")}
                <FaArrowRight className="text-sm" />
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
