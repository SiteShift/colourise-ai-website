"use client"

import type React from "react"

import { useState, useRef, useCallback, memo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  className?: string
}

// Memoized component to prevent unnecessary re-renders
export const LazyBeforeAfterSlider = memo(function LazyBeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use intersection observer for lazy loading
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Ref for the container
      containerRef.current = node
      // Ref for intersection observer
      inViewRef(node)
    },
    [inViewRef],
  )

  // Throttled move handler
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      setSliderPosition(percentage)
    })
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove],
  )

  const handleStart = useCallback(() => setIsDragging(true), [])
  const handleEnd = useCallback(() => setIsDragging(false), [])

  // Only render full component when in view
  if (!inView) {
    return (
      <div
        ref={inViewRef}
        className={cn("relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800", className)}
        style={{ aspectRatio: "1/1" }}
      />
    )
  }

  return (
    <div
      ref={setRefs}
      className={cn("relative overflow-hidden rounded-xl cursor-ew-resize select-none", className)}
      style={{
        // Use contain for layout optimization
        contain: "layout paint style",
        aspectRatio: "1/1",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* After Image (Background) */}
      <div className="relative w-full h-full">
        <Image
          src={afterImage || "/placeholder.svg"}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOlFPwAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Before Image (Overlay) with GPU acceleration */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden transform-gpu will-change-transform"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full">
          <Image
            src={beforeImage || "/placeholder.svg"}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
            style={{
              width: `${(100 / sliderPosition) * 100}%`,
              transform: "translateZ(0)",
            }}
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOlFPwAAAABJRU5ErkJggg=="
          />
        </div>
      </div>

      {/* Slider Line with GPU acceleration */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize transform-gpu will-change-transform"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateZ(0)",
        }}
      >
        {/* Slider Handle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <div className="w-4 h-4 brand-gradient rounded-full" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
        After
      </div>
    </div>
  )
})
