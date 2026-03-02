import { useState } from "react"
import Reveal from "./Reveal"
export default function Gallery() {

  const images = [
    { src: "/images/gal1.png" },
    { src: "/images/gal2.png" },
    { src: "/images/gal3.png" },
    { src: "/images/gal4.png" },
    { src: "/images/gal5.png" },
    { src: "/images/gal6.png" }
  ]

  const [index, setIndex] = useState(-1)

  return (
    <Reveal>
    <section id="gallery" className="py-24 bg-gray-100">

      <h2 className="text-4xl font-bold text-center mb-12">
        Farm Gallery
      </h2>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
  Explore our farms where we cultivate premium pomegranates and
  support farmers with modern agricultural techniques.
</p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">

        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt="Farm Gallery"
            className="rounded-xl object-cover h-72 w-full hover:scale-105 transition duration-300"
          />
        ))}

      </div>

    </section>
    </Reveal>
  )
}