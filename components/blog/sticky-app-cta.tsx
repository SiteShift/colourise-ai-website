"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyAppCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl border-t border-pink-400/20">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      ColorizeAI Coming Soon
                    </p>
                    <p className="text-xs text-white/80 truncate">
                      Be first to colorize your photos
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link href="/waitlist">
                    <Button
                      size="sm"
                      className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                    >
                      Join Waitlist
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    className="text-white hover:bg-white/20 p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
