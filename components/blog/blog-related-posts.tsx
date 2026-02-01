"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getRelatedPosts, getPostBySlug, getPostsByCategory } from "@/lib/blog-data"

interface BlogRelatedPostsProps {
  currentPostSlug: string
  relatedSlugs: string[]
  category: string
}

export function BlogRelatedPosts({ currentPostSlug, relatedSlugs, category }: BlogRelatedPostsProps) {
  // Get related posts from centralized data
  const relatedPosts = getRelatedPosts(currentPostSlug, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50/30 to-blue-50/30 dark:from-gray-900/30 dark:to-blue-900/30 rounded-2xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Continue <span className="brand-gradient-text">Reading</span>
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore more articles in the <strong>{category}</strong> series to deepen your understanding
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <Card key={post.slug} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/70 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white">
                  {post.category}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              <Link href={`/blog/${post.slug}`}>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-semibold text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 group/btn"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Articles CTA */}
      <div className="text-center mt-12">
        <Link href="/blog">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
