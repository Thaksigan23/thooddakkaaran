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

  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <Reveal>

      <section
        id="gallery"
        className="py-24 px-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-500"
      >

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-green-400 mb-4">
            Farm Gallery
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Explore our farms where we cultivate premium pomegranates and
            support farmers with modern agricultural techniques.
          </p>

        </div>

        {/* Image Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {images.map((img, i) => (

            <div
              key={i}
              onClick={() => setSelectedImage(img.src)}
              className="overflow-hidden rounded-xl cursor-pointer group"
            >

              <img
                src={img.src}
                alt="Farm Gallery"
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

          ))}

        </div>

        {/* Image Modal */}
        {selectedImage && (

          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
          >

            <img
              src={selectedImage}
              alt="Gallery Preview"
              className="max-h-[80vh] rounded-xl"
            />

          </div>

        )}

      </section>

    </Reveal>
  )
}