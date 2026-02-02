"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, X, Star, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BlogStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <Card className="w-72 border border-gray-300 dark:border-gray-600 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 p-1">
          <CardContent className="bg-white dark:bg-gray-900 p-6 m-0 rounded-sm">
            {!isMinimized && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      ColorizeAI
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      3-8 second processing
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      AI-powered colorization
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Face enhancement included
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="/waitlist">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300 font-semibold">
                    Join the Waitlist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Offer */}
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                  Coming soon to iOS & Android
                </p>
              </>
            )}

            {isMinimized && (
              <button
                onClick={() => setIsMinimized(false)}
                className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ColorizeAI
                </span>
              </button>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
