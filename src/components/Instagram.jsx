export default function Instagram() {

  const images = [
    { src: "/images/insta1.jpg" },
    { src: "/images/insta2.png" },
    { src: "/images/insta3.png" }
  ]

  return (
    <section className="py-28 bg-gray-50">

      <h2 className="text-4xl font-bold text-center mb-12">
        Instagram Updates
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">

        {images.map((img, i) => (

          <div key={i} className="overflow-hidden rounded-xl">

            <img
              src={img.src}
              className="w-full h-80 object-cover hover:scale-110 transition duration-500"
            />

          </div>

        ))}

      </div>

    </section>
  )
}