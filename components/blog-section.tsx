"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "How AI Brings Lost Memories Back to Life",
    excerpt:
      "Discover how our advanced neural networks analyze and apply historically accurate colors to black and white photographs.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    slug: "science-behind-ai-colorization",
  },
  {
    id: 2,
    title: "Never Lose a Family Memory Again",
    excerpt:
      "Learn the best practices for digitizing, organizing, and colorizing your family's precious photo collection.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Family History",
    date: "Dec 12, 2024",
    readTime: "8 min read",
    slug: "preserving-family-history-guide",
  },
  {
    id: 3,
    title: "Iconic Moments in History, Now in Colour",
    excerpt:
      "Explore iconic moments in history as we colorize famous black and white photographs from the past century.",
    image: "/placeholder.svg?height=300&width=400",
    category: "History",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    slug: "famous-historical-photos-colorized",
  },
]

export function BlogSection() {
  return (
    <section id="blog" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Blog Posts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full glassmorphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
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
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:brand-gradient-text transition-all duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>

                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-semibold text-pink-500 hover:text-pink-600 group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            Explore All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
