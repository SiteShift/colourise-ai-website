import { HeroSection } from "@/components/hero-section"
import { InteractiveShowcaseSection } from "@/components/interactive-showcase-section"
import { FeaturesSection } from "@/components/features-section"
import { GallerySection } from "@/components/gallery-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <InteractiveShowcaseSection />
      <FeaturesSection />
      <GallerySection />
      <SocialProofSection />
      <Footer />
    </main>
  )
}
