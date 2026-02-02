import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { getAllPosts, getAllCategories } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog | AI Photo Colorization Tips & Guides | ColorizeAI",
  description:
    "Learn AI photo colorization techniques, restoration tips, and how to bring your old black and white photos to life. Expert tutorials and guides from ColorizeAI.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "ColorizeAI Blog - Photo Colorization Tips & Guides",
    description:
      "Expert tutorials on AI photo colorization, restoration techniques, and preserving family memories.",
    type: "website",
  },
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const featuredPost = allPosts[0] // Most recent post as featured
  const otherPosts = allPosts.slice(1)

  return (
    <>
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 text-sm font-medium px-4 py-2">
              ColorizeAI Blog
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI Photo Colorization{" "}
              <span className="brand-gradient-text">Tips & Guides</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tutorials, techniques, and insights on AI photo colorization, restoration, and
              preserving your precious family memories.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge
              className="bg-gray-900 text-white hover:bg-gray-800 cursor-pointer px-4 py-2"
            >
              All Posts
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <Link href={`/blog/${featuredPost.slug}`}>
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <div className="lg:grid lg:grid-cols-2">
                    <div className="relative aspect-video lg:aspect-auto lg:h-full">
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-gray-100 text-gray-700">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-pink-500 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
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
                      <Button className="w-fit bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Other Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative aspect-video">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="max-w-2xl mx-auto text-center py-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Photo Colorization Tips in Your Inbox
            </h2>
            <p className="text-gray-600 mb-8">
              Join our newsletter for the latest tutorials, techniques, and AI colorization news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
