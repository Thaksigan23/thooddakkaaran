import { useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      // Navbar background change
      setScrolled(window.scrollY > 50)

      // Active section detection
      const sections = ["home", "services", "gallery", "contact"]

      sections.forEach((section) => {
        const element = document.getElementById(section)

        if (element) {
          const rect = element.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "backdrop-blur-lg bg-white/70 border-b border-white/30"
      }`}
    >

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-700">
          Thooddakkaaran
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium">

          <li>
            <a
              href="#home"
              className={`hover:text-green-700 transition ${
                active === "home" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#services"
              className={`hover:text-green-700 transition ${
                active === "services" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#gallery"
              className={`hover:text-green-700 transition ${
                active === "gallery" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Gallery
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className={`hover:text-green-700 transition ${
                active === "contact" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Contact
            </a>
          </li>

        </ul>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">

          <ul className="flex flex-col items-center gap-6 p-6">

            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          </ul>

        </div>
      )}

    </nav>
  )
}