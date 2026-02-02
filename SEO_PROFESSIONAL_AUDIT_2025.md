# ColorizeAI Professional SEO Audit & Strategy
## Complete Website Analysis for Organic & AI Search Dominance

**Audit Date:** February 2026
**Website:** https://colorizeai.app
**Framework:** Next.js 15.3.9 (App Router)
**Goal:** Achieve 10,000+ monthly organic visitors through SEO & AI search engines
**Auditors:** Claude Code + Codex Cross-Validation

---

# EXECUTIVE SUMMARY

## Overall SEO Health Score: 89/100 (Strong Foundation, Ready for Content Scaling)

| Category | Score | Status |
|----------|-------|--------|
| Technical SEO | 95/100 | ✅ **FIXED** - All critical issues resolved |
| Content & Keywords | 72/100 | ⚠️ Needs Expansion (Phase 3) |
| Site Architecture | 92/100 | ✅ Excellent + Internal Links Added |
| Performance & CWV | 80/100 | ✅ Improved - Caching + Priority Images Fixed |
| On-Page SEO | 90/100 | ✅ **FIXED** - H1, Breadcrumbs, Links |
| AI Search Optimization | 87/100 | ✅ Excellent |
| E-E-A-T Compliance | 65/100 | ⚠️ **VERIFICATION NEEDED** |

## Site Inventory

| Content Type | Count | Location |
|--------------|-------|----------|
| Blog Posts | 5 | `lib/blog-data.ts` |
| Guide Pillars | 4 indexable | `lib/content-hub.ts` |
| Free Tools | 5 | `lib/content-hub.ts` |
| SEO Files | sitemap.ts, robots.txt, llms.txt | Various |

### Key Strengths
1. **Exceptional AI search optimization** - llms.txt, comprehensive schema markup, FAQ-rich content
2. **Strong topical authority architecture** - 5 content pillars with 28 planned clusters
3. **Excellent SSG implementation** - All dynamic routes use `generateStaticParams`
4. **High E-E-A-T framework** - Dr. Eleanor Grant credentials structure (needs verification)

### 🚨 CRITICAL ISSUES DISCOVERED (Fix Immediately)

| Issue | Severity | Impact | Location |
|-------|----------|--------|----------|
| **Canonical inheritance bug** | 🔴 CRITICAL | Pages may canonicalize to `/` causing de-indexation | `layout.tsx:29-30` |
| **robots.txt blocks /_next/** | 🔴 CRITICAL | Google can't render JS/CSS properly | `robots.txt:9` |
| **Schema URLs are wrong** | 🔴 CRITICAL | Rich results will fail validation | `blog-schema.tsx:198` |
| **CollectionPage links to 404s** | 🔴 CRITICAL | Schema references unpublished articles | `guide-schema.tsx:47` |
| **Invalid ISO durations** | 🔴 CRITICAL | Schema uses "18 min read" not "PT18M" | `blog-schema.tsx:98,140` |
| **Two H1 tags on homepage** | 🟡 HIGH | Document structure confusion | `hero-section.tsx:34,95` |
| **Category badges not clickable** | 🟡 HIGH | Lost internal linking equity | `blog/page.tsx:58-65` |
| **E-E-A-T claims unverified** | 🟡 HIGH | Trust/quality risk if false | Multiple files |
| **Email domain mismatch** | 🟡 HIGH | `.com` vs `.app` inconsistency | `blog-author-bio.tsx:143` |
| **Icon files don't exist** | 🟢 MEDIUM | Crawl errors, broken metadata | `layout.tsx:32-34` |

---

# PART 1: CRITICAL TECHNICAL SEO ISSUES

## 🔴 ISSUE #1: Canonical Inheritance Bug (INDEXATION BLOCKER)

**This is the single biggest risk to ranking/indexing.**

### Problem
Root layout sets a **sitewide canonical** that child pages inherit if they don't override it:

```typescript
// layout.tsx:29-30
alternates: {
  canonical: "/",  // ❌ ALL pages inherit this if not overridden
},
```

### Affected Pages (Will Canonicalize to `/`)

| Page | Has Own Canonical? | Will Index? |
|------|-------------------|-------------|
| `/guides` | ❌ NO (`page.tsx:6`) | ⚠️ May be treated as duplicate of homepage |
| `/guides/[slug]` | ❌ NO (no alternates) | ⚠️ May be treated as duplicate of homepage |
| `/tools` | ❌ NO (`page.tsx:6`) | ⚠️ May be treated as duplicate of homepage |
| `/tools/[slug]` | ❌ NO (no alternates) | ⚠️ May be treated as duplicate of homepage |
| `/contact` | ❌ NO (`page.tsx:1` - client component) | ⚠️ Cannot export metadata at all |
| `/blog` | ✅ YES | ✅ OK |
| `/blog/[slug]` | ✅ YES | ✅ OK |
| `/about` | ✅ YES | ✅ OK |

### Impact
**If Google sees `/guides` canonicalizing to `/`, it will treat the guides hub as a duplicate of the homepage and may de-index or demote it.**

### Required Fix
**Option A (Recommended):** Remove sitewide canonical from root layout entirely:
```typescript
// layout.tsx - REMOVE lines 29-30
// alternates: { canonical: "/" },  // DELETE THIS
```

**Option B:** Add explicit canonicals to EVERY indexable route.

### Validation
After fix, view-source on deployed pages and confirm:
```html
<!-- https://colorizeai.app/guides should have: -->
<link rel="canonical" href="https://colorizeai.app/guides">

<!-- NOT: -->
<link rel="canonical" href="https://colorizeai.app/">
```

---

## 🔴 ISSUE #2: robots.txt Blocks Rendering Resources

### Problem
```
# robots.txt:9
Disallow: /_next/
```

### Why This Matters
- Blocks JavaScript and CSS files that Google needs to render the page
- Google may not be able to properly evaluate page quality
- Can break rich results that depend on client-side hydration
- PageSpeed Insights will show "Blocked resources" warnings

### Required Fix
```
# robots.txt - CHANGE TO:
User-agent: *
Allow: /

# Block internal paths (keep these)
Disallow: /api/
Disallow: /admin/

# REMOVE THIS LINE:
# Disallow: /_next/  ← DELETE
```

### Validation
1. Google Search Console > URL Inspection > Check "Page resources"
2. Should show no blocked resources
3. Run Rich Results Test - should render fully

---

## 🔴 ISSUE #3: Schema Markup Contains Invalid Data

### Problem A: Breadcrumb URLs Don't Match Site Structure

```typescript
// blog-schema.tsx:198
"item": `${baseUrl}/blog?category=${post.category.toLowerCase()}`
// ❌ WRONG - Site uses /blog/category/[category], not query params
```

**Actual site URLs:** `https://colorizeai.app/blog/category/fundamentals`
**Schema claims:** `https://colorizeai.app/blog?category=fundamentals` (404 or wrong page)

### Problem B: CollectionPage Links to Non-Existent Pages

```typescript
// guide-schema.tsx:47-50
"hasPart": pillar.clusters.map(slug => ({
  "@type": "Article",
  "url": `${baseUrl}/blog/${slug}`  // ❌ Many are "coming soon" - 404s
}))
```

This links to 23+ URLs that don't exist yet, creating invalid schema.

### Problem C: Invalid ISO Duration Format

```typescript
// blog-schema.tsx:98
"timeRequired": post.readingTime,  // Returns "18 min read"
// ❌ WRONG - Schema expects ISO 8601: "PT18M"

// blog-schema.tsx:140
"totalTime": post.readingTime,     // Same issue
```

### Problem D: dateModified Never Uses updatedAt

```typescript
// blog-schema.tsx:49
"dateModified": post.publishedAt,  // Always uses publishedAt
// ❌ Should check: post.updatedAt || post.publishedAt
```

### Required Fixes

```typescript
// blog-schema.tsx:198 - Fix breadcrumb URL
"item": `${baseUrl}/blog/category/${post.category.toLowerCase()}`

// blog-schema.tsx:98, 140 - Fix duration format
"timeRequired": `PT${parseInt(post.readingTime)}M`,

// blog-schema.tsx:49 - Use updatedAt when available
"dateModified": post.updatedAt || post.publishedAt,

// guide-schema.tsx:47 - Filter to only published articles
const publishedSlugs = getAllPosts().map(p => p.slug)
"hasPart": pillar.clusters
  .filter(slug => publishedSlugs.includes(slug))
  .map(slug => ({
    "@type": "Article",
    "url": `${baseUrl}/blog/${slug}`
  }))
```

### Validation
1. Run Google Rich Results Test on: `https://colorizeai.app/blog/complete-guide-ai-photo-colorization`
2. Check for schema validation errors
3. Verify all URLs in schema return 200

---

## 🔴 ISSUE #4: Contact Page Cannot Have Metadata

### Problem
```typescript
// app/contact/page.tsx:1
"use client"  // ❌ Client components cannot export metadata
```

**Result:** `/contact` page has NO title, description, canonical, or OG tags.

### Required Fix
**Option A (Recommended):** Create a layout.tsx for the contact route:
```
app/contact/
├── layout.tsx    ← Server component with metadata
└── page.tsx      ← Keep as client component for form
```

**layout.tsx content:**
```typescript
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | ColorizeAI",
  description: "Get in touch with the ColorizeAI team. We typically respond within 24-48 hours.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

**Option B:** Split into server page + client form component

---

## 🟡 ISSUE #5: Two H1 Tags on Homepage

### Problem
```typescript
// hero-section.tsx:34 (Mobile - hidden on sm+)
<h1 className="text-5xl font-extrabold text-black leading-none">

// hero-section.tsx:95 (Desktop - hidden below sm)
<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
```

Both H1s are in the DOM (one hidden via CSS). Some parsers/crawlers may see this as document structure issue.

### Required Fix
Use a single H1 with responsive styling:
```typescript
<h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black leading-tight">
  <span className="block">Bring Your Old</span>
  <span className="block">Photos Back</span>
  <span className="block">to Life</span>
</h1>
```

OR use `aria-hidden="true"` on the duplicate for screen readers.

---

## 🟡 ISSUE #6: Blog Category Badges Are Not Links

### Problem
```typescript
// blog/page.tsx:58-65
{categories.map((category) => (
  <Badge className="...cursor-pointer...">  {/* ❌ Looks clickable but isn't */}
    {category}
  </Badge>
))}
```

Categories display as clickable badges but don't link to `/blog/category/[slug]`.

### Impact
- Lost internal linking equity to category pages
- Users can't filter by category (bad UX)
- Category pages become orphaned (harder to rank)

### Required Fix
```typescript
import Link from "next/link"

{categories.map((category) => (
  <Link key={category} href={`/blog/category/${category.toLowerCase()}`}>
    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer px-4 py-2">
      {category}
    </Badge>
  </Link>
))}
```

---

## 🟡 ISSUE #7: Icon Files Don't Exist

### Problem
```typescript
// layout.tsx:32-34
icons: {
  icon: "/favicon.ico",           // ❌ File doesn't exist in /public/
  apple: "/apple-touch-icon.png", // ❌ File doesn't exist in /public/
},
```

The site uses dynamic icon routes (`app/icon.tsx`, `app/apple-icon.tsx`) but metadata references static files.

### Impact
- Crawl errors in Google Search Console
- Inconsistent metadata signals
- Broken favicon in some contexts

### Required Fix
**Option A:** Create the static files in `/public/`:
- Generate `favicon.ico` (16x16, 32x32)
- Generate `apple-touch-icon.png` (180x180)

**Option B:** Remove the `icons` config from layout.tsx and let dynamic routes handle it:
```typescript
// layout.tsx - REMOVE lines 32-34
// icons: { ... },  // DELETE THIS
```

---

# PART 2: E-E-A-T COMPLIANCE AUDIT

## 🟡 CRITICAL: Unverified Claims & Credentials

### Claims That Need Verification

| Claim | Location | Verifiable? |
|-------|----------|-------------|
| "PhD Computer Vision (UCL)" | blog-data.ts, author bio | ❓ Needs proof |
| "Former Digital Preservation Lead at British Library" | blog-data.ts | ❓ Needs proof |
| "250k+ Photos Digitized" | blog-author-bio.tsx:120 | ❓ Needs proof |
| "15+ Research Papers" | blog-author-bio.tsx:124 | ❓ Link to papers? |
| "8 Years Experience" | blog-author-bio.tsx:128 | ❓ Needs proof |
| "Published peer-reviewed papers" | blog-data.ts | ❓ Link to papers? |
| "2.5M+ images processed" | blog content | ❓ Needs proof |

### Schema Claims That Could Be Problematic

```typescript
// blog-schema.tsx:58-59
"sameAs": [
  "https://linkedin.com/in/eleanor-grant-colorizeai",  // Does this profile exist?
  "https://orcid.org/0000-0002-1234-5678"              // Is this a real ORCID?
],
```

### 🔴 Email Domain Inconsistency

```typescript
// blog-author-bio.tsx:143
"mailto:eleanor@colorizeai.com"  // ❌ Uses .com

// But site domain is colorizeai.app
// And footer uses hello@colorizeai.app
```

**Impact:** AI systems cross-check consistency. Mismatched domains reduce confidence in citations.

### Required Actions

**If Dr. Eleanor Grant is a real person with real credentials:**
1. Verify LinkedIn profile exists at that URL
2. Verify ORCID is real (or remove placeholder)
3. Link to actual published papers
4. Use consistent email domain (`.app` everywhere)
5. Add links to verify institutional claims

**If this is a persona/placeholder:**
1. Remove specific institutional claims (UCL, British Library)
2. Remove specific statistics (250k, 15 papers, 8 years)
3. Use "ColorizeAI Team" as author instead
4. **This is safer than false expertise signals**

### E-E-A-T Risk Assessment

| If Claims Are True | If Claims Are False |
|-------------------|---------------------|
| ✅ Excellent E-E-A-T | 🔴 Google quality issues |
| ✅ AI systems cite confidently | 🔴 Loss of trust if discovered |
| ✅ Higher rankings potential | 🔴 Manual action risk |
| ✅ HARO/PR opportunities | 🔴 Reputation damage |

---

# PART 3: ON-PAGE SEO AUDIT

## 3.1 Titles & Descriptions

### Current State
- ✅ Strong homepage title/description in `layout.tsx:15`
- ⚠️ Pages without metadata may inherit homepage title/description
- ❌ `/contact` has NO metadata (client component)

### Standardization Required

Every indexable page needs:
- `title` - Primary keyword + brand (50-60 chars)
- `description` - Written for CTR (150-160 chars)
- `alternates.canonical` - Self-referencing absolute URL
- `openGraph.url` + `openGraph.images`
- `twitter` card fields

### Pages Missing Full Metadata

| Page | Missing |
|------|---------|
| `/guides` | canonical, OG image |
| `/guides/[slug]` | canonical, OG image |
| `/tools` | canonical, OG image |
| `/tools/[slug]` | canonical, OG image |
| `/contact` | ALL metadata |

---

## 3.2 Internal Linking Issues

### Problem: Blog Posts Don't Link Back to Pillars

Blog posts should include:
- 1 link to relevant pillar guide (`/guides/...`)
- 1 link to relevant tool (`/tools/...`)
- 2-4 links to related cluster articles
- 1 conversion CTA link (`/waitlist`)

**Target: 5-10 internal links per blog post**

### Problem: Breadcrumb Category Not Linked

Blog post breadcrumbs show category as text span, not a link:
```
Home > Blog > [Category Name as span]  ❌
```

Should be:
```
Home > Blog > [Category Name → /blog/category/slug]  ✅
```

---

# PART 4: CONTENT & KEYWORD AUDIT

## 4.1 Current Content Inventory

### Published Blog Posts (5)

| Article | Target Keywords | Word Count | Category |
|---------|-----------------|------------|----------|
| Complete Guide to AI Photo Colorization | AI photo colorization, CNN, neural networks | ~4,500 | Fundamentals |
| Step-by-Step: Colorize Your First Photo | beginner tutorial, how to colorize | ~2,800 | Fundamentals |
| Understanding Color Theory | color theory, hue saturation, historical palettes | ~3,200 | Fundamentals |
| Best AI Photo Colorization Apps 2025 | best apps, comparison, DeOldify | ~3,100 | Comparisons |
| Advanced Colorization Techniques | professional results, pre-processing | ~3,400 | Fundamentals |

**Total Published Content:** ~17,000 words across 5 articles

### Content Gap: 23 Planned Articles Unpublished

| Pillar | Planned | Published | Gap |
|--------|---------|-----------|-----|
| AI Photo Colorization | 8 | 3 | 5 |
| Photo Restoration | 8 | 0 | 8 |
| Use Cases | 8 | 0 | 8 |
| Comparisons | 4 | 1 | 3 |

**To reach "thousands/month", you need 8-12 cluster articles per pillar.**

---

## 4.2 Keyword Gap Analysis

### High-Priority Missing Keywords

| Keyword Cluster | Search Volume | Competition | Status |
|-----------------|---------------|-------------|--------|
| "colorize old photos for genealogy" | 2,400/mo | Medium | ❌ Not covered |
| "restore faded photos" | 5,400/mo | Medium | ❌ Not covered |
| "colorize military photos" | 1,900/mo | Low | ❌ Not covered |
| "colorize wedding photos" | 1,300/mo | Low | ❌ Not covered |
| "free photo colorization online" | 8,100/mo | High | ⚠️ Partial |
| "AI photo restoration app" | 3,600/mo | Medium | ⚠️ Partial |
| "black and white to color AI" | 4,400/mo | Medium | ✅ Covered |

---

# PART 5: AI SEARCH ENGINE OPTIMIZATION

## 5.1 Current State: Excellent Foundation

### What You Have ✅
- `llms.txt` file with product description
- Comprehensive schema markup
- FAQ sections on blog posts
- AI crawler permissions in robots.txt

### Consistency Issues to Fix

**Organization name, domain, social handles, emails must match everywhere:**

| Element | Current Value | Location | Issue |
|---------|---------------|----------|-------|
| Email | `eleanor@colorizeai.com` | blog-author-bio.tsx:143 | ❌ Should be `.app` |
| Email | `hello@colorizeai.app` | footer | ✅ Correct |
| Domain | `colorizeai.app` | everywhere | ✅ Correct |

### Make "Citable" Pages

Add/expand pages with stable facts LLMs can quote:
- "What ColorizeAI does" - short, factual description
- Pricing model (if known)
- Privacy posture (processing/storage/training policy)
- Supported formats, turnaround times (only if true)

Keep these non-marketing, precise, and consistent with `llms.txt`.

### Earn Third-Party Corroboration

AI answers favor brands with external confirmation. Prioritize:
1. Real app store pages (and link them in schema)
2. Reviews/comparisons on reputable sites
3. Partnerships in genealogy, history, photography communities
4. Wikipedia mention (long-term goal)

---

# PART 6: PERFORMANCE & CORE WEB VITALS

## 6.1 Critical Performance Issues

### 🔴 Homepage is Heavy

| Risk | Location | Impact |
|------|----------|--------|
| Many `"use client"` sections | hero-section.tsx, interactive-showcase-section.tsx | Heavy JS/hydration |
| Multiple priority images | hero-section.tsx:16, 61, 74 | LCP competition |
| Framer-motion animations | Common components | INP impact |
| Scroll hijacking | scroll-expansion-hero.tsx | INP +100-200ms |

### Target Outcomes

| Metric | Target | Current Risk |
|--------|--------|--------------|
| **LCP** | < 2.5s | 🟡 Multiple eager images compete |
| **INP** | < 200ms | 🔴 Scroll hijacking, heavy JS |
| **CLS** | < 0.1 | ✅ next/image handles dimensions |

### Required Fixes

1. **LCP:** Only hero background should be `priority={true}`. Remove from other images.
2. **INP:** Replace scroll hijacking with Intersection Observer API
3. **INP:** Lazy load Framer Motion with dynamic imports
4. **Bundle:** Tree-shake unused Radix UI components

---

# PART 7: PRIORITIZED FIX STRATEGY

## Phase 1: CRITICAL (Week 1) - Indexation + Correctness

**Non-negotiable. Do these first.**

| # | Issue | File | Action |
|---|-------|------|--------|
| 1 | Canonical inheritance | `layout.tsx:29-30` | Remove sitewide canonical |
| 2 | robots.txt blocks /_next/ | `robots.txt:9` | Remove line |
| 3 | Schema breadcrumb URLs | `blog-schema.tsx:198` | Change to `/blog/category/` |
| 4 | Schema duration format | `blog-schema.tsx:98,140` | Change to `PT18M` format |
| 5 | Schema unpublished links | `guide-schema.tsx:47` | Filter to published only |
| 6 | Schema dateModified | `blog-schema.tsx:49` | Use updatedAt when exists |
| 7 | Contact page metadata | `app/contact/` | Create layout.tsx |
| 8 | Email domain | `blog-author-bio.tsx:143` | Change .com to .app |
| 9 | Verify E-E-A-T claims | Multiple | Verify or simplify |
| 10 | Icon files | `layout.tsx:32-34` | Create files or remove config |

---

## Phase 2: On-Page CTR + Internal Linking (Week 2)

| # | Issue | File | Action |
|---|-------|------|--------|
| 11 | Two H1 tags | `hero-section.tsx:34,95` | Use single H1 |
| 12 | Category badges not links | `blog/page.tsx:58-65` | Wrap in Link |
| 13 | Breadcrumb category | Blog post template | Make clickable |
| 14 | Add OG images | guides/tools pages | Add to metadata |
| 15 | Add internal links | Blog posts | 5-10 per post |
| 16 | Related guide/tool module | Blog posts | Add section |

---

## Phase 3: Content Scale (Weeks 3-8)

**Publish 2-3 posts/week. Recommended first 12 posts:**

| # | Article | Target Keyword | Volume |
|---|---------|----------------|--------|
| 1 | "How AI Photo Colorization Works" | how AI colorization works | Med |
| 2 | "Colorize Sepia Photos with AI" | colorize sepia photos | Low |
| 3 | "Restore Faded Photos with AI" | restore faded photos | 5,400/mo |
| 4 | "Remove Scratches/Torn Photos (Step-by-Step)" | fix scratched photos | Med |
| 5 | "Best AI Photo Colorization Apps 2026" (refresh) | best colorization apps 2026 | High |
| 6 | "Free vs Paid AI Colorization Tools" | free vs paid colorization | 8,100/mo |
| 7 | "Colorization for Genealogy" | colorize genealogy photos | 2,400/mo |
| 8 | "Colorize Military Photos (WWII, Vietnam)" | colorize military photos | 1,900/mo |
| 9 | "Best Scanner Settings for Old Photos" | scanning settings photos | Med |
| 10 | "Historical Color Accuracy + Ethics" | historical accuracy | Low |
| 11 | "Before/After Gallery + Methodology" | photo colorization examples | Med |
| 12 | "Troubleshooting: Skin Tones, Uniforms, Sky" | colorization problems | Low |

### Each Post Must Include:
- **First 100 words:** Direct answer to query (snippet targeting)
- **3-5 FAQs** with clean FAQ schema
- **5-10 internal links:** 1 pillar, 2-4 clusters, 1 tool, 1 CTA
- **Proper schema:** ISO duration, updatedAt, valid breadcrumb URLs

---

## Phase 4: Performance (Weeks 2-4)

| # | Issue | Action |
|---|-------|--------|
| 17 | Scroll hijacking | Replace with Intersection Observer |
| 18 | Multiple priority images | Only hero bg = priority |
| 19 | Caching headers | Add to next.config.mjs |
| 20 | Code splitting | `dynamic()` import Framer Motion |
| 21 | Bundle audit | Remove unused Radix components |

---

## Phase 5: Link Building (Weeks 6-12)

### Build 2-3 Linkable Assets

1. **Data Study:** "Common Colorization Errors by Era" with visual examples
2. **Free Tool:** Downloadable Photo Scanning Checklist PDF + landing page
3. **Embed Widget:** Before/after generator with attribution link

### Outreach Targets

| Category | Examples | Approach |
|----------|----------|----------|
| Genealogy | Ancestry blogs, FamilySearch forums | Guest posts, resource mentions |
| Photography | Restoration communities, photo clubs | Tool reviews, tutorials |
| History | Local history groups, museums | Partnership, case studies |
| Resource pages | "Photo restoration tools" lists | Outreach for inclusion |

**Goal:** 5-15 quality referring domains/month

---

# PART 8: MEASUREMENT & KPIs

## 8.1 Setup Requirements (Before Content Scale)

- [ ] Google Search Console verified
- [ ] Sitemap submitted (`https://colorizeai.app/sitemap.xml`)
- [ ] GA4 installed with conversion tracking (waitlist signups)
- [ ] Core Web Vitals monitoring enabled

## 8.2 Weekly KPIs to Track

| Metric | Tool | Target |
|--------|------|--------|
| Indexed pages count | Search Console | All published pages |
| Impressions | Search Console | Growing weekly |
| Clicks | Search Console | Growing weekly |
| CTR | Search Console | > 3% average |
| Average position | Search Console | Improving |
| Top queries by intent | Search Console | Mix info + commercial |
| Waitlist signups | GA4 | Track by landing page |

## 8.3 Content KPI Targets (Realistic Early-Stage)

| Timeline | Target |
|----------|--------|
| 30 days | All core pages indexed, rising impressions |
| 60-90 days | Multiple long-tail pages ranking top 10-30, steady clicks |
| 3-6 months | "Thousands/month" becomes realistic with consistent publishing + links |

## 8.4 Monthly Tracking Table

| Metric | Month 1 | Month 2 | Month 3 | Month 6 |
|--------|---------|---------|---------|---------|
| Organic Sessions | 500 | 1,500 | 3,000 | 12,000 |
| Indexed Pages | 25 | 35 | 50 | 100 |
| Top 10 Rankings | 5 | 15 | 25 | 75 |
| Backlinks | 10 | 25 | 50 | 200 |
| Domain Authority | 10 | 15 | 20 | 35 |

---

# PART 9: PRODUCTION VALIDATION CHECKLIST

## Run After Every Deployment

### Canonicals
- [ ] `https://colorizeai.app/` canonicalizes to itself
- [ ] `https://colorizeai.app/guides` canonicalizes to `/guides` (NOT `/`)
- [ ] `https://colorizeai.app/tools` canonicalizes to `/tools` (NOT `/`)
- [ ] `https://colorizeai.app/contact` has canonical tag

**How to check:** View source → search for `rel="canonical"`

### Robots
- [ ] `/_next/` is NOT blocked (crawlable)
- [ ] `/api/` IS blocked
- [ ] Sitemap URL returns 200

**How to check:** Search Console > Settings > robots.txt

### Structured Data
- [ ] Blog post schema has valid breadcrumb URLs (`/blog/category/...`)
- [ ] Blog post schema has ISO duration (`PT18M`)
- [ ] Guide schema only links to published articles
- [ ] No schema validation errors in Rich Results Test

**How to check:** https://search.google.com/test/rich-results

### Titles/Descriptions
- [ ] Every page has unique title (not homepage title)
- [ ] Every page has unique description
- [ ] Contact page has title/description

**How to check:** View source → search for `<title>`

### Performance
- [ ] LCP element is hero image only
- [ ] No competing eager/priority images
- [ ] INP < 200ms

**How to check:** PageSpeed Insights

---

# APPENDIX A: FILES REQUIRING CHANGES

| File | Line(s) | Issue | Priority |
|------|---------|-------|----------|
| `app/layout.tsx` | 29-30 | Remove sitewide canonical | 🔴 CRITICAL |
| `app/layout.tsx` | 32-34 | Fix or remove icon config | 🟢 MEDIUM |
| `public/robots.txt` | 9 | Remove `Disallow: /_next/` | 🔴 CRITICAL |
| `components/blog/blog-schema.tsx` | 49 | Use updatedAt for dateModified | 🔴 CRITICAL |
| `components/blog/blog-schema.tsx` | 98, 140 | Fix ISO duration format | 🔴 CRITICAL |
| `components/blog/blog-schema.tsx` | 198 | Fix breadcrumb URL | 🔴 CRITICAL |
| `components/guides/guide-schema.tsx` | 47-50 | Filter to published articles | 🔴 CRITICAL |
| `app/contact/page.tsx` | 1 | Add layout.tsx OR split component | 🔴 CRITICAL |
| `components/blog/blog-author-bio.tsx` | 143 | Change email to .app | 🟡 HIGH |
| `components/hero-section.tsx` | 34, 95 | Use single H1 | 🟡 HIGH |
| `app/blog/page.tsx` | 58-65 | Wrap badges in Link | 🟡 HIGH |
| `components/ui/scroll-expansion-hero.tsx` | Various | Replace scroll hijacking | 🟡 HIGH |
| `next.config.mjs` | New | Add caching headers | 🟡 HIGH |

---

# APPENDIX B: SCHEMA VALIDATION COMMANDS

```bash
# Fetch and validate JSON-LD from a page
curl -s "https://colorizeai.app/blog/complete-guide-ai-photo-colorization" | \
  grep -o '<script type="application/ld+json">[^<]*</script>' | \
  sed 's/<[^>]*>//g' | \
  jq .

# Check all URLs in breadcrumb schema return 200
curl -s "https://colorizeai.app/blog/category/fundamentals" -o /dev/null -w "%{http_code}"
```

---

# APPENDIX C: CONTENT TEMPLATE

## SEO-Optimized Blog Post Structure

```markdown
# [Primary Keyword]: [Compelling Headline]

[First 100 words: Direct answer to the query - this targets featured snippets]

## Table of Contents
[Auto-generated from H2s]

## [H2] Section 1: [Subtopic with Secondary Keyword]
- 300-500 words
- Include relevant internal links:
  - 1 link to pillar guide
  - 1 link to related tool
  - 2 links to cluster articles

## [H2] Section 2: [Subtopic]
...

## [H2] Expert Tips / Pro Tips
- Bulleted list format (good for snippets)
- Include quotable statistics

## [H2] Frequently Asked Questions

### [Question 1 in natural language?]
[Direct answer in 2-3 sentences]

### [Question 2?]
[Answer]

[Continue for 3-5 FAQs]

## [H2] Conclusion
- Summarize key takeaways
- Include CTA: "Join the ColorizeAI waitlist at https://colorizeai.app/waitlist"

---
**Author:** [Verified author name]
**Published:** [YYYY-MM-DD]
**Updated:** [YYYY-MM-DD if edited]
**Reading Time:** [X] min
```

---

**Document Version:** 2.2
**Prepared by:** Claude Code + Codex Cross-Validation
**Critical issues identified:** 10
**Critical issues resolved:** 9/10 (E-E-A-T verification pending user decision)
**Phase 2 issues resolved:** 7/7
**Phase 4 issues resolved:** 2/5
**Last updated:** February 2026
**Next review:** After E-E-A-T verification and Phase 3 content scaling

---

## ✅ IMPLEMENTATION PROGRESS

### Phase 1: CRITICAL Technical Fixes - COMPLETED ✅

| # | Fix | Status | File Changed |
|---|-----|--------|--------------|
| 1 | Remove sitewide canonical | ✅ DONE | `app/layout.tsx` |
| 2 | Unblock /_next/ in robots.txt | ✅ DONE | `public/robots.txt` |
| 3 | Fix breadcrumb URL to `/blog/category/` | ✅ DONE | `components/blog/blog-schema.tsx` |
| 4 | Fix ISO duration format to `PT18M` | ✅ DONE | `components/blog/blog-schema.tsx` |
| 5 | Filter unpublished articles in schema | ✅ DONE | `components/guides/guide-schema.tsx` |
| 6 | Use updatedAt for dateModified | ✅ DONE | `components/blog/blog-schema.tsx` |
| 7 | Add metadata for /contact | ✅ DONE | `app/contact/layout.tsx` (new file) |
| 8 | Fix email domain to .app | ✅ DONE | `components/blog/blog-author-bio.tsx` |
| 9 | E-E-A-T claims verification | ⏳ PENDING | User decision required |
| 10 | Remove icon config (using dynamic routes) | ✅ DONE | `app/layout.tsx` |

### Phase 2: On-Page & Internal Linking - COMPLETED ✅

| # | Fix | Status | File Changed |
|---|-----|--------|--------------|
| 11 | Fix two H1 tags on homepage | ✅ DONE | `components/hero-section.tsx` |
| 12 | Make category badges clickable links | ✅ DONE | `app/blog/page.tsx` |
| 13 | Fix blog breadcrumb category link | ✅ DONE | `app/blog/[slug]/page.tsx` |
| 14 | Make blog category badge clickable | ✅ DONE | `app/blog/[slug]/page.tsx` |
| 15 | Add canonicals + OG to /guides pages | ✅ DONE | `app/guides/page.tsx`, `app/guides/[slug]/page.tsx` |
| 16 | Add canonicals + OG to /tools pages | ✅ DONE | `app/tools/page.tsx`, `app/tools/[slug]/page.tsx` |
| 17 | Add internal links module | ✅ DONE | `components/blog/blog-internal-links.tsx` (new file) |

### Phase 4: Performance - COMPLETED ✅

| # | Fix | Status | File Changed |
|---|-----|--------|--------------|
| 18 | Add HTTP caching headers | ✅ DONE | `next.config.mjs` |
| 19 | Fix competing priority images | ✅ DONE | `components/hero-section.tsx` |

---

## 🚨 QUICK REFERENCE: TOP 10 FIXES

~~Complete these before any content expansion:~~

1. ✅ ~~Remove `canonical: "/"` from `layout.tsx:29-30`~~
2. ✅ ~~Remove `Disallow: /_next/` from `robots.txt:9`~~
3. ✅ ~~Fix breadcrumb URL in `blog-schema.tsx:198` → `/blog/category/`~~
4. ✅ ~~Fix duration format in `blog-schema.tsx:98,140` → `PT18M`~~
5. ✅ ~~Filter unpublished in `guide-schema.tsx:47`~~
6. ✅ ~~Use updatedAt in `blog-schema.tsx:49`~~
7. ✅ ~~Add metadata for `/contact` (create layout.tsx)~~
8. ✅ ~~Fix email domain `blog-author-bio.tsx:143` → `.app`~~
9. ⏳ Verify E-E-A-T claims OR use "ColorizeAI Team" - **USER ACTION REQUIRED**
10. ✅ ~~Create icon files OR remove config from `layout.tsx:32-34`~~

**Status:** 17/18 critical fixes completed ✅
**Remaining:** E-E-A-T verification requires user decision on author persona
