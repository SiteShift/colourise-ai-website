"use client"

import { useEffect, useRef, useState, useId, type ReactNode, type TouchEvent, type WheelEvent } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image"
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title?: string
  date?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const componentId = useId()
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [showContent, setShowContent] = useState<boolean>(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [isMobileState, setIsMobileState] = useState<boolean>(false)
  const [isScrollEffectActive, setIsScrollEffectActive] = useState<boolean>(false)

  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Reset state when media type changes
  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
  }, [mediaType])

  // Calculate when image is centered in viewport and control scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate where the image center would be relative to viewport
      // Image is at 50% of section height, so its center is at rect.top + (rect.height / 2)
      const imageCenterY = rect.top + (rect.height / 2)
      const viewportCenterY = viewportHeight / 2
      
      // Image is centered when imageCenterY equals viewportCenterY
      const distanceFromCenter = Math.abs(imageCenterY - viewportCenterY)
      const centerTolerance = 50 // pixels tolerance for "centered"
      
      const isCentered = distanceFromCenter <= centerTolerance
      const isInViewRange = rect.top < viewportHeight && rect.bottom > 0
      
      setIsScrollEffectActive(isCentered && isInViewRange && !mediaFullyExpanded)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mediaFullyExpanded])

  // Handle wheel and touch events - only when scroll effect is active
  useEffect(() => {
    if (!isScrollEffectActive) return

    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const scrollDelta = e.deltaY * 0.0009
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 0.7)
        setScrollProgress(newProgress)

        if (newProgress >= 0.7) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.5) {
          setShowContent(false)
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005
        const scrollDelta = deltaY * scrollFactor
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 0.7)
        setScrollProgress(newProgress)

        if (newProgress >= 0.7) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.5) {
          setShowContent(false)
        }

        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = (): void => {
      setTouchStartY(null)
    }

    // Prevent scrolling when effect is active
    const preventScroll = (): void => {
      if (isScrollEffectActive && !mediaFullyExpanded) {
        window.scrollTo(0, window.scrollY)
      }
    }

    window.addEventListener("wheel", handleWheel as unknown as EventListener, { passive: false })
    window.addEventListener("scroll", preventScroll as EventListener)
    window.addEventListener("touchstart", handleTouchStart as unknown as EventListener, { passive: false })
    window.addEventListener("touchmove", handleTouchMove as unknown as EventListener, { passive: false })
    window.addEventListener("touchend", handleTouchEnd as EventListener)

    return () => {
      window.removeEventListener("wheel", handleWheel as unknown as EventListener)
      window.removeEventListener("scroll", preventScroll as EventListener)
      window.removeEventListener("touchstart", handleTouchStart as unknown as EventListener)
      window.removeEventListener("touchmove", handleTouchMove as unknown as EventListener)
      window.removeEventListener("touchend", handleTouchEnd as EventListener)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isScrollEffectActive])

  // Check for mobile device
  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const mediaWidth = 200 + scrollProgress * (isMobileState ? 600 : 1000)
  const mediaHeight = 250 + scrollProgress * (isMobileState ? 300 : 500)
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150)

  const firstWord = title ? title.split(" ")[0] : ""
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : ""

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
      id={`scroll-expand-${componentId}`}
    >
      <section className="relative flex flex-col items-center justify-start h-[100dvh]">
        <div className="relative w-full flex flex-col items-center h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc || "/placeholder.svg"}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-center relative z-10 h-full">
            <div className="flex flex-col items-center justify-center w-full h-full relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }}></div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }}></div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc || "/placeholder.svg"}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p className="text-2xl text-blue-200" style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-blue-200 font-medium text-center"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h2
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-blue-200 transition-none"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center text-blue-200 transition-none"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>

              {/* Visual indicator for scrolling */}
              {isScrollEffectActive && !mediaFullyExpanded && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                  <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              style={{ display: children ? 'flex' : 'none' }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia
