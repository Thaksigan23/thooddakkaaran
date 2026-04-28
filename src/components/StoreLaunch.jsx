import { motion } from "framer-motion"
import {
  FaArrowRight,
  FaGlobe,
  FaLeaf,
  FaShoppingBag,
} from "react-icons/fa"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function StoreLaunch() {
  const highlights = [
    {
      icon: <FaShoppingBag />,
      title: "Fresh Products Online",
      description:
        "Customers will soon be able to explore premium fruit products and farm-based selections in one place.",
    },
    {
      icon: <FaLeaf />,
      title: "Rooted In Our Farm",
      description:
        "The e-commerce experience will stay connected to the same trusted farming story, quality, and sustainability values.",
    },
    {
      icon: <FaGlobe />,
      title: "Connected With This Website",
      description:
        "This website introduces the brand today and will guide visitors to the online store as soon as it launches.",
    },
  ]

  return (
    <section
      id="store"
      className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white"
    >
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute -top-16 left-10 h-56 w-56 rounded-full bg-emerald-300/70 dark:bg-emerald-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-lime-300/60 dark:bg-lime-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-white/15 bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200 mb-5">
              E-Commerce Launch
            </span>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Our Online Store Is
              <span className="block text-emerald-600 dark:text-emerald-300">Coming Soon</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-8">
              We are preparing a dedicated e-commerce experience for customers
              who want to discover and purchase Thooddakkaaran products online.
              Until then, this website remains the main place to learn about
              our farm, services, and brand story.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-emerald-100 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl bg-emerald-50 dark:bg-white/10 px-4 py-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">
                <FaShoppingBag />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-white/60">
                  Launch Preview
                </p>
                <p className="font-semibold text-lg">Digital Storefront</p>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              A new way to connect customers with our products
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-8 mb-8">
              The upcoming store will extend this website with a direct shopping
              experience while keeping the same premium agricultural identity.
              For now, visitors can explore our services and contact us for
              inquiries, partnerships, and product interest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-emerald-700"
              >
                Contact Us Today
                <FaArrowRight className="text-sm" />
              </a>

              <a
                href="#home"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 dark:border-white/20 bg-white/70 dark:bg-white/5 px-6 py-3 font-semibold text-emerald-700 dark:text-white transition hover:bg-emerald-50 dark:hover:bg-white/10"
              >
                Back To Main Website
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp()}
                className="rounded-[1.75rem] border border-emerald-100 dark:border-white/10 bg-white/80 dark:bg-black/15 p-7 backdrop-blur-md shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-white/10 text-emerald-600 dark:text-emerald-300 text-xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-7">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
