# Anlossa Services

Editorial-luxury agency site & interactive portfolio for **Anlossa Services** — a boutique creator partnerships and sponsorship management agency for Indian skincare, beauty & haircare creators and the D2C brands scaling with them.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`), shadcn/ui conventions |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` (`Text3D`, `MeshTransmissionMaterial`, `Environment`) |
| Motion | `framer-motion` (masked reveals, layout, marquees), `gsap` + `ScrollTrigger` (pinned process), `lenis` (inertial scroll) |
| Icons | `lucide-react` |
| Feedback | `sonner` (copy-to-clipboard toast) |
| Design component | `@skiper-ui/skiper40` — flagship roster section |

## Run

```bash
cd anlossa-services
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (prerenders to static)
npm run lint
```

## Architecture

```
app/
  layout.tsx            # fonts (self-hosted), metadata + JSON-LD, Toaster, skip link
  page.tsx              # section composition
  globals.css           # design tokens, editorial type scale, components layer
  fonts/                # Cormorant Garamond + Plus Jakarta Sans (woff2, OFL)
components/
  providers/            # Lenis ← GSAP ScrollTrigger bridge
  three/                # hero canvas, glass serum bottle, extruded serif wordmark
  sections/             # hero, ticker, positioning, roster, method, proof, contact, closing, footer
  site/navbar.tsx       # condensed sticky nav, IST clock, full-screen mobile sheet
  ui/                   # skiper40, split-reveal, marquee, counter, primitives
lib/site.ts             # brand constants, roster data, nav
hooks/                  # render-quality detection, client-only values
public/fonts/           # cormorant-typeface.json (Text3D glyph outlines)
```

### Brand system

- `#F8F7F4` alabaster · `#111113` obsidian · `#141416` ink · `#C6A87C` champagne
- Display: Cormorant Garamond (variable, self-hosted) · UI: Plus Jakarta Sans
- Headings track `-0.03em`; hairlines at `rgba(20,20,22,0.10)`; Swiss index labels on every section

### The 3D `Text3D` glyph asset

`public/fonts/cormorant-typeface.json` is a real three.js typeface built from the
Cormorant Garamond variable font (ASCII 32–126, cubic Bézier outlines), so the
extruded `ANLOSSA` wordmark needs no CDN fetch at runtime. Regenerate with:

```bash
npm i -g opentype.js   # or use the local dev dependency of your choice
node ttf2typeface.js CormorantGaramond.ttf public/fonts/cormorant-typeface.json
```

### Performance guardrails

- The WebGL canvas is `dynamic(..., { ssr: false })` inside a fixed-size layer, so
  the hero paints instantly with zero layout shift; a `Suspense` boundary resolves
  the scene without blocking first paint.
- Render quality is downgraded automatically on coarse pointers, narrow viewports
  and ≤4-core devices: lower canvas DPR, fewer transmission samples, no bevel
  segments, reduced curve resolution, coarser environment map.
- Lenis is skipped entirely under `prefers-reduced-motion`; all section links fall
  back to native scrolling.
- Counters animate through `MotionValue` (no per-frame React re-renders).
- `useSyncExternalStore` handles device/hydration detection, so no components
  cascade renders from effects.

### Contact wiring

All CTAs resolve to `anlossaservices@gmail.com` — copy-to-clipboard (with toast),
pre-filled `mailto:` composers for creators and brands, and direct links in the
navigation, closing section and footer. No phone numbers, no placeholder address.

## Attribution

`components/ui/skiper40.tsx` is Skiper 40 (Animated Link) from
[skiper-ui.com](https://skiper-ui.com), adapted for the App Router. Free use
requires attribution to Skiper UI. Fonts are licensed under the SIL Open Font
License (see `app/fonts/OFL-*.txt`).
