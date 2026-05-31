import About from "../src/components/About"
import BackToTop from "../src/components/BackToTop"
import Contact from "../src/components/Contact"
import CookieConsent from "../src/components/CookieConsent"
import DocumentLangSync from "../src/components/DocumentLangSync"
import ErrorBoundary from "../src/components/ErrorBoundary"
import Footer from "../src/components/Footer"
import Gallery from "../src/components/Gallery"
import Hero from "../src/components/Hero"
import Instagram from "../src/components/Instagram"
import Map from "../src/components/Map"
import Navbar from "../src/components/Navbar"
import Products from "../src/components/Products"
import ScrollProgress from "../src/components/ScrollProgress"
import Services from "../src/components/Services"
import Stats from "../src/components/Stats"
import Testimonials from "../src/components/Testimonials"
import VisionMission from "../src/components/VisionMission"
import Whatsapp from "../src/components/Whatsapp"
import WhyChooseUs from "../src/components/WhyChooseUs"
import OrderShell from "../src/components/order/OrderShell"

export default function HomePage() {
  return (
    <OrderShell>
    <div className="bg-soft dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen overflow-x-hidden">
      <ErrorBoundary>
        <DocumentLangSync />
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
      </ErrorBoundary>
    </div>
    </OrderShell>
  )
}
