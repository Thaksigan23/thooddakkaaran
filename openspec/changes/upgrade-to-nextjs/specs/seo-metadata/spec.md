## ADDED Requirements

### Requirement: Root metadata defined via Next.js Metadata API

`app/layout.jsx` SHALL export a `metadata` (or `generateMetadata`) object that emits the document `<title>`, description, keywords, author, theme color, viewport, charset, robots directive, and canonical URL currently present in `index.html`. The Vite plugin's `__SITE_URL__` and `__INSTAGRAM_URL__` placeholders SHALL be removed.

#### Scenario: Title and description match the previous site
- **WHEN** the root page is requested
- **THEN** the document `<title>` is `Thooddakkaaran | Official Site — Jaffna Farm, Fruits & Natural Products` and the `meta[name="description"]` matches the existing description verbatim

#### Scenario: Canonical link uses the configured site URL
- **WHEN** `NEXT_PUBLIC_SITE_URL=https://thooddakkaaran.vercel.app` is set
- **THEN** the rendered HTML contains `<link rel="canonical" href="https://thooddakkaaran.vercel.app/">`

#### Scenario: Theme color and language are preserved
- **WHEN** the root page is requested
- **THEN** the rendered HTML has `<html lang="en" translate="no">` and a `<meta name="theme-color" content="#166534">` tag

### Requirement: Open Graph and Twitter card

The root layout SHALL emit complete Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`) and Twitter card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`) tags identical in value to the current `index.html`, with absolute image URLs derived from `NEXT_PUBLIC_SITE_URL`.

#### Scenario: OG image is absolute
- **WHEN** the page is fetched with `NEXT_PUBLIC_SITE_URL=https://thooddakkaaran.vercel.app`
- **THEN** the response contains `<meta property="og:image" content="https://thooddakkaaran.vercel.app/images/farm1.jpg">`

#### Scenario: Twitter card is summary_large_image
- **WHEN** the page is fetched
- **THEN** the response contains `<meta name="twitter:card" content="summary_large_image">`

### Requirement: Organization JSON-LD

The root layout SHALL embed a `<script type="application/ld+json">` block in the `<head>` containing the `Organization` schema with `name`, `url`, `logo`, `email`, `telephone`, `address` (`PostalAddress` for `Mirusuvil, LK`), and `sameAs` (Instagram profile URL). All URLs SHALL be absolute and derived from `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL`.

#### Scenario: JSON-LD validates as Organization
- **WHEN** the rendered HTML is parsed
- **THEN** there is exactly one `<script type="application/ld+json">` element whose JSON has `"@type": "Organization"` and `"name": "Thooddakkaaran Private Limited"`

#### Scenario: JSON-LD URLs are absolute
- **WHEN** `NEXT_PUBLIC_SITE_URL=https://thooddakkaaran.vercel.app`
- **THEN** the JSON-LD `url` field equals `https://thooddakkaaran.vercel.app/` and `logo` equals `https://thooddakkaaran.vercel.app/images/logo.png`

### Requirement: `robots.txt` served via `app/robots.js`

A `/robots.txt` route SHALL be served by Next.js at the path `/robots.txt`, allowing all user agents and pointing to the sitemap URL derived from `NEXT_PUBLIC_SITE_URL`. The Vite plugin's `closeBundle` emission SHALL be removed.

#### Scenario: robots.txt allows all crawlers
- **WHEN** `GET /robots.txt` is requested
- **THEN** the response has `Content-Type: text/plain`, status 200, and body containing `User-agent: *`, `Allow: /`, and `Sitemap: https://thooddakkaaran.vercel.app/sitemap.xml` (or whatever `NEXT_PUBLIC_SITE_URL` resolves to)

### Requirement: `sitemap.xml` served via `app/sitemap.js`

A `/sitemap.xml` route SHALL be served by Next.js listing at minimum the home URL (`/`) with `changefreq: weekly` and `priority: 1.0`, using `NEXT_PUBLIC_SITE_URL` as the base.

#### Scenario: sitemap lists the home URL
- **WHEN** `GET /sitemap.xml` is requested
- **THEN** the response status is 200, content type is `application/xml`, and the body contains a `<url>` entry whose `<loc>` is `https://thooddakkaaran.vercel.app/` (matching the configured site URL)

### Requirement: Preserved skip link and main landmark

The rendered page SHALL preserve the accessible "Skip to main content" anchor that targets `#main-content`, matching current Playwright smoke expectations.

#### Scenario: Skip link is present and focusable
- **WHEN** the page loads and the user tabs once
- **THEN** the element matching `a.skip-link[href="#main-content"]` (or equivalent) receives focus and is visible
