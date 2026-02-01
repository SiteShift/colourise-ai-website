// Topical Authority Content Hub
// Manages pillars, clusters, and internal linking

export interface ContentPillar {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  clusters: string[] // slugs of cluster articles
  relatedPillars: string[]
}

export interface ClusterArticle {
  slug: string
  title: string
  excerpt: string
  pillar: string // parent pillar slug
  keywords: string[]
  relatedClusters: string[]
  tools?: string[] // related tool slugs
}

export interface FreeTool {
  slug: string
  name: string
  description: string
  icon: string
  category: string
  relatedArticles: string[]
}

// Define the 5 main pillars
export const pillars: Record<string, ContentPillar> = {
  "ai-photo-colorization": {
    slug: "ai-photo-colorization",
    title: "AI Photo Colorization",
    description: "Everything you need to know about using AI to colorize black and white photos",
    icon: "Palette",
    color: "from-pink-500 to-purple-600",
    clusters: [
      "how-ai-colorization-works",
      "step-by-step-colorizing-first-photo",
      "understanding-color-theory",
      "advanced-colorization-techniques",
      "colorization-mistakes-to-avoid",
      "best-colorization-results",
      "historical-color-accuracy",
      "batch-photo-colorization"
    ],
    relatedPillars: ["photo-restoration", "use-cases"]
  },
  "photo-restoration": {
    slug: "photo-restoration",
    title: "Photo Restoration",
    description: "Learn how to restore, repair, and preserve old and damaged photographs",
    icon: "Wrench",
    color: "from-blue-500 to-cyan-500",
    clusters: [
      "restore-faded-photos",
      "fix-scratched-photos",
      "repair-torn-photos",
      "enhance-blurry-photos",
      "face-enhancement-guide",
      "upscale-old-photos",
      "scanning-best-practices",
      "photo-preservation-guide"
    ],
    relatedPillars: ["ai-photo-colorization", "use-cases"]
  },
  "use-cases": {
    slug: "use-cases",
    title: "Use Cases",
    description: "Discover how different people use AI photo colorization for various purposes",
    icon: "Users",
    color: "from-green-500 to-emerald-500",
    clusters: [
      "colorization-for-genealogy",
      "colorize-family-photos",
      "colorize-wedding-photos",
      "colorize-military-photos",
      "colorization-for-museums",
      "colorization-for-education",
      "memorial-photo-colorization",
      "colorized-photo-gifts"
    ],
    relatedPillars: ["ai-photo-colorization", "comparisons"]
  },
  "comparisons": {
    slug: "comparisons",
    title: "Comparisons & Reviews",
    description: "Compare AI photo colorization tools to find the best option for your needs",
    icon: "Scale",
    color: "from-orange-500 to-red-500",
    clusters: [
      "best-ai-photo-colorization-apps",
      "free-vs-paid-colorization",
      "desktop-vs-mobile-apps",
      "online-vs-offline-tools"
    ],
    relatedPillars: ["ai-photo-colorization", "tools"]
  },
  "tools": {
    slug: "tools",
    title: "Free Tools",
    description: "Free AI-powered tools to help with your photo colorization and restoration projects",
    icon: "Wrench",
    color: "from-violet-500 to-purple-600",
    clusters: [],
    relatedPillars: ["ai-photo-colorization", "comparisons"]
  }
}

// Free tools configuration
export const freeTools: Record<string, FreeTool> = {
  "historical-color-palette": {
    slug: "historical-color-palette",
    name: "Historical Color Palette Generator",
    description: "Explore authentic color palettes from different historical eras to guide your colorization projects",
    icon: "Palette",
    category: "Reference",
    relatedArticles: ["historical-color-accuracy", "understanding-color-theory", "advanced-colorization-techniques"]
  },
  "photo-date-estimator": {
    slug: "photo-date-estimator",
    name: "Photo Date Estimator",
    description: "Estimate when a photograph was taken based on visual clues, fashion, and technology",
    icon: "Calendar",
    category: "Analysis",
    relatedArticles: ["historical-color-accuracy", "colorization-for-genealogy", "colorize-military-photos"]
  },
  "resolution-calculator": {
    slug: "resolution-calculator",
    name: "Print Resolution Calculator",
    description: "Calculate the optimal print size for your photos based on resolution and DPI",
    icon: "Calculator",
    category: "Utility",
    relatedArticles: ["upscale-old-photos", "scanning-best-practices", "best-colorization-results"]
  },
  "before-after-generator": {
    slug: "before-after-generator",
    name: "Before/After Comparison Generator",
    description: "Create stunning before and after comparison images to showcase your colorization results",
    icon: "SplitSquareHorizontal",
    category: "Creative",
    relatedArticles: ["colorized-photo-gifts", "colorize-family-photos", "best-colorization-results"]
  },
  "scanning-checklist": {
    slug: "scanning-checklist",
    name: "Photo Scanning Checklist",
    description: "Interactive checklist to ensure you capture the best possible scan of your old photos",
    icon: "CheckSquare",
    category: "Guide",
    relatedArticles: ["scanning-best-practices", "photo-preservation-guide", "restore-faded-photos"]
  }
}

// Get pillar by slug
export function getPillar(slug: string): ContentPillar | null {
  return pillars[slug] || null
}

// Get all pillars
export function getAllPillars(): ContentPillar[] {
  return Object.values(pillars)
}

// Get tool by slug
export function getTool(slug: string): FreeTool | null {
  return freeTools[slug] || null
}

// Get all tools
export function getAllTools(): FreeTool[] {
  return Object.values(freeTools)
}

// Get related content for internal linking
export function getRelatedContent(currentSlug: string, pillarSlug: string) {
  const pillar = pillars[pillarSlug]
  if (!pillar) return { clusters: [], tools: [], pillars: [] }

  return {
    clusters: pillar.clusters.filter(slug => slug !== currentSlug).slice(0, 4),
    tools: Object.values(freeTools).filter(tool =>
      tool.relatedArticles.includes(currentSlug)
    ).slice(0, 2),
    pillars: pillar.relatedPillars.map(slug => pillars[slug]).filter(Boolean)
  }
}

// Breadcrumb generator
export function generateBreadcrumbs(type: 'pillar' | 'cluster' | 'tool', slug: string, pillarSlug?: string) {
  const crumbs = [{ label: 'Home', href: '/' }]

  if (type === 'pillar') {
    const pillar = pillars[slug]
    if (pillar) {
      crumbs.push({ label: 'Guides', href: '/guides' })
      crumbs.push({ label: pillar.title, href: `/guides/${slug}` })
    }
  } else if (type === 'cluster' && pillarSlug) {
    const pillar = pillars[pillarSlug]
    if (pillar) {
      crumbs.push({ label: 'Guides', href: '/guides' })
      crumbs.push({ label: pillar.title, href: `/guides/${pillarSlug}` })
      crumbs.push({ label: 'Article', href: `/blog/${slug}` })
    }
  } else if (type === 'tool') {
    crumbs.push({ label: 'Tools', href: '/tools' })
    const tool = freeTools[slug]
    if (tool) {
      crumbs.push({ label: tool.name, href: `/tools/${slug}` })
    }
  }

  return crumbs
}
