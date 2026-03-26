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
      setScrolled(window.scrollY > 40)

      const sections = ["home", "services", "gallery", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)

        if (element) {
          const rect = element.getBoundingClientRect()

          if (rect.top <= 140 && rect.bottom >= 140) {
            setActive(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ]

  const handleMenuClose = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-black/85 backdrop-blur-xl shadow-md border-b border-gray-200/50 dark:border-white/10"
          : "bg-white/70 dark:bg-black/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto h-18 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            onClick={handleMenuClose}
          >
            <div className="bg-white rounded-xl p-1.5 shadow-sm ring-1 ring-gray-200/60 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Thooddakkaaran Logo"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold tracking-wide text-green-700 dark:text-green-400 leading-none">
                Thooddakkaaran
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-1">
                Premium Pomegranate Farm
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2 lg:gap-3 text-gray-700 dark:text-gray-200 font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    active === link.id
                      ? "bg-green-600 text-white shadow-sm"
                      : "hover:text-green-600 hover:bg-green-50 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 pl-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white shadow-sm hover:bg-green-700 transition"
            >
              {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-white/10">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleMenuClose}
                className={`px-6 py-3 text-center font-medium transition ${
                  active === link.id
                    ? "text-green-600 bg-green-50 dark:bg-white/5"
                    : "text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}