import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Palette, Wrench, Users, Scale, Sparkles } from "lucide-react"
import { getAllPillars } from "@/lib/content-hub"

export const metadata: Metadata = {
  title: "Photo Colorization & Restoration Guides | ColouriseAI",
  description: "Comprehensive guides to AI photo colorization, restoration, and enhancement. Learn from experts with step-by-step tutorials, tips, and best practices.",
  openGraph: {
    title: "Photo Colorization & Restoration Guides | ColouriseAI",
    description: "Comprehensive guides to AI photo colorization, restoration, and enhancement. Learn from experts with step-by-step tutorials, tips, and best practices.",
    type: "website",
  },
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Scale: <Scale className="w-8 h-8" />,
}

export default function GuidesPage() {
  const pillars = getAllPillars().filter(p => p.slug !== "tools")

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Expert Tutorials & Guides
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              Photo Colorization & Restoration Guides
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Everything you need to transform black and white photos into stunning color images.
              From beginner tutorials to advanced professional techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/guides/${pillar.slug}`}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white mb-6`}>
                  {iconMap[pillar.icon] || <Palette className="w-8 h-8" />}
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {pillar.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {pillar.description}
                </p>

                {/* Article count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {pillar.clusters.length} articles
                  </span>
                  <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-3 transition-all duration-300">
                    Explore Guide
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Popular Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "How AI Photo Colorization Works", href: "/blog/complete-guide-ai-photo-colorization", category: "Fundamentals" },
              { title: "Step-by-Step Colorization Tutorial", href: "/blog/step-by-step-colorizing-first-photo", category: "Tutorial" },
              { title: "Understanding Color Theory", href: "/blog/understanding-color-theory", category: "Fundamentals" },
              { title: "Best Colorization Apps 2025", href: "/blog/best-ai-photo-colorization-apps", category: "Comparisons" },
              { title: "Advanced Colorization Techniques", href: "/blog/advanced-colorization-techniques", category: "Pro Tips" },
              { title: "Historical Color Accuracy", href: "/guides/ai-photo-colorization", category: "Research" },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <h3 className="font-medium text-gray-900 dark:text-white mt-1">
                    {article.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Colorize Your Photos?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of users transforming their black and white memories into vibrant color.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
