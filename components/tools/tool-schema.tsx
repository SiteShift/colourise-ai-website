interface ToolSchemaProps {
  tool: {
    title: string
    description: string
    slug: string
  }
}

export function ToolSchema({ tool }: ToolSchemaProps) {
  const baseUrl = "https://colorizeai.app"

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "description": tool.description,
    "url": `${baseUrl}/tools/${tool.slug}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "ColorizeAI",
      "url": baseUrl
    }
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${tool.title}`,
    "description": `Step-by-step guide to using the ${tool.title}`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Access the Tool",
        "text": `Navigate to ${baseUrl}/tools/${tool.slug}`
      },
      {
        "@type": "HowToStep",
        "name": "Enter Your Information",
        "text": "Fill in the required fields or make your selections"
      },
      {
        "@type": "HowToStep",
        "name": "Get Results",
        "text": "View your generated results and use them for your project"
      }
    ]
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
        "name": "Tools",
        "item": `${baseUrl}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": `${baseUrl}/tools/${tool.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
