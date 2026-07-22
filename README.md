<h1 align="center">
  <br>
  DevToolkit
  <br>
</h1>

<h4 align="center">A collection of 8 free, fast, and developer-friendly utilities — all running right in your browser.</h4>

<p align="center">
  <a href="#tools">Tools</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

DevToolkit grew out of a simple idea: every developer has that one tab open with an online JSON formatter or a Base64 encoder. This project brings those commonly used tools together in one clean, fast, and completely free interface. No ads, no sign-ups, no nonsense.

Everything runs client-side. Your data never leaves the browser.

## Tools

| Tool | Description | Category |
|------|-------------|----------|
| **[JSON Formatter](/tools/json-formatter)** | Format, minify, and validate JSON with configurable indentation | Format |
| **[JWT Decoder](/tools/jwt-decoder)** | Decode and inspect JWT tokens — view headers, payloads, and expiration status | Convert |
| **[Base64 Encoder/Decoder](/tools/base64)** | Encode and decode Base64 strings for data transmission and storage | Convert |
| **[Regex Tester](/tools/regex-tester)** | Test regular expressions with real-time matching, highlighting, and flag support | Test |
| **[URL Encoder/Decoder](/tools/url-encoder)** | Encode and decode URL components, query parameters, and special characters | Convert |
| **[Color Converter](/tools/color-converter)** | Convert between HEX, RGB, and HSL color formats with a live preview and sliders | Convert |
| **[Hash Generator](/tools/hash-generator)** | Generate MD5, SHA-1, SHA-256, and SHA-512 hashes using the Web Crypto API | Generate |
| **[Lorem Ipsum Generator](/tools/lorem-ipsum)** | Generate placeholder text — words, sentences, or full paragraphs | Generate |

## Getting Started

### Prerequisites

You'll need [Node.js](https://nodejs.org/) 18 or later and npm (or yarn/pnpm).

### Installation

```
# Clone the repository
git clone https://github.com/v2Talal/DevToolKit.git

# Navigate into the project
cd devtoolkit

# Install dependencies
npm install
```

### Running Locally

```
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. You should see the DevToolkit homepage with all 8 tools ready to use.

### Production Build

```
npm run build
npm run start
```

This generates a production-optimized build and serves it locally.

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, static site generation, file-based routing
- **[React 19](https://react.dev/)** — Component-based UI with hooks and server components
- **[TypeScript 5](https://www.typescriptlang.org/)** — Full type safety across the codebase
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling with CSS custom properties for theming
- **[Motion](https://motion.dev/)** — Smooth page transitions and micro-interactions
- **[IBM Plex](https://www.ibm.com/plex)** — IBM Plex Sans for UI, IBM Plex Mono for code blocks

All cryptographic operations (hashing in the Hash Generator) use the browser's built-in [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — no external crypto libraries needed.

## Project Structure

```
devtoolkit/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (fonts, metadata, navbar)
│   │   ├── page.tsx         # Homepage with hero and tool grid
│   │   ├── globals.css      # Theme system, fonts, utilities
│   │   └── tools/
│   │       ├── page.tsx     # All-tools listing with category filter
│   │       ├── json-formatter/page.tsx
│   │       ├── jwt-decoder/page.tsx
│   │       ├── base64/page.tsx
│   │       ├── regex-tester/page.tsx
│   │       ├── url-encoder/page.tsx
│   │       ├── color-converter/page.tsx
│   │       ├── hash-generator/page.tsx
│   │       └── lorem-ipsum/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation with dark/light mode toggle
│   │   ├── ToolCard.tsx     # Animated tool card
│   │   ├── ToolLayout.tsx   # Shared layout for all tool pages
│   │   └── CopyButton.tsx   # Clipboard copy with visual feedback
│   └── lib/
│       ├── animations.ts    # Centralized animation variants
│       └── tools.ts         # Tool definitions and categories
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Features

- **Dark & Light Mode** — Automatic theme detection with a manual toggle. Your preference persists across sessions.
- **Fully Responsive** — Works on mobile, tablet, and desktop without compromise.
- **Smooth Animations** — Every page transition and interaction is animated using Motion.
- **Zero Tracking** — No analytics, no cookies, no data collection. Everything runs in your browser.
- **Category Filtering** — Quickly filter tools by category (Format, Convert, Generate, Test).
- **Copy to Clipboard** — One-click copy on all output fields with instant visual confirmation.
- **Accessible** — Keyboard-navigable, respects `prefers-reduced-motion`, and follows semantic HTML.

## Deployment

DevToolkit is a standard Next.js application. Deploy it anywhere that supports Node.js:

### Vercel (Recommended)

```
npx vercel
```

### Netlify

```
npx netlify-cli deploy --build
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export

If you prefer a fully static site:

```
# Add to next.config.ts:
# output: 'export'

npm run build
# The output will be in the 'out/' directory
```

## Contributing

Contributions are welcome. If you have an idea for a new tool or an improvement to an existing one:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-new-tool`)
3. Add your tool under `src/app/tools/your-tool/page.tsx`
4. Register it in `src/lib/tools.ts`
5. Submit a pull request

## License

This project is open source under the [MIT License](LICENSE).
