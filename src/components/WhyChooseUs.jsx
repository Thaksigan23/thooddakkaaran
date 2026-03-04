import { FaLeaf, FaSeedling, FaUsers, FaChartLine } from "react-icons/fa"

export default function WhyChooseUs() {

  const reasons = [
    {
      icon: <FaLeaf />,
      title: "20+ Years Farming Experience",
      desc: "Our team has decades of experience in pomegranate cultivation and modern agriculture practices."
    },
    {
      icon: <FaSeedling />,
      title: "High Quality Plants",
      desc: "We supply strong and healthy pomegranate plants carefully selected for optimal growth."
    },
    {
      icon: <FaUsers />,
      title: "Farmer Support",
      desc: "We work closely with farmers and provide continuous guidance to improve crop productivity."
    },
    {
      icon: <FaChartLine />,
      title: "Modern Farming Techniques",
      desc: "Our solutions help farmers adopt modern agriculture methods for better yield and sustainability."
    }
  ]

  return (
    <section className="py-28 px-6 bg-white dark:bg-gray-950 transition-colors duration-500">

      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <h2 className="text-4xl font-bold text-gray-900 dark:text-green-400 mb-4">
          Why Choose Thooddakkaaran
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          We are committed to helping farmers succeed through high-quality
          plants, expert agricultural guidance, and sustainable farming practices.
        </p>

      </div>


      {/* Reasons Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {reasons.map((item, index) => (

          <div
            key={index}
            className="text-center bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >

            <div className="text-4xl text-green-600 mb-4 flex justify-center">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {item.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}