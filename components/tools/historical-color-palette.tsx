"use client"

import { useState } from "react"
import { ChevronDown, Copy, Check, Info } from "lucide-react"

interface Era {
  name: string
  years: string
  description: string
  palettes: {
    category: string
    colors: { name: string; hex: string; usage: string }[]
  }[]
}

const historicalEras: Era[] = [
  {
    name: "Victorian Era",
    years: "1837-1901",
    description: "Rich, deep colors from natural dyes. Dark and muted tones dominated fashion and interiors.",
    palettes: [
      {
        category: "Fashion & Textiles",
        colors: [
          { name: "Burgundy", hex: "#722F37", usage: "Formal wear, dresses" },
          { name: "Navy Blue", hex: "#1B2838", usage: "Men's suits, outerwear" },
          { name: "Forest Green", hex: "#2C5530", usage: "Everyday wear" },
          { name: "Mourning Black", hex: "#1A1A1A", usage: "Mourning attire" },
          { name: "Ivory", hex: "#FFFFF0", usage: "Wedding dresses, undergarments" },
        ]
      },
      {
        category: "Interiors & Architecture",
        colors: [
          { name: "Mahogany", hex: "#4E2728", usage: "Furniture, woodwork" },
          { name: "Gold", hex: "#D4AF37", usage: "Gilding, accents" },
          { name: "Olive", hex: "#556B2F", usage: "Wall coverings" },
          { name: "Terra Cotta", hex: "#B85C38", usage: "Tiles, pottery" },
        ]
      }
    ]
  },
  {
    name: "Edwardian Era",
    years: "1901-1910",
    description: "Softer, lighter colors emerged. Pastels and whites became fashionable for women.",
    palettes: [
      {
        category: "Fashion & Textiles",
        colors: [
          { name: "Cream", hex: "#FFFDD0", usage: "Women's dresses" },
          { name: "Lavender", hex: "#B4A7D6", usage: "Afternoon wear" },
          { name: "Rose Pink", hex: "#E8B4BC", usage: "Evening gowns" },
          { name: "Dove Gray", hex: "#A0A0A0", usage: "Men's formal wear" },
          { name: "Soft Blue", hex: "#A7C7E7", usage: "Day dresses" },
        ]
      },
      {
        category: "Interiors",
        colors: [
          { name: "Sage Green", hex: "#9DC183", usage: "Wallpaper, textiles" },
          { name: "Dusty Rose", hex: "#C4A4A4", usage: "Upholstery" },
          { name: "Warm White", hex: "#FAF0E6", usage: "Walls, ceilings" },
        ]
      }
    ]
  },
  {
    name: "1910s-1920s",
    years: "1910-1929",
    description: "WWI brought military influences. The 1920s saw Art Deco colors emerge.",
    palettes: [
      {
        category: "WWI Military",
        colors: [
          { name: "Olive Drab", hex: "#6B6B47", usage: "US Army uniforms" },
          { name: "Khaki", hex: "#C3B091", usage: "British Army" },
          { name: "Field Gray", hex: "#6D6F5A", usage: "German uniforms" },
          { name: "Navy Blue", hex: "#1B325F", usage: "Naval uniforms" },
        ]
      },
      {
        category: "1920s Fashion",
        colors: [
          { name: "Jet Black", hex: "#0A0A0A", usage: "Evening wear" },
          { name: "Gold", hex: "#FFD700", usage: "Accessories, trim" },
          { name: "Emerald", hex: "#50C878", usage: "Art Deco jewelry" },
          { name: "Coral", hex: "#FF7F50", usage: "Day wear" },
          { name: "Silver", hex: "#C0C0C0", usage: "Evening accessories" },
        ]
      }
    ]
  },
  {
    name: "1930s-1940s",
    years: "1930-1949",
    description: "Depression-era practicality followed by wartime austerity. Muted, practical colors.",
    palettes: [
      {
        category: "1930s Fashion",
        colors: [
          { name: "Powder Blue", hex: "#B0E0E6", usage: "Day wear" },
          { name: "Dusty Pink", hex: "#D4A5A5", usage: "Evening wear" },
          { name: "Brown", hex: "#6B4423", usage: "Everyday wear" },
          { name: "Cream", hex: "#FFFDD0", usage: "Summer wear" },
        ]
      },
      {
        category: "WWII Era",
        colors: [
          { name: "OD Green", hex: "#4A5D23", usage: "US Army" },
          { name: "Khaki", hex: "#BDB76B", usage: "British Forces" },
          { name: "Navy Blue", hex: "#1B325F", usage: "Navy uniforms" },
          { name: "Air Force Blue", hex: "#5D8AA8", usage: "Air Force" },
          { name: "Utility Gray", hex: "#808080", usage: "Civilian clothing" },
        ]
      }
    ]
  },
  {
    name: "1950s",
    years: "1950-1959",
    description: "Post-war optimism brought bright, cheerful colors. Pastels and bold primaries dominated.",
    palettes: [
      {
        category: "Fashion",
        colors: [
          { name: "Cherry Red", hex: "#DE3163", usage: "Dresses, lipstick" },
          { name: "Turquoise", hex: "#40E0D0", usage: "Jewelry, home decor" },
          { name: "Pink", hex: "#FFB6C1", usage: "Women's wear" },
          { name: "Mint Green", hex: "#98FF98", usage: "Kitchens, appliances" },
          { name: "Yellow", hex: "#FFE135", usage: "Dresses, home decor" },
        ]
      },
      {
        category: "Automobiles & Home",
        colors: [
          { name: "Coral", hex: "#FF6F61", usage: "Cars, kitchens" },
          { name: "Two-Tone Cream", hex: "#FFFDD0", usage: "Car trim" },
          { name: "Chrome", hex: "#DBE2E9", usage: "Appliances, cars" },
          { name: "Aqua", hex: "#7FFFD4", usage: "Bathrooms, kitchens" },
        ]
      }
    ]
  },
  {
    name: "1960s",
    years: "1960-1969",
    description: "Bold, psychedelic colors emerged mid-decade. Mod and pop art influenced palettes.",
    palettes: [
      {
        category: "Early 60s",
        colors: [
          { name: "Kelly Green", hex: "#4CBB17", usage: "Fashion" },
          { name: "Orange", hex: "#FF7F00", usage: "Mod fashion" },
          { name: "Hot Pink", hex: "#FF69B4", usage: "Women's wear" },
          { name: "Electric Blue", hex: "#7DF9FF", usage: "Pop art" },
        ]
      },
      {
        category: "Late 60s Psychedelic",
        colors: [
          { name: "Acid Green", hex: "#B0BF1A", usage: "Counterculture" },
          { name: "Purple", hex: "#800080", usage: "Fashion, decor" },
          { name: "Tangerine", hex: "#FF9966", usage: "Fashion" },
          { name: "Tie-Dye Mix", hex: "#FF1493", usage: "Casual wear" },
          { name: "Earth Brown", hex: "#7B5B3A", usage: "Hippie fashion" },
        ]
      }
    ]
  }
]

export function HistoricalColorPalette() {
  const [selectedEra, setSelectedEra] = useState<Era>(historicalEras[0])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedColor(hex)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Era Selector */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Historical Era
        </label>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left hover:border-purple-500 transition-colors"
        >
          <span className="font-medium text-gray-900 dark:text-white">
            {selectedEra.name} ({selectedEra.years})
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            {historicalEras.map((era) => (
              <button
                key={era.name}
                onClick={() => {
                  setSelectedEra(era)
                  setIsDropdownOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedEra.name === era.name ? "bg-purple-50 dark:bg-purple-900/20" : ""
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {era.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {era.years}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Era Description */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-purple-800 dark:text-purple-200">
          {selectedEra.description}
        </p>
      </div>

      {/* Color Palettes */}
      <div className="space-y-8">
        {selectedEra.palettes.map((palette) => (
          <div key={palette.category}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {palette.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {palette.colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                >
                  {/* Color swatch */}
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />

                  {/* Color info */}
                  <div className="p-3">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {color.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      {copiedColor === color.hex ? (
                        <>
                          <Check className="w-3 h-3 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          {color.hex}
                        </>
                      )}
                    </p>
                  </div>

                  {/* Usage tooltip on hover */}
                  <div className="absolute inset-x-0 top-0 p-2 bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {color.usage}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How to Use */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mt-8">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          How to Use These Palettes
        </h3>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>1. Identify when your photograph was taken</li>
          <li>2. Select the corresponding era above</li>
          <li>3. Use these colors as reference when evaluating AI colorization results</li>
          <li>4. Click any color to copy its hex code for color correction</li>
        </ol>
      </div>
    </div>
  )
}
