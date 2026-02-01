import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, BookOpen, Clock, CheckCircle, Palette, Wrench, Users, Scale, ChevronRight } from "lucide-react"
import { getPillar, getAllPillars, getRelatedContent, pillars } from "@/lib/content-hub"
import { getPostBySlug, getAllPosts } from "@/lib/blog-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPillars()
    .filter(p => p.slug !== "tools")
    .map((pillar) => ({
      slug: pillar.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pillar = getPillar(slug)

  if (!pillar) {
    return {
      title: "Guide Not Found | ColouriseAI",
    }
  }

  const titles: Record<string, string> = {
    "ai-photo-colorization": "The Ultimate Guide to AI Photo Colorization (2025)",
    "photo-restoration": "Complete Guide to AI Photo Restoration: Repair, Enhance & Preserve",
    "use-cases": "AI Photo Colorization Use Cases: From Family History to Professional Archives",
    "comparisons": "AI Photo Colorization Tools Compared: Find the Best App for Your Needs",
  }

  return {
    title: `${titles[slug] || pillar.title} | ColouriseAI`,
    description: pillar.description,
    openGraph: {
      title: titles[slug] || pillar.title,
      description: pillar.description,
      type: "article",
    },
  }
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
}

// Map cluster slugs to actual blog post slugs
const clusterToPostSlug: Record<string, string> = {
  "how-ai-colorization-works": "complete-guide-ai-photo-colorization",
  "step-by-step-colorizing-first-photo": "step-by-step-colorizing-first-photo",
  "understanding-color-theory": "understanding-color-theory",
  "advanced-colorization-techniques": "advanced-colorization-techniques",
  "best-ai-photo-colorization-apps": "best-ai-photo-colorization-apps",
}

// Pillar content for each guide
const pillarContent: Record<string, { intro: string; sections: { title: string; content: string }[]; keyTakeaways: string[] }> = {
  "ai-photo-colorization": {
    intro: `AI photo colorization is revolutionizing how we experience historical imagery. Using advanced deep learning algorithms, modern colorization tools can transform black and white photographs into vibrant, historically accurate color images in seconds. This comprehensive guide covers everything you need to know about this transformative technology.`,
    sections: [
      {
        title: "What is AI Photo Colorization?",
        content: `AI photo colorization uses neural networks trained on millions of images to predict and apply realistic colors to grayscale photographs. Unlike manual colorization, which requires hours of painstaking work by skilled artists, AI can produce stunning results in seconds while maintaining historical accuracy.

The technology works by analyzing patterns, textures, and context clues within an image. The AI recognizes objects like skin, sky, foliage, and fabric, then applies appropriate colors based on what it has learned from its training data.`
      },
      {
        title: "How the Technology Works",
        content: `Modern AI colorization typically uses Convolutional Neural Networks (CNNs) or transformer architectures. The process involves:

1. **Image Analysis**: The AI segments the image into regions and identifies objects
2. **Feature Extraction**: Deep learning models extract visual features and context
3. **Color Prediction**: The model predicts chrominance values for each region
4. **Refinement**: Post-processing ensures smooth color transitions and natural appearance

ColorizeAI uses a proprietary architecture that combines the best of CNN and transformer approaches, achieving industry-leading accuracy in historical color reproduction.`
      },
      {
        title: "Best Practices for Optimal Results",
        content: `To get the best colorization results:

- **Start with quality scans**: Higher resolution images (300+ DPI) produce better colors
- **Clean up damage first**: Restore scratches and tears before colorizing
- **Consider the era**: Knowing when a photo was taken helps evaluate accuracy
- **Trust the AI**: Modern algorithms are trained on millions of historical color references
- **Make minor adjustments**: Use photo editing software for fine-tuning if needed`
      }
    ],
    keyTakeaways: [
      "AI colorization uses deep learning to add realistic colors to black and white photos",
      "Modern tools can process images in 3-8 seconds with high accuracy",
      "Higher quality source images produce better colorization results",
      "The technology is suitable for both personal and professional use",
      "Historical accuracy depends on training data quality and algorithmic sophistication"
    ]
  },
  "photo-restoration": {
    intro: `Photo restoration brings damaged, faded, or deteriorated photographs back to life. With AI-powered tools, what once required hours of expert work can now be accomplished in minutes. This guide covers everything from basic restoration to professional preservation techniques.`,
    sections: [
      {
        title: "Understanding Photo Damage",
        content: `Photos deteriorate through various mechanisms:

- **Fading**: UV light breaks down image dyes over time
- **Yellowing**: Chemical reactions cause color shifts
- **Physical damage**: Tears, creases, and scratches
- **Water damage**: Causes staining and emulsion lifting
- **Mold and mildew**: Creates spots and discoloration

Understanding the type of damage helps determine the best restoration approach.`
      },
      {
        title: "AI Restoration Capabilities",
        content: `Modern AI can address multiple types of damage:

1. **Scratch and tear repair**: Automatically fills in missing areas
2. **Fade correction**: Restores original contrast and tones
3. **Face enhancement**: Sharpens and clarifies facial features
4. **Noise reduction**: Removes grain while preserving detail
5. **Upscaling**: Increases resolution without losing quality

These tools work best when combined with proper scanning techniques and, for severely damaged photos, manual touch-up work.`
      },
      {
        title: "Preservation Best Practices",
        content: `After restoration, preserve your photos properly:

- Store in acid-free materials
- Keep in cool, dry, dark locations
- Create multiple digital backups
- Use archival-quality prints
- Consider cloud storage for important images`
      }
    ],
    keyTakeaways: [
      "AI can repair scratches, tears, fading, and other common damage",
      "Proper scanning is essential for quality restoration",
      "Face enhancement AI can recover facial details in damaged portraits",
      "Digital preservation ensures photos survive for future generations",
      "Combine AI tools with traditional techniques for best results"
    ]
  },
  "use-cases": {
    intro: `AI photo colorization serves diverse purposes, from personal family projects to professional archival work. Understanding these use cases helps you apply the technology most effectively for your specific needs.`,
    sections: [
      {
        title: "Family History & Genealogy",
        content: `Colorizing family photos creates deeper emotional connections to ancestors:

- **Bringing relatives to life**: Color helps us relate to people as real individuals
- **Genealogy research**: Colorized photos can reveal details about era, status, and occupation
- **Memory preservation**: Creates more engaging family archives
- **Gift creation**: Colorized photos make meaningful presents for relatives

Many genealogy enthusiasts find that colorized photos spark new interest in family history among younger generations.`
      },
      {
        title: "Historical Documentation",
        content: `Museums, archives, and educators use colorization for:

- **Educational materials**: Color helps students connect with history
- **Exhibition displays**: Creates more engaging visitor experiences
- **Documentary production**: Adds visual interest to historical footage
- **Research visualization**: Helps researchers understand historical contexts

The key is clearly distinguishing between colorized and original images in documentation.`
      },
      {
        title: "Personal & Memorial Projects",
        content: `Colorization serves deeply personal purposes:

- **Memorial tributes**: Honor passed loved ones with colorized portraits
- **Anniversary gifts**: Transform wedding photos from decades ago
- **Memory books**: Create colorized albums for special occasions
- **Social sharing**: Share family history in more engaging formats`
      }
    ],
    keyTakeaways: [
      "Colorization creates emotional connections to historical images",
      "Genealogists use colorized photos to engage younger family members",
      "Museums and educators leverage colorization for educational impact",
      "Memorial and anniversary projects are popular use cases",
      "Always preserve and acknowledge original black and white versions"
    ]
  },
  "comparisons": {
    intro: `The AI photo colorization market has grown rapidly, with numerous tools offering varying levels of quality, speed, and features. This guide helps you navigate your options and choose the best tool for your needs.`,
    sections: [
      {
        title: "Key Evaluation Criteria",
        content: `When comparing colorization tools, consider:

- **Color accuracy**: How realistic and historically appropriate are the results?
- **Processing speed**: How quickly can images be colorized?
- **Ease of use**: Is the interface intuitive for your skill level?
- **Additional features**: Does it include restoration, enhancement, or editing tools?
- **Pricing**: Does the value match your usage level?
- **Platform availability**: Is it available on your preferred devices?`
      },
      {
        title: "Types of Colorization Tools",
        content: `Colorization tools fall into several categories:

1. **Mobile apps**: Convenient, user-friendly, good for casual use
2. **Web-based tools**: Accessible anywhere, varying quality levels
3. **Desktop software**: More powerful, better for professionals
4. **API services**: For developers and high-volume processing

Each category has trade-offs between convenience, quality, and cost.`
      },
      {
        title: "Making Your Choice",
        content: `Match the tool to your needs:

- **Casual users**: Mobile apps with free tiers
- **Family historians**: User-friendly tools with good accuracy
- **Professionals**: Desktop software with manual control options
- **High volume**: API services with batch processing

Consider trying free tiers or trials before committing to paid subscriptions.`
      }
    ],
    keyTakeaways: [
      "Compare tools based on accuracy, speed, ease of use, and price",
      "Mobile apps are best for casual use; desktop for professional work",
      "Free tools can produce good results for occasional use",
      "Consider your specific use case when choosing a tool",
      "Take advantage of free trials to test before purchasing"
    ]
  }
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params
  const pillar = getPillar(slug)

  if (!pillar || slug === "tools") {
    notFound()
  }

  const content = pillarContent[slug]
  const relatedContent = getRelatedContent(slug, slug)
  const allPosts = getAllPosts()

  // Get cluster articles that exist as blog posts
  const clusterArticles = pillar.clusters
    .map(clusterSlug => {
      const postSlug = clusterToPostSlug[clusterSlug] || clusterSlug
      const post = getPostBySlug(postSlug)
      return post ? { ...post, clusterSlug } : null
    })
    .filter(Boolean)

  // Get related pillars
  const relatedPillars = pillar.relatedPillars
    .map(pSlug => pillars[pSlug])
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-purple-600">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">{pillar.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white`}>
              {iconMap[pillar.icon] || <Palette className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wide">
                Complete Guide
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {pillar.title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {pillar.description}
          </p>
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {pillar.clusters.length} articles in this guide
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Updated January 2025
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        {content && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {content.intro}
            </p>
          </div>
        )}

        {/* Table of Contents - Cluster Articles */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-purple-600" />
            In This Guide
          </h2>
          <div className="space-y-3">
            {clusterArticles.length > 0 ? (
              clusterArticles.map((article, index) => (
                <Link
                  key={article!.slug}
                  href={`/blog/${article!.slug}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {article!.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {article!.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))
            ) : (
              pillar.clusters.map((clusterSlug, index) => (
                <div
                  key={clusterSlug}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 opacity-60"
                >
                  <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-600 dark:text-gray-400">
                      {clusterSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Coming soon
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content Sections */}
        {content && content.sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {section.content.split("\n\n").map((para, pIndex) => (
                <p key={pIndex} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Key Takeaways */}
        {content && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-2xl p-8 mb-12 border border-pink-100 dark:border-pink-900/30">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {content.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Pillars */}
        {relatedPillars.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPillars.map((rPillar) => (
                <Link
                  key={rPillar.slug}
                  href={`/guides/${rPillar.slug}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rPillar.color} flex items-center justify-center text-white`}>
                    {iconMap[rPillar.icon] || <Palette className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {rPillar.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {rPillar.clusters.length} articles
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Guides */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/guides"
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            All Guides
          </Link>
          <Link
            href="/waitlist"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            Try ColouriseAI
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
