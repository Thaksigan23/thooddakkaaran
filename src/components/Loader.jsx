"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "react-i18next"

export default function Loader() {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Image
          src="/images/logo.png"
          alt={t("loader.logoAlt")}
          width={64}
          height={64}
          priority
          className="h-16 w-auto"
        />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full"
      />

      <motion.p
        className="mt-4 text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {t("loader.loading")}
      </motion.p>
    </div>
  )
}
