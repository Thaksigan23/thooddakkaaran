import { motion } from "framer-motion"
import { fadeUp } from "../utils/animations"

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) {
  return (
    <motion.div
      variants={fadeUp(delay, duration)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}