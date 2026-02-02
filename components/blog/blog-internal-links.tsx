"use client"

import Link from "next/link"
import { BookOpen, Wrench, Compass, ArrowRight } from "lucide-react"
import { getRelatedContent, getPillar, type FreeTool } from "@/lib/content-hub"
import { getPostBySlug, type BlogPost } from "@/lib/blog-data"

interface BlogInternalLinksProps {
  currentSlug: string
  silo: string
}

export function BlogInternalLinks({ currentSlug, silo }: BlogInternalLinksProps) {
  // Map silo names to pillar slugs
  const siloToPillar: Record<string, string> = {
    fundamentals: "ai-photo-colorization",
    restoration: "photo-restoration",
    family: "use-cases",
    historical: "use-cases",
    comparisons: "comparisons",
    professional: "use-cases",
  }

  const pillarSlug = siloToPillar[silo] || "ai-photo-colorization"
  const relatedContent = getRelatedContent(currentSlug, pillarSlug)
  const pillar = getPillar(pillarSlug)

  // Get actual post data for related clusters
  const relatedPosts = relatedContent.clusters
    .map(slug => getPostBySlug(slug))
    .filter(Boolean)
    .slice(0, 3) as BlogPost[]

  // If no meaningful content to show, return null
  if (!pillar && relatedPosts.length === 0 && relatedContent.tools.length === 0) {
    return null
  }

  return (
    <div className="my-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-pink-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Explore More
        </h3>
      </div>

      <div className="space-y-4">
        {/* Parent Guide (Pillar) */}
        {pillar && (
          <Link
            href={`/guides/${pillar.slug}`}
            className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Complete Guide</span>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors text-sm">
                  {pillar.title}
                </h4>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
          </Link>
        )}

        {/* Related Articles - Compact list */}
        {relatedPosts.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Related Articles</span>
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-pink-500 transition-colors line-clamp-1">
                  {post.title}
                </span>
                <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </Link>
            ))}
          </div>
        )}

        {/* Related Tools - Compact inline */}
        {relatedContent.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Wrench className="w-3 h-3" />
              Free Tools:
            </span>
            {relatedContent.tools.map((tool: FreeTool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="text-xs text-pink-500 hover:text-pink-600 font-medium transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
