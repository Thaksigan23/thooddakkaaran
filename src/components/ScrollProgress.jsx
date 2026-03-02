import { useEffect, useState } from "react"

export default function ScrollProgress() {

  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {

      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrollPosition = window.scrollY

      setScroll((scrollPosition / totalHeight) * 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-green-600 z-50"
      style={{ width: `${scroll}%` }}
    ></div>
  )
}