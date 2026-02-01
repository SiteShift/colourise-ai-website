export function HomepageSchema() {
  const baseUrl = "https://colorizeai.app"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ColouriseAI",
    "alternateName": "ColorizeAI",
    "url": baseUrl,
    "logo": `${baseUrl}/colourise-ai-logo.webp`,
    "description": "AI-powered photo colorization app that transforms black and white photos into stunning color images",
    "email": "hello@colorizeai.app",
    "sameAs": [
      "https://twitter.com/colouriseai",
      "https://facebook.com/colouriseai",
      "https://instagram.com/colouriseai"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ColouriseAI",
    "url": baseUrl,
    "description": "Transform black and white photos into color with AI",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ColouriseAI",
    "operatingSystem": ["iOS", "Android"],
    "applicationCategory": "PhotographyApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Transform black and white photos into stunning color images with AI-powered colorization",
    "featureList": [
      "AI Photo Colorization",
      "Face Enhancement",
      "4K Upscaling",
      "Batch Processing"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  )
}
