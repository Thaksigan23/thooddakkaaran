import { useEffect, useState } from "react"

export default function ScrollProgress() {

  const [scroll, setScroll] = useState(0)

  useEffect(() => {

    const handleScroll = () => {

      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrolled = (scrollTop / docHeight) * 100

      setScroll(scrolled)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (

    <div
      className="fixed top-0 left-0 h-1 z-[9999] bg-gradient-to-r from-green-500 via-red-500 to-yellow-400 dark:from-green-400 dark:via-red-400 dark:to-yellow-300"
      style={{ width: `${scroll}%` }}
    />

  )

}