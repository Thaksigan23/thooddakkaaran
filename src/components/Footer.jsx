import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"

export default function Footer() {

  return (

    <footer className="bg-[#0f2d1c] text-gray-300 pt-20 pb-10">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">

        {/* Company Info */}
        <div>

          <div className="bg-white p-3 rounded-lg inline-block shadow">
            <img
              src="/images/logo.png"
              alt="Thooddakkaaran Logo"
              className="h-14 w-auto"
            />
          </div>

          <p className="text-gray-400 mt-5 text-sm leading-relaxed max-w-sm">
            Thooddakkaaran (Pvt) Ltd is a trusted agriculture company in Sri Lanka
            specializing in premium pomegranate farming, plant supply,
            and modern farming consultation.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-6 text-xl">

            <a href="#" className="hover:text-green-400 transition">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-green-400 transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-green-400 transition">
              <FaLinkedin />
            </a>

            <a href="#" className="hover:text-green-400 transition">
              <FaWhatsapp />
            </a>

          </div>

        </div>


        {/* Quick Links */}
        <div>

          <h3 className="text-white font-semibold mb-4 text-lg">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">

            <li>
              <a href="#home" className="hover:text-green-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="#services" className="hover:text-green-400 transition">
                Services
              </a>
            </li>

            <li>
              <a href="#gallery" className="hover:text-green-400 transition">
                Gallery
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-green-400 transition">
                Contact
              </a>
            </li>

          </ul>

        </div>


        {/* Services */}
        <div>

          <h3 className="text-white font-semibold mb-4 text-lg">
            Our Services
          </h3>

          <ul className="space-y-3 text-sm text-gray-400">

            <li>Pomegranate Cultivation</li>
            <li>Farm Consultation</li>
            <li>Plant Supply</li>
            <li>Sustainable Agriculture</li>

          </ul>

        </div>


        {/* Location Map */}
        <div>

          <h3 className="text-white font-semibold mb-4 text-lg">
            Our Location
          </h3>

          <div className="overflow-hidden rounded-lg shadow">

            <iframe
              title="Farm Location"
              src="https://www.google.com/maps?q=Mirusuvil,Sri Lanka&output=embed"
              className="w-full h-40 border-0"
              loading="lazy"
            />

          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">

          {/* Copyright */}
          <p className="text-gray-400 text-center md:text-left">
            © 2026 Thooddakkaaran Pvt Ltd. All rights reserved.
          </p>

          {/* Made By */}
          <div className="flex items-center gap-2">

            <span className="text-gray-400">Made with ❤️ by</span>

            <a
              href="https://www.techloom.ai/"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="/images/techloom.png"
                className="h-6"
                alt="Techloom"
              />
            </a>

          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-gray-400">

            <a href="#" className="hover:text-green-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-green-400 transition">
              Terms of Service
            </a>

          </div>

        </div>

      </div>

    </footer>

  )
}