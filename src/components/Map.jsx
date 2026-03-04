export default function Map() {

  return (

    <section className="py-28 px-6 bg-white dark:bg-gray-950 transition-colors duration-500">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
          Our Farm Location
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          Visit our farm in Mirusuvil, Sri Lanka where we cultivate premium
          pomegranates and support farmers with modern agricultural solutions.
        </p>

      </div>

      {/* Google Map */}
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">

        <iframe
          title="Thooddakkaaran Farm Location"
          src="https://www.google.com/maps?q=Mirusuvil,Sri Lanka&output=embed"
          className="w-full h-96 border-0"
          loading="lazy"
          allowFullScreen
        ></iframe>

      </div>

      {/* Directions Button */}
      <div className="text-center mt-10">

        <a
          href="https://www.google.com/maps?q=Mirusuvil,Sri Lanka"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
        >
          Get Directions
        </a>

      </div>

    </section>

  )
}