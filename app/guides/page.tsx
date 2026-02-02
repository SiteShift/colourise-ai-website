import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Palette, Wrench, Users, Scale, BookOpen } from "lucide-react"
import { getAllPillars } from "@/lib/content-hub"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Photo Colorization & Restoration Guides | ColorizeAI",
  description: "Comprehensive guides to AI photo colorization, restoration, and enhancement. Learn from experts with step-by-step tutorials, tips, and best practices.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Photo Colorization & Restoration Guides | ColorizeAI",
    description: "Comprehensive guides to AI photo colorization, restoration, and enhancement. Learn from experts with step-by-step tutorials, tips, and best practices.",
    url: "https://colorizeai.app/guides",
    type: "website",
    images: [
      {
        url: "https://colorizeai.app/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "ColorizeAI Photo Colorization Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Colorization & Restoration Guides | ColorizeAI",
    description: "Comprehensive guides to AI photo colorization and restoration.",
    images: ["https://colorizeai.app/hero-background.webp"],
  },
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
}

export default function GuidesPage() {
  const pillars = getAllPillars().filter(p => p.slug !== "tools")

  return (
    <>
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 mb-6">
              <BookOpen className="w-4 h-4 text-pink-500" />
              Expert Tutorials & Guides
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white text-balance">
              Photo Colorization & <span className="brand-gradient-text">Restoration Guides</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-pretty">
              Everything you need to transform black and white photos into stunning color images.
              From beginner tutorials to advanced professional techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/guides/${pillar.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-200"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center text-white mb-6">
                  {iconMap[pillar.icon] || <Palette className="w-6 h-6" />}
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-500 transition-colors">
                  {pillar.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-pretty">
                  {pillar.description}
                </p>

                {/* Article count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {pillar.clusters.length} articles
                  </span>
                  <span className="flex items-center gap-2 text-pink-500 font-medium group-hover:gap-3 transition-all duration-200">
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
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center text-balance">
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
                className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-1">
                  <span className="text-xs font-medium text-pink-500 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <h3 className="font-medium text-gray-900 dark:text-white mt-1 group-hover:text-pink-500 transition-colors">
                    {article.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Ready to Colorize Your Photos?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-pretty">
            Join thousands of users transforming their black and white memories into vibrant color.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
