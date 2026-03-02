export default function Map() {
  return (
    <section className="py-20">

      <h2 className="text-4xl font-bold text-center mb-10">
        Our Farm Location
      </h2>

      <div className="max-w-6xl mx-auto px-6">

        <iframe
          className="w-full h-96 rounded-xl"
          src="https://www.google.com/maps?q=Mirusuvil,Sri Lanka&output=embed"
        ></iframe>

      </div>

    </section>
  )
}