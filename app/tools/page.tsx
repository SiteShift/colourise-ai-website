import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Palette, Calendar, Calculator, SplitSquareHorizontal, CheckSquare, Wrench } from "lucide-react"
import { getAllTools } from "@/lib/content-hub"

export const metadata: Metadata = {
  title: "Free AI Photo Tools | ColorizeAI",
  description: "Free tools to help with your photo colorization and restoration projects. Historical color palettes, photo date estimator, resolution calculator, and more.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Free AI Photo Tools | ColorizeAI",
    description: "Free tools to help with your photo colorization and restoration projects. Historical color palettes, photo date estimator, resolution calculator, and more.",
    url: "https://colorizeai.app/tools",
    type: "website",
    images: [
      {
        url: "https://colorizeai.app/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "Free AI Photo Tools - ColorizeAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Photo Tools | ColorizeAI",
    description: "Free tools for photo colorization and restoration projects.",
    images: ["https://colorizeai.app/hero-background.webp"],
  },
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Calculator: <Calculator className="w-5 h-5" />,
  SplitSquareHorizontal: <SplitSquareHorizontal className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
}

export default function ToolsPage() {
  const tools = getAllTools()

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 mb-6">
              <Wrench className="w-4 h-4 text-pink-500" />
              100% Free Tools
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white text-balance">
              Free AI <span className="brand-gradient-text">Photo Tools</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-pretty">
              Helpful tools to enhance your photo colorization and restoration projects.
              No signup required—start using them now.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-200"
              >
                {/* Category badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                    {iconMap[tool.icon] || <Wrench className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {tool.category}
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 text-pretty">
                  {tool.description}
                </p>

                {/* CTA */}
                <span className="flex items-center gap-2 text-pink-500 font-medium text-sm group-hover:gap-3 transition-all duration-200">
                  Use Tool
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How Tools Help Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center text-balance">
            How These Tools Help Your Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 mb-4 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Research & Reference</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-pretty">
                Explore historical color palettes and estimate photo dates to ensure accurate colorization.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 mb-4 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Planning & Calculation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-pretty">
                Calculate print sizes, check scanning settings, and plan your restoration workflow.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 mb-4 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                <SplitSquareHorizontal className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Creation & Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-pretty">
                Create before/after comparisons and prepare your colorized photos for sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center text-balance">
            Learn More About Photo Colorization
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "AI Photo Colorization Guide", href: "/guides/ai-photo-colorization", icon: Palette },
              { title: "Photo Restoration Guide", href: "/guides/photo-restoration", icon: Wrench },
              { title: "Step-by-Step Tutorial", href: "/blog/step-by-step-colorizing-first-photo", icon: CheckSquare },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                  <guide.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white flex-1 group-hover:text-pink-500 transition-colors">
                  {guide.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Ready to Colorize Your Photos?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-pretty">
            These tools work great alongside ColorizeAI. Join our waitlist to be first to colorize your black and white photos.
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
  )
}
