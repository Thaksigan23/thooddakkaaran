"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"
import { FaTimes, FaWhatsapp } from "react-icons/fa"
import { useOrder } from "../../context/OrderContext"
import { CONTACT_PHONE } from "../../constants/contact"
import {
  buildWhatsAppOrderLink,
  formatOrderMessage,
  isOrderMessageTooLong,
  validateOrder,
} from "../../utils/whatsapp"
import QuantityStepper from "./QuantityStepper"

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function OrderDrawer() {
  const { t } = useTranslation()
  const titleId = useId()
  const panelRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const {
    items,
    customer,
    drawerOpen,
    closeDrawer,
    setQuantity,
    removeItem,
    setCustomerField,
  } = useOrder()

  const handleClose = useCallback(() => {
    setSubmitted(false)
    closeDrawer()
  }, [closeDrawer])

  useEffect(() => {
    if (!drawerOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll(FOCUSABLE)
    focusables?.[0]?.focus()

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key !== "Tab" || !panel) return

      const elements = panel.querySelectorAll(FOCUSABLE)
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [drawerOpen, handleClose])

  const validation = useMemo(
    () => validateOrder({ items, customer }),
    [items, customer]
  )

  const message = useMemo(() => {
    if (!validation.valid) return ""
    return formatOrderMessage({
      items: validation.activeItems,
      customer,
      t,
    })
  }, [validation, customer, t])

  const whatsAppLink = useMemo(() => {
    if (!validation.valid || isOrderMessageTooLong(message)) return ""
    return buildWhatsAppOrderLink({ phone: CONTACT_PHONE, message })
  }, [validation.valid, message])

  const messageTooLong = validation.valid && isOrderMessageTooLong(message)

  const handleSendClick = useCallback(
    (event) => {
      setSubmitted(true)
      if (!validation.valid || messageTooLong || !whatsAppLink) {
        event.preventDefault()
      }
    },
    [validation.valid, messageTooLong, whatsAppLink]
  )

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {drawerOpen ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label={t("products.order.close")}
            className="fixed inset-0 z-[60] bg-black/50 cursor-pointer"
            onClick={handleClose}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-testid="order-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-emerald-100 dark:border-white/10 bg-white dark:bg-gray-900 shadow-2xl sm:rounded-l-3xl max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:max-h-[90vh] max-sm:rounded-t-3xl max-sm:border-l-0 max-sm:border-t"
          >
            <header className="flex items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 px-6 py-4">
              <h2 id={titleId} className="text-lg font-bold">
                {t("products.order.title")}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label={t("products.order.close")}
                className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <section aria-labelledby={`${titleId}-items`}>
                <h3
                  id={`${titleId}-items`}
                  className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-3"
                >
                  {t("products.order.itemsHeading")}
                </h3>
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("products.order.emptyCart")}
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.key}
                        className="flex items-start justify-between gap-3 rounded-2xl border border-gray-200 dark:border-white/10 p-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium leading-snug">
                            {t(`products.catalogue.${item.key}.title`)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(next) => setQuantity(item.key, next)}
                            label={t("products.order.quantityFor", {
                              product: t(
                                `products.catalogue.${item.key}.title`
                              ),
                            })}
                            decrementLabel={t("products.order.decrease")}
                            incrementLabel={t("products.order.increase")}
                          />
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="cursor-pointer text-xs text-red-600 dark:text-red-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                          >
                            {t("products.order.remove")}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {submitted && validation.errors.cart ? (
                  <p
                    role="alert"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {t("products.order.validation.cart")}
                  </p>
                ) : null}
              </section>

              <section aria-labelledby={`${titleId}-customer`}>
                <h3
                  id={`${titleId}-customer`}
                  className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-3"
                >
                  {t("products.order.customerHeading")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="order-name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("products.order.fields.name")}
                    </label>
                    <input
                      id="order-name"
                      data-testid="order-name"
                      type="text"
                      autoComplete="name"
                      value={customer.name}
                      onChange={(event) =>
                        setCustomerField("name", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    {submitted && validation.errors.name ? (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {t("products.order.validation.name")}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="order-phone"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("products.order.fields.phone")}
                    </label>
                    <input
                      id="order-phone"
                      data-testid="order-phone"
                      type="tel"
                      autoComplete="tel"
                      value={customer.phone}
                      onChange={(event) =>
                        setCustomerField("phone", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    {submitted && validation.errors.phone ? (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {t("products.order.validation.phone")}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="order-delivery"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("products.order.fields.delivery")}
                    </label>
                    <textarea
                      id="order-delivery"
                      data-testid="order-delivery"
                      rows={2}
                      value={customer.delivery}
                      onChange={(event) =>
                        setCustomerField("delivery", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    />
                    {submitted && validation.errors.delivery ? (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {t("products.order.validation.delivery")}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="order-notes"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("products.order.fields.notes")}
                    </label>
                    <textarea
                      id="order-notes"
                      data-testid="order-notes"
                      rows={2}
                      value={customer.notes}
                      onChange={(event) =>
                        setCustomerField("notes", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    />
                    {submitted && validation.errors.notes ? (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {t("products.order.validation.notes")}
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              {messageTooLong ? (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  {t("products.order.validation.messageTooLong")}
                </p>
              ) : null}

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">
                {t("products.order.sendHint")}
              </p>
            </div>

            <footer className="border-t border-gray-200 dark:border-white/10 px-6 py-4">
              <button
                type="button"
                data-testid="order-send-btn"
                data-href={whatsAppLink || ""}
                onClick={(event) => {
                  handleSendClick(event)
                  if (validation.valid && whatsAppLink && !messageTooLong) {
                    window.open(whatsAppLink, "_blank", "noopener,noreferrer")
                  }
                }}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              >
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                {t("products.order.send")}
              </button>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
