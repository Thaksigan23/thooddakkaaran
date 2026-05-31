"use client"

import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FaArrowRight, FaShoppingBag, FaWhatsapp } from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"
import { WHATSAPP_LINK } from "../constants/contact"
import { CATALOGUE, CATALOGUE_CATEGORIES } from "../constants/catalogue"
import { useOrder } from "../context/OrderContext"
import QuantityStepper from "./order/QuantityStepper"

const MAX_BADGES = 3

export default function Products() {
  const { t } = useTranslation()
  const [active, setActive] = useState("all")
  const prefersReducedMotion = useReducedMotion()
  const {
    totalItemCount,
    getQuantity,
    addItem,
    setQuantity,
    openDrawer,
  } = useOrder()

  const items = useMemo(
    () =>
      CATALOGUE.filter(
        (item) => active === "all" || item.category === active
      ).map((item) => {
        const badges = t(`products.catalogue.${item.key}.badges`, {
          returnObjects: true,
        })
        return {
          ...item,
          title: t(`products.catalogue.${item.key}.title`),
          tagline: t(`products.catalogue.${item.key}.tagline`),
          badges: Array.isArray(badges) ? badges : [],
        }
      }),
    [active, t]
  )

  const handleTabKeyDown = useCallback(
    (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
      event.preventDefault()
      const currentIndex = CATALOGUE_CATEGORIES.indexOf(active)
      const nextIndex =
        event.key === "ArrowRight"
          ? (currentIndex + 1) % CATALOGUE_CATEGORIES.length
          : (currentIndex - 1 + CATALOGUE_CATEGORIES.length) %
            CATALOGUE_CATEGORIES.length
      const nextCat = CATALOGUE_CATEGORIES[nextIndex]
      setActive(nextCat)
      if (typeof document !== "undefined") {
        document.getElementById(`catalogue-tab-${nextCat}`)?.focus()
      }
    },
    [active]
  )

  const handleOpenDrawer = useCallback(
    (event) => {
      openDrawer(event.currentTarget)
    },
    [openDrawer]
  )

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
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-white/15 bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200 mb-5">
              {t("products.tag")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              {t("products.headline")}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-8">
              {t("products.intro")}
            </p>
            {totalItemCount > 0 ? (
              <button
                type="button"
                data-testid="order-view-btn"
                onClick={handleOpenDrawer}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              >
                <FaShoppingBag aria-hidden="true" />
                {t("products.order.viewOrder", { count: totalItemCount })}
              </button>
            ) : null}
          </div>
        </Reveal>

        <div
          role="tablist"
          aria-label={t("products.filter.label")}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
        >
          {CATALOGUE_CATEGORIES.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                id={`catalogue-tab-${cat}`}
                aria-selected={isActive}
                aria-controls="catalogue-grid"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(cat)}
                onKeyDown={handleTabKeyDown}
                data-cat={cat}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-white/10 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-white/10"
                }`}
              >
                {t(`products.filter.${cat}`)}
              </button>
            )
          })}
        </div>

        <motion.div
          id="catalogue-grid"
          role="tabpanel"
          aria-labelledby={`catalogue-tab-${active}`}
          variants={staggerContainer(0.06, 0.04)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => {
              const quantity = getQuantity(item.key)
              return (
                <motion.article
                  key={item.key}
                  layout={!prefersReducedMotion}
                  variants={fadeUp(0, 0.45)}
                  initial="hidden"
                  animate="visible"
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.96,
                          transition: { duration: 0.18 },
                        }
                  }
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  data-category={item.category}
                  data-testid="catalogue-card"
                  className="group relative flex flex-col rounded-3xl border border-emerald-100 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50/40 dark:bg-white/5">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-semibold mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-6 line-clamp-2 mb-4">
                      {item.tagline}
                    </p>
                    {item.badges.length > 0 ? (
                      <ul className="flex flex-wrap gap-1.5 mb-5">
                        {item.badges.slice(0, MAX_BADGES).map((badge) => (
                          <li
                            key={badge}
                            className="text-xs font-medium rounded-full px-2.5 py-1 bg-emerald-50 text-emerald-800 dark:bg-white/10 dark:text-emerald-200 border border-emerald-100/80 dark:border-white/10"
                          >
                            {badge}
                          </li>
                        ))}
                        {item.badges.length > MAX_BADGES ? (
                          <li className="text-xs font-medium rounded-full px-2.5 py-1 bg-emerald-100/70 text-emerald-900 dark:bg-white/15 dark:text-emerald-100">
                            {t("products.card.moreBadges", {
                              count: item.badges.length - MAX_BADGES,
                            })}
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                    <div className="mt-auto">
                      {quantity > 0 ? (
                        <QuantityStepper
                          value={quantity}
                          onChange={(next) => setQuantity(item.key, next)}
                          label={t("products.order.quantityFor", {
                            product: item.title,
                          })}
                          decrementLabel={t("products.order.decrease")}
                          incrementLabel={t("products.order.increase")}
                        />
                      ) : (
                        <button
                          type="button"
                          data-testid="order-add-btn"
                          data-product-key={item.key}
                          onClick={() => addItem(item.key)}
                          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                        >
                          {t("products.order.add")}
                          <FaArrowRight className="text-xs" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
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
              className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-emerald-600 px-8 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-emerald-700"
            >
              {t("products.ctaContact")}
              <FaArrowRight className="text-sm" aria-hidden="true" />
            </a>
            {totalItemCount > 0 ? (
              <button
                type="button"
                onClick={handleOpenDrawer}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 dark:border-emerald-400 bg-white/90 dark:bg-white/10 px-8 py-3.5 font-semibold text-emerald-800 dark:text-emerald-200 transition-colors duration-200 hover:bg-white dark:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                {t("products.order.viewOrder", { count: totalItemCount })}
              </button>
            ) : (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-xl border-2 border-emerald-600 dark:border-emerald-400 bg-white/90 dark:bg-white/10 px-8 py-3.5 font-semibold text-emerald-800 dark:text-emerald-200 transition-colors duration-200 hover:bg-white dark:hover:bg-white/15"
              >
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                {t("products.ctaWhatsapp")}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
