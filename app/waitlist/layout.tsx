import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join the Waitlist | ColouriseAI",
  description: "Be the first to know when ColouriseAI launches. Transform your black & white photos into stunning color with AI-powered colorization.",
  alternates: {
    canonical: "/waitlist",
  },
  openGraph: {
    title: "Join the ColouriseAI Waitlist",
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
