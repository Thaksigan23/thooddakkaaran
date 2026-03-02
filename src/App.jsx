import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Stats from "./components/Stats"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Instagram from "./components/Instagram"
import Map from "./components/Map"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import Whatsapp from "./components/Whatsapp"

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollProgress />
          <Navbar />
          <Hero />
          <Services />
          <Stats />
          <Gallery />
          <Testimonials />
          <Instagram />
          <Map />
          <Contact />
          <Footer />
          <Whatsapp />
        </motion.div>
      )}
    </>
  )
}

export default App