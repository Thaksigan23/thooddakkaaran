export default function Instagram() {

  const posts = [
    "https://images.unsplash.com/photo-1519996521431-1a4c8c3a0c7c?q=80&w=1200",
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1200",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200"
  ]

  return (
    <section className="py-28 bg-gray-50">

      <h2 className="text-4xl font-bold text-center mb-14">
        Instagram Updates
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {posts.map((img, i) => (

          <div key={i} className="overflow-hidden rounded-2xl shadow-lg">

            <img
              src={img}
              className="w-full h-72 object-cover hover:scale-110 transition duration-500"
            />

          </div>

        ))}

      </div>

    </section>
  )
}