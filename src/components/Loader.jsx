import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">

      {/* Logo */}
      <motion.img
        src="/images/logo.png"
        alt="Thooddakkaaran"
        className="h-16 w-auto mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full"
      />

      {/* Text */}
      <motion.p
        className="mt-4 text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>

    </div>
  )
}