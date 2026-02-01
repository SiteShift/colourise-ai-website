import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import { getTool, getAllTools, freeTools } from "@/lib/content-hub"
import { getPostBySlug } from "@/lib/blog-data"
import { HistoricalColorPalette } from "@/components/tools/historical-color-palette"
import { PhotoDateEstimator } from "@/components/tools/photo-date-estimator"
import { ResolutionCalculator } from "@/components/tools/resolution-calculator"
import { BeforeAfterGenerator } from "@/components/tools/before-after-generator"
import { ScanningChecklist } from "@/components/tools/scanning-checklist"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | ColouriseAI",
    }
  }

  return {
    title: `${tool.name} - Free Tool | ColouriseAI`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | ColouriseAI`,
      description: tool.description,
      type: "website",
    },
  }
}

const toolComponents: Record<string, React.ComponentType> = {
  "historical-color-palette": HistoricalColorPalette,
  "photo-date-estimator": PhotoDateEstimator,
  "resolution-calculator": ResolutionCalculator,
  "before-after-generator": BeforeAfterGenerator,
  "scanning-checklist": ScanningChecklist,
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool) {
    notFound()
  }

  const ToolComponent = toolComponents[slug]

  // Get related articles
  const relatedArticles = tool.relatedArticles
    .map(articleSlug => getPostBySlug(articleSlug))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/tools" className="hover:text-purple-600">Tools</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <section className="py-12 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
            Free Tool • {tool.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            {tool.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {tool.description}
          </p>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                This tool is coming soon. Check back later!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article!.slug}
                  href={`/blog/${article!.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
                >
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                    {article!.category}
                  </span>
                  <h3 className="font-medium text-gray-900 dark:text-white mt-2 line-clamp-2">
                    {article!.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 mt-3">
                    Read more
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            All Tools
          </Link>
          <Link
            href="/waitlist"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            Try ColouriseAI
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
