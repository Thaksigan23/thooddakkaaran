import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import Reveal from "./Reveal"
import { fadeUp, staggerContainer } from "../utils/animations"

export default function Contact() {
  const form = useRef()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .sendForm(
        "service_1t50k5g",
        "template_ubyghnk",
        form.current,
        "SxNdlpc7MdA_MI7I1"
      )
      .then(
        () => {
          setLoading(false)
          setSuccess(true)
          form.current.reset()
        },
        () => {
          setLoading(false)
          alert("Failed to send message")
        }
      )
  }

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Get in touch for premium fruit cultivation, plant supply, and
              expert farming consultation in Sri Lanka.
            </p>
          </div>
        </Reveal>

        {/* Layout */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >

          {/* LEFT */}
          <motion.div variants={fadeUp()} className="space-y-6">

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Get in Touch
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">

                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-green-600" />
                  <span>+94 70 000 0000</span>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-green-600" />
                  <span>info@thooddakkaaran.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>Mirusuvil, Sri Lanka</span>
                </div>

              </div>
            </div>

            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                Why Contact Us?
              </h3>

              <p className="text-sm text-green-100">
                We provide expert agricultural advice, high-quality plants, and
                sustainable farming solutions tailored for Sri Lankan farmers.
              </p>
            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp()}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >

            {success ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  ✅ Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We will contact you soon.
                </p>
              </div>
            ) : (

              <form ref={form} onSubmit={sendEmail} className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            )}

          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}