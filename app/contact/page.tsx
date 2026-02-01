"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { Mail, MessageSquare, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Connect to your form handler (Formspree, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <>
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          {!submitted ? (
            <div className="bg-gray-50 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="How can we help?"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us more..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          )}

          {/* Direct Contact */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <a
                href="mailto:hello@colorizeai.app"
                className="text-pink-500 hover:underline"
              >
                hello@colorizeai.app
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <MessageSquare className="w-8 h-8 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600">We typically respond within 24-48 hours</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
