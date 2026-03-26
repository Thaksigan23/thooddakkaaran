import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa"

export default function Footer() {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://facebook.com/",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com/",
      label: "LinkedIn",
    },
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/94700000000",
      label: "WhatsApp",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    "Pomegranate Cultivation",
    "Farm Consultation",
    "Plant Supply",
    "Sustainable Agriculture",
  ]

  return (
    <footer className="bg-[#0b2215] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-md">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-14 w-auto"
                />
              </div>

              <div>
                <h2 className="text-white text-xl font-bold">
                  Thooddakkaaran
                </h2>
                <p className="text-sm text-green-300">
                  Premium Pomegranate Farm
                </p>
              </div>
            </div>

            <p className="text-gray-400 mt-5 text-sm leading-7">
              Trusted agriculture company in Sri Lanka specializing in premium
              pomegranate farming, plant supply, and modern farming consultation.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-400" />
                <span>Mirusuvil, Sri Lanka</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" />
                <span>info@thooddakkaaran.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-400" />
                <span>+94 70 000 0000</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Our Services
            </h3>

            <ul className="space-y-3 text-sm">
              {services.map((service, i) => (
                <li key={i} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          <p className="text-gray-400 text-sm text-center lg:text-left">
            © 2026 Thooddakkaaran Pvt Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with love by</span>
            <a
              href="https://www.techloom.ai/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/techloom.png"
                className="h-6"
                alt="Techloom"
              />
            </a>
          </div>

          <div className="flex gap-5 text-sm">
            <a href="#" className="text-gray-400 hover:text-green-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition">
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}