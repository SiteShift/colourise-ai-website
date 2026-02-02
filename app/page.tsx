import { HeroSection } from "@/components/hero-section"
import { InteractiveShowcaseSection } from "@/components/interactive-showcase-section"
import { FeaturesSection } from "@/components/features-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { ResourcesSection } from "@/components/resources-section"
import { Footer } from "@/components/footer"
import { HomepageSchema } from "@/components/homepage-schema"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HomepageSchema />
      <HeroSection />
      <InteractiveShowcaseSection />
      <FeaturesSection />
      <ResourcesSection />
      <SocialProofSection />
      <Footer />
    </main>
  )
}
