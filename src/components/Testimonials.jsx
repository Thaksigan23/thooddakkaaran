import { motion } from "framer-motion"

export default function Testimonials() {

  const testimonials = [
    {
      name: "Farmer – Jaffna",
      text: "Thooddakkaaran helped improve my pomegranate farm productivity. Their guidance and plant quality significantly increased my harvest."
    },
    {
      name: "Farmer – Kilinochchi",
      text: "Healthy plants and professional agricultural consultation. I highly recommend Thooddakkaaran for sustainable fruit farming."
    },
    {
      name: "Farmer – Vavuniya",
      text: "Their modern farming techniques and crop management support helped improve both crop quality and farm income."
    }
  ]

  return (

<section className="py-28 px-6 bg-gradient-to-r from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition">

{/* Section Title */}

<div className="text-center max-w-3xl mx-auto mb-16">

<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
Farmer Testimonials
</h2>

<p className="text-gray-600 dark:text-gray-400">
Hear what farmers across Sri Lanka say about our farming solutions,
high-quality plants, and agricultural consultation services.
</p>

</div>

{/* Testimonials Grid */}

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

{testimonials.map((item, index) => (

<motion.div
key={index}
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: index * 0.2 }}
viewport={{ once: true }}
className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow hover:shadow-xl transition"
>

<p className="text-gray-600 dark:text-gray-300 mb-6 italic">
"{item.text}"
</p>

<h3 className="text-green-700 dark:text-green-400 font-semibold">
— {item.name}
</h3>

</motion.div>

))}

</div>

</section>

  )
}