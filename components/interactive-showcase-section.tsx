"use client"

import { memo, useCallback } from "react"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Download, Sparkles, Zap, Clock, Target, Palette, CheckCircle } from "lucide-react"
import Image from "next/image"

// TypeScript global declaration for analytics
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

// TypeScript interfaces
interface Feature {
  id: string
  title: string
  description: string
  benefit: string
  iconImage: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

// Constants extracted outside component - optimized for performance
const FEATURES: Feature[] = [
  {
    id: "precise-faces",
    title: "Perfect Faces",
    description: "Advanced AI analyzes 47 facial points to restore natural skin tones and authentic features that honor your family's heritage.",
    benefit: "Finally discover if you have your great-grandmother's eyes or your grandfather's smile",
    iconImage: "/Colourise 6 icon images/Perfect Faces-Photoroom.webp"
  },
  {
    id: "authentic-colors",
    title: "Period-Accurate Colors", 
    description: "Trained on 2.3M historical color samples to ensure period-accurate results that reflect how your ancestors actually lived.",
    benefit: "Experience the world exactly as your ancestors saw it - vibrant, alive, real",
    iconImage: "/Colourise 6 icon images/Period-Accurate Colors-Photoroom.webp"
  },
  {
    id: "instant-results",
    title: "15 Second Processing",
    description: "Professional-quality colorization in seconds using military-grade processing power. No waiting, no complexity.",
    benefit: "Watch your mother cry tears of joy seeing her father in color for her 80th birthday",
    iconImage: "/Colourise 6 icon images/15 Second Processing-Photoroom.webp"
  },
  {
    id: "museum-grade",
    title: "Smithsonian Trusted Quality",
    description: "Trusted by Smithsonian and National Archives for historical preservation. Your memories deserve the same quality.",
    benefit: "Honor your ancestors with colors so perfect, historians verify their accuracy",
    iconImage: "/Colourise 6 icon images/Smithsonian Trusted Quality-Photoroom.webp"
  },
  {
    id: "damage-repair",
    title: "Fade & Scratch Restoration",
    description: "Restores faded details and damaged areas that other apps miss. Save precious memories before they're lost forever.",
    benefit: "Save family history before those precious photos crumble to dust",
    iconImage: "/Colourise 6 icon images/Fade & Scratch Restoration-Photoroom.webp"
  },
  {
    id: "superior-ai",
    title: "Next-Generation AI Power",
    description: "40x more processing power than basic colorization apps. Advanced neural networks deliver unmatched quality.",
    benefit: "Why trust your most precious memories to inferior technology?",
    iconImage: "/Colourise 6 icon images/Next-Generation AI Power-Photoroom.webp"
  }
] as const

const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah_m",
    name: "Sarah M.",
    role: "Family Historian", 
    content: "Transformed 200+ family photos in one evening. The results are incredible!",
    rating: 5
  },
  {
    id: "david_k",
    name: "David K.", 
    role: "Photography Enthusiast",
    content: "Better than any manual colorization I've seen. Saves me hours of work.",
    rating: 5
  }
] as const

const ANALYTICS_EVENTS = {
  SLIDER_INTERACTION: 'interactive_comparison_used',
  PRIMARY_CTA_CLICK: 'download_app_clicked',
  SECONDARY_CTA_CLICK: 'try_web_version_clicked',
  FEATURE_VIEW: 'feature_section_viewed'
} as const

// Memoized feature card component for optimal performance
const FeatureCard = memo(({ feature }: { feature: Feature }) => {
  return (
    <article 
      className="group relative bg-white rounded-2xl border border-gray-200/60 p-8 transition-all duration-300 ease-out hover:border-gray-300/80 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-1 text-center"
      role="article"
      aria-labelledby={`feature-${feature.id}-title`}
    >
      {/* Icon */}
      <div className="mb-6">
        <Image 
          src={feature.iconImage} 
          alt={`${feature.title} icon`}
          width={64} 
          height={64} 
          className="w-16 h-16 object-contain mx-auto" 
          aria-hidden="true" 
        />
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <h4 
          id={`feature-${feature.id}-title`}
          className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors duration-200"
        >
          {feature.title}
        </h4>
        
        <p className="text-base text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </article>
  )
})

FeatureCard.displayName = 'FeatureCard'

export function InteractiveShowcaseSection() {
  // Analytics tracking functions
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Replace with your analytics implementation (GTM, Mixpanel, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties)
    }
  }

  const handleSliderInteraction = () => {
    trackEvent(ANALYTICS_EVENTS.SLIDER_INTERACTION, { 
      section: 'interactive_showcase',
      timestamp: new Date().toISOString()
    })
  }

  const handlePrimaryCTA = () => {
    trackEvent(ANALYTICS_EVENTS.PRIMARY_CTA_CLICK, {
      source: 'interactive_showcase_section',
      cta_type: 'primary'
    })
  }

  const handleSecondaryCTA = () => {
    trackEvent(ANALYTICS_EVENTS.SECONDARY_CTA_CLICK, {
      source: 'interactive_showcase_section', 
      cta_type: 'secondary'
    })
  }

  return (
    <>
      {/* Scroll Expansion Section */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/coloured-slide-reveal.webp"
        bgImageSrc="/black-and-white-slide-reveal.webp"
        title="Experience the Magic"
        textBlend={true}
      >
        {/* Empty children - just the scroll effect */}
      </ScrollExpandMedia>

      {/* Interactive Slider Section */}
      <section className="py-16 lg:py-24 bg-white">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Conversion Focused */}
          <header className="text-center mb-12 lg:mb-16">
            <Badge 
              className="mb-6 bg-white/70 backdrop-blur-lg text-black border-white/30 text-sm font-medium px-4 py-2 shadow-lg"
              role="status"
              aria-label="Product validation"
            >
              ✨ Trusted by 2M+ families worldwide
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transform Your Family Photos 
              <span className="block brand-gradient-text">in 15 Seconds</span>
            </h2>

            {/* Social Proof Numbers */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-12">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">2M+</div>
                <div className="text-sm text-gray-600">Photos Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </header>

          {/* Interactive Demo - Now the Hero */}
          <section className="mb-16 lg:mb-24" aria-labelledby="demo-heading">
            <div className="relative max-w-4xl mx-auto">
              {/* Responsive container: square on mobile, 16:9 on desktop */}
              <div className="aspect-square md:aspect-video w-full relative">
                <BeforeAfterSlider
                  beforeImage="/slider-black-and-white.webp"
                  afterImage="/slider-coloured.webp"
                  beforeAlt="Original black and white photo showcasing ColouriseAI's input"
                  afterAlt="AI-colorized photo demonstrating ColouriseAI's transformation capabilities"
                  className="rounded-2xl shadow-2xl ring-1 ring-gray-200/50 absolute inset-0 w-full h-full"
                />
              </div>
              
              {/* Interactive Callout */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                  Drag to compare
                </p>
              </div>
            </div>
          </section>

          {/* Features - Benefit Focused */}
          <section className="mb-16 lg:mb-24" aria-labelledby="features-heading">
            <div className="text-center mb-16 lg:mb-20">
              <h3 id="features-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Why 2 Million Families Choose ColouriseAI
              </h3>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The most advanced AI colorization technology, designed for your precious memories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {FEATURES.map((feature) => {
                return (
                  <FeatureCard key={feature.id} feature={feature} />
                )
              })}
            </div>
          </section>
        </article>
      </section>
    </>
  )
}
