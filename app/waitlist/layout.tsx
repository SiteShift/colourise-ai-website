import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join the Waitlist | ColorizeAI",
  description: "Be the first to know when ColorizeAI launches. Transform your black & white photos into stunning color with AI-powered colorization.",
  alternates: {
    canonical: "/waitlist",
  },
  openGraph: {
    title: "Join the ColorizeAI Waitlist",
    description: "Be first to colorize your family photos with AI. Join the waitlist now.",
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
