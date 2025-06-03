"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

const galleryItems = [
  {
    id: 1,
    category: "portraits",
    beforeImage: "/placeholder.svg?height=400&width=400",
    afterImage: "/placeholder.svg?height=400&width=400",
    title: "Victorian Portrait",
    description: "Victorian Family Portrait (1890s)",
  },
  {
    id: 2,
    category: "landscapes",
    beforeImage: "/placeholder.svg?height=400&width=400",
    afterImage: "/placeholder.svg?height=400&width=400",
    title: "Mountain Vista",
    description: "Mountain Vista (1940s)",
  },
  {
    id: 3,
    category: "historical",
    beforeImage: "/placeholder.svg?height=400&width=400",
    afterImage: "/placeholder.svg?height=400&width=400",
    title: "War Memorial",
    description: "Historical monument colorized with period-accurate details",
  },
  {
    id: 4,
    category: "family",
    beforeImage: "/placeholder.svg?height=400&width=400",
    afterImage: "/placeholder.svg?height=400&width=400",
    title: "Wedding Day",
    description: "Wedding Day (1952)",
  },
  {
    id: 5,
    category: "portraits",
    beforeImage: "/placeholder.svg?height=400&width=400",
    afterImage: "/placeholder.svg?height=400&width=400",
    title: "Child Portrait",
    description: "Childhood photo enhanced with natural skin tones",
  },
  {
    id: 6,
    category: "landscapes",
    beforeImage: "/placeholder.svg?height=400&width=400",
    afterImage: "/placeholder.svg?height=400&width=400",
    title: "City Street",
    description: "City Streets (1960s)",
  },
]

// Before/After Slider Component
function BeforeAfterSlider({ beforeImage, afterImage, title }: { beforeImage: string, afterImage: string, title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      {/* After Image (Background) */}
      <Image
        src={afterImage || "/placeholder.svg"}
        alt={`${title} - After`}
        fill
        className="object-cover"
      />
      
      {/* Before Image (Foreground with clip-path) */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <Image
          src={beforeImage || "/placeholder.svg"}
          alt={`${title} - Before`}
          fill
          className="object-cover"
        />
      </div>

      {/* Slider Control */}
      <div className="absolute inset-0 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute w-full h-full opacity-0 cursor-col-resize z-20"
        />
        
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-4 bg-gray-400 rounded-full ml-1"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3">
        <Badge className="bg-red-500/90 text-white text-xs">Before</Badge>
      </div>
      <div className="absolute top-3 right-3">
        <Badge className="bg-green-500/90 text-white text-xs">After</Badge>
      </div>
    </div>
  )
}

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 lg:py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-white/70 backdrop-blur-lg text-black border-white/30 text-sm font-medium px-4 py-2 shadow-lg">
            Transformation Gallery
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Witness the <span className="brand-gradient-text">Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 px-8">
            Real transformations from real families. Drag the slider to see the incredible difference our AI makes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryItems.map((item) => (
            <div key={item.id}>
              <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-0">
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    title={item.title}
                  />

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
