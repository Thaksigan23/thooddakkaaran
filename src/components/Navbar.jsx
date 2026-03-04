import { useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import ThemeToggle from "./ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher"

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
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
      }`}
    >

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">

          <div className="bg-white dark:bg-white p-1 rounded-md">

            <img
              src="/images/logo.png"
              alt="Thooddakkaaran Logo"
              className="h-10 w-auto"
            />

          </div>

          <span className="text-lg font-bold text-green-700 dark:text-green-400">
            Thooddakkaaran
          </span>

        </a>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">

          <a
            href="#home"
            className={`transition hover:text-green-600 ${
              active === "home" ? "text-green-600 font-semibold" : ""
            }`}
          >
            Home
          </a>

          <a
            href="#services"
            className={`transition hover:text-green-600 ${
              active === "services" ? "text-green-600 font-semibold" : ""
            }`}
          >
            Services
          </a>

          <a
            href="#gallery"
            className={`transition hover:text-green-600 ${
              active === "gallery" ? "text-green-600 font-semibold" : ""
            }`}
          >
            Gallery
          </a>

          <a
            href="#contact"
            className={`transition hover:text-green-600 ${
              active === "contact" ? "text-green-600 font-semibold" : ""
            }`}
          >
            Contact
          </a>

          {/* Language + Theme */}
          <LanguageSwitcher />
          <ThemeToggle />

        </div>


        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">

          <LanguageSwitcher />
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl text-gray-700 dark:text-gray-200"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">

          <div className="flex flex-col items-center gap-6 py-6 text-gray-700 dark:text-gray-200 font-medium">

            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>

            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>

            <a href="#gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </a>

            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>

          </div>

        </div>

      )}

    </nav>
  )
}