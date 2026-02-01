"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Mail, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Author {
  name: string
  title: string
  avatar: string
  bio: string
}

interface BlogAuthorBioProps {
  author: Author
  silo: string
}

const SiloPositioning = {
  fundamentals: {
    intro: "As someone who developed colorization algorithms during my PhD at UCL, I've witnessed firsthand how AI has revolutionized photo restoration.",
    expertise: "Algorithm Developer & Computer Vision Researcher",
    focus: "Neural networks, deep learning, and AI image processing"
  },
  restoration: {
    intro: "From my years leading digital preservation at the British Library, I understand the delicate balance between technology and historical accuracy.",
    expertise: "Digital Preservation Expert & Restoration Specialist",
    focus: "Archival standards, photo preservation, and restoration workflows"
  },
  family: {
    intro: "I've watched thousands of families reconnect with their heritage through colorized photos, and it never gets old seeing those emotional reactions.",
    expertise: "Memory Preservation Advocate & Family History Expert",
    focus: "Genealogy research, family photo restoration, and memory preservation"
  },
  historical: {
    intro: "Working with historical collections taught me that accuracy matters more than speed when bringing the past back to life.",
    expertise: "Academic Researcher & Digital Archivist",
    focus: "Historical documentation, educational applications, and cultural preservation"
  },
  comparisons: {
    intro: "Having tested every major colorization tool in our research lab, I know exactly what separates good software from great results.",
    expertise: "Industry Analyst & Lab Testing Specialist",
    focus: "Software evaluation, performance testing, and tool optimization"
  },
  professional: {
    intro: "When consulting for museums and institutions, I've learned that professional workflows require both technical excellence and practical efficiency.",
    expertise: "Business Consultant & Technical Advisor",
    focus: "Enterprise solutions, workflow optimization, and professional standards"
  }
}

export function BlogAuthorBio({ author, silo }: BlogAuthorBioProps) {
  const positioning = SiloPositioning[silo as keyof typeof SiloPositioning] || SiloPositioning.fundamentals

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-12 border-t-2 border-gray-200 dark:border-gray-700"
    >
      <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={author.avatar || "/dr-eleanor-grant.webp"}
                  alt={author.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-2">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Author Content */}
            <div className="flex-1">
              {/* Author Name & Title */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {author.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {author.title}
                </p>
                <Badge className="bg-white/70 backdrop-blur-sm text-gray-700 border-gray-200">
                  {positioning.expertise}
                </Badge>
              </div>

              {/* Credentials */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {author.bio}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Specializes in: {positioning.focus}
                </p>
              </div>

              {/* Silo-Specific Introduction */}
              <blockquote className="border-l-4 border-gradient-to-b from-pink-500 to-purple-600 pl-4 mb-6">
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  "{positioning.intro}"
                </p>
              </blockquote>

              {/* Stats & Achievements */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">250k+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Photos Digitized</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">15+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Research Papers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link
                  href="https://linkedin.com/in/eleanor-grant-colorizeai"
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Link>
                <Link
                  href="mailto:eleanor@colorizeai.com"
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 