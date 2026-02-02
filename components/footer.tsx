"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  product: [
    { label: "Join Waitlist", href: "/waitlist" },
    { label: "Free Tools", href: "/tools" },
  ],
  guides: [
    { label: "All Guides", href: "/guides" },
    { label: "AI Colorization Guide", href: "/guides/ai-photo-colorization" },
    { label: "Photo Restoration Guide", href: "/guides/photo-restoration" },
    { label: "Use Cases", href: "/guides/use-cases" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Color Palette Tool", href: "/tools/historical-color-palette" },
    { label: "Photo Date Estimator", href: "/tools/photo-date-estimator" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/colorizeai", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/colorizeai", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/colorizeai", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/colorizeai", label: "YouTube" },
]

export function Footer() {
  return (
    <>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Don't Let Your Family Memories Fade Away
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Download ColorizeAI now and reclaim your family's vibrant history—forever.
          </p>
          <Link href="/waitlist">
            <Button className="brand-gradient text-white text-lg px-8 py-3">Join the Waitlist</Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 lg:py-20">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/colorize-ai-logo.webp"
                    alt="ColorizeAI"
                    width={240}
                    height={48}
                    className="h-12 w-auto"
                  />
                </Link>

                <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
                  Bring your memories to life with AI-powered photo colorization. Transform black & white photos into
                  stunning, realistic color images in seconds.
                </p>

                {/* Newsletter Signup */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Stay Updated</h4>
                  <div className="flex space-x-2">
                    <Input type="email" placeholder="Enter your email" className="flex-1" />
                    <Button className="brand-gradient text-white">Subscribe</Button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-600" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Links Columns */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Guides</h4>
                <ul className="space-y-3">
                  {footerLinks.guides.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-3 mb-6">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>hello@colorizeai.app</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-600">© {new Date().getFullYear()} ColorizeAI. All rights reserved.</div>

              <div className="flex space-x-6">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
