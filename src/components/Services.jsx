import { motion } from "framer-motion"
import { FaSeedling, FaLeaf, FaTractor, FaTree } from "react-icons/fa"
import Reveal from "./Reveal"
export default function Services() {

  const services = [
    {
      title: "Pomegranate Cultivation",
      desc: "Expert techniques for growing high-quality pomegranates.",
      icon: <FaSeedling />
    },
    {
      title: "Farm Consultation",
      desc: "Professional advice for modern agriculture methods.",
      icon: <FaLeaf />
    },
    {
      title: "Plant Supply",
      desc: "Healthy plants and farming materials for farmers.",
      icon: <FaTree />
    },
    {
      title: "Sustainable Agriculture",
      desc: "Eco-friendly farming solutions for long-term success.",
      icon: <FaTractor />
    }
  ]

  return (
    <Reveal>

<section id="services" className="py-28 gradient-bg">
    
      <h2 className="text-4xl font-bold text-center mb-4 text-primary">
        Our Farming Solutions
      </h2>

      <p className="text-center text-gray-500 mb-16">
        Supporting farmers with sustainable agriculture solutions
      </p>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        {services.map((service, index) => (

  <div key={index} className="group relative">

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-200 to-red-200 opacity-0 group-hover:opacity-20 blur-xl transition"></div>

    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white/80 backdrop-blur-lg border border-white/40 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center"
    >

      {/* Icon */}
      <div className="text-4xl text-secondary mb-4 flex justify-center group-hover:text-accent transition duration-300">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-primary">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600">
        {service.desc}
      </p>

    </motion.div>

  </div>

))}

      </div>

    </section>
    </Reveal>
  )
}