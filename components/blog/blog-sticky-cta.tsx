"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible || isDismissed) return null

  return (
    <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <div className="w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header with brand gradient */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">
              ColorizeAI
            </h3>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-white/90 text-xs mt-1">
            Transform your photos with AI
          </p>
        </div>

        {/* Content */}
        <div className="p-4">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              Instant colorization
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Face enhancement
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              4K upscaling
            </li>
          </ul>

          <Link href="/waitlist">
            <Button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-sm font-medium">
              Join Waitlist
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
