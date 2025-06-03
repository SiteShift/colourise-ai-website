import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ColouriseAI - Bring Your Memories to Life with AI Photo Colorization",
  description:
    "Transform black & white photos into stunning color images with AI. Restore old family photos, enhance faces, and upscale to 4K quality. Download free and start preserving your memories today.",
  keywords:
    "AI photo colorization, restore old photos, black and white to color, family memories, historical photos, AI image enhancement",
  authors: [{ name: "ColouriseAI" }],
  creator: "ColouriseAI",
  publisher: "ColouriseAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://colouriseai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ColouriseAI - Bring Your Memories to Life with AI",
    description:
      "Transform black & white photos into stunning color images with AI. Restore old family photos and preserve your memories.",
    url: "https://colouriseai.com",
    siteName: "ColouriseAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ColouriseAI - AI Photo Colorization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColouriseAI - Bring Your Memories to Life with AI",
    description: "Transform black & white photos into stunning color images with AI.",
    images: ["/og-image.jpg"],
    creator: "@ColouriseAI",
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
    generator: 'v0.dev'
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
      </body>
    </html>
  )
}
