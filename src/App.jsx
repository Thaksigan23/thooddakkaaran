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
  return (
    <>
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
    </>
  )
}

export default App