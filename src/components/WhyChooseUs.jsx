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
    <section className="py-28 bg-white">

      <h2 className="text-4xl font-bold text-center mb-6">
        Why Choose Thooddakkaaran
      </h2>

      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
        We are committed to helping farmers succeed through high-quality
        plants, expert agricultural guidance, and sustainable farming practices.
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        {reasons.map((item, index) => (

          <div
            key={index}
            className="text-center bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition"
          >

            <div className="text-4xl text-green-600 mb-4 flex justify-center">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}