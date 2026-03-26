import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import WhyChooseUs from "./components/WhyChooseUs"
import Stats from "./components/Stats"
import VisionMission from "./components/VisionMission"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Instagram from "./components/Instagram"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import Whatsapp from "./components/Whatsapp"
import BackToTop from "./components/BackToTop"
import Map from "./components/Map"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-soft dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Stats />
            <VisionMission />
            <Gallery />
            <Testimonials />
            <Instagram />
            <Map />
            <Contact />
          </main>

          <Footer />
          <Whatsapp />
          <BackToTop />
        </motion.div>
      )}
    </div>
  )
}

export default App