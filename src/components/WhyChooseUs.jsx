import { FaLeaf, FaSeedling, FaUsers, FaChartLine } from "react-icons/fa"

export default function WhyChooseUs() {

  const reasons = [

    {
      icon: <FaLeaf />,
      title: "5+ Years of Farming Experience",
      desc: "Our team understands the realities of modern agriculture and sustainable farming practices across Sri Lanka."
    },

    {
      icon: <FaSeedling />,
      title: "Farm-to-Product Integrity",
      desc: "Because we grow our own fruits, we ensure freshness, purity and natural quality in every product."
    },

    {
      icon: <FaUsers />,
      title: "Strategic Farmer Partnerships",
      desc: "We work closely with local farmers, building long-term partnerships that support collective agricultural growth."
    },

    {
      icon: <FaChartLine />,
      title: "Eco-Friendly Agriculture",
      desc: "Our sustainable farming methods improve soil health, conserve resources, and increase long-term productivity."
    }

  ]

  return (

<section className="py-28 px-6 bg-gray-50 dark:bg-gray-900 transition">

<div className="max-w-6xl mx-auto">

{/* Title */}

<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-green-400">
Why Choose Thooddakkaaran
</h2>

<p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
We deliver reliable farming solutions and trusted produce that reflect
the true value of sustainable agriculture in Sri Lanka.
</p>


{/* Cards */}

<div className="grid md:grid-cols-4 gap-10">

{reasons.map((item, index) => (

<div
key={index}
className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow hover:shadow-xl transition"
>

<div className="text-4xl text-green-600 mb-4 flex justify-center">
{item.icon}
</div>

<h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
{item.title}
</h3>

<p className="text-gray-600 dark:text-gray-400 text-sm">
{item.desc}
</p>

</div>

))}

</div>

</div>

</section>

  )
}