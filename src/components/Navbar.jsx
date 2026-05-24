"use client"

import { useState, useEffect } from "react"
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa"
import ThemeToggle from "./ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher"
import { WHATSAPP_LINK, CONTACT_PHONE_HREF } from "../constants/contact"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = [
        "home",
        "about",
        "services",
        "products",
        "testimonials",
        "gallery",
        "contact",
      ]

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
    { id: "about", label: "About Us" },
    { id: "services", label: "Farming Services" },
    { id: "products", label: "Our Products" },
    { id: "testimonials", label: "Testimonials" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact Us" },
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
        <div className="flex items-center justify-between h-[72px] gap-3">
          <a
            href="#home"
            className="flex items-center gap-3 group min-w-0"
            onClick={handleMenuClose}
          >
            <div className="bg-white rounded-xl p-1.5 shadow-sm ring-1 ring-gray-200/60 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <img
                src="/images/logo.png"
                alt="Thooddakkaaran Logo"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            <div className="hidden sm:block min-w-0">
              <p className="text-base sm:text-lg font-bold tracking-wide text-green-700 dark:text-green-400 leading-none truncate">
                Thooddakkaaran
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-1 truncate">
                Fruit Farm · Jaffna, Sri Lanka
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1 min-w-0">
            <div className="flex items-center gap-0.5 text-gray-700 dark:text-gray-200 text-xs md:text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`px-2.5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                    active === link.id
                      ? "bg-green-600 text-white shadow-sm"
                      : "hover:text-green-600 hover:bg-green-50 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-1 shrink-0">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white shadow-sm hover:bg-green-700 transition"
            >
              {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-white/10">
          <div className="flex flex-col py-4 max-h-[70vh] overflow-y-auto">
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
            <div className="flex flex-col gap-2 px-6 pt-2">
              <a
                href={CONTACT_PHONE_HREF}
                className="text-center rounded-xl border border-green-200 dark:border-white/20 py-3 font-semibold text-green-700 dark:text-green-300"
              >
                Dial Phone Number
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-center rounded-xl bg-green-600 text-white py-3 font-semibold flex items-center justify-center gap-2"
              >
                <FaWhatsapp />
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
