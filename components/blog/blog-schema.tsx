interface BlogPost {
  title: string
  excerpt: string
  content: string
  category: string
  publishedAt: string
  readingTime: string
  author: {
    name: string
    title: string
    avatar: string
    bio: string
  }
  featuredImage: string
  silo: string
  tags: string[]
  faq?: Array<{
    question: string
    answer: string
  }>
}

interface BlogSchemaProps {
  post: BlogPost
  slug?: string
}

export function BlogSchema({ post, slug }: BlogSchemaProps) {
  const baseUrl = "https://colorizeai.app"
  // Use slug if provided, otherwise generate from title
  const postSlug = slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  const postUrl = `${baseUrl}/blog/${postSlug}`
  
  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": [
      {
        "@type": "ImageObject",
        "url": `${baseUrl}${post.featuredImage}`,
        "width": 1200,
        "height": 630
      }
    ],
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.title,
      "description": post.author.bio,
      "image": `${baseUrl}${post.author.avatar}`,
      "url": `${baseUrl}/about/dr-eleanor-grant`,
      "sameAs": [
        "https://linkedin.com/in/eleanor-grant-colorizeai",
        "https://orcid.org/0000-0002-1234-5678"
      ],
      "knowsAbout": [
        "Computer Vision",
        "Artificial Intelligence",
        "Photo Restoration",
        "Digital Preservation",
        "Image Processing"
      ],
      "affiliation": {
        "@type": "Organization",
        "name": "ColorizeAI",
        "url": "https://colorizeai.com"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "ColorizeAI",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/colourise-ai-logo.webp`,
        "width": 240,
        "height": 48
      },
      "url": "https://colorizeai.com",
      "sameAs": [
        "https://twitter.com/ColorizeAI",
        "https://facebook.com/ColorizeAI",
        "https://linkedin.com/company/colorizeai"
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": post.readingTime,
    "about": {
      "@type": "Thing",
      "name": "AI Photo Colorization",
      "description": "Artificial intelligence technology for automatically adding color to black and white photographs"
    },
    "mentions": [
      {
        "@type": "SoftwareApplication",
        "name": "ColorizeAI",
        "applicationCategory": "Photography",
        "operatingSystem": ["iOS", "Android"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  }

  // FAQ Schema (if FAQ exists)
  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null

  // HowTo Schema (for tutorial content)
  const howToSchema = post.category === "Fundamentals" || post.title.toLowerCase().includes("step") ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.title,
    "description": post.excerpt,
    "image": `${baseUrl}${post.featuredImage}`,
    "totalTime": post.readingTime,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "ColorizeAI App"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Download ColorizeAI",
        "text": "Download the ColorizeAI app from App Store or Google Play",
        "url": "https://apps.apple.com/app/colorizeai"
      },
      {
        "@type": "HowToStep", 
        "name": "Upload Photo",
        "text": "Select and upload your black and white photo"
      },
      {
        "@type": "HowToStep",
        "name": "AI Processing",
        "text": "Let AI analyze and colorize your photo automatically"
      },
      {
        "@type": "HowToStep",
        "name": "Download Result",
        "text": "Save your colorized photo in high resolution"
      }
    ]
  } : null

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `${baseUrl}/blog?category=${post.category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": postUrl
      }
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [articleSchema, breadcrumbSchema]
  if (faqSchema) schemas.push(faqSchema)
  if (howToSchema) schemas.push(howToSchema)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  )
} 