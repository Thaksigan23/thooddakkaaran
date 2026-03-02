export default function Instagram() {

  const posts = [
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    "https://images.unsplash.com/photo-1598511727745-1c0e1b4a1af9",
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  ]

  return (
    <section className="py-20 bg-gray-100">

      <h2 className="text-4xl font-bold text-center mb-12">
        Instagram Updates
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6">

        {posts.map((img, i) => (
          <img key={i} src={img} className="rounded-xl hover:scale-105 transition"/>
        ))}

      </div>

    </section>
  )
}