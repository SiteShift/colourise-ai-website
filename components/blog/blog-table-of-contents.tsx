"use client"

import { useState, useEffect } from "react"
import { List, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function BlogTableOfContents() {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Extract headings from the page
    const headings = document.querySelectorAll("h2, h3")
    const items: TOCItem[] = []

    headings.forEach((heading, index) => {
      const text = heading.textContent || ""
      const level = parseInt(heading.tagName.charAt(1))
      const id = heading.id || `heading-${index}`
      
      // Set ID if not already present
      if (!heading.id) {
        heading.id = id
      }

      items.push({ id, text, level })
    })

    setTocItems(items)
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Table of Contents
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {isExpanded && (
          <nav>
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      item.level === 2 ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300 pl-6"
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </CardContent>
    </Card>
  )
} 