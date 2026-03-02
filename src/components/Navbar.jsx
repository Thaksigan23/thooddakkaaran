import { useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 50)

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <img
            src="/images/logo.png"
            alt="Thooddakkaaran Logo"
            className="h-10 w-auto"
          />

          <span className="text-xl font-bold text-green-700">
            Thooddakkaaran
          </span>

        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <li>
            <a
              href="#home"
              className={`transition hover:text-green-700 ${
                active === "home" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#services"
              className={`transition hover:text-green-700 ${
                active === "services" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#gallery"
              className={`transition hover:text-green-700 ${
                active === "gallery" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Gallery
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className={`transition hover:text-green-700 ${
                active === "contact" ? "text-green-700 font-semibold" : ""
              }`}
            >
              Contact
            </a>
          </li>

        </ul>

        {/* Mobile Button */}
        <div
          className="md:hidden text-2xl cursor-pointer text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden bg-white shadow-lg">

          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">

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