"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FAQ {
  question: string
  answer: string
}

interface BlogFAQAccordionProps {
  faqs: FAQ[]
}

export function BlogFAQAccordion({ faqs }: BlogFAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])) // First item open by default

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  if (faqs.length === 0) {
    return null
  }

  return (
    <section className="mt-24 mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            <span className="brand-gradient-text">Frequently Asked</span> Questions
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get answers to the most common questions about AI photo colorization
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 flex items-center justify-between"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white pr-4 leading-tight">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-6 pt-0">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 