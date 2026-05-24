import { Poppins } from "next/font/google"
import "./globals.css"
import AppProviders from "../src/components/providers/AppProviders"

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thooddakkaaran.vercel.app"
).replace(/\/+$/, "")

const INSTAGRAM_URL = (
  process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL || "https://www.instagram.com/"
).trim()

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Thooddakkaaran | Official Site — Jaffna Farm, Fruits & Natural Products",
  description:
    "Official website of Thooddakkaaran (Pvt) Ltd — Jaffna-based fruit farm, natural dairy and beverages, wholesale supply, and farming services across Sri Lanka. Product enquiries via contact; retail e-commerce is planned separately.",
  keywords: [
    "Thooddakkaaran",
    "pomegranate farming Sri Lanka",
    "dragon fruit farming",
    "sustainable agriculture Sri Lanka",
    "farm consultation",
    "fruit saplings Sri Lanka",
  ],
  authors: [{ name: "Thooddakkaaran Pvt Ltd" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png" },
  other: {
    google: "notranslate",
  },
  openGraph: {
    type: "website",
    siteName: "Thooddakkaaran",
    locale: "en_LK",
    title: "Thooddakkaaran | Official Site — Jaffna Farm & Products",
    description:
      "Official company site: fresh fruit, natural dairy & beverages from our Jaffna farm, plus farmer support and wholesale supply across Sri Lanka.",
    url: "/",
    images: [{ url: "/images/farm1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thooddakkaaran",
    title: "Thooddakkaaran | Official Site — Jaffna Farm & Products",
    description:
      "Official company site: fruit farm, natural products, and agricultural services in Sri Lanka.",
    images: ["/images/farm1.jpg"],
  },
}

export const viewport = {
  themeColor: "#166534",
  width: "device-width",
  initialScale: 1,
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Thooddakkaaran Private Limited",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  email: "info@thooddakkaaran.com",
  telephone: "+94 70 000 0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mirusuvil",
    addressCountry: "LK",
  },
  sameAs: [INSTAGRAM_URL],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${poppins.className} font-sans`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
