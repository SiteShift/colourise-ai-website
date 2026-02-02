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
import { ToolSchema } from "@/components/tools/tool-schema"

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
      title: "Tool Not Found | ColorizeAI",
    }
  }

  return {
    title: `${tool.name} - Free Tool | ColorizeAI`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${slug}`,
    },
    openGraph: {
      title: `${tool.name} | ColorizeAI`,
      description: tool.description,
      url: `https://colorizeai.app/tools/${slug}`,
      type: "website",
      images: [
        {
          url: "https://colorizeai.app/hero-background.webp",
          width: 1200,
          height: 630,
          alt: `${tool.name} - Free Tool - ColorizeAI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | ColorizeAI`,
      description: tool.description,
      images: ["https://colorizeai.app/hero-background.webp"],
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
    <>
      {/* Schema Markup */}
      <ToolSchema tool={{ title: tool.name, description: tool.description, slug: tool.slug }} />

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
          <span className="text-sm font-medium text-pink-500 uppercase tracking-wide">
            Free Tool • {tool.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4 text-balance">
            {tool.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-pretty">
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
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-pink-500" />
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article!.slug}
                  href={`/blog/${article!.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
                >
                  <span className="text-xs font-medium text-pink-500 uppercase tracking-wide">
                    {article!.category}
                  </span>
                  <h3 className="font-medium text-gray-900 dark:text-white mt-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
                    {article!.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-pink-500 mt-3">
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
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Tools
          </Link>
          <Link
            href="/waitlist"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
          >
            Try ColorizeAI
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
    </>
  )
}
