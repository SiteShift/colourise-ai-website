import { Metadata } from "next"
import Link from "next/link"
import { Shield, Users, Sparkles, Heart, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About ColorizeAI | Our Mission & Story",
  description: "Learn about ColorizeAI - helping families preserve and rediscover their memories through AI-powered photo colorization technology.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 text-balance">
              About <span className="brand-gradient-text">ColorizeAI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              We believe every family deserves to see their history in full color.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 text-pretty">
              ColorizeAI was created with a simple but powerful mission: to help people reconnect with their family history by transforming black and white photographs into vivid, colorful memories.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-pretty">
              Using advanced artificial intelligence, we've made professional-quality photo colorization accessible to everyone. No technical skills required, no expensive software needed - just upload your photo and watch the magic happen.
            </p>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our Technology Works</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 text-pretty">
              Our AI has been trained on millions of photographs to understand the relationship between grayscale values and colors. When you upload a black and white photo, our neural network analyzes the content - identifying faces, clothing, landscapes, and objects - then applies historically and contextually appropriate colors.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-pretty">
              The result? Photos that look like they were originally taken in color, helping you see your ancestors and family history in a completely new way.
            </p>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Stand For</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-600 text-sm text-pretty">
                  Your photos are yours. We process images with care and respect your privacy. See our <Link href="/privacy" className="text-pink-500 hover:underline">Privacy Policy</Link> for details.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessible to All</h3>
                <p className="text-gray-600 text-sm text-pretty">
                  We believe everyone should be able to colorize their family photos, regardless of technical ability or budget.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Results</h3>
                <p className="text-gray-600 text-sm text-pretty">
                  We're constantly improving our AI to deliver more accurate, natural-looking colorization results.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Preserving History</h3>
                <p className="text-gray-600 text-sm text-pretty">
                  We're passionate about helping families preserve and share their precious memories for future generations.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center py-12 bg-gray-50 border border-gray-100 rounded-2xl mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">Get in Touch</h2>
            <p className="text-gray-600 mb-6 text-pretty">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
