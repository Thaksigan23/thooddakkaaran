"use client"

import { useTranslation } from "react-i18next"
import { FaShoppingCart } from "react-icons/fa"
import { useOrder } from "../context/OrderContext"

export default function NavbarCartButton({ onOpen }) {
  const { t } = useTranslation()
  const { totalItemCount, openDrawer } = useOrder()

  const hasItems = totalItemCount > 0
  const label = hasItems
    ? t("nav.cartAriaWithCount", { count: totalItemCount })
    : t("nav.cartAriaEmpty")

  const handleClick = (event) => {
    onOpen?.()
    openDrawer(event.currentTarget)
  }

  return (
    <button
      type="button"
      data-testid="navbar-cart-btn"
      onClick={handleClick}
      aria-label={label}
      title={t("nav.cartTitle")}
      className={`relative p-2 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        hasItems
          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-700"
          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      }`}
    >
      <FaShoppingCart aria-hidden="true" />
      {hasItems ? (
        <span
          data-testid="navbar-cart-badge"
          className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white"
        >
          {totalItemCount}
        </span>
      ) : null}
    </button>
  )
}
