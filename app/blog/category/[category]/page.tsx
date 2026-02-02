import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { getPostsByCategory, getAllCategories, BlogPost } from "@/lib/blog-data"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const formattedCategory = formatCategoryName(category)

  return {
    title: `${formattedCategory} Articles | ColorizeAI Blog`,
    description: `Browse all ${formattedCategory.toLowerCase()} articles about AI photo colorization, restoration, and enhancement techniques.`,
    alternates: {
      canonical: `/blog/category/${category}`,
    },
    openGraph: {
      title: `${formattedCategory} Articles | ColorizeAI Blog`,
      description: `Browse all ${formattedCategory.toLowerCase()} articles about AI photo colorization.`,
      type: "website",
      images: [
        {
          url: "https://colorizeai.app/hero-background.webp",
          width: 1200,
          height: 630,
          alt: `${formattedCategory} Articles - ColorizeAI`,
        },
      ],
    },
  }
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
        >
          Read Article
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  )
}

const categoryDescriptions: Record<string, string> = {
  "Fundamentals": "Master the basics of AI photo colorization with comprehensive guides covering techniques, tools, and best practices.",
  "Comparisons": "In-depth comparisons of AI colorization tools and services to help you choose the best option for your needs.",
  "Tutorials": "Step-by-step tutorials to help you get the most out of AI photo colorization technology.",
  "Use Cases": "Real-world applications and creative uses for AI photo colorization across different industries.",
  "Technology": "Deep dives into the AI and machine learning technology powering modern photo colorization.",
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const formattedCategory = formatCategoryName(category)
  const posts = getPostsByCategory(formattedCategory)

  if (posts.length === 0) {
    notFound()
  }

  const allCategories = getAllCategories()
  const description = categoryDescriptions[formattedCategory] || 
    `Explore our collection of ${formattedCategory.toLowerCase()} articles about AI photo colorization.`

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{formattedCategory}</span>
            </nav>
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-white/70 backdrop-blur-lg text-gray-900 border-white/30">
                {posts.length} Article{posts.length !== 1 ? "s" : ""}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {formattedCategory}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              <Link href="/blog">
                <Button variant="outline" size="sm" className="rounded-full">All Articles</Button>
              </Link>
              {allCategories.map((cat) => {
                const catSlug = cat.toLowerCase().replace(/\s+/g, "-")
                const isActive = catSlug === category
                return (
                  <Link key={cat} href={`/blog/category/${catSlug}`}>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full ${isActive ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : ""}`}
                    >
                      {cat}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Colorize Your Photos?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of families bringing their memories to life with ColorizeAI.
            </p>
            <Link href="/waitlist">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
