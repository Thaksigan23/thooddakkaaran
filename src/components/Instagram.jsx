"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaInstagram } from "react-icons/fa"
import {
  INSTAGRAM_FEED_API_URL,
  INSTAGRAM_PROFILE_URL,
} from "../constants/social"

const STATIC_FALLBACK = [
  {
    src: "/images/insta1.jpg",
    permalink: INSTAGRAM_PROFILE_URL,
    caption: "Thooddakkaaran on Instagram",
  },
  {
    src: "/images/insta2.png",
    permalink: INSTAGRAM_PROFILE_URL,
    caption: "Thooddakkaaran on Instagram",
  },
  {
    src: "/images/insta3.png",
    permalink: INSTAGRAM_PROFILE_URL,
    caption: "Thooddakkaaran on Instagram",
  },
]

export default function Instagram() {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedNotice, setFeedNotice] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const base = INSTAGRAM_FEED_API_URL.startsWith("http")
          ? INSTAGRAM_FEED_API_URL
          : new URL(INSTAGRAM_FEED_API_URL, window.location.origin).href

        const res = await fetch(base, { headers: { Accept: "application/json" } })
        if (!res.ok) throw new Error(String(res.status))
        const data = await res.json()
        if (cancelled) return

        const posts = Array.isArray(data.posts) ? data.posts : []
        const configured = Boolean(data.configured)
        const apiError = typeof data.error === "string" ? data.error : ""

        if (posts.length > 0) {
          setFeedNotice(null)
          setItems(
            posts.map((p) => ({
              src: p.src,
              permalink: p.permalink,
              caption: p.caption || "Instagram post",
            }))
          )
        } else {
          if (configured && apiError) {
            setFeedNotice("Live feed is temporarily unavailable; showing highlights below.")
          } else if (configured && !apiError) {
            setFeedNotice(null)
          } else {
            setFeedNotice(null)
          }
          setItems(STATIC_FALLBACK)
        }
      } catch {
        if (!cancelled) {
          setFeedNotice(null)
          setItems(STATIC_FALLBACK)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const grid = items ?? STATIC_FALLBACK

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-white/10 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
          Social Media
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Instagram Updates
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Follow our farming journey and explore how we cultivate premium fruits
          across Sri Lanka.
        </p>
        {feedNotice ? (
          <p
            className="mt-4 text-sm text-amber-800 dark:text-amber-200/90"
            role="status"
            aria-live="polite"
          >
            {feedNotice}
          </p>
        ) : null}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl h-80 bg-gray-200 dark:bg-gray-800 animate-pulse"
                aria-hidden
              />
            ))
          : grid.map((img, i) => (
              <motion.a
                key={`${img.permalink}-${i}`}
                href={img.permalink}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-2xl block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
              >
                <img
                  src={img.src}
                  alt={img.caption || "Instagram post"}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none">
                  <FaInstagram className="text-white text-3xl" aria-hidden />
                </div>
              </motion.a>
            ))}
      </div>

      <div className="text-center mt-12">
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-red-500 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
        >
          <FaInstagram />
          Follow on Instagram
        </a>
      </div>
    </section>
  )
}
