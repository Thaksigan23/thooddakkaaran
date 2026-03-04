export default function Contact() {

  return (

    <section
      id="contact"
      className="py-28 px-6 bg-green-50 dark:bg-gray-950 transition-colors duration-500"
    >

      <div className="max-w-6xl mx-auto text-center">

        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-green-400">
          Contact Thooddakkaaran (Pvt) Ltd
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Start your farming journey with Thooddakkaaran. Contact us for
          premium pomegranate plants and professional farm consultation.
        </p>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>

  )
}