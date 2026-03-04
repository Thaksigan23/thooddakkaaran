export default function Testimonials() {

  const testimonials = [
    {
      name: "Farmer – Jaffna",
      text: "Thooddakkaaran helped me improve my pomegranate farming. Their guidance increased my farm production."
    },
    {
      name: "Farmer – Kilinochchi",
      text: "Healthy plants and excellent farming consultation. Highly recommended for farmers."
    },
    {
      name: "Farmer – Vavuniya",
      text: "Their modern agriculture techniques helped improve crop quality and farm productivity."
    }
  ]

  return (

    <section className="py-28 px-6 bg-green-50 dark:bg-gray-950 transition-colors duration-500">

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
          Farmer Testimonials
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          Hear from farmers who improved their crop productivity and farming
          success with our agricultural support and guidance.
        </p>

      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {testimonials.map((item, index) => (

          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow hover:shadow-xl transition duration-300"
          >

            {/* Quote */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed">
              "{item.text}"
            </p>

            {/* Farmer Name */}
            <h3 className="text-green-700 dark:text-green-400 font-semibold">
              — {item.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  )
}