import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Palette, Calendar, Calculator, SplitSquareHorizontal, CheckSquare, Sparkles, Wrench } from "lucide-react"
import { getAllTools } from "@/lib/content-hub"

export const metadata: Metadata = {
  title: "Free AI Photo Tools | ColouriseAI",
  description: "Free tools to help with your photo colorization and restoration projects. Historical color palettes, photo date estimator, resolution calculator, and more.",
  openGraph: {
    title: "Free AI Photo Tools | ColouriseAI",
    description: "Free tools to help with your photo colorization and restoration projects. Historical color palettes, photo date estimator, resolution calculator, and more.",
    type: "website",
  },
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  SplitSquareHorizontal: <SplitSquareHorizontal className="w-6 h-6" />,
  CheckSquare: <CheckSquare className="w-6 h-6" />,
}

const categoryColors: Record<string, string> = {
  Reference: "from-pink-500 to-rose-600",
  Analysis: "from-blue-500 to-cyan-500",
  Utility: "from-green-500 to-emerald-500",
  Creative: "from-purple-500 to-violet-600",
  Guide: "from-orange-500 to-amber-500",
}

export default function ToolsPage() {
  const tools = getAllTools()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6">
              <Wrench className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                100% Free Tools
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Free AI Photo Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
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
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${categoryColors[tool.category] || categoryColors.Reference} text-white`}>
                    {tool.category}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[tool.category] || categoryColors.Reference} flex items-center justify-center text-white mb-4`}>
                  {iconMap[tool.icon] || <Wrench className="w-6 h-6" />}
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 pr-16">
                  {tool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* CTA */}
                <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  Use Tool
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How Tools Help Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How These Tools Help Your Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Research & Reference</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore historical color palettes and estimate photo dates to ensure accurate colorization.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Planning & Calculation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Calculate print sizes, check scanning settings, and plan your restoration workflow.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white">
                <SplitSquareHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Creation & Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create before/after comparisons and prepare your colorized photos for sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
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
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white">
                  <guide.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white flex-1">
                  {guide.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Colorize Your Photos?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            These tools work great alongside ColouriseAI. Join our waitlist to be first to colorize your black and white photos.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
