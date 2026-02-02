import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ColorizeAI - Bring Your Memories to Life with AI Photo Colorization",
  description:
    "Transform black & white photos into stunning color images with AI. Restore old family photos, enhance faces, and upscale to 4K quality. Download free and start preserving your memories today.",
  keywords:
    "AI photo colorization, restore old photos, black and white to color, family memories, historical photos, AI image enhancement, colorize photos",
  authors: [{ name: "ColorizeAI" }],
  creator: "ColorizeAI",
  publisher: "ColorizeAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://colorizeai.app"),
  // Note: Removed sitewide canonical - each page should define its own canonical
  // Note: Removed icons config - using dynamic icon routes (app/icon.tsx, app/apple-icon.tsx)
  openGraph: {
    title: "ColorizeAI - Bring Your Memories to Life with AI",
    description:
      "Transform black & white photos into stunning color images with AI. Restore old family photos and preserve your memories.",
    url: "https://colorizeai.app",
    siteName: "ColorizeAI",
    images: [
      {
        url: "https://colorizeai.app/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "ColorizeAI - AI Photo Colorization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorizeAI - Bring Your Memories to Life with AI",
    description: "Transform black & white photos into stunning color images with AI.",
    images: ["https://colorizeai.app/hero-background.webp"],
    creator: "@colorizeai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-black`}>
          <Header />
          {children}
          <Analytics />
      </body>
    </html>
  )
}
