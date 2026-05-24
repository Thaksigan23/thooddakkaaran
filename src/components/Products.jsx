"use client"

import { motion } from "framer-motion"
import { FaArrowRight, FaWhatsapp } from "react-icons/fa"
import Reveal from "./Reveal"
import GrowSectionImage from "./GrowSectionImage"
import { fadeUp, staggerContainer } from "../utils/animations"
import { WHATSAPP_LINK } from "../constants/contact"
import { ECOMMERCE_STORE_URL } from "../constants/site"

/** Original farm photos in public/images/grow/ (see README there). */
const fruits = [
  {
    title: "Pomegranate, Our Signature Harvest",
    description:
      "Jaffna's dry, sun-rich climate produces pomegranates with exceptional sweetness, deep ruby-red arils, and thick skin that travels well. Our pomegranates are available for wholesale bulk supply, retail packaging, and direct home delivery across Sri Lanka.",
    image: "/images/grow/pomegranate.png",
    imageWebp: "/images/grow/pomegranate.webp",
    imageFallback: "/images/gal1.png",
  },
  {
    title: "Dragon Fruit",
    description:
      "We cultivate dragon fruit suited to Sri Lanka's tropical conditions. Increasingly popular among health-conscious consumers, hotels, and juice bars, our dragon fruit is vibrant, fresh, and supplied directly from our farm.",
    image: "/images/grow/dragon-fruit.png",
    imageWebp: "/images/grow/dragon-fruit.webp",
    imageFallback: "/images/gal2.png",
  },
  {
    title: "Watermelon",
    description:
      "Grown under Jaffna's warm sun and open skies, our watermelons are naturally sweet, juicy, and refreshing. Ideal for supermarkets, fruit vendors, hotels, and bulk seasonal supply, each harvest is carefully cultivated for freshness and quality.",
    image: "/images/grow/watermelon.png",
    imageWebp: "/images/grow/watermelon.webp",
    imageFallback: "/images/gal3.png",
  },
  {
    title: "Guava",
    description:
      "Our farm-grown guavas are rich in flavour, naturally aromatic, and packed with nutrients. Harvested fresh and supplied directly from our fields, they are perfect for retail markets, juice shops, and health-conscious consumers across Sri Lanka.",
    image: "/images/grow/guava.png",
    imageWebp: "/images/grow/guava.webp",
    imageFallback: "/images/gal4.png",
  },
]

const productRanges = [
  {
    title: "Set Yogurt (80g)",
    intro:
      "Prepared using fresh milk and natural fruit flavours, our 80g set yogurts offer a rich texture and satisfying taste in convenient individual portions — ideal for school tuck shops, supermarkets, hotel buffets, and daily consumption.",
    flavoursLabel: "Available in 4 flavours",
    items: [
      "Pomegranate Set Yogurt 80g",
      "Vanilla Set Yogurt 80g",
      "Pineapple Set Yogurt 80g",
      "Carrot Set Yogurt 80g",
    ],
  },
  {
    title: "Drinking Yogurt (200ml)",
    intro:
      "Our drinking yogurts are light, refreshing, and crafted without artificial thickeners or flavour enhancers. Available in a variety of flavours, they are perfect for everyday refreshment, cafés, canteens, hotels, and retail outlets.",
    flavoursLabel: "Available in 6 flavours",
    items: [
      "Pomegranate Drinking Yogurt 200ml",
      "Pineapple Drinking Yogurt 200ml",
      "Wood Apple Drinking Yogurt 200ml",
      "Mango Drinking Yogurt 200ml",
      "Chocolate Drinking Yogurt 200ml",
      "Vanilla Drinking Yogurt 200ml",
    ],
  },
  {
    title: "Fruit Drinks (200ml)",
    intro:
      "Made for everyday refreshment, our fruit drinks are crafted using carefully selected ingredients and natural flavours without artificial colouring. Convenient, refreshing, and suitable for all age groups.",
    flavoursLabel: "Available in 3 varieties",
    items: [
      "Pomegranate Drink 200ml",
      "Pineapple Drink 200ml",
      "Aloe Vera Drink 200ml",
    ],
  },
  {
    title: "Cordials (500ml)",
    intro:
      "Our 500ml cordials are concentrated fruit beverages designed for home use, restaurants, catering services, and hospitality environments. Enjoy rich fruit flavour in every serving.",
    flavoursLabel: "Available in 5 varieties",
    items: [
      "Pomegranate Cordial 500ml",
      "Wood Apple Cordial 500ml",
      "Mango Cordial 500ml",
      "Pineapple Cordial 500ml",
      "Mixed Fruit Cordial 500ml",
    ],
  },
]

const dairyProducts = [
  {
    title: "Curd",
    intro:
      "Fresh, thick curd prepared for daily meals, hospitality use, and retail supply.",
    sizesLabel: "Available Sizes",
    sizes: ["Curd 250g", "Curd 80g"],
  },
  {
    title: "Pure Cow Ghee",
    intro:
      "Traditionally slow-cooked pure cow ghee with a rich aroma and golden texture — prepared without vegetable oil blending or artificial additives.",
    sizesLabel: "Available Sizes",
    sizes: ["Ghee 400ml", "Ghee 185ml"],
  },
  {
    title: "Paneer",
    intro:
      "Fresh paneer made from cow's milk with a firm texture suitable for a variety of cooking applications.",
    sizesLabel: "Available Sizes",
    sizes: ["Paneer 100g", "Paneer 250g"],
  },
]

export default function Products() {
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
              Our Products
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              From Our Jaffna Farm to Your Table
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-8">
              We grow premium fruits and craft natural dairy and beverages with
              ingredients from our own farm — no artificial additives and no
              compromise on quality.
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-7 mt-5 max-w-2xl mx-auto border-t border-emerald-200/60 dark:border-white/10 pt-5">
              This is the official Thooddakkaaran website. Supply, wholesale, and
              product enquiries are handled by our team by phone, email, or
              WhatsApp. A dedicated retail e-commerce site is planned
              separately — we&apos;ll link it here when it is live.
            </p>
          </div>
        </Reveal>

        {/* What We Grow */}
        <Reveal>
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What We Grow &amp; Supply
            </h3>
            <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 leading-8 mb-12">
              We grow four premium fruits on our Jaffna farm, each variety
              chosen for its suitability to Sri Lanka&apos;s dry-zone climate
              and its demand among buyers across the island. Every fruit is
              hand-harvested, graded, and supplied directly from our farm, with
              no middlemen and no long cold chains.
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
                  key={fruit.title}
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
                        Enquire: fruit supply
                      </a>
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-xl border border-emerald-200 dark:border-white/20 bg-white/70 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-200 transition hover:bg-emerald-50 dark:hover:bg-white/10"
                      >
                        Enquire: saplings
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Natural products */}
        <Reveal>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Natural Products Crafted from Our Own Farm
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-8">
              Everything we make starts on our farm. Our branded product range
              includes pure cow ghee, drinking yogurt, set yogurt, curd, and
              freshly pressed pomegranate juice, all crafted using farm-sourced
              ingredients with no artificial additives, and no compromise on
              quality.
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
              key={range.title}
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
                {range.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Enquire
                <FaArrowRight className="text-xs" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Dairy Products
          </h3>
          <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 leading-8 mb-10">
            Our dairy products are crafted from fresh cow&apos;s milk using
            traditional preparation methods and carefully maintained quality
            standards. Fresh, natural, and trusted for everyday use.
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
              key={d.title}
              variants={fadeUp()}
              className="rounded-[1.75rem] border border-emerald-100 dark:border-white/10 bg-white/80 dark:bg-black/20 p-8 backdrop-blur-md shadow-xl"
            >
              <h4 className="text-xl font-bold mb-3">{d.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-7 mb-4">
                {d.intro}
              </p>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                {d.sizesLabel}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-6">
                {d.sizes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Enquire
                <FaArrowRight className="text-xs" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-emerald-200 dark:border-white/10 bg-emerald-600/10 dark:bg-emerald-900/30 px-8 py-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Supply &amp; product enquiries
          </h3>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8 leading-8">
            Get in touch for availability, wholesale pricing, or any question
            about our range. We supply and deliver across Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Contact our team
              <FaArrowRight className="text-sm" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 dark:border-emerald-400 bg-white/90 dark:bg-white/10 px-8 py-3.5 font-semibold text-emerald-800 dark:text-emerald-200 transition hover:bg-white dark:hover:bg-white/15"
            >
              <FaWhatsapp className="text-lg" />
              Message on WhatsApp
            </a>
            {ECOMMERCE_STORE_URL ? (
              <a
                href={ECOMMERCE_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/80 dark:bg-white/5 px-8 py-3.5 font-semibold text-emerald-900 dark:text-emerald-100 transition hover:bg-emerald-100/80 dark:hover:bg-white/10"
              >
                Retail online shop
                <FaArrowRight className="text-sm" />
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
