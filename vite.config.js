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
      },
    ],
  }
})
