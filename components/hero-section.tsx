"use client"

import Image from "next/image"
import { Award } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[140vh] flex items-center justify-center overflow-hidden py-16 md:py-0 md:min-h-screen md:h-auto">
      {/* Background Image - Optimized loading */}
      <div className="absolute inset-0">
        <Image 
          src="/hero-background.webp" 
          alt="Hero background" 
          fill 
          className="object-cover" 
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="container mx-auto relative z-10 pt-20 md:pt-0">
        {/* Mobile Layout - Text above mockups (hidden on desktop) */}
        <div className="flex flex-col items-center text-center space-y-6 sm:hidden">
          {/* Badge */}
          <div className="flex justify-center pt-12">
            <div className="bg-white/20 backdrop-blur-md border border-gray-100 rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
              <Award className="w-4 h-4 text-gray-800" />
              <span className="text-sm font-medium text-gray-800">AI-Powered Photo Colorization</span>
            </div>
          </div>

          {/* Main Headline - Mobile */}
          <h1 className="text-5xl font-extrabold text-black leading-none">
            <div>Bring Your Old</div>
            <div>Photos Back</div>
            <div>to Life</div>
          </h1>

          {/* CTA Button - Mobile */}
          <div className="flex justify-center">
            <a
              href="/waitlist"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Join the Waitlist
            </a>
          </div>

          {/* iPhone Mockups - Mobile (below text) */}
          <div className="flex justify-center relative -mt-2">
            <div className="relative">
              {/* Main iPhone Mockup */}
              <div className="relative z-20">
                <Image
                  src="/iphone-mockup.webp"
                  alt="ColouriseAI iPhone app showing before and after photo colorization"
                  width={500}
                  height={1000}
                  className="object-contain w-[500px] h-auto drop-shadow-2xl"
                  priority
                  sizes="500px"
                />
              </div>

              {/* Secondary iPhone Mockup */}
              <div className="absolute top-8 -right-10 z-10 transform rotate-12">
                <Image
                  src="/iphone-mockup-2.webp"
                  alt="ColouriseAI iPhone app showing vintage family photo"
                  width={380}
                  height={760}
                  className="object-contain w-[360px] h-auto drop-shadow-xl"
                  loading="eager"
                  sizes="360px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side (hidden on mobile) */}
        <div className="hidden sm:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text and Badges */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg">
                <Award className="w-4 h-4 text-gray-800" />
                <span className="text-sm font-medium text-gray-800">AI-Powered Photo Colorization</span>
              </div>
            </div>

            {/* Main Headline - Desktop with consistent line breaks */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black leading-tight mb-10">
              <div>Bring Your Old</div>
              <div>Photos Back</div>
              <div>to Life</div>
            </h1>

            {/* CTA Button - Desktop */}
            <div className="flex justify-center lg:justify-start">
              <a
                href="/waitlist"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Join the Waitlist
              </a>
            </div>
          </div>

          {/* Right Column - iPhone Mockups */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative">
              {/* Main iPhone Mockup */}
              <div className="relative z-20">
                <Image
                  src="/iphone-mockup.webp"
                  alt="ColouriseAI iPhone app showing before and after photo colorization"
                  width={500}
                  height={1000}
                  className="object-contain w-[650px] h-auto drop-shadow-2xl"
                  loading="eager"
                  sizes="650px"
                />
              </div>

              {/* Secondary iPhone Mockup */}
              <div className="absolute top-16 -right-24 z-10 transform rotate-12">
                <Image
                  src="/iphone-mockup-2.webp"
                  alt="ColouriseAI iPhone app showing vintage family photo"
                  width={380}
                  height={760}
                  className="object-contain w-[450px] h-auto drop-shadow-xl"
                  loading="eager"
                  sizes="450px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
