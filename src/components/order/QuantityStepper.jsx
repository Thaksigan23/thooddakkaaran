"use client"

import { FaMinus, FaPlus } from "react-icons/fa"

export default function QuantityStepper({
  value,
  onChange,
  label,
  decrementLabel,
  incrementLabel,
}) {
  return (
    <div
      className="inline-flex items-center rounded-xl border border-emerald-200 dark:border-white/15 bg-emerald-50/80 dark:bg-white/5"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label={decrementLabel}
        className="cursor-pointer px-3 py-2.5 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-white/10 rounded-l-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <FaMinus className="text-xs" aria-hidden="true" />
      </button>
      <span
        className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={incrementLabel}
        className="cursor-pointer px-3 py-2.5 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-white/10 rounded-r-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <FaPlus className="text-xs" aria-hidden="true" />
      </button>
    </div>
  )
}
