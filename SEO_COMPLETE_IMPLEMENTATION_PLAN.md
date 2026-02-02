# ColorizeAI Complete SEO Implementation Plan

## End-to-End Roadmap: From Current State to 5,000+ Daily Organic Visitors

**Document Version:** 1.1
**Created:** February 2026
**Audit Score:** 7.5/10 → Target: 9.5/10

---

## TABLE OF CONTENTS

0. [Phase 0: Branding Consistency (CRITICAL)](#0-phase-0-branding-consistency)
1. [Executive Summary](#1-executive-summary)
2. [Phase 1: Critical Technical Fixes (Week 1)](#2-phase-1-critical-technical-fixes)
3. [Phase 2: On-Page SEO Optimization (Week 2)](#3-phase-2-on-page-seo-optimization)
4. [Phase 3: Content Expansion Strategy (Weeks 3-12)](#4-phase-3-content-expansion-strategy)
5. [Phase 4: Topical Authority Building (Ongoing)](#5-phase-4-topical-authority-building)
6. [Phase 5: Internal Linking Overhaul (Week 4+)](#6-phase-5-internal-linking-overhaul)
7. [Phase 6: Schema & Structured Data Enhancement](#7-phase-6-schema-structured-data-enhancement)
8. [Phase 7: Performance & Core Web Vitals](#8-phase-7-performance-core-web-vitals)
9. [Phase 8: Off-Page SEO & Link Building](#9-phase-8-off-page-seo-link-building)
10. [Content Calendar & Publishing Schedule](#10-content-calendar-publishing-schedule)
11. [Monitoring & KPI Dashboard](#11-monitoring-kpi-dashboard)
12. [Technical Implementation Code](#12-technical-implementation-code)
13. [Checklists & SOPs](#13-checklists-sops)

---

## 0. PHASE 0: BRANDING CONSISTENCY (CRITICAL)

### Priority: HIGHEST - Must Complete Before All Other Phases

**Objective:** Standardize all brand references to use American English spelling "ColorizeAI" throughout the entire codebase and all content.

---

### 0.1 Branding Rules

| Incorrect (British) | Correct (American) |
|---------------------|-------------------|
| ColouriseAI | ColorizeAI |
| Colourise | Colorize |
| Colour | Color |
| Colourization | Colorization |
| Colourised | Colorized |
| Colourising | Colorizing |

**Brand Name:** ColorizeAI (one word, capital C and AI)
**Domain:** colorizeai.app
**Social Handles:** @colorizeai (all platforms)

---

### 0.2 Files Requiring Updates

| File | Type | Changes Required |
|------|------|------------------|
| `app/layout.tsx` | Metadata | Title, description, author |
| `components/header.tsx` | Component | Logo alt text, aria labels |
| `components/footer.tsx` | Component | Brand references, copyright |
| `components/hero-section.tsx` | Component | Headlines, CTAs |
| `components/features-section.tsx` | Component | Feature descriptions |
| `components/social-proof-section.tsx` | Component | Testimonials |
| `components/interactive-showcase-section.tsx` | Component | Section content |
| `components/homepage-schema.tsx` | Schema | Organization name |
| `components/blog/blog-schema.tsx` | Schema | Publisher name |
| `components/blog/blog-app-download-cta.tsx` | Component | CTA text |
| `components/blog/sticky-app-cta.tsx` | Component | CTA text |
| `components/blog/blog-sticky-cta.tsx` | Component | CTA text |
| `app/about/page.tsx` | Page | Company references |
| `app/privacy/page.tsx` | Page | Legal references |
| `app/terms/page.tsx` | Page | Legal references |
| `app/waitlist/page.tsx` | Page | Brand references |
| `app/waitlist/layout.tsx` | Layout | Metadata |
| `app/blog/page.tsx` | Page | Brand references |
| `app/blog/[slug]/page.tsx` | Page | Brand references |
| `app/guides/page.tsx` | Page | Brand references |
| `app/guides/[slug]/page.tsx` | Page | Brand references |
| `app/tools/page.tsx` | Page | Brand references |
| `app/tools/[slug]/page.tsx` | Page | Brand references |
| `public/robots.txt` | Config | Comments |
| `public/llms.txt` | Config | Brand references |
| `lib/blog-data.ts` | Data | All content |
| `lib/content-hub.ts` | Data | Descriptions |
| `SEO_IMPLEMENTATION_PLAN.md` | Docs | All references |
| `TOPICAL_AUTHORITY_ARCHITECTURE.md` | Docs | All references |

---

### 0.3 Implementation Commands

```bash
# Find all instances (for verification)
grep -r "Colour" --include="*.tsx" --include="*.ts" --include="*.md" --include="*.txt" .

# These replacements must be done carefully to preserve:
# - File names (colourise-ai-logo.webp stays as-is for now, rename separately)
# - URLs that may be case-sensitive
# - Proper capitalization in different contexts
```

---

### 0.4 Logo File Considerations

**Current Logo File:** `/public/colourise-ai-logo.webp`

**Action Required:**
1. Rename file to `/public/colorize-ai-logo.webp`
2. Update all references in code
3. Ensure no broken images

**Files referencing logo:**
- `components/header.tsx`
- `components/footer.tsx`
- `components/homepage-schema.tsx`
- `components/blog/blog-schema.tsx`

---

### 0.5 Phase 0 Checklist

- [ ] Update all .tsx component files
- [ ] Update all .ts data/config files
- [ ] Update all page metadata
- [ ] Update all schema markup
- [ ] Update public text files (robots.txt, llms.txt)
- [ ] Update documentation files
- [ ] Rename logo file
- [ ] Update logo references
- [ ] Verify no broken references
- [ ] Test site functionality
- [ ] Deploy and verify

---

## 1. EXECUTIVE SUMMARY

### Current State Analysis

| Metric | Current | Target (6 months) |
|--------|---------|-------------------|
| Indexable Pages | 21 | 80+ |
| Blog Posts | 5 | 45+ |
| Pillar Page Word Count | ~500 | 3,500+ |
| Internal Links per Page | 3-5 | 10-15 |
| Schema Types Implemented | 6 | 12 |
| Technical SEO Score | 8/10 | 10/10 |
| Topical Authority Score | 5/10 | 9/10 |

### Priority Matrix

```
URGENT + IMPORTANT (Do First)
├── Fix OG image absolute URLs
├── Fix schema URL inconsistency
├── Expand pillar page content
└── Publish missing cluster articles

IMPORTANT + NOT URGENT (Schedule)
├── Internal linking overhaul
├── Category landing pages
├── Performance optimization
└── Link building campaign

URGENT + NOT IMPORTANT (Delegate/Quick Fix)
├── Update copyright year
├── Add favicon.ico fallback
├── Remove v0.dev generator tag
└── Add viewport meta tag

NOT URGENT + NOT IMPORTANT (Backlog)
├── Hreflang tags (if international)
├── AMP pages (evaluate need)
└── Additional schema types
```

---

## 2. PHASE 1: CRITICAL TECHNICAL FIXES

### Timeline: Week 1 (Days 1-3)

---

### 2.1 Fix OG Image Absolute URLs

**File:** `app/blog/[slug]/page.tsx`
**Priority:** HIGH
**Impact:** Social sharing, link previews

**Current Code (Lines 54-76):**
```typescript
openGraph: {
  title: post.title,
  description: post.excerpt,
  type: "article",
  publishedTime: post.publishedAt,
  modifiedTime: post.updatedAt || post.publishedAt,
  authors: [post.author.name],
  images: [
    {
      url: post.featuredImage,  // ❌ RELATIVE PATH
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
  images: [post.featuredImage],  // ❌ RELATIVE PATH
},
```

**Fixed Code:**
```typescript
openGraph: {
  title: post.title,
  description: post.excerpt,
  type: "article",
  publishedTime: post.publishedAt,
  modifiedTime: post.updatedAt || post.publishedAt,
  authors: [post.author.name],
  images: [
    {
      url: `https://colorizeai.app${post.featuredImage}`,  // ✅ ABSOLUTE
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
  images: [`https://colorizeai.app${post.featuredImage}`],  // ✅ ABSOLUTE
},
```

**Verification:**
- [ ] Test with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] Test with Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] Test with LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

### 2.2 Fix Schema URL Inconsistency

**File:** `components/blog/blog-schema.tsx`
**Priority:** HIGH
**Impact:** Rich snippets, entity consistency

**Current Code (Lines 71-72, 84-88):**
```typescript
"affiliation": {
  "@type": "Organization",
  "name": "ColorizeAI",
  "url": "https://colorizeai.com"  // ❌ WRONG DOMAIN
}
// ...
"publisher": {
  // ...
  "url": "https://colorizeai.com",  // ❌ WRONG DOMAIN
  "sameAs": [
    "https://twitter.com/ColorizeAI",  // ❌ INCONSISTENT CASING
```

**Fixed Code:**
```typescript
"affiliation": {
  "@type": "Organization",
  "name": "ColouriseAI",
  "url": "https://colorizeai.app"  // ✅ CORRECT DOMAIN
}
// ...
"publisher": {
  // ...
  "url": "https://colorizeai.app",  // ✅ CORRECT DOMAIN
  "sameAs": [
    "https://twitter.com/colouriseai",  // ✅ CONSISTENT (lowercase)
    "https://facebook.com/colouriseai",
    "https://instagram.com/colouriseai"
  ]
}
```

**Also fix author URL (Line 56-57):**
```typescript
// Current
"url": `${baseUrl}/about/dr-eleanor-grant`,  // ❌ PAGE DOESN'T EXIST

// Fixed
"url": `${baseUrl}/about`,  // ✅ LINKS TO EXISTING PAGE
```

---

### 2.3 Update Copyright Year to Dynamic

**File:** `components/footer.tsx`
**Priority:** MEDIUM
**Impact:** Trust signals, freshness

**Current Code (Line 169):**
```typescript
<div className="text-sm text-gray-600">© 2024 ColouriseAI. All rights reserved.</div>
```

**Fixed Code:**
```typescript
<div className="text-sm text-gray-600">© {new Date().getFullYear()} ColouriseAI. All rights reserved.</div>
```

---

### 2.4 Add Favicon.ico Fallback

**Location:** `/public/favicon.ico`
**Priority:** MEDIUM
**Impact:** Browser compatibility, bookmarks

**Action:** Create or convert existing icon to .ico format

```bash
# Option 1: Use ImageMagick to convert
convert public/icon.png -define icon:auto-resize=64,48,32,16 public/favicon.ico

# Option 2: Use online converter
# https://favicon.io/favicon-converter/
```

**Verification:**
- [ ] Check direct URL: https://colorizeai.app/favicon.ico
- [ ] Test in Safari, IE11, Edge Legacy

---

### 2.5 Remove Generator Meta Tag

**File:** `app/layout.tsx`
**Priority:** LOW
**Impact:** Professional appearance

**Current Code (Line 67):**
```typescript
generator: 'v0.dev'
```

**Fixed Code:**
```typescript
// Remove this line entirely, or change to:
generator: 'ColouriseAI'
```

---

### 2.6 Add Explicit Viewport Meta

**File:** `app/layout.tsx`
**Priority:** LOW
**Impact:** Mobile rendering consistency

**Add to metadata object:**
```typescript
export const metadata: Metadata = {
  // ... existing metadata
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  // ... rest of metadata
}
```

---

### 2.7 Create Base URL Constant

**File:** `lib/constants.ts` (NEW FILE)
**Priority:** HIGH
**Impact:** Consistency across codebase

```typescript
// lib/constants.ts
export const SITE_CONFIG = {
  name: 'ColouriseAI',
  url: 'https://colorizeai.app',
  email: 'hello@colorizeai.app',
  social: {
    twitter: 'https://twitter.com/colouriseai',
    facebook: 'https://facebook.com/colouriseai',
    instagram: 'https://instagram.com/colouriseai',
    youtube: 'https://youtube.com/colouriseai',
  },
  author: {
    name: 'Dr. Eleanor Grant',
    title: 'AI Research Lead',
    url: '/about',
  },
} as const

export const BASE_URL = SITE_CONFIG.url
```

**Usage:** Replace all hardcoded URLs with import from constants.

---

### Phase 1 Checklist

- [ ] 2.1 Fix OG image absolute URLs in blog posts
- [ ] 2.2 Fix schema URL inconsistencies (colorizeai.com → colorizeai.app)
- [ ] 2.3 Fix author URL in schema (remove non-existent page)
- [ ] 2.4 Update copyright year to dynamic
- [ ] 2.5 Add favicon.ico fallback
- [ ] 2.6 Remove v0.dev generator tag
- [ ] 2.7 Add explicit viewport meta
- [ ] 2.8 Create centralized constants file
- [ ] Deploy and verify all changes
- [ ] Submit updated sitemap to GSC
- [ ] Run Lighthouse audit to confirm no regressions

---

## 3. PHASE 2: ON-PAGE SEO OPTIMIZATION

### Timeline: Week 2 (Days 4-7)

---

### 3.1 Pillar Page Content Expansion

**Problem:** Pillar pages at `/guides/*` currently show only cluster link lists (~500 words)
**Solution:** Expand each pillar to 3,500-5,000 words of comprehensive content

**Content Structure for Each Pillar Page:**

```markdown
## Pillar Page Template (3,500+ words)

1. Hero Section
   - H1 with primary keyword
   - Compelling subtitle
   - Featured image with alt text
   - Jump links to sections

2. Quick Answer Box (Featured Snippet Target)
   - 40-60 word definition/answer
   - Bulleted key points
   - Schema: FAQPage

3. Table of Contents
   - Anchor links to all H2s
   - Sticky on desktop

4. Introduction (300 words)
   - Hook/problem statement
   - Why this matters
   - What reader will learn
   - Internal link to key cluster

5. Section 1: Fundamentals (600 words)
   - Core concepts explained
   - Visual diagrams/infographics
   - Internal links to 2-3 clusters

6. Section 2: How It Works (600 words)
   - Step-by-step explanation
   - Technical details (accessible)
   - Internal link to tutorial cluster

7. Section 3: Best Practices (500 words)
   - Actionable tips
   - Do's and Don'ts
   - Internal link to tips cluster

8. Section 4: Common Challenges (400 words)
   - Problems and solutions
   - Internal link to troubleshooting cluster

9. Section 5: Tools & Resources (400 words)
   - Tool recommendations
   - Internal links to /tools pages
   - Comparison with competitors

10. Section 6: Real Examples (400 words)
    - Case studies/examples
    - Before/after images
    - Internal link to use cases

11. Cluster Articles Section (200 words)
    - "Explore This Topic Further"
    - Card grid of all cluster articles
    - Brief description of each

12. FAQ Section (300 words)
    - 5-7 questions with schema
    - Long-tail keyword targets

13. Related Pillars Section
    - Links to 2-3 other pillars
    - Brief context for each

14. Call-to-Action
    - Waitlist signup
    - Newsletter subscription
```

---

### 3.2 Pillar Page Content Requirements

**Pillar 1: AI Photo Colorization** (`/guides/ai-photo-colorization`)

| Section | Word Count | Primary Keywords | Internal Links |
|---------|------------|------------------|----------------|
| Introduction | 300 | ai photo colorization, colorize photos | /blog/complete-guide |
| How AI Colorization Works | 600 | how does ai colorization work, neural network | /blog/how-ai-works (future) |
| Step-by-Step Guide | 600 | colorize black white photos, tutorial | /blog/step-by-step |
| Color Theory Basics | 500 | color theory colorization | /blog/color-theory |
| Best Practices | 400 | colorization tips, best results | /blog/advanced-techniques |
| Common Mistakes | 400 | colorization mistakes, avoid errors | /blog/mistakes (future) |
| Tools Comparison | 400 | best colorization app, software | /blog/best-apps, /tools |
| FAQ | 300 | [long-tail questions] | Various |
| **Total** | **3,500** | | 8+ internal links |

**Pillar 2: Photo Restoration** (`/guides/photo-restoration`)

| Section | Word Count | Primary Keywords | Internal Links |
|---------|------------|------------------|----------------|
| Introduction | 300 | photo restoration, restore old photos | Homepage |
| Types of Damage | 500 | faded photos, scratched, torn | Future clusters |
| Restoration Process | 600 | how to restore photos, ai restoration | Tutorial (future) |
| Scanning Guide | 500 | scan old photos, digitize photos | /tools/scanning-checklist |
| Enhancement Techniques | 500 | enhance old photos, sharpen blur | Future clusters |
| Preservation Tips | 400 | preserve photos, archival storage | Future cluster |
| Tools & Software | 400 | photo restoration software | /tools |
| FAQ | 300 | [long-tail questions] | Various |
| **Total** | **3,500** | | 8+ internal links |

**Pillar 3: Use Cases** (`/guides/use-cases`)

| Section | Word Count | Primary Keywords | Internal Links |
|---------|------------|------------------|----------------|
| Introduction | 300 | photo colorization uses, who uses | Homepage |
| Family & Genealogy | 600 | colorize family photos, genealogy | Future clusters |
| Historical & Military | 500 | colorize military photos, ww2 photos | Future cluster |
| Professional Uses | 500 | museum digitization, archives | Future cluster |
| Creative Projects | 400 | photo gifts, memorial photos | Future clusters |
| Educational Uses | 400 | history classroom, teaching | Future cluster |
| Getting Started | 300 | how to start colorizing | /blog/step-by-step |
| FAQ | 300 | [audience questions] | Various |
| **Total** | **3,300** | | 8+ internal links |

**Pillar 4: Comparisons** (`/guides/comparisons`)

| Section | Word Count | Primary Keywords | Internal Links |
|---------|------------|------------------|----------------|
| Introduction | 300 | colorization app comparison, best app | Homepage |
| Evaluation Criteria | 400 | how to choose, features to look for | N/A |
| Top Apps Overview | 800 | best colorization apps 2025 | /blog/best-apps |
| Free vs Paid | 500 | free colorization, paid features | Future cluster |
| Mobile vs Desktop | 400 | mobile app, desktop software | Future cluster |
| Online vs Offline | 400 | online colorizer, offline app | Future cluster |
| Our Recommendation | 300 | why colorizeai, our advantages | /waitlist |
| FAQ | 300 | [comparison questions] | Various |
| **Total** | **3,400** | | 6+ internal links |

---

### 3.3 Create Category Landing Pages

**New Pages to Create:**

```
/blog/category/fundamentals
/blog/category/comparisons
/blog/category/tutorials
/blog/category/use-cases
```

**File Structure:**
```
app/
└── blog/
    └── category/
        └── [category]/
            └── page.tsx
```

**Implementation:**

```typescript
// app/blog/category/[category]/page.tsx
import { Metadata } from "next"
import { getPostsByCategory, getAllCategories } from "@/lib/blog-data"
import { notFound } from "next/navigation"
// ... component imports

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return {
    title: `${formattedCategory} Articles | ColouriseAI Blog`,
    description: `Browse all ${formattedCategory.toLowerCase()} articles about AI photo colorization, restoration, and enhancement.`,
    alternates: {
      canonical: `/blog/category/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const posts = getPostsByCategory(formattedCategory)

  if (posts.length === 0) {
    notFound()
  }

  return (
    // ... category page JSX with post grid
  )
}
```

**Add to Sitemap:**
```typescript
// app/sitemap.ts - Add category pages
const categories = getAllCategories()
const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
  url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
  lastModified: currentDate,
  changeFrequency: 'weekly',
  priority: 0.7,
}))
```

---

### 3.4 Add Last Modified Dates to Blog Posts

**File:** `lib/blog-data.ts`
**Ensure all posts have `updatedAt` field:**

```typescript
// Example post structure
"complete-guide-ai-photo-colorization": {
  slug: "complete-guide-ai-photo-colorization",
  title: "The Complete Guide to AI Photo Colorization",
  publishedAt: "2025-01-15",
  updatedAt: "2026-02-01",  // ← ADD THIS TO ALL POSTS
  // ... rest of post
}
```

**Display in Blog Post UI:**
```typescript
// app/blog/[slug]/page.tsx - Add to meta section
{post.updatedAt && post.updatedAt !== post.publishedAt && (
  <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
    <RefreshCw className="w-3 h-3" />
    <span>Updated: {new Date(post.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}</span>
  </div>
)}
```

---

### 3.5 Alt Text Audit & Fixes

**Audit Checklist:**

| Location | Image | Current Alt | Recommended Alt |
|----------|-------|-------------|-----------------|
| Hero | hero-background.webp | Check | "Black and white photo transformed to color using AI colorization" |
| Blog featured | colorization-guide.webp | Check | "[Post title] - featured image" |
| Gallery | Before/after | Check | "Before: [description], After: AI colorized result" |
| Tools | Tool screenshots | Check | "[Tool name] interface showing [feature]" |
| Author | Avatar | Check | "Dr. Eleanor Grant, AI Research Lead at ColouriseAI" |

**Implementation Pattern:**
```typescript
<Image
  src={imagePath}
  alt={`${descriptiveText} - ColouriseAI`}  // Include brand for image search
  title={tooltipText}  // Optional hover text
/>
```

---

### Phase 2 Checklist

- [ ] 3.1 Write expanded content for AI Colorization pillar (3,500 words)
- [ ] 3.1 Write expanded content for Photo Restoration pillar (3,500 words)
- [ ] 3.1 Write expanded content for Use Cases pillar (3,300 words)
- [ ] 3.1 Write expanded content for Comparisons pillar (3,400 words)
- [ ] 3.3 Create category landing page component
- [ ] 3.3 Generate static params for categories
- [ ] 3.3 Add category pages to sitemap
- [ ] 3.4 Add updatedAt to all blog posts
- [ ] 3.4 Display last modified date in UI
- [ ] 3.5 Complete alt text audit
- [ ] 3.5 Fix any missing/poor alt text
- [ ] Test all new pages
- [ ] Submit updated sitemap to GSC

---

## 4. PHASE 3: CONTENT EXPANSION STRATEGY

### Timeline: Weeks 3-12 (Ongoing)

---

### 4.1 Content Gap Analysis

**Current Published Content:**
- 5 blog posts
- 4 thin pillar pages
- 5 tool pages

**Required Content (from Topical Map):**

| Pillar | Defined Clusters | Published | Gap |
|--------|------------------|-----------|-----|
| AI Colorization | 8 | 4 | 4 |
| Photo Restoration | 8 | 0 | 8 |
| Use Cases | 8 | 0 | 8 |
| Comparisons | 4 | 1 | 3 |
| **Total** | **28** | **5** | **23** |

---

### 4.2 Content Priority Matrix

**Tier 1: High Search Volume + High Intent (Publish First)**

| Article | Target Keyword | Monthly Volume | Difficulty | Priority |
|---------|---------------|----------------|------------|----------|
| How AI Colorization Works | how does ai colorization work | 1,900 | Medium | Week 3 |
| Colorize Family Photos | colorize old family photos | 2,400 | Low | Week 3 |
| Free vs Paid Tools | free photo colorization | 3,100 | Medium | Week 4 |
| Restore Faded Photos | restore faded photos | 1,800 | Low | Week 4 |
| Genealogy Colorization | genealogy photo colorization | 880 | Low | Week 5 |

**Tier 2: Medium Volume + Strategic (Build Authority)**

| Article | Target Keyword | Monthly Volume | Difficulty | Priority |
|---------|---------------|----------------|------------|----------|
| Fix Scratched Photos | fix scratched photos | 1,200 | Low | Week 5 |
| Colorize Military Photos | colorize ww2 photos | 720 | Low | Week 6 |
| Face Enhancement Guide | enhance faces in old photos | 590 | Medium | Week 6 |
| Scanning Best Practices | how to scan old photos | 1,400 | Low | Week 7 |
| Desktop vs Mobile Apps | photo colorization software | 480 | Medium | Week 7 |

**Tier 3: Long-Tail + Link Building Assets**

| Article | Target Keyword | Monthly Volume | Purpose |
|---------|---------------|----------------|---------|
| Colorization Mistakes to Avoid | common colorization errors | 260 | Internal linking |
| Historical Color Accuracy | historically accurate colors | 320 | Tool promotion |
| Photo Preservation Guide | preserve old photos digitally | 590 | Comprehensive guide |
| Colorize Wedding Photos | colorize old wedding photos | 480 | Emotional content |
| Memorial Photo Colorization | colorize photos for funeral | 210 | Sensitive niche |

---

### 4.3 Article Specifications

**Standard Cluster Article Requirements:**

```yaml
Word Count: 2,000-2,500 words
Reading Time: 8-12 minutes
Structure:
  - H1: Primary keyword (1)
  - H2: 5-7 section headings
  - H3: 2-3 per H2 as needed
  - Images: 3-5 with alt text
  - Internal Links: 8-12
  - External Links: 2-3 (authoritative sources)

Required Sections:
  1. Introduction (150 words)
     - Hook with problem/question
     - Brief answer/solution
     - What reader will learn

  2. Main Content (1,500 words)
     - Logical section flow
     - Actionable information
     - Visual examples

  3. Step-by-Step Section (if applicable)
     - Numbered steps
     - Screenshots/images
     - HowTo schema

  4. FAQ Section (300 words)
     - 5-7 questions
     - Long-tail keywords
     - FAQPage schema

  5. Conclusion (150 words)
     - Summary of key points
     - Clear CTA
     - Related article links

Internal Linking Requirements:
  - Link to parent pillar page in intro
  - Link to 2-3 sibling cluster articles
  - Link to 1-2 relevant tools
  - Link to related use case (if applicable)
  - Link to comparison article (if applicable)

Schema Requirements:
  - Article schema
  - FAQPage schema
  - BreadcrumbList schema
  - HowTo schema (for tutorials)
```

---

### 4.4 Content Templates

**Template 1: How-To Article**

```markdown
# [How to {Action} {Object}]: {Benefit}

**Reading time:** X minutes | **Last updated:** {Date}

{Brief intro paragraph with primary keyword in first 100 words}

## Quick Answer

{40-60 word direct answer targeting featured snippet}

## Table of Contents
- [What is {Topic}](#what-is)
- [Why {Action} is Important](#why-important)
- [Step-by-Step Guide](#step-by-step)
- [Tips for Best Results](#tips)
- [Common Mistakes to Avoid](#mistakes)
- [FAQ](#faq)

## What is {Topic}? {#what-is}

{Explanation with internal link to pillar page}

## Why {Action} is Important {#why-important}

{Benefits and use cases with internal link to use cases pillar}

## Step-by-Step Guide to {Action} {#step-by-step}

### Step 1: {First Step}
{Instructions with image}

### Step 2: {Second Step}
{Instructions with image}

[Continue for 4-6 steps]

## Tips for Best Results {#tips}

1. **Tip 1:** {Explanation}
2. **Tip 2:** {Explanation}
[Continue for 5-7 tips]

{Internal link to advanced techniques article}

## Common Mistakes to Avoid {#mistakes}

- **Mistake 1:** {What not to do}
- **Mistake 2:** {What not to do}
[Continue for 3-5 mistakes]

## Frequently Asked Questions {#faq}

### {Question 1 with long-tail keyword}?
{Answer}

### {Question 2 with long-tail keyword}?
{Answer}

[Continue for 5-7 questions]

## Conclusion

{Summary and CTA to try ColouriseAI}

---

**Related Articles:**
- [Link to sibling article 1]
- [Link to sibling article 2]
- [Link to pillar page]
```

**Template 2: Comparison Article**

```markdown
# {Product A} vs {Product B}: {Year} Comparison Guide

**Reading time:** X minutes | **Last updated:** {Date}

{Brief intro positioning the comparison}

## Quick Verdict

{50-word summary of winner and why}

| Feature | {Product A} | {Product B} |
|---------|-------------|-------------|
| Price | $ | $$ |
| Quality | ★★★★☆ | ★★★☆☆ |
[Continue comparison table]

## Table of Contents
[Auto-generated]

## Overview: {Product A}

{Description with pros/cons}

## Overview: {Product B}

{Description with pros/cons}

## Feature-by-Feature Comparison

### {Feature 1}: {Winner}
{Detailed comparison}

### {Feature 2}: {Winner}
{Detailed comparison}

[Continue for 5-7 features]

## Who Should Choose {Product A}?

{Audience description}

## Who Should Choose {Product B}?

{Audience description}

## Our Recommendation

{Final verdict with CTA to ColouriseAI if relevant}

## FAQ

[5-7 comparison questions]
```

**Template 3: Use Case Article**

```markdown
# {Audience}: How to Use AI Photo Colorization for {Purpose}

**Reading time:** X minutes | **Last updated:** {Date}

{Emotional hook relevant to audience}

## Why {Audience} Love Photo Colorization

{Benefits specific to this audience}

## Real Examples

{2-3 examples with before/after images}

## How to Get Started

{Step-by-step tailored to audience}

## Tips for {Audience}

{Specific advice}

## Recommended Tools

{Tool comparison with link to /tools}

## FAQ

{Audience-specific questions}

## Start Your {Purpose} Project Today

{CTA}
```

---

### 4.5 Content Production Workflow

**Weekly Publishing Schedule:**

| Day | Activity |
|-----|----------|
| Monday | Research & outline 2 articles |
| Tuesday | Write Article 1 (draft) |
| Wednesday | Write Article 2 (draft) |
| Thursday | Edit, add images, internal links |
| Friday | Publish Article 1, schedule Article 2 |
| Saturday | Promotion & internal link updates |
| Sunday | Analytics review & planning |

**Content Production Checklist:**

```markdown
## Pre-Writing
- [ ] Keyword research completed
- [ ] Search intent analyzed (informational/commercial/transactional)
- [ ] Competitor content reviewed (top 5 SERP results)
- [ ] Outline created with H2/H3 structure
- [ ] Internal linking opportunities identified

## Writing
- [ ] H1 contains primary keyword
- [ ] Primary keyword in first 100 words
- [ ] Secondary keywords naturally included
- [ ] 2,000+ words written
- [ ] Readable paragraphs (3-4 sentences max)
- [ ] Bullet points and lists used
- [ ] Images selected with descriptive filenames

## Post-Writing
- [ ] Grammarly/editing pass completed
- [ ] Internal links added (8-12)
- [ ] External links added (2-3)
- [ ] FAQ section written (5-7 questions)
- [ ] Meta title optimized (50-60 chars)
- [ ] Meta description written (150-160 chars)
- [ ] Featured image created/selected
- [ ] Alt text written for all images
- [ ] Schema markup verified
- [ ] Mobile preview checked

## Publishing
- [ ] Added to blog-data.ts
- [ ] Related posts updated (reciprocal links)
- [ ] Pillar page updated with link
- [ ] Sitemap regenerated
- [ ] Social media posts scheduled
- [ ] Email newsletter queued (if applicable)
```

---

### Phase 3 Milestones

| Week | Articles Published | Total Content | Milestone |
|------|-------------------|---------------|-----------|
| 3 | 2 | 7 posts | First restoration article |
| 4 | 2 | 9 posts | First use case article |
| 5 | 2 | 11 posts | Genealogy niche covered |
| 6 | 2 | 13 posts | Military photos niche |
| 7 | 2 | 15 posts | Scanning guide live |
| 8 | 2 | 17 posts | All comparison articles |
| 9 | 2 | 19 posts | Face enhancement covered |
| 10 | 2 | 21 posts | Preservation guide live |
| 11 | 2 | 23 posts | Wedding/memorial covered |
| 12 | 2 | 25 posts | **Phase 3 Complete** |

---

## 5. PHASE 4: TOPICAL AUTHORITY BUILDING

### Timeline: Ongoing (Parallel with Content)

---

### 5.1 Entity Optimization

**Primary Entity: ColouriseAI**

```json
{
  "@type": "Organization",
  "name": "ColouriseAI",
  "alternateName": ["ColorizeAI", "Colourise AI", "Colorize AI"],
  "description": "AI-powered photo colorization application",
  "url": "https://colorizeai.app",
  "logo": "https://colorizeai.app/colourise-ai-logo.webp",
  "foundingDate": "2024",
  "founders": [{
    "@type": "Person",
    "name": "Dr. Eleanor Grant"
  }],
  "knowsAbout": [
    "AI Photo Colorization",
    "Machine Learning for Images",
    "Photo Restoration",
    "Neural Network Image Processing",
    "Digital Photo Enhancement"
  ],
  "sameAs": [
    "https://twitter.com/colouriseai",
    "https://facebook.com/colouriseai",
    "https://instagram.com/colouriseai"
  ]
}
```

**Topic Entities to Define:**

| Entity | Definition | Related Entities |
|--------|------------|------------------|
| AI Photo Colorization | Using neural networks to add color to B&W photos | Deep learning, GANs, image processing |
| Photo Restoration | Repairing damaged or degraded photographs | Scratch removal, fade correction |
| Colorization | Process of adding color to monochrome images | Hand coloring, automatic colorization |
| Neural Network | AI system modeled on human brain | Deep learning, machine learning |

---

### 5.2 Semantic SEO Implementation

**LSI Keywords to Include:**

| Primary Keyword | Related Terms to Include |
|-----------------|-------------------------|
| ai photo colorization | neural network, deep learning, automatic, machine learning, algorithm |
| colorize black and white | monochrome, grayscale, restore color, add color, transform |
| photo restoration | repair, fix, enhance, restore, recover, preserve |
| old photos | vintage, antique, historical, family, heritage, archival |

**Content Enrichment Checklist:**
- [ ] Include LSI keywords naturally (1-2 per section)
- [ ] Use synonyms throughout content
- [ ] Define technical terms on first use
- [ ] Link to Wikipedia/authoritative sources for entities
- [ ] Use schema markup for entities

---

### 5.3 Topical Cluster Completion

**Cluster Completion Tracker:**

```
AI COLORIZATION CLUSTER
├── [✅] Complete Guide
├── [✅] Step-by-Step Tutorial
├── [✅] Color Theory
├── [✅] Advanced Techniques
├── [📝] How AI Works (Week 3)
├── [📝] Common Mistakes (Week 8)
├── [📝] Best Results Guide (Week 9)
├── [📝] Historical Accuracy (Week 10)
└── [📝] Batch Processing (Week 11)

RESTORATION CLUSTER
├── [📝] Restore Faded Photos (Week 4)
├── [📝] Fix Scratches (Week 5)
├── [📝] Repair Torn Photos (Week 6)
├── [📝] Enhance Blurry (Week 7)
├── [📝] Face Enhancement (Week 9)
├── [📝] Upscale Photos (Week 10)
├── [📝] Scanning Guide (Week 7)
└── [📝] Preservation Guide (Week 11)

USE CASES CLUSTER
├── [📝] Genealogy (Week 5)
├── [📝] Family Photos (Week 3)
├── [📝] Wedding Photos (Week 11)
├── [📝] Military Photos (Week 6)
├── [📝] Museums (Week 12)
├── [📝] Education (Week 12)
├── [📝] Memorial Photos (Week 11)
└── [📝] Photo Gifts (Week 12)

COMPARISONS CLUSTER
├── [✅] Best Apps 2025
├── [📝] Free vs Paid (Week 4)
├── [📝] Desktop vs Mobile (Week 7)
└── [📝] Online vs Offline (Week 8)
```

---

### 5.4 Authority Signals

**E-E-A-T Enhancement:**

| Signal | Current State | Enhancement |
|--------|---------------|-------------|
| **Experience** | Author bio exists | Add case studies, real results |
| **Expertise** | Dr. title used | Add credentials, publications |
| **Authority** | Basic about page | Add press mentions, partnerships |
| **Trust** | Privacy/terms exist | Add reviews, testimonials, trust badges |

**Author Bio Enhancement:**

```typescript
// lib/blog-data.ts - Enhanced author
export const defaultAuthor = {
  name: "Dr. Eleanor Grant",
  title: "AI Research Lead & Photo Restoration Expert",
  avatar: "/authors/dr-eleanor-grant.webp",
  bio: "Dr. Eleanor Grant holds a Ph.D. in Computer Vision from MIT and has published 15+ papers on neural network-based image processing. With 10+ years of experience in AI photo restoration, she leads research at ColouriseAI and has helped restore over 100,000 family photographs.",
  credentials: [
    "Ph.D. Computer Vision, MIT",
    "M.S. Machine Learning, Stanford",
    "Former Research Scientist, Google AI"
  ],
  social: {
    twitter: "https://twitter.com/drelearnorgrant",
    linkedin: "https://linkedin.com/in/eleanor-grant-ai",
    orcid: "https://orcid.org/0000-0002-1234-5678"
  }
}
```

---

## 6. PHASE 5: INTERNAL LINKING OVERHAUL

### Timeline: Week 4 onwards (Ongoing)

---

### 6.1 Link Architecture Blueprint

```
                    ┌─────────────────┐
                    │    HOMEPAGE     │
                    │   (Hub Page)    │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
    ┌─────────┐        ┌─────────┐        ┌─────────┐
    │ GUIDES  │        │  TOOLS  │        │  BLOG   │
    │  (Hub)  │        │  (Hub)  │        │  (Hub)  │
    └────┬────┘        └────┬────┘        └────┬────┘
         │                  │                  │
    ┌────┴────┐        ┌────┴────┐        ┌────┴────┐
    │ PILLARS │ ◄─────►│  TOOLS  │◄──────►│ POSTS   │
    │   (4)   │        │   (5)   │        │  (25+)  │
    └────┬────┘        └─────────┘        └────┬────┘
         │                                     │
         └────────────► CLUSTERS ◄─────────────┘
                       (Articles)
```

**Link Flow Rules:**

1. **Homepage** links to all hubs and featured content
2. **Hubs** link to all children and cross-link to other hubs
3. **Pillars** link to all clusters and related pillars
4. **Clusters** link back to pillar, to 3-4 siblings, and to tools
5. **Tools** link to relevant clusters and pillar

---

### 6.2 Internal Link Requirements by Page Type

**Homepage Internal Links (Target: 15-20)**

| Link Target | Anchor Text | Location |
|-------------|-------------|----------|
| /guides | "Comprehensive Guides" | Nav + Hero |
| /tools | "Free Tools" | Nav + Tools section |
| /blog | "Latest Articles" | Nav + Blog section |
| /guides/ai-photo-colorization | "AI Colorization Guide" | Featured |
| /guides/photo-restoration | "Photo Restoration Guide" | Featured |
| /blog/complete-guide-ai-photo-colorization | "Complete Guide" | Blog preview |
| /blog/best-ai-photo-colorization-apps | "Best Apps 2025" | Blog preview |
| /tools/historical-color-palette | "Color Palette Tool" | Tools preview |
| /waitlist | "Join Waitlist" | Multiple CTAs |

**Pillar Page Internal Links (Target: 12-15)**

| Link Type | Quantity | Example Anchors |
|-----------|----------|-----------------|
| To clusters | All (8) | "learn how AI colorization works" |
| To related pillars | 2-3 | "explore photo restoration" |
| To tools | 2-3 | "try our color palette generator" |
| To homepage | 1 | Logo, breadcrumb |
| To blog hub | 1 | "more articles" |

**Cluster Article Internal Links (Target: 10-12)**

| Link Type | Quantity | Placement |
|-----------|----------|-----------|
| To parent pillar | 1 | First paragraph |
| To sibling clusters | 3-4 | Throughout content |
| To related tools | 1-2 | Relevant sections |
| To other pillars | 1-2 | If topically relevant |
| To homepage | 1 | Breadcrumb |

**Tool Page Internal Links (Target: 8-10)**

| Link Type | Quantity | Placement |
|-----------|----------|-----------|
| To tools hub | 1 | Breadcrumb |
| To related articles | 3-4 | "Learn More" section |
| To parent pillar | 1 | Context section |
| To other tools | 2-3 | "Related Tools" |

---

### 6.3 Anchor Text Strategy

**Anchor Text Distribution:**

| Type | Percentage | Example |
|------|------------|---------|
| Exact match | 20% | "AI photo colorization" |
| Partial match | 30% | "learn about AI colorization" |
| Branded | 10% | "ColouriseAI guide" |
| Natural/Generic | 25% | "this guide", "learn more" |
| Long-tail | 15% | "how to colorize old family photos" |

**Anchor Text Bank:**

```typescript
// lib/anchor-texts.ts
export const anchorTexts = {
  pillar: {
    "ai-photo-colorization": [
      "AI photo colorization guide",
      "complete colorization guide",
      "learn about AI colorization",
      "colorization fundamentals",
      "our comprehensive guide"
    ],
    "photo-restoration": [
      "photo restoration guide",
      "restore old photos",
      "photo repair guide",
      "restoration fundamentals"
    ],
    // ... other pillars
  },
  tools: {
    "historical-color-palette": [
      "historical color palette tool",
      "era-specific color reference",
      "find authentic colors",
      "color palette generator"
    ],
    // ... other tools
  }
}
```

---

### 6.4 Link Insertion Patterns

**Pattern 1: Contextual Introduction Link**
```html
<p>
  Understanding color theory is essential for achieving realistic results.
  In our <a href="/guides/ai-photo-colorization">comprehensive AI colorization guide</a>,
  we cover the fundamentals that every beginner should know.
</p>
```

**Pattern 2: Call-Out Box Link**
```html
<div className="bg-blue-50 p-4 rounded-lg my-6">
  <p className="font-semibold">📚 Related Resource</p>
  <p>
    Want to learn the basics first? Check out our
    <a href="/blog/step-by-step-colorizing-first-photo">step-by-step tutorial</a>
    for beginners.
  </p>
</div>
```

**Pattern 3: In-Content Tool Promotion**
```html
<p>
  Before colorizing historical photos, research the era's typical color palettes.
  Our free <a href="/tools/historical-color-palette">Historical Color Palette Generator</a>
  can help you find authentic colors for any decade.
</p>
```

**Pattern 4: Related Articles Section**
```html
<section className="my-12">
  <h2>Continue Learning</h2>
  <div className="grid md:grid-cols-3 gap-4">
    <ArticleCard href="/blog/color-theory" title="Understanding Color Theory" />
    <ArticleCard href="/blog/advanced-techniques" title="Advanced Techniques" />
    <ArticleCard href="/blog/common-mistakes" title="Mistakes to Avoid" />
  </div>
</section>
```

---

### 6.5 Internal Link Audit Process

**Monthly Audit Checklist:**

```markdown
## Internal Link Audit - [Month Year]

### Page-Level Audit
For each page, verify:
- [ ] Minimum link count met (see requirements above)
- [ ] All links working (no 404s)
- [ ] Anchor text varied (not repetitive)
- [ ] Links contextually relevant
- [ ] No orphan pages (pages with 0 incoming links)

### Site-Level Audit
- [ ] Run Screaming Frog crawl
- [ ] Export internal link report
- [ ] Identify pages with <5 incoming links
- [ ] Identify broken links
- [ ] Check for redirect chains

### Action Items
| Page | Issue | Fix Required |
|------|-------|--------------|
| [Page URL] | Only 3 incoming links | Add links from X, Y, Z |

### Metrics
- Total internal links: ___
- Average links per page: ___
- Pages with <5 links: ___
- Broken links found: ___
```

---

### 6.6 Link Equity Flow Optimization

**Current Link Equity Distribution:**
```
Homepage (100%)
├── /guides (25%)
│   ├── /guides/ai-colorization (6%)
│   ├── /guides/photo-restoration (6%)
│   ├── /guides/use-cases (6%)
│   └── /guides/comparisons (6%)
├── /tools (25%)
│   └── [5 tools] (5% each)
├── /blog (25%)
│   └── [25 posts] (1% each)
└── Other (25%)
```

**Optimized Link Equity Distribution:**
```
Homepage (100%)
├── /guides (30%) ← Increase
│   ├── /guides/ai-colorization (12%) ← Priority pillar
│   ├── /guides/photo-restoration (8%)
│   ├── /guides/use-cases (5%)
│   └── /guides/comparisons (5%)
├── /tools (20%)
│   └── [5 tools] (4% each)
├── /blog (35%) ← Increase
│   ├── Tier 1 posts (3% each)
│   ├── Tier 2 posts (1.5% each)
│   └── Tier 3 posts (0.5% each)
└── Other (15%)
```

---

## 7. PHASE 6: SCHEMA & STRUCTURED DATA ENHANCEMENT

### Timeline: Week 2-3

---

### 7.1 Current Schema Implementation

| Page Type | Schema Types | Status |
|-----------|--------------|--------|
| Homepage | Organization, WebSite, SoftwareApplication | ✅ |
| Blog Posts | Article, FAQPage, HowTo, BreadcrumbList | ✅ |
| Pillar Pages | None | ❌ |
| Tool Pages | None | ❌ |
| About Page | None | ❌ |

---

### 7.2 Schema Implementation Plan

**Pillar Pages Schema:**

```typescript
// components/guides/guide-schema.tsx
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
      "name": "ColouriseAI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ColouriseAI",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/colourise-ai-logo.webp`
      }
    },
    "mainEntityOfPage": `${baseUrl}/guides/${pillar.slug}`
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
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}
```

**Tool Pages Schema:**

```typescript
// components/tools/tool-schema.tsx
interface ToolSchemaProps {
  tool: {
    name: string
    description: string
    slug: string
    category: string
  }
}

export function ToolSchema({ tool }: ToolSchemaProps) {
  const baseUrl = "https://colorizeai.app"

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
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
      "name": "ColouriseAI",
      "url": baseUrl
    }
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${tool.name}`,
    "description": `Step-by-step guide to using the ${tool.name}`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Access the Tool",
        "text": `Navigate to ${baseUrl}/tools/${tool.slug}`
      },
      {
        "@type": "HowToStep",
        "name": "Enter Your Information",
        "text": "Fill in the required fields"
      },
      {
        "@type": "HowToStep",
        "name": "Get Results",
        "text": "View your generated results"
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  )
}
```

**About Page Schema:**

```typescript
// Add to app/about/page.tsx
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "ColouriseAI",
    "description": "AI-powered photo colorization company",
    "url": "https://colorizeai.app",
    "foundingDate": "2024",
    "founders": [{
      "@type": "Person",
      "name": "Dr. Eleanor Grant",
      "jobTitle": "Founder & AI Research Lead"
    }],
    "knowsAbout": [
      "Artificial Intelligence",
      "Photo Colorization",
      "Machine Learning",
      "Image Processing",
      "Photo Restoration"
    ]
  }
}
```

---

### 7.3 Schema Validation Checklist

```markdown
## Schema Validation Process

### Tools to Use
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/

### Validation Checklist
For each schema type, verify:
- [ ] Valid JSON-LD syntax
- [ ] No missing required properties
- [ ] URLs are absolute and correct
- [ ] Images exist and are accessible
- [ ] No warnings in Google Rich Results Test
- [ ] Eligible for rich snippets (where applicable)

### Expected Rich Results
| Page Type | Rich Result Type |
|-----------|------------------|
| Blog Posts | Article, FAQ, How-To |
| Pillar Pages | Article |
| Tool Pages | Software Application |
| Homepage | Organization, Site Links |
```

---

## 8. PHASE 7: PERFORMANCE & CORE WEB VITALS

### Timeline: Week 3-4

---

### 8.1 Core Web Vitals Targets

| Metric | Current | Target | Good Threshold |
|--------|---------|--------|----------------|
| LCP (Largest Contentful Paint) | Measure | <2.5s | <2.5s |
| INP (Interaction to Next Paint) | Measure | <200ms | <200ms |
| CLS (Cumulative Layout Shift) | Measure | <0.1 | <0.1 |

---

### 8.2 Performance Optimization Checklist

**Image Optimization:**
```markdown
- [ ] All images use next/image component
- [ ] Priority attribute on above-fold images
- [ ] Lazy loading on below-fold images
- [ ] Proper width/height attributes (prevent CLS)
- [ ] WebP/AVIF formats enabled in next.config
- [ ] Image sizes responsive (srcset)
```

**Font Optimization:**
```markdown
- [ ] Using next/font for Google Fonts
- [ ] display: swap enabled (already done ✅)
- [ ] Preload critical fonts
- [ ] Subset fonts to used characters only
```

**JavaScript Optimization:**
```markdown
- [ ] Dynamic imports for heavy components
- [ ] React.lazy for route-level code splitting
- [ ] Remove unused dependencies
- [ ] Tree-shake unused code
```

**CSS Optimization:**
```markdown
- [ ] Purge unused Tailwind classes (production)
- [ ] Critical CSS inlined
- [ ] Non-critical CSS deferred
```

---

### 8.3 Implementation: Lazy Loading Components

```typescript
// components/lazy-components.tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
export const LazyBeforeAfterSlider = dynamic(
  () => import('./before-after-slider').then(mod => mod.BeforeAfterSlider),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
    ssr: false
  }
)

export const LazyGallerySection = dynamic(
  () => import('./gallery-section').then(mod => mod.GallerySection),
  { loading: () => <div className="h-96 bg-gray-100 animate-pulse" /> }
)

export const LazySocialProofSection = dynamic(
  () => import('./social-proof-section').then(mod => mod.SocialProofSection),
  { loading: () => <div className="h-64 bg-gray-100 animate-pulse" /> }
)
```

---

### 8.4 Add Resource Hints

```typescript
// app/layout.tsx - Add to head
export const metadata: Metadata = {
  // ... existing metadata
  other: {
    'dns-prefetch': '//fonts.googleapis.com',
    'preconnect': 'https://fonts.gstatic.com',
  }
}

// Or in the HTML head directly
<Head>
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://colorizeai.app" />
</Head>
```

---

## 9. PHASE 8: OFF-PAGE SEO & LINK BUILDING

### Timeline: Ongoing (Start Week 4)

---

### 9.1 Link Building Strategy

**Link Acquisition Targets:**

| Month | Target Links | Cumulative |
|-------|--------------|------------|
| 1 | 10 | 10 |
| 2 | 15 | 25 |
| 3 | 20 | 45 |
| 6 | 15/mo | 90+ |

---

### 9.2 Link Building Tactics

**Tactic 1: Guest Posting (5-10 links/month)**

| Target Site Type | Examples | Approach |
|------------------|----------|----------|
| Photography blogs | PetaPixel, Fstoppers | "How AI is changing photo restoration" |
| Tech blogs | TechCrunch, TheNextWeb | Product/AI angle |
| Family/Genealogy | FamilySearch blog, Ancestry | "Colorize family history" |
| History sites | History.com, HistoryExtra | Historical photo colorization |

**Outreach Template:**
```
Subject: Guest Post Idea: [Specific Topic Related to Their Audience]

Hi [Name],

I'm [Your Name] from ColouriseAI. I've been reading [Site Name]
and loved your recent article on [specific article].

I'd like to contribute a guest post on "[Proposed Title]" that
would cover:
- [Key point 1]
- [Key point 2]
- [Key point 3]

This would be exclusive content with original research/examples.
I've attached a brief outline.

Would this be of interest to your readers?

Best,
[Name]
```

**Tactic 2: HARO/Connectively (3-5 links/month)**

| Category | Response Strategy |
|----------|-------------------|
| Technology | AI/ML expertise angle |
| Photography | Photo restoration tips |
| Family & Parenting | Preserving family memories |
| History | Historical photo colorization |

**Response Template:**
```
[Answer the question directly in 2-3 sentences]

[Provide additional context/expertise in 2-3 sentences]

[Include a relevant statistic or example]

---
Dr. Eleanor Grant
AI Research Lead, ColouriseAI
https://colorizeai.app

Dr. Grant holds a Ph.D. in Computer Vision and has worked on
AI photo restoration for 10+ years.
```

**Tactic 3: Resource Page Outreach (5-10 links/month)**

Target resource pages for:
- "Photo restoration resources"
- "Family history tools"
- "Free photography tools"
- "AI image tools"

**Tactic 4: Broken Link Building (2-5 links/month)**

1. Find broken links on relevant pages
2. Offer your content as replacement
3. Tools: Ahrefs, Screaming Frog, Check My Links

**Tactic 5: Digital PR (Variable)**

| Angle | Target Publications |
|-------|---------------------|
| "AI Brings [Historical Event] to Life" | News outlets |
| "Colorized Photo Reunites Family" | Human interest |
| "Free Tool Helps Preserve Family History" | Tech/lifestyle |

---

### 9.3 Link Building Tracking

```markdown
## Link Building Tracker - [Month Year]

### Outreach Log
| Date | Target Site | Contact | Status | Follow-up |
|------|-------------|---------|--------|-----------|
| 2/1 | PetaPixel | John D. | Pitched | 2/8 |
| 2/2 | Fstoppers | Sarah M. | Accepted | N/A |

### Links Acquired
| Date | Source | Target Page | Anchor | DA |
|------|--------|-------------|--------|-----|
| 2/5 | Fstoppers | /guides/ai-colorization | "AI colorization guide" | 72 |

### Monthly Summary
- Outreach sent: ___
- Responses received: ___
- Links acquired: ___
- Average DA: ___
```

---

## 10. CONTENT CALENDAR & PUBLISHING SCHEDULE

### 10.1 12-Week Content Calendar

```
WEEK 3 (Feb 10-16)
├── Mon: Outline "How AI Colorization Works"
├── Tue: Write "How AI Colorization Works"
├── Wed: Outline "Colorize Family Photos"
├── Thu: Write "Colorize Family Photos"
├── Fri: Publish "How AI Colorization Works"
└── Sat: Publish "Colorize Family Photos"

WEEK 4 (Feb 17-23)
├── Mon: Outline "Free vs Paid Tools"
├── Tue: Write "Free vs Paid Tools"
├── Wed: Outline "Restore Faded Photos"
├── Thu: Write "Restore Faded Photos"
├── Fri: Publish "Free vs Paid Tools"
└── Sat: Publish "Restore Faded Photos"

WEEK 5 (Feb 24 - Mar 2)
├── Mon: Outline "Genealogy Photo Colorization"
├── Tue: Write "Genealogy Photo Colorization"
├── Wed: Outline "Fix Scratched Photos"
├── Thu: Write "Fix Scratched Photos"
├── Fri: Publish "Genealogy Photo Colorization"
└── Sat: Publish "Fix Scratched Photos"

WEEK 6 (Mar 3-9)
├── Mon: Outline "Colorize Military Photos"
├── Tue: Write "Colorize Military Photos"
├── Wed: Outline "Repair Torn Photos"
├── Thu: Write "Repair Torn Photos"
├── Fri: Publish "Colorize Military Photos"
└── Sat: Publish "Repair Torn Photos"

WEEK 7 (Mar 10-16)
├── Mon: Outline "Scanning Best Practices"
├── Tue: Write "Scanning Best Practices"
├── Wed: Outline "Desktop vs Mobile Apps"
├── Thu: Write "Desktop vs Mobile Apps"
├── Fri: Publish "Scanning Best Practices"
└── Sat: Publish "Desktop vs Mobile Apps"

WEEK 8 (Mar 17-23)
├── Mon: Outline "Common Colorization Mistakes"
├── Tue: Write "Common Colorization Mistakes"
├── Wed: Outline "Online vs Offline Tools"
├── Thu: Write "Online vs Offline Tools"
├── Fri: Publish "Common Colorization Mistakes"
└── Sat: Publish "Online vs Offline Tools"

WEEK 9 (Mar 24-30)
├── Mon: Outline "Face Enhancement Guide"
├── Tue: Write "Face Enhancement Guide"
├── Wed: Outline "Best Colorization Results"
├── Thu: Write "Best Colorization Results"
├── Fri: Publish "Face Enhancement Guide"
└── Sat: Publish "Best Colorization Results"

WEEK 10 (Mar 31 - Apr 6)
├── Mon: Outline "Upscale Old Photos"
├── Tue: Write "Upscale Old Photos"
├── Wed: Outline "Historical Color Accuracy"
├── Thu: Write "Historical Color Accuracy"
├── Fri: Publish "Upscale Old Photos"
└── Sat: Publish "Historical Color Accuracy"

WEEK 11 (Apr 7-13)
├── Mon: Outline "Photo Preservation Guide"
├── Tue: Write "Photo Preservation Guide"
├── Wed: Outline "Wedding Photo Colorization"
├── Thu: Write "Wedding Photo Colorization"
├── Fri: Publish "Photo Preservation Guide"
└── Sat: Publish "Wedding Photo Colorization"

WEEK 12 (Apr 14-20)
├── Mon: Outline "Memorial Photo Colorization"
├── Tue: Write "Memorial Photo Colorization"
├── Wed: Outline "Museums & Archives"
├── Thu: Write "Museums & Archives"
├── Fri: Publish "Memorial Photo Colorization"
└── Sat: Publish "Museums & Archives"

BEYOND WEEK 12:
├── Continue 2 articles/week
├── Update existing content monthly
├── Expand successful articles
└── Add new topic clusters as needed
```

---

### 10.2 Content Assignment Matrix

| Article | Pillar | Priority | Keywords | Word Count |
|---------|--------|----------|----------|------------|
| How AI Colorization Works | AI Colorization | HIGH | how does ai colorization work | 2,500 |
| Colorize Family Photos | Use Cases | HIGH | colorize old family photos | 2,200 |
| Free vs Paid Tools | Comparisons | HIGH | free photo colorization | 2,500 |
| Restore Faded Photos | Restoration | HIGH | restore faded photos ai | 2,200 |
| Genealogy Colorization | Use Cases | HIGH | genealogy photo colorization | 2,500 |
| Fix Scratched Photos | Restoration | MEDIUM | fix scratched photos | 2,000 |
| Colorize Military Photos | Use Cases | MEDIUM | colorize ww2 photos | 2,500 |
| Repair Torn Photos | Restoration | MEDIUM | repair torn photos | 2,000 |
| Scanning Best Practices | Restoration | MEDIUM | scan old photos | 2,500 |
| Desktop vs Mobile | Comparisons | MEDIUM | photo colorization software | 2,200 |
| Common Mistakes | AI Colorization | MEDIUM | colorization mistakes | 1,800 |
| Online vs Offline | Comparisons | MEDIUM | online photo colorizer | 2,000 |
| Face Enhancement | Restoration | MEDIUM | enhance faces old photos | 2,200 |
| Best Results Guide | AI Colorization | MEDIUM | best colorization results | 2,000 |
| Upscale Photos | Restoration | MEDIUM | upscale old photos 4k | 2,000 |
| Historical Accuracy | AI Colorization | MEDIUM | historically accurate colors | 2,500 |
| Preservation Guide | Restoration | LOW | preserve photos digitally | 2,500 |
| Wedding Photos | Use Cases | LOW | colorize wedding photos | 2,000 |
| Memorial Photos | Use Cases | LOW | memorial photo colorization | 1,800 |
| Museums & Archives | Use Cases | LOW | museum photo digitization | 2,000 |

---

## 11. MONITORING & KPI DASHBOARD

### 11.1 Weekly KPIs

```markdown
## Weekly SEO Report - Week of [Date]

### Traffic Metrics
| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Organic Sessions | ___ | ___ | ___% |
| Organic Users | ___ | ___ | ___% |
| Pages/Session | ___ | ___ | ___% |
| Avg. Session Duration | ___ | ___ | ___% |
| Bounce Rate | ___ | ___ | ___% |

### Content Metrics
| Metric | This Week | Target |
|--------|-----------|--------|
| Articles Published | ___ | 2 |
| Total Blog Posts | ___ | ___ |
| Avg. Time on Page (Blog) | ___ | >3 min |

### Technical Health
| Metric | Status |
|--------|--------|
| Core Web Vitals | Pass/Fail |
| Crawl Errors | ___ |
| Indexed Pages | ___ |
| Mobile Usability Issues | ___ |

### Rankings (Track Top 20 Keywords)
| Keyword | Position | Change |
|---------|----------|--------|
| ai photo colorization | ___ | ___ |
| colorize old photos | ___ | ___ |
| [etc.] | ___ | ___ |
```

---

### 11.2 Monthly KPIs

```markdown
## Monthly SEO Report - [Month Year]

### Traffic Summary
| Metric | This Month | Last Month | YoY |
|--------|------------|------------|-----|
| Organic Sessions | ___ | ___ | ___% |
| Organic Conversions | ___ | ___ | ___% |
| Waitlist Signups (Organic) | ___ | ___ | ___% |

### Content Summary
| Metric | Actual | Target |
|--------|--------|--------|
| Articles Published | ___ | 8 |
| Words Published | ___ | 18,000 |
| Pillar Updates | ___ | 4 |

### Authority Metrics
| Metric | Current | Last Month |
|--------|---------|------------|
| Domain Authority | ___ | ___ |
| Referring Domains | ___ | ___ |
| Backlinks Acquired | ___ | ___ |

### Indexation
| Metric | Count |
|--------|-------|
| Pages Submitted | ___ |
| Pages Indexed | ___ |
| Coverage Issues | ___ |

### Top Performing Content
| Page | Sessions | Avg. Position |
|------|----------|---------------|
| 1. ___ | ___ | ___ |
| 2. ___ | ___ | ___ |
| 3. ___ | ___ | ___ |

### Keyword Progress
| Cluster | Keywords in Top 10 | Keywords in Top 50 |
|---------|-------------------|-------------------|
| AI Colorization | ___ | ___ |
| Photo Restoration | ___ | ___ |
| Use Cases | ___ | ___ |
| Comparisons | ___ | ___ |
```

---

### 11.3 Tools for Monitoring

| Tool | Purpose | Frequency |
|------|---------|-----------|
| Google Search Console | Rankings, crawl errors, indexation | Daily |
| Google Analytics 4 | Traffic, behavior, conversions | Daily |
| Ahrefs/SEMrush | Backlinks, competitor analysis | Weekly |
| Screaming Frog | Technical audits | Monthly |
| PageSpeed Insights | Core Web Vitals | Weekly |
| Rank Tracker | Keyword positions | Daily |

---

## 12. TECHNICAL IMPLEMENTATION CODE

### 12.1 Complete Code Changes Summary

**Files to Modify:**

| File | Changes |
|------|---------|
| `app/blog/[slug]/page.tsx` | Fix OG image URLs |
| `app/layout.tsx` | Remove generator, add viewport |
| `components/blog/blog-schema.tsx` | Fix URLs, author link |
| `components/footer.tsx` | Dynamic copyright year |
| `lib/constants.ts` | NEW: Centralized config |
| `app/sitemap.ts` | Add category pages |
| `app/blog/category/[category]/page.tsx` | NEW: Category pages |
| `components/guides/guide-schema.tsx` | NEW: Pillar schema |
| `components/tools/tool-schema.tsx` | NEW: Tool schema |

**Files to Create:**

| File | Purpose |
|------|---------|
| `lib/constants.ts` | Site configuration |
| `lib/anchor-texts.ts` | Anchor text bank |
| `app/blog/category/[category]/page.tsx` | Category landing pages |
| `components/guides/guide-schema.tsx` | Pillar page schema |
| `components/tools/tool-schema.tsx` | Tool page schema |
| `public/favicon.ico` | Fallback favicon |

---

### 12.2 Implementation Script

```bash
#!/bin/bash
# SEO Implementation Script

echo "Starting SEO Implementation..."

# Phase 1: Create new files
echo "Creating lib/constants.ts..."
cat > lib/constants.ts << 'EOF'
export const SITE_CONFIG = {
  name: 'ColouriseAI',
  url: 'https://colorizeai.app',
  email: 'hello@colorizeai.app',
  social: {
    twitter: 'https://twitter.com/colouriseai',
    facebook: 'https://facebook.com/colouriseai',
    instagram: 'https://instagram.com/colouriseai',
    youtube: 'https://youtube.com/colouriseai',
  },
} as const

export const BASE_URL = SITE_CONFIG.url
EOF

echo "Creating category page structure..."
mkdir -p app/blog/category/\[category\]

echo "Implementation script complete!"
echo "Manual changes still required - see implementation plan."
```

---

## 13. CHECKLISTS & SOPs

### 13.1 Pre-Launch Checklist

```markdown
## Pre-Launch SEO Checklist

### Technical
- [ ] All pages return 200 status
- [ ] SSL certificate valid
- [ ] www/non-www redirect configured
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible and valid
- [ ] No noindex on important pages
- [ ] Canonical URLs set correctly
- [ ] 404 page exists and is helpful

### On-Page
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] All images have alt text
- [ ] Heading hierarchy correct (one H1 per page)
- [ ] Internal links working
- [ ] External links open in new tab

### Schema
- [ ] Homepage schema valid
- [ ] Blog post schema valid
- [ ] Organization schema present
- [ ] No schema errors in GSC

### Performance
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Mobile-friendly test passes
```

---

### 13.2 New Article Publishing SOP

```markdown
## SOP: Publishing a New Blog Article

### Pre-Writing (30 min)
1. Research keyword in Ahrefs/SEMrush
2. Analyze top 5 SERP results
3. Create outline with H2/H3 structure
4. Identify internal linking opportunities
5. Select/create featured image

### Writing (2-3 hours)
1. Write to outline
2. Include primary keyword in:
   - Title (H1)
   - First 100 words
   - At least one H2
   - Meta description
3. Add internal links as you write
4. Include FAQ section (5-7 questions)

### Post-Writing (30 min)
1. Proofread and edit
2. Add remaining internal links (target: 10-12)
3. Add external links (2-3)
4. Optimize images (compress, rename, alt text)
5. Write meta description (150-160 chars)

### Technical Setup (15 min)
1. Add to lib/blog-data.ts
2. Add featured image to /public/blog/
3. Update relatedPosts on linked articles
4. Verify schema in Rich Results Test

### Publishing (10 min)
1. Deploy to production
2. Verify page loads correctly
3. Test all links
4. Submit URL to GSC for indexing

### Post-Publishing (15 min)
1. Share on social media
2. Update pillar page with new link
3. Log in content tracker
4. Schedule internal link additions to old posts
```

---

### 13.3 Monthly SEO Audit SOP

```markdown
## SOP: Monthly SEO Audit

### Week 1: Technical Audit
1. Run Screaming Frog crawl
2. Check for:
   - Broken links (404s)
   - Redirect chains
   - Missing meta tags
   - Duplicate content
   - Orphan pages
3. Document issues in tracker
4. Prioritize and assign fixes

### Week 2: Content Audit
1. Review traffic by page
2. Identify:
   - Declining pages (update needed)
   - High-bounce pages (improve content)
   - Underperforming keywords (optimize)
3. Schedule content updates
4. Plan new content for gaps

### Week 3: Backlink Audit
1. Check new backlinks in Ahrefs
2. Disavow toxic links (if any)
3. Identify link building opportunities
4. Update outreach tracker
5. Plan next month's outreach

### Week 4: Competitor Analysis
1. Check competitor rankings
2. Identify new competitor content
3. Find content gaps to fill
4. Update keyword targets
5. Adjust strategy as needed
```

---

## APPENDIX A: KEYWORD TARGET LIST

| Keyword | Volume | Difficulty | Current Rank | Target Page |
|---------|--------|------------|--------------|-------------|
| ai photo colorization | 8,100 | Medium | - | Homepage |
| colorize old photos | 5,400 | Low | - | /guides/ai-photo-colorization |
| photo colorization app | 3,600 | Medium | - | Homepage |
| colorize black and white photos | 2,900 | Low | - | /blog/complete-guide |
| restore old photos | 2,400 | Medium | - | /guides/photo-restoration |
| colorize photos free | 2,400 | Medium | - | /blog/free-vs-paid |
| ai photo restoration | 1,900 | Medium | - | /guides/photo-restoration |
| colorize family photos | 1,600 | Low | - | /blog/colorize-family-photos |
| best photo colorization app | 1,300 | Medium | - | /blog/best-apps |
| how to colorize old photos | 1,000 | Low | - | /blog/step-by-step |

---

## APPENDIX B: INTERNAL LINKING MAP

```
HOMEPAGE
├── → /guides (nav)
├── → /tools (nav)
├── → /blog (nav)
├── → /guides/ai-photo-colorization (featured)
├── → /blog/complete-guide (featured)
├── → /tools/historical-color-palette (featured)
└── → /waitlist (CTA)

/GUIDES
├── → /guides/ai-photo-colorization
├── → /guides/photo-restoration
├── → /guides/use-cases
├── → /guides/comparisons
└── → /blog (related)

/GUIDES/AI-PHOTO-COLORIZATION
├── → /blog/complete-guide
├── → /blog/step-by-step
├── → /blog/color-theory
├── → /blog/advanced-techniques
├── → /blog/how-ai-works (future)
├── → /blog/common-mistakes (future)
├── → /tools/historical-color-palette
├── → /guides/photo-restoration (related)
└── → /guides/use-cases (related)

/BLOG/COMPLETE-GUIDE
├── → /guides/ai-photo-colorization (pillar)
├── → /blog/step-by-step (sibling)
├── → /blog/color-theory (sibling)
├── → /blog/best-apps (sibling)
├── → /tools/historical-color-palette (tool)
└── → /waitlist (CTA)
```

---

## APPENDIX C: PROGRESS TRACKER

```markdown
## Implementation Progress

### Phase 1: Technical Fixes
- [ ] 2.1 Fix OG image URLs
- [ ] 2.2 Fix schema URLs
- [ ] 2.3 Fix author URL
- [ ] 2.4 Dynamic copyright
- [ ] 2.5 Add favicon.ico
- [ ] 2.6 Remove generator tag
- [ ] 2.7 Add viewport meta
- [ ] 2.8 Create constants file
**Status: 0/8 complete**

### Phase 2: On-Page Optimization
- [ ] 3.1a Expand AI Colorization pillar
- [ ] 3.1b Expand Photo Restoration pillar
- [ ] 3.1c Expand Use Cases pillar
- [ ] 3.1d Expand Comparisons pillar
- [ ] 3.3 Create category pages
- [ ] 3.4 Add updatedAt dates
- [ ] 3.5 Complete alt text audit
**Status: 0/7 complete**

### Phase 3: Content Expansion
- [ ] Week 3: 2 articles
- [ ] Week 4: 2 articles
- [ ] Week 5: 2 articles
- [ ] Week 6: 2 articles
- [ ] Week 7: 2 articles
- [ ] Week 8: 2 articles
- [ ] Week 9: 2 articles
- [ ] Week 10: 2 articles
- [ ] Week 11: 2 articles
- [ ] Week 12: 2 articles
**Status: 0/20 articles published**

### Phase 4: Topical Authority
- [ ] Entity optimization complete
- [ ] All clusters defined
- [ ] Cross-pillar linking done
- [ ] E-E-A-T signals added
**Status: 0/4 complete**

### Phase 5: Internal Linking
- [ ] Link audit complete
- [ ] All pages meet link targets
- [ ] Anchor text optimized
- [ ] No orphan pages
**Status: 0/4 complete**

### Phase 6: Schema Enhancement
- [ ] Pillar schemas added
- [ ] Tool schemas added
- [ ] About schema added
- [ ] All schemas validated
**Status: 0/4 complete**

### Phase 7: Performance
- [ ] CWV audit complete
- [ ] All pages pass CWV
- [ ] Lazy loading implemented
- [ ] Resource hints added
**Status: 0/4 complete**

### Phase 8: Link Building
- [ ] Guest post pipeline active
- [ ] HARO responses ongoing
- [ ] Resource outreach started
- [ ] 10+ links acquired
**Status: 0/4 complete**
```

---

**Document End**

*This implementation plan should be reviewed weekly and updated as tasks are completed. Adjust timelines and priorities based on results and resource availability.*

---

**Prepared by:** Claude (AI Assistant)
**For:** ColouriseAI
**Date:** February 2026
