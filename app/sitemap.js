const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thooddakkaaran.vercel.app"
).replace(/\/+$/, "")

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: new Date(),
    },
  ]
}
