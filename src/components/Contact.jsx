import { useRef } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(
  "service_1t50k5g",   // correct service id
  "template_ubyghnk",  // your template id
  form.current,
  "SxNdlpc7MdA_MI7I1"  // public key
)

      .then(
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
    <section id="contact" className="py-28 gradient-bg">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-4 text-green-700">
          Contact Thooddakkaaran (Pvt) Ltd
        </h2>

        <p className="text-gray-500 mb-10">
          Start your farming journey with Thooddakkaaran. Contact us for
          premium pomegranate plants and professional farm consultation.
        </p>

        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8">

          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg border border-gray-200"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg border border-gray-200"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg border border-gray-200"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:scale-105 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  )
}