"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Star, Users, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogAppDownloadCTAProps {
  variant: "mid-article" | "end-article"
  copy: string
  style: "benefit-focused" | "feature-focused" | "social-proof" | "urgency" | "problem-solution"
}

const CTAContent = {
  "benefit-focused": {
    icon: Zap,
    headline: "Transform Your Photos Instantly",
    buttonText: "Join the Waitlist",
    accent: "from-blue-500 to-purple-600"
  },
  "feature-focused": {
    icon: Star,
    headline: "AI-Powered Colorization",
    buttonText: "Get Early Access",
    accent: "from-purple-500 to-pink-600"
  },
  "social-proof": {
    icon: Users,
    headline: "Join Thousands Waiting",
    buttonText: "Join the Waitlist",
    accent: "from-green-500 to-blue-600"
  },
  "urgency": {
    icon: Sparkles,
    headline: "Be First to Try ColorizeAI",
    buttonText: "Get Early Access",
    accent: "from-pink-500 to-purple-600"
  },
  "problem-solution": {
    icon: Zap,
    headline: "Colorize Photos in Seconds",
    buttonText: "Join the Waitlist",
    accent: "from-indigo-500 to-purple-600"
  }
}

export function BlogAppDownloadCTA({ variant, copy, style }: BlogAppDownloadCTAProps) {
  const content = CTAContent[style]
  const Icon = content.icon

  if (variant === "mid-article") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="not-prose my-12"
      >
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-full bg-gradient-to-r ${content.accent} text-white`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {content.headline}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {copy}
            </p>

            <Link href="/waitlist">
              <Button
                size="lg"
                className={`bg-gradient-to-r ${content.accent} text-white hover:shadow-lg transition-all`}
              >
                {content.buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Coming soon to iOS & Android
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // End-article variant
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="not-prose my-16"
    >
      <Card className={`border-0 bg-gradient-to-r ${content.accent} text-white shadow-2xl overflow-hidden`}>
        <CardContent className="p-12 text-center relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                <Icon className="w-8 h-8" />
              </div>
            </div>

            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Coming Soon
            </Badge>

            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              {content.headline}
            </h3>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {copy}
            </p>

            <Link href="/waitlist">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>

            <div className="flex items-center justify-center gap-6 text-white/80 mt-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">iOS & Android</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
