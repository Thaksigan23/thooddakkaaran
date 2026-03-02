export default function Testimonials() {

  const testimonials = [
    {
      name: "Kumar",
      text: "Thooddakkaaran helped me grow high-quality pomegranates. My farm production increased a lot."
    },
    {
      name: "Ramesh",
      text: "Their farming consultation is very helpful. I learned modern agriculture techniques."
    },
    {
      name: "Suresh",
      text: "Healthy plants and great farming support. Highly recommended for farmers."
    }
  ]

  return (
<section className="py-28 bg-gradient-to-r from-green-50 via-white to-green-50">
        
      <h2 className="text-4xl font-bold text-center mb-12">
        Farmer Testimonials
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {testimonials.map((item, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >

            <p className="text-gray-600 mb-4">
              "{item.text}"
            </p>

            <h3 className="text-green-700 font-semibold">
              - {item.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  )
}