import { useState, useEffect } from "react"
import { motion, MotionConfig } from "framer-motion"

import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Products from "./components/Products"
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
import ErrorBoundary from "./components/ErrorBoundary"
import CookieConsent from "./components/CookieConsent"
import DocumentLangSync from "./components/DocumentLangSync"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const minShow = reduced ? 150 : 400
    const maxShow = reduced ? 400 : 1000

    const fonts =
      document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve(undefined)

    const t0 = performance.now()
    Promise.all([fonts, new Promise((r) => setTimeout(r, minShow))]).then(() => {
      if (cancelled) return
      const elapsed = performance.now() - t0
      const remaining = Math.max(0, maxShow - elapsed)
      setTimeout(() => {
        if (!cancelled) setLoading(false)
      }, remaining)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-soft dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen overflow-x-hidden">
      <ErrorBoundary>
        {loading ? (
          <Loader />
        ) : (
          <MotionConfig reducedMotion="user">
            <DocumentLangSync />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <ScrollProgress />
              <Navbar />

              <main id="main-content" tabIndex={-1}>
                <Hero />
                <About />
                <Services />
                <Products />
                <WhyChooseUs />
                <Stats />
                <VisionMission />
                <Testimonials />
                <Gallery />
                <Instagram />
                <Map />
                <Contact />
              </main>

              <Footer />
              <Whatsapp />
              <BackToTop />
              <CookieConsent />
            </motion.div>
          </MotionConfig>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default App
