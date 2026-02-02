"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Menu, X, Download } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// NavItem component
function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md px-2 py-1"
    >
      {label}
    </Link>
  )
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/guides", label: "Guides" },
    { href: "/tools", label: "Free Tools" },
    { href: "/blog", label: "Blog" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-white/50 backdrop-blur-3xl border border-gray-200 rounded-full shadow-2xl shadow-black/5 px-6 py-3 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/colorize-ai-logo.webp"
              alt="ColorizeAI"
              width={100}
              height={20}
              className="h-5 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex">
            <Link href="/waitlist">
              <RainbowButton className="text-sm px-4 py-2 h-9">
                <Download className="w-3 h-3 mr-2" />
                Join Waitlist
              </RainbowButton>
            </Link>
          </div>

          {/* Mobile: CTA Button + Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile CTA Button */}
            <Link href="/waitlist">
              <RainbowButton className="text-sm px-4 py-2 h-9">
                Join Waitlist
              </RainbowButton>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/60 backdrop-blur-3xl border border-gray-200 rounded-2xl shadow-2xl shadow-black/5 ring-1 ring-white/10">
          <div className="px-6 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
