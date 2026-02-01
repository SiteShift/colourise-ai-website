"use client"

import { useState } from "react"
import { ChevronRight, Calendar, Camera, Shirt, Building, Car, Check } from "lucide-react"

interface DateClue {
  id: string
  question: string
  icon: React.ReactNode
  options: {
    label: string
    yearRange: [number, number]
    description: string
  }[]
}

const dateClues: DateClue[] = [
  {
    id: "photography",
    question: "What type of photograph is it?",
    icon: <Camera className="w-5 h-5" />,
    options: [
      { label: "Daguerreotype (mirror-like, in case)", yearRange: [1839, 1860], description: "First commercial photo process" },
      { label: "Tintype (dark metal plate)", yearRange: [1856, 1930], description: "Popular for portraits" },
      { label: "Cabinet card (mounted on cardboard)", yearRange: [1866, 1910], description: "Standard studio format" },
      { label: "Carte de visite (small card photo)", yearRange: [1859, 1895], description: "Collectible card photos" },
      { label: "Silver gelatin print (standard B&W)", yearRange: [1880, 1970], description: "Most common 20th century" },
      { label: "Snapshot (informal, amateur)", yearRange: [1900, 1970], description: "Kodak era personal photos" },
    ]
  },
  {
    id: "fashion-women",
    question: "Women's fashion style (if visible)?",
    icon: <Shirt className="w-5 h-5" />,
    options: [
      { label: "Huge hoop skirts, tight corsets", yearRange: [1850, 1870], description: "Civil War era" },
      { label: "Bustle dresses, high collars", yearRange: [1870, 1890], description: "Victorian bustle" },
      { label: "S-bend corset, puffed sleeves", yearRange: [1890, 1910], description: "Edwardian style" },
      { label: "Shorter hemlines, dropped waist", yearRange: [1920, 1929], description: "Flapper era" },
      { label: "Bias-cut, elegant gowns", yearRange: [1930, 1939], description: "Hollywood glamour" },
      { label: "Padded shoulders, A-line skirts", yearRange: [1940, 1949], description: "Wartime utility" },
      { label: "Full skirts, petticoats, cinched waist", yearRange: [1950, 1959], description: "New Look era" },
      { label: "Mod mini-skirts, go-go boots", yearRange: [1960, 1969], description: "Swinging Sixties" },
    ]
  },
  {
    id: "fashion-men",
    question: "Men's fashion style (if visible)?",
    icon: <Shirt className="w-5 h-5" />,
    options: [
      { label: "Top hats, frock coats", yearRange: [1850, 1890], description: "Victorian formal" },
      { label: "Bowler hats, morning coats", yearRange: [1890, 1920], description: "Edwardian style" },
      { label: "Fedoras, wide-leg trousers", yearRange: [1920, 1939], description: "Jazz Age to Depression" },
      { label: "Military uniforms, utility wear", yearRange: [1940, 1945], description: "WWII era" },
      { label: "Narrow ties, gray flannel suits", yearRange: [1950, 1959], description: "Organization Man" },
      { label: "Slim suits, Beatles-style", yearRange: [1960, 1969], description: "Mod era" },
    ]
  },
  {
    id: "vehicles",
    question: "Vehicles visible in the photo?",
    icon: <Car className="w-5 h-5" />,
    options: [
      { label: "Horse-drawn carriages only", yearRange: [1850, 1910], description: "Pre-automobile era" },
      { label: "Early cars (brass era, open)", yearRange: [1900, 1915], description: "Horseless carriage style" },
      { label: "Model T style (boxy, black)", yearRange: [1910, 1927], description: "Ford Model T era" },
      { label: "Rounded fenders, running boards", yearRange: [1930, 1945], description: "Pre-war streamline" },
      { label: "Chrome, fins, two-tone", yearRange: [1950, 1959], description: "Jet age styling" },
      { label: "Muscle cars, compact cars", yearRange: [1960, 1975], description: "Modern era begins" },
    ]
  },
  {
    id: "architecture",
    question: "Architecture or setting style?",
    icon: <Building className="w-5 h-5" />,
    options: [
      { label: "Ornate Victorian buildings", yearRange: [1870, 1900], description: "Victorian architecture" },
      { label: "Beaux-Arts, classical revival", yearRange: [1890, 1920], description: "Gilded Age grandeur" },
      { label: "Art Deco buildings", yearRange: [1920, 1940], description: "Machine age style" },
      { label: "Streamline moderne", yearRange: [1930, 1950], description: "Rounded, aerodynamic" },
      { label: "Mid-century modern", yearRange: [1945, 1965], description: "Post-war design" },
      { label: "Ranch houses, suburbia", yearRange: [1950, 1970], description: "American dream" },
    ]
  },
]

export function PhotoDateEstimator() {
  const [answers, setAnswers] = useState<Record<string, [number, number]>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (clueId: string, yearRange: [number, number]) => {
    setAnswers({ ...answers, [clueId]: yearRange })

    if (currentStep < dateClues.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateEstimate = (): { start: number; end: number; confidence: string } => {
    const ranges = Object.values(answers)
    if (ranges.length === 0) return { start: 1850, end: 1970, confidence: "Low" }

    // Find overlapping range
    let start = Math.max(...ranges.map(r => r[0]))
    let end = Math.min(...ranges.map(r => r[1]))

    // If no overlap, find the most common era
    if (start > end) {
      const midpoints = ranges.map(r => (r[0] + r[1]) / 2)
      const avgMidpoint = midpoints.reduce((a, b) => a + b) / midpoints.length
      start = Math.floor(avgMidpoint - 10)
      end = Math.ceil(avgMidpoint + 10)
    }

    const confidence = ranges.length >= 3 ? "High" : ranges.length >= 2 ? "Medium" : "Low"

    return { start, end, confidence }
  }

  const reset = () => {
    setAnswers({})
    setCurrentStep(0)
    setShowResult(false)
  }

  const currentClue = dateClues[currentStep]
  const estimate = calculateEstimate()

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {dateClues.map((clue, index) => (
          <div key={clue.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index < currentStep || showResult
                  ? "bg-green-500 text-white"
                  : index === currentStep && !showResult
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
              }`}
            >
              {index < currentStep || showResult ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < dateClues.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}
          </div>
        ))}
      </div>

      {!showResult ? (
        /* Question Card */
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              {currentClue.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentClue.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentClue.options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(currentClue.id, option.yearRange)}
                className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {option.description} ({option.yearRange[0]}-{option.yearRange[1]})
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentStep < dateClues.length - 1) {
                setCurrentStep(currentStep + 1)
              } else {
                setShowResult(true)
              }
            }}
            className="mt-4 text-sm text-gray-500 hover:text-purple-600 transition-colors"
          >
            Skip this question →
          </button>
        </div>
      ) : (
        /* Results Card */
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800">
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Estimated Date Range
            </h3>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {estimate.start} - {estimate.end}
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                estimate.confidence === "High"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : estimate.confidence === "Medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
              }`}>
                {estimate.confidence} Confidence
              </span>
            </div>
          </div>

          {/* Summary of clues used */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Clues Analyzed ({Object.keys(answers).length} of {dateClues.length})
            </h4>
            <div className="space-y-2">
              {dateClues.map((clue) => (
                <div key={clue.id} className="flex items-center gap-2 text-sm">
                  {answers[clue.id] ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                  )}
                  <span className={answers[clue.id] ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                    {clue.question.replace("?", "")}
                    {answers[clue.id] && (
                      <span className="text-purple-600 dark:text-purple-400 ml-2">
                        ({answers[clue.id][0]}-{answers[clue.id][1]})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Estimate Another Photo
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Tips for More Accurate Dating
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• Look for studio backdrops and props for earlier photos</li>
          <li>• Check for inscriptions or dates on the back of prints</li>
          <li>• Hairstyles can be as telling as clothing styles</li>
          <li>• Technology in photos (phones, TVs) can narrow dates significantly</li>
          <li>• Consider geographical location—trends varied by region</li>
        </ul>
      </div>
    </div>
  )
}
