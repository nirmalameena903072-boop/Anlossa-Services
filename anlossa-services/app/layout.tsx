import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

import SmoothScroll from "@/components/providers/smooth-scroll";
import GrainOverlay from "@/components/ui/grain-overlay";

const cormorant = localFont({
  src: [
    {
      path: "./fonts/cormorant-garamond-latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-latin-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const jakarta = localFont({
  src: [
    {
      path: "./fonts/plus-jakarta-sans-latin.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const SITE_URL = "https://anlossaservices.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anlossa Services — Creator Partnerships for Indian Beauty & D2C",
    template: "%s — Anlossa Services",
  },
  description:
    "Anlossa Services is a boutique creator partnerships and sponsorship management agency for India's rising skincare, beauty and haircare voices and the D2C brands scaling with them. ₹0 upfront. 20% commission only on closed deals.",
  keywords: [
    "creator partnerships India",
    "influencer marketing agency India",
    "skincare influencers",
    "beauty creator management",
    "D2C brand collaborations",
    "sponsorship management",
    "Anlossa Services",
  ],
  authors: [{ name: "Pradeep — Anlossa Services" }],
  creator: "Anlossa Services",
  openGraph: {
    type: "website",
    images: [
      {
        url: "/brand/anlossa-og.png",
        width: 1200,
        height: 630,
        alt: "Anlossa Services — creator partnerships for Indian beauty and D2C",
      },
    ],
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Anlossa Services",
    title: "Anlossa Services — Turning High-Trust Indian Creators Into D2C Brand Powerhouses",
    description:
      "Boutique sponsorship and talent partnerships for India's rising skincare and beauty voices. Zero upfront cost. 100% performance-aligned.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/anlossa-og.png"],
    title: "Anlossa Services — Creator Partnerships, India",
    description:
      "₹0 upfront. 20% commission on closed sponsorships only. A 30-day non-exclusive trial.",
  },
  icons: {
    icon: [
      { url: "/brand/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F4",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Anlossa Services",
  description:
    "Creator partnerships and sponsorship management agency for Indian skincare, beauty, haircare creators and D2C brands.",
  email: "anlossaservices@gmail.com",
  url: SITE_URL,
  areaServed: "IN",
  founder: { "@type": "Person", name: "Pradeep" },
  knowsAbout: [
    "Creator Partnerships",
    "Influencer Marketing",
    "Beauty & Skincare D2C",
    "Sponsorship Management",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-alabaster font-sans text-ink">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[999] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-alabaster"
        >
          Skip to content
        </a>
        <GrainOverlay />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#141416",
              color: "#F8F7F4",
              border: "1px solid rgba(248,247,244,0.14)",
              borderRadius: "999px",
              fontSize: "13px",
              fontFamily: "var(--font-jakarta)",
              padding: "12px 20px",
            },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
