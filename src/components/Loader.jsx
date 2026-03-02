import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"
      />

    </div>
  )
}