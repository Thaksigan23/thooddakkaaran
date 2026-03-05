import { motion } from "framer-motion"
import { FaSeedling, FaLeaf, FaTractor, FaTree } from "react-icons/fa"
import Reveal from "./Reveal"

export default function Services() {

 const services = [

{
title: "Premium Fruit Cultivation",
description:
"Sustainable cultivation of pomegranates, dragon fruits, watermelons and guavas using modern agricultural techniques."
},

{
title: "Farm Consultation",
description:
"Professional guidance for Sri Lankan farmers including soil preparation, irrigation planning and crop management."
},

{
title: "High-Yield Plant Saplings",
description:
"We supply premium pomegranate and fruit saplings bred for Sri Lankan soil and climate conditions."
},

{
title: "Sustainable Agriculture",
description:
"Eco-friendly farming practices that improve soil fertility and increase harvest productivity."
}

]

  return (
    <Reveal>

      <section
        id="services"
        className="py-28 px-6 bg-green-50 dark:bg-gray-950 transition-colors duration-500"
      >

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-green-400">
            Our Farming Solutions
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Supporting farmers across Sri Lanka with sustainable agriculture
            solutions, expert consultation, and high-quality plant supply.
          </p>

        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

          {services.map((service, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-red-400 opacity-0 group-hover:opacity-20 blur-xl transition duration-300"></div>

              {/* Card */}
              <div className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center">

                {/* Icon */}
                <div className="text-4xl text-green-600 mb-4 flex justify-center group-hover:text-red-500 transition duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

    </Reveal>
  )
}