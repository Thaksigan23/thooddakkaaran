import { FaFacebook, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Thooddakkaaran
          </h2>

          <p className="text-gray-400">
            Premium pomegranate farming and sustainable agriculture solutions
            helping farmers grow better crops across Sri Lanka.
          </p>
        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>

            <li>
              <a href="#gallery" className="hover:text-white">
                Gallery
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>

          </ul>

        </div>

        {/* Contact / Social */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Connect With Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <a href="#" className="hover:text-green-400">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-green-400">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-green-400">
              <FaLinkedin />
            </a>

            <a href="#" className="hover:text-green-400">
              <FaPhone />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">

        © {new Date().getFullYear()} Thooddakkaaran (Pvt) Ltd. All rights reserved.

      </div>

    </footer>
  )
}