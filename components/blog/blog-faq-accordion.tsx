"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface BlogFAQAccordionProps {
  faqs: FAQ[]
}

export function BlogFAQAccordion({ faqs }: BlogFAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]))

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
    <section className="mt-16 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left p-5 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-between"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </h3>
              <div className="flex-shrink-0">
                {openItems.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-pink-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {openItems.has(index) && (
              <div className="px-5 pb-5">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
