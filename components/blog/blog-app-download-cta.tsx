"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogAppDownloadCTAProps {
  variant: "mid-article" | "end-article"
  copy: string
  style: "benefit-focused" | "feature-focused" | "social-proof" | "urgency" | "problem-solution"
}

export function BlogAppDownloadCTA({ variant, copy }: BlogAppDownloadCTAProps) {
  if (variant === "mid-article") {
    return (
      <div className="not-prose my-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Transform Your Photos
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {copy}
        </p>
        <Link href="/waitlist">
          <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:shadow-lg transition-all">
            Join the Waitlist
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    )
  }

  // End-article variant
  return (
    <div className="not-prose my-16 p-10 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl text-white text-center">
      <h3 className="text-2xl sm:text-3xl font-bold mb-3">
        Ready to Colorize Your Photos?
      </h3>
      <p className="text-white/90 mb-6 max-w-xl mx-auto">
        {copy}
      </p>
      <Link href="/waitlist">
        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8">
          Join the Waitlist
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  )
}
