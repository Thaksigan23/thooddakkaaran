import { useState, useEffect } from "react"
import { FaArrowUp } from "react-icons/fa"

export default function BackToTop() {

  const [visible, setVisible] = useState(false)

  useEffect(() => {

    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)

  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="fixed bottom-5 right-7 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 z-50"
      >
        <FaArrowUp />
      </button>
    )
  )
}