import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig, globalIgnores } from "eslint/config"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default defineConfig([
  globalIgnores([
    ".next",
    "dist",
    "node_modules",
    "playwright-report",
    "test-results",
  ]),
  {
    files: ["playwright.config.js", "next.config.js", "postcss.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: "module",
    },
  },
  {
    files: ["e2e/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        test: "readonly",
        expect: "readonly",
      },
      sourceType: "module",
    },
  },
  {
    files: ["app/api/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: "module",
    },
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(motion|[A-Z_])" },
      ],
      // Migration scope: the full <img> → next/image sweep is intentionally
      // out of scope for this change (Hero/Loader logos and Instagram CDN
      // images already use <Image />; gallery/decorative <img> tags stay
      // with native loading="lazy"). Tracked as a follow-up.
      "@next/next/no-img-element": "off",
    },
  },
])
