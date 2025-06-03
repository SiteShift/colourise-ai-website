import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-20">
        <BlogSection />
      </div>
      <Footer />
    </main>
  )
} 