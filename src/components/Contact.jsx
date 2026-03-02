export default function Contact() {
  return (
    <section id="contact" className="py-28 gradient-bg">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-4 text-primary">
          Contact Us
        </h2>

        <p className="text-gray-600 mb-12">
          Start your farming journey with Thooddakkaaran (Pvt) Ltd
        </p>

        {/* Glass Form */}
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8">

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:scale-105 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  )
}