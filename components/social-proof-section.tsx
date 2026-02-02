"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

const featuredTestimonials = [
  {
    id: 1,
    name: "Linda Martinez",
    role: "Mom of 3, Chicago",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Found a box of my dad's Korean War photos in the basement. Spent $800 on professional restoration before - ColorizeAI did it better in 3 minutes for free. My 85-year-old mom cried when she saw Dad's unit in full color.",
    beforeImage: "/placeholder.svg?height=200&width=200",
    afterImage: "/placeholder.svg?height=200&width=200",
    highlight: "Saved $800 vs professional restoration"
  },
  {
    id: 2,
    name: "James Chen",
    role: "History Teacher, San Francisco",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "My students were bored by our 1920s unit until I colorized historical photos with this app. Now they're asking for extra assignments. The detail is incredible - you can see the exact shade of a Model T Ford.",
    beforeImage: "/placeholder.svg?height=200&width=200",
    afterImage: "/placeholder.svg?height=200&width=200",
    highlight: "Students asking for extra assignments"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Graphic Designer, Austin",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I charge $200/hour for photo restoration. This AI is honestly better than what I can do manually. Used it for my wedding photos from 1998 - they look like they were shot yesterday on a modern camera.",
    beforeImage: "/placeholder.svg?height=200&width=200",
    afterImage: "/placeholder.svg?height=200&width=200",
    highlight: "Better than $200/hour professional work"
  }
]

const scrollingReviews1 = [
  {
    name: "David Kim",
    role: "Software Engineer",
    text: "Colorized my grandfather's 1943 Navy photos. The uniforms came out perfect - even got the anchor insignia color right.",
    rating: 5,
    location: "Seattle, WA"
  },
  {
    name: "Sarah Thompson",
    role: "Nurse",
    text: "My daughter's school project on family history won 1st place thanks to these colorized photos from the 1960s.",
    rating: 5,
    location: "Dallas, TX"
  },
  {
    name: "Mike O'Brien",
    role: "Retired Teacher",
    text: "Tried 4 other apps first. This one actually got my Irish grandmother's red hair the right shade.",
    rating: 5,
    location: "Boston, MA"
  },
  {
    name: "Amy Zhang",
    role: "Marketing Manager",
    text: "Restored my parents' wedding album from 1985. They're using the colorized photos for their 40th anniversary.",
    rating: 5,
    location: "Los Angeles, CA"
  },
  {
    name: "Carlos Mendez",
    role: "Construction Foreman",
    text: "My 92-year-old abuela saw her childhood home in color for the first time. She remembered details she'd forgotten.",
    rating: 5,
    location: "Phoenix, AZ"
  },
  {
    name: "Jennifer Park",
    role: "Veterinarian",
    text: "Colorized photos from my med school graduation. The accuracy on the university colors is spot-on.",
    rating: 5,
    location: "Portland, OR"
  }
]

const scrollingReviews2 = [
  {
    name: "Robert Wilson",
    role: "Firefighter",
    text: "Found my dad's 1970s fire department photos. The red on the truck came out exactly like I remember it.",
    rating: 5,
    location: "Denver, CO"
  },
  {
    name: "Lisa Anderson",
    role: "Real Estate Agent",
    text: "Used this for a client's vintage home listing. The colorized historical photos helped sell the house in 3 days.",
    rating: 5,
    location: "Nashville, TN"
  },
  {
    name: "Kevin Patel",
    role: "Accountant",
    text: "My Indian wedding photos from 1995 looked washed out. Now the saris are vibrant and beautiful again.",
    rating: 5,
    location: "Atlanta, GA"
  },
  {
    name: "Rachel Green",
    role: "Elementary Teacher",
    text: "Colorized my classroom photos from the '90s. Even got the exact green of our old chalkboards right.",
    rating: 5,
    location: "Minneapolis, MN"
  },
  {
    name: "Tony Ricci",
    role: "Chef",
    text: "Restored photos of my great-grandfather's original pizzeria from 1952. The brick oven colors are perfect.",
    rating: 5,
    location: "Philadelphia, PA"
  },
  {
    name: "Michelle Liu",
    role: "Pharmacist",
    text: "My college graduation photos were damaged by water. This app saved memories I thought were lost forever.",
    rating: 5,
    location: "San Diego, CA"
  }
]

const stats = [
  { number: "4.8", label: "App Store Rating", sublabel: "From 127,439 real reviews" },
  { number: "3.2M", label: "Active Users", sublabel: "This month alone" },
  { number: "18.6M", label: "Photos Transformed", sublabel: "Since January 2024" },
  { number: "97%", label: "Would Recommend", sublabel: "To family & friends" },
]

// Scrolling review card component
function ReviewCard({ review }: { review: typeof scrollingReviews1[0] }) {
  return (
    <Card className="flex-shrink-0 w-80 mx-4 glassmorphism border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">"{review.text}"</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">{review.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{review.role}</div>
          </div>
          <div className="text-xs text-gray-500">{review.location}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SocialProofSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/10 dark:to-pink-900/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-white/70 backdrop-blur-lg text-black border-white/30 text-sm font-medium px-4 py-2 shadow-lg">
            Real Stories from Real Families ❤️
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by <span className="brand-gradient-text">Millions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real people sharing how ColorizeAI helped them rediscover precious family memories.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold brand-gradient-text mb-2">{stat.number}</div>
              <div className="text-gray-900 dark:text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {featuredTestimonials.map((testimonial, index) => (
            <div key={testimonial.id}>
              <Card className="h-full glassmorphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                {/* Highlight Badge */}
                <div className="absolute -top-3 left-6 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1">
                    {testimonial.highlight}
                  </Badge>
                </div>

                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={testimonial.beforeImage || "/placeholder.svg"}
                        alt="Before"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-red-500/90 text-white text-xs">Before</Badge>
                      </div>
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={testimonial.afterImage || "/placeholder.svg"}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-green-500/90 text-white text-xs">After</Badge>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Scrolling Reviews Row 1 (Left to Right) */}
      <div className="relative mb-8">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: [0, -1920]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...scrollingReviews1, ...scrollingReviews1].map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`} review={review} />
            ))}
          </motion.div>
        </div>
        
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
      </div>

      {/* Infinite Scrolling Reviews Row 2 (Right to Left) */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: [-1920, 0]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...scrollingReviews2, ...scrollingReviews2].map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`} review={review} />
            ))}
          </motion.div>
        </div>
        
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
