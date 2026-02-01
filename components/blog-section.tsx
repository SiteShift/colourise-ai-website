"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog-data"

export function BlogSection() {
  const allPosts = getAllPosts()
  const displayPosts = allPosts.slice(0, 3) // Show first 3 posts
  const featuredPost = displayPosts[0]
  const otherPosts = displayPosts.slice(1)

  return (
    <section id="blog" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-white/70 backdrop-blur-lg text-black border-white/30 text-sm font-medium px-4 py-2 shadow-lg">
            Latest Insights
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            From Our <span className="brand-gradient-text">Latest Stories & Tips</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover tips, techniques, and stories about photo restoration, AI technology, and preserving family
            memories.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Post */}
          {featuredPost && (
            <div className="lg:col-span-3">
              <Card className="glassmorphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="relative aspect-video lg:aspect-auto">
                    <Image
                      src={featuredPost.featuredImage || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white">
                        {featuredPost.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readingTime}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:brand-gradient-text transition-all duration-300">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 hover:shadow-xl transition-all duration-300"
                      >
                        Read Complete Guide
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Other Posts */}
          {otherPosts.map((post) => (
            <Card
              key={post.slug}
              className="h-full glassmorphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:brand-gradient-text transition-all duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-pink-500 hover:text-pink-600 group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
              Explore All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
