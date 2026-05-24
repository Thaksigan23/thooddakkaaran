"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight

      if (pageHeight <= 0) {
        setScrollProgress(0)
        return
      }

      setScrollProgress((scrollTop / pageHeight) * 100)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-green-500 transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}