"use client"

import { Component } from "react"
import { useTranslation } from "react-i18next"

function ErrorFallback() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-soft dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">{t("error_boundary.title")}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("error_boundary.body")}
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
          onClick={() => window.location.reload()}
        >
          {t("error_boundary.reload")}
        </button>
      </div>
    </div>
  )
}

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
