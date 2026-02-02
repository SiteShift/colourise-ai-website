interface GuideSchemaProps {
  pillar: {
    title: string
    description: string
    slug: string
    clusters: string[]
  }
}

export function GuideSchema({ pillar }: GuideSchemaProps) {
  const baseUrl = "https://colorizeai.app"

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pillar.title,
    "description": pillar.description,
    "author": {
      "@type": "Organization",
      "name": "ColorizeAI",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "ColorizeAI",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/colorize-ai-logo.webp`,
        "width": 240,
        "height": 48
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/guides/${pillar.slug}`
    },
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split("T")[0]
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pillar.title,
    "description": pillar.description,
    "url": `${baseUrl}/guides/${pillar.slug}`,
    "hasPart": pillar.clusters.map(slug => ({
      "@type": "Article",
      "url": `${baseUrl}/blog/${slug}`
    }))
  }

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
        "name": "Guides",
        "item": `${baseUrl}/guides`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pillar.title,
        "item": `${baseUrl}/guides/${pillar.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
