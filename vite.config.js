import fs from "node:fs"
import path from "node:path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const siteUrl = (
    env.VITE_SITE_URL || "https://thooddakkaaran.vercel.app"
  ).replace(/\/+$/, "")
  const instagramUrl = (
    env.VITE_INSTAGRAM_PROFILE_URL || "https://www.instagram.com/"
  ).trim()

  return {
    plugins: [
      react(),
      {
        name: "inject-site-meta",
        transformIndexHtml(html) {
          return html
            .replaceAll("__SITE_URL__", siteUrl)
            .replaceAll("__INSTAGRAM_URL__", instagramUrl)
        },
        closeBundle() {
          const outDir = path.resolve(process.cwd(), "dist")
          if (!fs.existsSync(outDir)) return

          const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
          fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf8")

          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
          fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8")
        },
      },
    ],
  }
})
