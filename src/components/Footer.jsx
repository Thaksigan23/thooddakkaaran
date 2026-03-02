import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#0f2d1c] text-gray-300 pt-20 pb-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        {/* Company */}
        <div>

          <img
            src="/images/logo.png"
            className="h-16 mb-4"
          />

          <p className="text-sm leading-relaxed">
            Thooddakkaaran Pvt Ltd specializes in premium pomegranate
            farming and sustainable agriculture solutions helping
            farmers grow healthy crops across Sri Lanka.
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-6 text-xl">

            <FaFacebook className="hover:text-green-400 cursor-pointer"/>
            <FaInstagram className="hover:text-green-400 cursor-pointer"/>
            <FaLinkedin className="hover:text-green-400 cursor-pointer"/>
            <FaWhatsapp className="hover:text-green-400 cursor-pointer"/>

          </div>

        </div>


        {/* Quick Links */}
        <div>

          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">

            <li><a href="#home" className="hover:text-green-400">Home</a></li>
            <li><a href="#services" className="hover:text-green-400">Services</a></li>
            <li><a href="#gallery" className="hover:text-green-400">Gallery</a></li>
            <li><a href="#contact" className="hover:text-green-400">Contact</a></li>

          </ul>

        </div>


        {/* Services */}
        <div>

          <h3 className="text-white font-semibold mb-4">
            Our Services
          </h3>

          <ul className="space-y-2 text-sm">

            <li>Pomegranate Cultivation</li>
            <li>Farm Consultation</li>
            <li>Plant Supply</li>
            <li>Sustainable Agriculture</li>

          </ul>

        </div>


        {/* Location */}
        <div>

          <h3 className="text-white font-semibold mb-4">
            Our Location
          </h3>

          <iframe
            className="rounded-lg w-full h-40"
            src="https://www.google.com/maps?q=Mirusuvil,Sri Lanka&output=embed"
          />

        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm">

  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">

    {/* Copyright */}
    <p>
      © 2026 Thooddakkaaran Pvt Ltd. All rights reserved.
    </p>

    {/* Made By */}
    <div className="flex items-center gap-2">

      <span>Made with ❤️ by</span>
<a href="https://www.techloom.ai/" target="_blank">

      <img
        src="/images/techloom.png"
        className="h-6"
        alt="Your Company"
      />
</a>

    </div>
    {/* Legal */}
    <div className="flex gap-6">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>

  </div>

</div>

    </footer>
  )
}