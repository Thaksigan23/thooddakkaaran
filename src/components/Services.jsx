import { motion } from "framer-motion"
import { FaSeedling, FaLeaf, FaTractor, FaAppleAlt } from "react-icons/fa"

export default function Services() {

  const services = [
  {
    icon: <FaAppleAlt size={40} />,
    title: "Pomegranate Cultivation",
    desc: "Expert techniques for growing high-quality pomegranates."
  },
  {
    icon: <FaSeedling size={40} />,
    title: "Farm Consultation",
    desc: "Professional advice for modern agriculture methods."
  },
  {
    icon: <FaTractor size={40} />,
    title: "Plant Supply",
    desc: "Healthy plants and farming materials for farmers."
  },
  {
    icon: <FaLeaf size={40} />,
    title: "Sustainable Agriculture",
    desc: "Eco-friendly farming solutions for long-term success."
  }
]

  return (
<section id="services" className="py-28 bg-gradient-to-b from-green-50 to-white">
        
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Farming Solutions
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">

        {services.map((service, index) => (

          <motion.div
  key={index}
  whileHover={{ scale: 1.05 }}
  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center"
>

  <div className="text-green-600 mb-4 flex justify-center">
    {service.icon}
  </div>

  <h3 className="text-xl font-semibold mb-3">
    {service.title}
  </h3>

  <p className="text-gray-600">
    {service.desc}
  </p>

</motion.div>

        ))}

      </div>

    </section>
  )
}