"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { useDebouncedCallback } from "use-debounce"

interface OptimizedMediaSectionProps {
  mediaSrc: string
  bgImageSrc: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function OptimizedMediaSection({ mediaSrc, bgImageSrc, title, subtitle, children }: OptimizedMediaSectionProps) {
  // Use refs instead of state where possible
  const sectionRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Use intersection observer for visibility detection
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Ref for the section
      sectionRef.current = node
      // Ref for intersection observer
      inViewRef(node)
    },
    [inViewRef],
  )

  // Handle resize with ResizeObserver instead of window events
  const debouncedCheckIfMobile = useDebouncedCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, 200)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Use ResizeObserver instead of window resize
    const resizeObserver = new ResizeObserver(debouncedCheckIfMobile)

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // Handle scroll with IntersectionObserver and throttled scroll
  useEffect(() => {
    if (!inView) return

    let lastScrollY = window.scrollY
    let ticking = false
    let animationFrameId: number | null = null

    const handleScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for smooth animation
        animationFrameId = requestAnimationFrame(() => {
          const scrollDelta = window.scrollY - lastScrollY

          // Only expand if scrolling down and not already expanded
          if (scrollDelta > 0 && !expanded) {
            setExpanded(true)
            // Delay showing content for smooth transition
            setTimeout(() => setShowContent(true), 600)
          }

          lastScrollY = window.scrollY
          ticking = false
        })

        ticking = true
      }
    }

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [inView, expanded])

  // Split title for animation
  const titleParts = title.split(" ")
  const firstWord = titleParts[0]
  const restOfTitle = titleParts.slice(1).join(" ")

  return (
    <div
      ref={setRefs}
      className="relative min-h-screen overflow-hidden"
      style={{
        // Use contain for layout optimization
        contain: "layout paint style",
      }}
    >
      {/* Background with CSS transition instead of JS animation */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-out",
          expanded ? "opacity-0" : "opacity-100",
        )}
      >
        <Image
          src={bgImageSrc || "/placeholder.svg"}
          alt="Background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOlFPwAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Media container with CSS transforms */}
          <div
            ref={mediaRef}
            className={cn(
              "relative rounded-2xl overflow-hidden shadow-2xl transform-gpu",
              "transition-all duration-700 ease-out will-change-transform",
              expanded ? "w-full md:w-[90%] lg:w-[80%] h-[50vh] md:h-[60vh]" : "w-[300px] h-[400px]",
            )}
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={mediaSrc || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              sizes={expanded ? "(max-width: 768px) 100vw, 80vw" : "300px"}
              priority
            />

            {/* Overlay with CSS transition */}
            <div
              className={cn(
                "absolute inset-0 bg-black transition-opacity duration-700",
                expanded ? "opacity-30" : "opacity-60",
              )}
            />
          </div>

          {/* Title with CSS transforms */}
          <div className="mt-8 text-center relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <h2
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold text-white transform-gpu",
                  "transition-all duration-700 ease-out",
                  expanded ? "-translate-x-[100px]" : "translate-x-0",
                )}
              >
                {firstWord}
              </h2>
              <h2
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold text-white transform-gpu",
                  "transition-all duration-700 ease-out",
                  expanded ? "translate-x-[100px]" : "translate-x-0",
                )}
              >
                {restOfTitle}
              </h2>
            </div>

            {subtitle && <p className="text-white/80 mt-4 max-w-lg mx-auto">{subtitle}</p>}

            {!expanded && <p className="text-white/80 mt-8 animate-bounce">Scroll to explore</p>}
          </div>
        </div>

        {/* Content section with CSS transition */}
        <div
          className={cn(
            "transition-all duration-700 ease-out",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
