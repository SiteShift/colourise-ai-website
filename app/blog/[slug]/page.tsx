import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BlogAppDownloadCTA } from "@/components/blog/blog-app-download-cta"
import { BlogAuthorBio } from "@/components/blog/blog-author-bio"
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts"
import { BlogTableOfContents } from "@/components/blog/blog-table-of-contents"
import { BlogSocialShare } from "@/components/blog/blog-social-share"
import { BlogSchema } from "@/components/blog/blog-schema"
import { StickyAppCTA } from "@/components/blog/sticky-app-cta"
import { BlogFAQAccordion } from "@/components/blog/blog-faq-accordion"
import { BlogStickyCTA } from "@/components/blog/blog-sticky-cta"
import { BlogInternalLinks } from "@/components/blog/blog-internal-links"
import { Footer } from "@/components/footer"
import { getPostBySlug, getAllPosts } from "@/lib/blog-data"
import blogStyles from "../blog-post.module.css"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | ColorizeAI Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: `https://colorizeai.app${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`https://colorizeai.app${post.featuredImage}`],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Schema Markup */}
      <BlogSchema post={post} slug={slug} />

      {/* Sticky App Download CTA */}
      <StickyAppCTA />

      <article className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header Section */}
        <header className="relative pt-20 pb-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-8">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-900 dark:text-white hover:text-pink-500 dark:hover:text-pink-400"
              >
                {post.category}
              </Link>
            </nav>

            <div className="max-w-4xl mx-auto">
              {/* Category Badge - Linked for SEO */}
              <div className="mb-6">
                <Link href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge className="bg-white/70 backdrop-blur-lg text-black border-white/30 hover:bg-white/90 transition-colors cursor-pointer">
                    {post.category}
                  </Badge>
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center space-x-6 text-gray-600 dark:text-gray-300 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents - Inline, above content */}
            <div className="mb-12">
              <BlogTableOfContents />
            </div>

            {/* Internal Links Module - Builds topical authority */}
            <BlogInternalLinks currentSlug={slug} silo={post.silo} />

            {/* Main Article Content */}
            <div className="max-w-3xl mx-auto">
              {/* Article Content */}
              <div
                className={`prose prose-xl prose-gray dark:prose-invert max-w-none ${blogStyles.blogContent}`}
              >
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Visual Break */}
              <div className="my-20">
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto"></div>
              </div>

              {/* Mid-Article App CTA */}
              <div className="my-20">
                <BlogAppDownloadCTA
                  variant="mid-article"
                  copy="Transform your family photos in seconds - Join the ColorizeAI Waitlist"
                  style="benefit-focused"
                />
              </div>

              {/* FAQ Section */}
              {post.faq && post.faq.length > 0 && <BlogFAQAccordion faqs={post.faq} />}

              {/* Visual Break */}
              <div className="my-20">
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto"></div>
              </div>

              {/* Final App CTA */}
              <div className="mt-20 mb-16">
                <BlogAppDownloadCTA
                  variant="end-article"
                  copy="Join the ColorizeAI Waitlist - Be First to Colorize"
                  style="urgency"
                />
              </div>

              {/* Social Share */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-12 mb-16">
                <BlogSocialShare
                  title={post.title}
                  url={`https://colorizeai.app/blog/${slug}`}
                />
              </div>

              {/* Author Bio */}
              <div className="mt-16 mb-20">
                <BlogAuthorBio author={post.author} silo={post.silo} />
              </div>
            </div>

            {/* Related Articles - After main content */}
            <div className="mt-20 max-w-5xl mx-auto">
              <BlogRelatedPosts
                currentPostSlug={slug}
                relatedSlugs={post.relatedPosts || []}
                category={post.category}
              />
            </div>

            {/* Newsletter Signup - Full width */}
            <div className="mt-16 max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Stay Updated with AI Photo Tips
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    Get the latest guides, tips, and tutorials delivered straight to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 hover:shadow-lg transition-all duration-200 whitespace-nowrap">
                      Subscribe Free
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </article>

      {/* Sticky CTA */}
      <BlogStickyCTA />

      <Footer />
    </>
  )
}
