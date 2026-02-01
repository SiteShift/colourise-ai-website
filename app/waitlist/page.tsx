"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ArrowLeft, Sparkles } from "lucide-react"

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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/colourise-ai-logo.webp"
            alt="ColouriseAI"
            width={200}
            height={40}
            className="h-10 w-auto mx-auto"
          />
        </div>

        {!submitted ? (
          <>
            {/* Heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Join the Waitlist
              </h1>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Be the first to know when ColouriseAI launches. Transform your black & white photos into stunning color with AI.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-lg"
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
            <div className="grid sm:grid-cols-3 gap-4 text-left max-w-lg mx-auto">
              <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-gray-100">
                <div className="font-semibold text-gray-900 mb-1">AI Colorization</div>
                <div className="text-sm text-gray-600">Transform B&W photos in seconds</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-gray-100">
                <div className="font-semibold text-gray-900 mb-1">Face Enhancement</div>
                <div className="text-sm text-gray-600">Restore facial details with AI</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-gray-100">
                <div className="font-semibold text-gray-900 mb-1">4K Upscaling</div>
                <div className="text-sm text-gray-600">Enhance to high resolution</div>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You're on the list!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We'll notify you at <span className="font-semibold">{email}</span> when ColouriseAI launches.
            </p>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        )}

        {/* Social Proof */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Join thousands of others waiting for ColouriseAI
          </p>
        </div>
      </div>
    </main>
  )
}
