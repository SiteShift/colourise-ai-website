"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Wrench, Palette, Users, Scale, Calendar, Calculator, Sparkles } from "lucide-react"

const guides = [
  {
    title: "AI Photo Colorization",
    description: "Master the art of AI-powered photo colorization with our comprehensive guide",
    href: "/guides/ai-photo-colorization",
    icon: Palette,
    color: "from-pink-500 to-purple-600",
    articles: 8,
  },
  {
    title: "Photo Restoration",
    description: "Learn how to restore, repair, and preserve old photographs",
    href: "/guides/photo-restoration",
    icon: Wrench,
    color: "from-blue-500 to-cyan-500",
    articles: 8,
  },
  {
    title: "Use Cases",
    description: "Discover how different people use AI colorization for various purposes",
    href: "/guides/use-cases",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    articles: 8,
  },
  {
    title: "Comparisons",
    description: "Compare AI colorization tools to find the best option for you",
    href: "/guides/comparisons",
    icon: Scale,
    color: "from-orange-500 to-red-500",
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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-4">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Learn & Explore</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Expert Guides & Free Tools
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to master AI photo colorization, from beginner tutorials to advanced techniques.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-white mb-4`}>
                <guide.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{guide.articles} articles</span>
                <span className="text-purple-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Free Tools Banner */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium text-purple-200">100% Free</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Free AI Photo Tools
              </h3>
              <p className="text-purple-100 max-w-xl">
                Helpful tools to enhance your colorization projects. No signup required.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors group"
                >
                  <tool.icon className="w-8 h-8 text-white mb-3" />
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-purple-200">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center lg:text-left">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:shadow-lg transition-all"
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
