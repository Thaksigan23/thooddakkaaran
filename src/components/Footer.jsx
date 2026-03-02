import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Thooddakkaaran
          </h2>

          <p className="text-gray-200">
            Premium pomegranate farming and sustainable agriculture
            solutions helping farmers grow better crops across Sri Lanka.
          </p>
        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>
              <a href="#home" className="hover:text-accent">
                Home
              </a>
            </li>

            <li>
              <a href="#services" className="hover:text-accent">
                Services
              </a>
            </li>

            <li>
              <a href="#gallery" className="hover:text-accent">
                Gallery
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-accent">
                Contact
              </a>
            </li>

          </ul>

        </div>

        {/* Social Media */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/94700000000"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 mt-10 pt-6 text-center text-gray-200">

        © {new Date().getFullYear()} Thooddakkaaran Pvt Ltd. All rights reserved.

      </div>

    </footer>
  )
}