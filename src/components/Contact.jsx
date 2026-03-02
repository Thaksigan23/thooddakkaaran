export default function Contact() {
  return (
<section id="contact" className="py-20 text-center">
    
      <h2 className="text-4xl font-bold mb-6">
        Contact Us
      </h2>

      <p className="mb-8 text-gray-600">
        Start your farming journey with Thooddakkaaran (Pvt) Ltd
      </p>

      <form className="max-w-md mx-auto flex flex-col gap-4">

        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="border p-3 rounded-lg"
        />

        <textarea
          placeholder="Your Message"
          className="border p-3 rounded-lg"
        />

        <button className="bg-green-700 text-white p-3 rounded-lg">
          Send Message
        </button>

      </form>

    </section>
  )
}