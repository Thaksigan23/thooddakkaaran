import { useRef } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      "service_1t50k5g",
      "template_ubyghnk",
      form.current,
      "SxNdlpc7MdA_MI7I1"
    ).then(
      () => {
        alert("Message sent successfully!")
        form.current.reset()
      },
      () => {
        alert("Failed to send message")
      }
    )
  }

  return (
    <section id="contact" className="py-28 px-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-500">

      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">
          Contact Thooddakkaaran (Pvt) Ltd
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Start your farming journey with Thooddakkaaran. Contact us for
          premium pomegranate plants and professional farm consultation.
        </p>

        {/* Form Card */}
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8">

          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:scale-105 hover:bg-green-700 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  )
}