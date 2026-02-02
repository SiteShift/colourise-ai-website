"use client"

import { memo, useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

// Scene builder images for the final stage
const SCENE_BUILDER_IMAGES = [
  "/ColorizeAI image scroll/AI image 1_compressed.webp",
  "/ColorizeAI image scroll/AI image 2_compressed.webp",
  "/ColorizeAI image scroll/AI image 3_compressed.webp",
  "/ColorizeAI image scroll/AI image 4_compressed.webp",
  "/ColorizeAI image scroll/AI image 5_compressed.webp"
]

// Stage labels for UI feedback
const STAGE_LABELS = [
  { title: "Original Photo", subtitle: "1943 Wedding Day" },
  { title: "AI Colorization", subtitle: "Bringing memories to life" },
  { title: "Face Enhancement", subtitle: "Restoring every detail" },
  { title: "4K Upscaling", subtitle: "Print-ready quality" },
  { title: "Roaring 20s", subtitle: "AI Scene Builder" },
  { title: "Ancient Rome", subtitle: "AI Scene Builder" },
  { title: "WW2", subtitle: "AI Scene Builder" },
  { title: "American Revolution", subtitle: "AI Scene Builder" },
  { title: "Cyberpunk 2077", subtitle: "AI Scene Builder" }
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStage, setCurrentStage] = useState(0)

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Transform scroll progress to stage progress (0-8 for 9 total stages)
  const stageProgress = useTransform(scrollYProgress, [0, 1], [0, 8])
  
  // Individual stage progress values
  const colorizationProgress = useTransform(scrollYProgress, [0, 0.125], [0, 1])
  const faceEnhanceProgress = useTransform(scrollYProgress, [0.125, 0.25], [0, 1])
  const upscaleProgress = useTransform(scrollYProgress, [0.25, 0.375], [0, 1])
  
  // Individual AI scene progress values
  const aiScene1Progress = useTransform(scrollYProgress, [0.375, 0.5], [0, 1])
  const aiScene2Progress = useTransform(scrollYProgress, [0.5, 0.625], [0, 1])
  const aiScene3Progress = useTransform(scrollYProgress, [0.625, 0.75], [0, 1])
  const aiScene4Progress = useTransform(scrollYProgress, [0.75, 0.875], [0, 1])
  const aiScene5Progress = useTransform(scrollYProgress, [0.875, 1], [0, 1])

  // Update current stage based on scroll
  useEffect(() => {
    const unsubscribe = stageProgress.on("change", (latest) => {
      const newStage = Math.floor(latest)
      setCurrentStage(Math.min(Math.max(newStage, 0), 8))
    })

    return unsubscribe
  }, [stageProgress])

  return (
    <section id="features" className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20">
      
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-white/70 backdrop-blur-lg text-black border-white/30 text-sm font-medium px-4 py-2 shadow-lg">
            Advanced AI Technology
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Next Generation <span className="brand-gradient-text">AI</span> Features
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience cutting-edge AI features that transform your family photos into professional-quality memories worth treasuring for generations.
          </p>
        </motion.div>
      </div>

      {/* Interactive Transformation Container */}
      <div 
        ref={containerRef}
        className="relative h-[400vh] w-full" // 4x viewport height for smooth scrolling
      >
        
        {/* Sticky Container for the transforming image */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* Image Stack Container */}
          <div className="relative w-full h-screen overflow-hidden">
            
            {/* Stage Indicator */}
            <div 
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30 shadow-lg"
            >
              <div className="text-center">
                <p className="text-base font-bold text-gray-900 mb-1">
                  {STAGE_LABELS[currentStage]?.title}
                </p>
                <p className="text-sm text-gray-600">
                  {STAGE_LABELS[currentStage]?.subtitle}
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((stage) => (
                  <div
                    key={stage}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      stage <= currentStage 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Layer 1: Original Black & White */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/ColorizeAI image scroll/first black and white image_compressed.webp"
                alt="Original black and white photo"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Layer 2: Colorized (Horizontal Wipe Up) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  colorizationProgress,
                  [0, 1],
                  ["polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)"]
                )
              }}
            >
              <Image
                src="/ColorizeAI image scroll/second colored image_compressed.webp"
                alt="Colorized photo"
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-lg"
                style={{
                  top: useTransform(colorizationProgress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 3: Face Enhanced (Vertical Wipe Right to Left) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  faceEnhanceProgress,
                  [0, 1],
                  ["polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", "polygon(100% 0, 0% 0, 0% 100%, 100% 100%)"]
                )
              }}
            >
              <Image
                src="/ColorizeAI image scroll/third face enhancement_compressed.webp"
                alt="Face enhanced photo"
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  left: useTransform(faceEnhanceProgress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 4: 4K Upscaled (Vertical Wipe Left to Right) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  upscaleProgress,
                  [0, 1],
                  ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
                )
              }}
            >
              <Image
                src="/ColorizeAI image scroll/fourth 4k upscale_compressed.webp"
                alt="4K upscaled photo"
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  right: useTransform(upscaleProgress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 5: Scene Builder (Full Reveal with Quick Transitions) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  aiScene1Progress,
                  [0, 1],
                  ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
                )
              }}
            >
              <motion.div
                className="w-full h-full"
              >
                <Image
                  src={SCENE_BUILDER_IMAGES[0]}
                  alt={`AI Scene Builder variation 1`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  right: useTransform(aiScene1Progress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 6: Scene Builder (Full Reveal with Quick Transitions) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  aiScene2Progress,
                  [0, 1],
                  ["polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", "polygon(100% 0, 0% 0, 0% 100%, 100% 100%)"]
                )
              }}
            >
              <motion.div
                className="w-full h-full"
              >
                <Image
                  src={SCENE_BUILDER_IMAGES[1]}
                  alt={`AI Scene Builder variation 2`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  left: useTransform(aiScene2Progress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 7: Scene Builder (Full Reveal with Quick Transitions) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  aiScene3Progress,
                  [0, 1],
                  ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
                )
              }}
            >
              <motion.div
                className="w-full h-full"
              >
                <Image
                  src={SCENE_BUILDER_IMAGES[2]}
                  alt={`AI Scene Builder variation 3`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  right: useTransform(aiScene3Progress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 8: Scene Builder (Full Reveal with Quick Transitions) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  aiScene4Progress,
                  [0, 1],
                  ["polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", "polygon(100% 0, 0% 0, 0% 100%, 100% 100%)"]
                )
              }}
            >
              <motion.div
                className="w-full h-full"
              >
                <Image
                  src={SCENE_BUILDER_IMAGES[3]}
                  alt={`AI Scene Builder variation 4`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  left: useTransform(aiScene4Progress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

            {/* Layer 9: Scene Builder (Full Reveal with Quick Transitions) */}
            <motion.div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: useTransform(
                  aiScene5Progress,
                  [0, 1],
                  ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
                )
              }}
            >
              <motion.div
                className="w-full h-full"
              >
                <Image
                  src={SCENE_BUILDER_IMAGES[4]}
                  alt={`AI Scene Builder variation 5`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
              {/* White line for transition visibility */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{
                  right: useTransform(aiScene5Progress, [0, 1], ["100%", "0%"])
                }}
              />
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  )
}
