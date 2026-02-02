import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | ColorizeAI",
  description:
    "Get in touch with the ColorizeAI team. Have questions about AI photo colorization? We typically respond within 24-48 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | ColorizeAI",
    description:
      "Get in touch with the ColorizeAI team. Have questions about AI photo colorization? We typically respond within 24-48 hours.",
    url: "https://colorizeai.app/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | ColorizeAI",
    description: "Get in touch with the ColorizeAI team for questions about AI photo colorization.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
