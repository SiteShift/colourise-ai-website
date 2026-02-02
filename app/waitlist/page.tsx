"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ArrowLeft, Sparkles, Palette, User, Maximize } from "lucide-react"
import { Footer } from "@/components/footer"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Connect to your email service (Mailchimp, ConvertKit, etc.)
    // For now, just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <>
    <main className="min-h-dvh bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Image
              src="/colorize-ai-logo.webp"
              alt="ColorizeAI"
              width={180}
              height={36}
              className="h-9 w-auto mx-auto"
            />
          </div>

          {!submitted ? (
            <>
              {/* Heading */}
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-pink-100">
                  <Sparkles className="w-4 h-4" />
                  Coming Soon
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">
                  Join the <span className="brand-gradient-text">Waitlist</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md mx-auto text-pretty">
                  Be the first to know when ColorizeAI launches. Transform your black & white photos into stunning color with AI.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mb-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 text-base"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    {loading ? "Joining..." : "Join Waitlist"}
                  </Button>
                </div>
              </form>

              {/* Features Preview */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center mb-3">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm">AI Colorization</div>
                  <div className="text-xs text-gray-500">Transform B&W photos in seconds</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center mb-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm">Face Enhancement</div>
                  <div className="text-xs text-gray-500">Restore facial details with AI</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center mb-3">
                    <Maximize className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm">4K Upscaling</div>
                  <div className="text-xs text-gray-500">Enhance to high resolution</div>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
                You're on the list!
              </h2>
              <p className="text-gray-600 mb-8 text-pretty">
                We'll notify you at <span className="font-semibold text-gray-900">{email}</span> when ColorizeAI launches.
              </p>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Social Proof */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Join thousands of others waiting for ColorizeAI
        </p>
      </div>
    </main>
    <Footer />
    </>
  )
}
