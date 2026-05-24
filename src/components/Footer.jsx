"use client"

import { useTranslation } from "react-i18next"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa"
import { WHATSAPP_LINK } from "../constants/contact"
import { INSTAGRAM_PROFILE_URL } from "../constants/social"

const year = new Date().getFullYear()

const QUICK_LINKS = [
  { id: "home", href: "#home", key: "nav.home" },
  { id: "about", href: "#about", key: "nav.about" },
  { id: "services", href: "#services", key: "nav.services" },
  { id: "products", href: "#products", key: "nav.products" },
  { id: "testimonials", href: "#testimonials", key: "nav.testimonials" },
  { id: "gallery", href: "#gallery", key: "nav.gallery" },
  { id: "contact", href: "#contact", key: "nav.contact" },
]

export default function Footer() {
  const { t } = useTranslation()

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com/", label: "Facebook" },
    {
      icon: <FaInstagram />,
      href: INSTAGRAM_PROFILE_URL,
      label: "Instagram",
    },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: <FaWhatsapp />, href: WHATSAPP_LINK, label: "WhatsApp" },
  ]

  const services = t("footer.services", { returnObjects: true })

  return (
    <footer className="bg-[#0b2215] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-md">
                <img
                  src="/images/logo.png"
                  alt={t("footer.logoAlt")}
                  className="h-14 w-auto"
                />
              </div>

              <div>
                <h2 className="text-white text-xl font-bold">
                  Thooddakkaaran
                </h2>
                <p className="text-sm text-green-300">{t("footer.tagline")}</p>
              </div>
            </div>

            <p className="text-gray-400 mt-5 text-sm leading-7">
              {t("footer.blurb")}
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-400" />
                <span>{t("footer.address")}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" />
                <span>{t("footer.email")}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-400" />
                <span>{t("footer.phone")}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              {t("footer.quickLinks")}
            </h3>

            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              {t("footer.ourServices")}
            </h3>

            <ul className="space-y-3 text-sm">
              {(Array.isArray(services) ? services : []).map((service, i) => (
                <li key={i} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center lg:text-left">
            {t("footer.copyright", { year })}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{t("footer.madeWith")}</span>
            <a
              href="https://www.techloom.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/techloom.png"
                className="h-4"
                alt={t("footer.techloomAlt")}
              />
            </a>
          </div>

          <div className="flex gap-5 text-sm">
            <a href="#" className="text-gray-400 hover:text-green-400 transition">
              {t("footer.privacyPolicy")}
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition">
              {t("footer.termsOfService")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
