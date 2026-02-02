"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Wrench, Compass, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getRelatedContent, getPillar, type FreeTool, type ContentPillar } from "@/lib/content-hub"
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/30"
    >
      <div className="flex items-center gap-2 mb-6">
        <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Explore More Topics
        </h3>
      </div>

      <div className="space-y-6">
        {/* Parent Guide (Pillar) */}
        {pillar && (
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Complete Guide</span>
            </div>
            <Link
              href={`/guides/${pillar.slug}`}
              className="group block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {pillar.title} Guide
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                    {pillar.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Related Articles</span>
            </div>
            <div className="space-y-2">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm transition-all duration-200"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                    {post.title}
                  </span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedContent.tools.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Wrench className="w-4 h-4" />
              <span>Free Tools</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedContent.tools.map((tool: FreeTool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm line-clamp-1">
                      {tool.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
