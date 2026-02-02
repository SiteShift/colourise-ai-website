"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Wrench, Palette, Users, Scale, Calendar, Calculator, Sparkles } from "lucide-react"

const guides = [
  {
    title: "AI Photo Colorization",
    description: "Master the art of AI-powered photo colorization",
    href: "/guides/ai-photo-colorization",
    icon: Palette,
    articles: 8,
  },
  {
    title: "Photo Restoration",
    description: "Learn how to restore and preserve old photographs",
    href: "/guides/photo-restoration",
    icon: Wrench,
    articles: 8,
  },
  {
    title: "Use Cases",
    description: "Discover how others use AI colorization",
    href: "/guides/use-cases",
    icon: Users,
    articles: 8,
  },
  {
    title: "Comparisons",
    description: "Compare AI colorization tools",
    href: "/guides/comparisons",
    icon: Scale,
    articles: 4,
  },
]

const tools = [
  {
    name: "Historical Color Palettes",
    description: "Explore authentic colors from different eras",
    href: "/tools/historical-color-palette",
    icon: Palette,
  },
  {
    name: "Photo Date Estimator",
    description: "Estimate when a photograph was taken",
    href: "/tools/photo-date-estimator",
    icon: Calendar,
  },
  {
    name: "Resolution Calculator",
    description: "Calculate optimal print sizes",
    href: "/tools/resolution-calculator",
    icon: Calculator,
  },
]

export function ResourcesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-4">
            <BookOpen className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">Learn & Explore</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Expert Guides & <span className="brand-gradient-text">Free Tools</span>
          </h2>
          <p className="text-lg text-gray-600 text-pretty">
            Everything you need to master AI photo colorization.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center text-white mb-4">
                <guide.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-pink-500 transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{guide.articles} articles</span>
                <span className="text-pink-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Free Tools Section */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-pink-500">100% Free</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Free AI Photo Tools
              </h3>
              <p className="text-gray-600 max-w-xl">
                Helpful tools to enhance your colorization projects. No signup required.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 lg:gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center text-white mb-3">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-pink-500 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-pink-500 font-medium hover:text-pink-600 transition-colors"
            >
              View All Free Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
