export default function Instagram() {

  const images = [
    { src: "/images/insta1.jpg" },
    { src: "/images/insta2.png" },
    { src: "/images/insta3.png" }
  ]

  return (

    <section className="py-28 px-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
          Instagram Updates
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          Follow our farming journey and see how we cultivate premium
          pomegranates across Sri Lanka.
        </p>

      </div>

      {/* Instagram Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {images.map((img, i) => (

          <div
            key={i}
            className="overflow-hidden rounded-2xl group shadow hover:shadow-xl transition"
          >

            <img
              src={img.src}
              alt="Thooddakkaaran Instagram Farm Post"
              className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
            />

          </div>

        ))}

      </div>

      {/* Instagram Button */}
      <div className="text-center mt-12">

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
        >
          Follow on Instagram
        </a>

      </div>

    </section>

  )
}