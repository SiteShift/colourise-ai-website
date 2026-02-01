"use client"

import { useState, useEffect } from "react"
import { Calculator, Printer, Monitor, Image, AlertTriangle, Check } from "lucide-react"

interface PrintSize {
  name: string
  width: number
  height: number
  unit: "in" | "cm"
}

const commonPrintSizes: PrintSize[] = [
  { name: "Wallet (2.5×3.5)", width: 2.5, height: 3.5, unit: "in" },
  { name: "4×6 Photo", width: 4, height: 6, unit: "in" },
  { name: "5×7 Photo", width: 5, height: 7, unit: "in" },
  { name: "8×10 Photo", width: 8, height: 10, unit: "in" },
  { name: "11×14 Photo", width: 11, height: 14, unit: "in" },
  { name: "16×20 Poster", width: 16, height: 20, unit: "in" },
  { name: "20×24 Poster", width: 20, height: 24, unit: "in" },
  { name: "24×36 Poster", width: 24, height: 36, unit: "in" },
  { name: "A4 (210×297mm)", width: 21, height: 29.7, unit: "cm" },
  { name: "A3 (297×420mm)", width: 29.7, height: 42, unit: "cm" },
]

export function ResolutionCalculator() {
  const [imageWidth, setImageWidth] = useState<number>(1200)
  const [imageHeight, setImageHeight] = useState<number>(1600)
  const [targetDPI, setTargetDPI] = useState<number>(300)
  const [selectedSize, setSelectedSize] = useState<PrintSize | null>(null)

  const calculateMaxPrintSize = () => {
    const maxWidthIn = imageWidth / targetDPI
    const maxHeightIn = imageHeight / targetDPI
    return { width: maxWidthIn, height: maxHeightIn }
  }

  const calculateRequiredResolution = (printSize: PrintSize) => {
    const widthIn = printSize.unit === "cm" ? printSize.width / 2.54 : printSize.width
    const heightIn = printSize.unit === "cm" ? printSize.height / 2.54 : printSize.height

    return {
      width: Math.ceil(widthIn * targetDPI),
      height: Math.ceil(heightIn * targetDPI),
    }
  }

  const getQualityRating = (printSize: PrintSize) => {
    const required = calculateRequiredResolution(printSize)
    const widthRatio = imageWidth / required.width
    const heightRatio = imageHeight / required.height
    const ratio = Math.min(widthRatio, heightRatio)

    if (ratio >= 1) return { rating: "Excellent", color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/30", icon: Check }
    if (ratio >= 0.75) return { rating: "Good", color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20", icon: Check }
    if (ratio >= 0.5) return { rating: "Acceptable", color: "text-yellow-600", bgColor: "bg-yellow-100 dark:bg-yellow-900/30", icon: AlertTriangle }
    return { rating: "Not Recommended", color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/30", icon: AlertTriangle }
  }

  const maxSize = calculateMaxPrintSize()

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Image className="w-5 h-5 text-purple-600" />
          Your Image Details
        </h3>

        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Width (pixels)
            </label>
            <input
              type="number"
              value={imageWidth}
              onChange={(e) => setImageWidth(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Height (pixels)
            </label>
            <input
              type="number"
              value={imageHeight}
              onChange={(e) => setImageHeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target DPI
            </label>
            <select
              value={targetDPI}
              onChange={(e) => setTargetDPI(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={72}>72 DPI (Screen)</option>
              <option value={150}>150 DPI (Draft Print)</option>
              <option value={300}>300 DPI (Photo Quality)</option>
              <option value={600}>600 DPI (Professional)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maximum Print Size Result */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Printer className="w-5 h-5 text-purple-600" />
          Maximum Print Size at {targetDPI} DPI
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Maximum Width</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {maxSize.width.toFixed(1)}" <span className="text-base font-normal text-gray-500">({(maxSize.width * 2.54).toFixed(1)} cm)</span>
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Maximum Height</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {maxSize.height.toFixed(1)}" <span className="text-base font-normal text-gray-500">({(maxSize.height * 2.54).toFixed(1)} cm)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Print Size Compatibility Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-purple-600" />
          Print Size Compatibility
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 font-medium">Print Size</th>
                <th className="pb-3 font-medium">Required Resolution</th>
                <th className="pb-3 font-medium">Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {commonPrintSizes.map((size) => {
                const required = calculateRequiredResolution(size)
                const quality = getQualityRating(size)
                const QualityIcon = quality.icon

                return (
                  <tr
                    key={size.name}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedSize(size)}
                  >
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {size.name}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">
                      {required.width.toLocaleString()} × {required.height.toLocaleString()} px
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${quality.bgColor} ${quality.color}`}>
                        <QualityIcon className="w-3.5 h-3.5" />
                        {quality.rating}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DPI Explanation */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Understanding DPI
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong className="text-gray-900 dark:text-white">DPI (Dots Per Inch)</strong> measures print resolution. Higher DPI means more detail.
          </p>
          <ul className="space-y-1 ml-4">
            <li>• <strong>72 DPI:</strong> Web/screen display only</li>
            <li>• <strong>150 DPI:</strong> Acceptable for large posters viewed from distance</li>
            <li>• <strong>300 DPI:</strong> Standard for photo prints and professional work</li>
            <li>• <strong>600 DPI:</strong> High-end printing, art reproduction</li>
          </ul>
          <p className="mt-4">
            <strong>Tip:</strong> For colorized old photos, scanning at 600 DPI gives you more pixels to work with, improving colorization quality.
          </p>
        </div>
      </div>
    </div>
  )
}
