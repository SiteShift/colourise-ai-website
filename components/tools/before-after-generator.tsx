"use client"

import { useState, useRef } from "react"
import { Upload, Download, Image, ArrowLeftRight, Sparkles, AlertCircle } from "lucide-react"

export function BeforeAfterGenerator() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (type: "before" | "after") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === "before") {
          setBeforeImage(reader.result as string)
        } else {
          setAfterImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const downloadComparison = () => {
    if (!beforeImage || !afterImage) return

    // Create a canvas to combine images side by side
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img1 = new window.Image()
    const img2 = new window.Image()

    img1.onload = () => {
      img2.onload = () => {
        // Side by side
        canvas.width = img1.width + img2.width
        canvas.height = Math.max(img1.height, img2.height)

        ctx.drawImage(img1, 0, 0)
        ctx.drawImage(img2, img1.width, 0)

        // Add labels
        ctx.fillStyle = "rgba(0,0,0,0.7)"
        ctx.fillRect(0, canvas.height - 40, 100, 40)
        ctx.fillRect(img1.width, canvas.height - 40, 100, 40)

        ctx.fillStyle = "white"
        ctx.font = "bold 16px Arial"
        ctx.fillText("Before", 20, canvas.height - 15)
        ctx.fillText("After", img1.width + 20, canvas.height - 15)

        const link = document.createElement("a")
        link.download = "colorization-comparison.png"
        link.href = canvas.toDataURL()
        link.click()
      }
      img2.src = afterImage
    }
    img1.src = beforeImage
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Before Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Before Image (B&W Original)
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              beforeImage
                ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
            }`}
          >
            {beforeImage ? (
              <div className="space-y-3">
                <img
                  src={beforeImage}
                  alt="Before"
                  className="max-h-48 mx-auto rounded-lg"
                />
                <p className="text-sm text-green-600 dark:text-green-400">Image uploaded</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload("before")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* After Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            After Image (Colorized)
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              afterImage
                ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
            }`}
          >
            {afterImage ? (
              <div className="space-y-3">
                <img
                  src={afterImage}
                  alt="After"
                  className="max-h-48 mx-auto rounded-lg"
                />
                <p className="text-sm text-green-600 dark:text-green-400">Image uploaded</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Sparkles className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload("after")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Comparison Slider */}
      {beforeImage && afterImage ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-purple-600" />
            Interactive Comparison
          </h3>

          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            {/* After Image (full background) */}
            <img
              src={afterImage}
              alt="After"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before Image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: "none" }}
                draggable={false}
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-gray-600" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
              Before
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
              After
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadComparison}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Side-by-Side Comparison
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 text-center">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Upload both images to create an interactive comparison
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-purple-600" />
          Tips for Great Comparisons
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• Use images of the same dimensions for best results</li>
          <li>• Make sure the images are properly aligned</li>
          <li>• The comparison slider works on both desktop and mobile</li>
          <li>• Downloaded image includes both photos side by side with labels</li>
          <li>• Great for sharing on social media or with family</li>
        </ul>
      </div>
    </div>
  )
}
