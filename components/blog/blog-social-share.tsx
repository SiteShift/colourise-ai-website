"use client"

import { motion } from "framer-motion"
import { Share2, Twitter, Facebook, Linkedin, Link2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BlogSocialShareProps {
  title: string
  url: string
}

export function BlogSocialShare({ title, url }: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `${title} | ColorizeAI Blog`
  const encodedTitle = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(url)

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=ColorizeAI`,
      color: "hover:bg-blue-500 hover:text-white",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:bg-blue-700 hover:text-white",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
      color: "hover:bg-gray-600 hover:text-white",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2">
        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Share this article
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare(link.url)}
              className={`${link.bgColor} ${link.color} border-gray-200 dark:border-gray-600 transition-all duration-200`}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.name}
            </Button>
          </motion.div>
        ))}

        {/* Copy Link Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: shareLinks.length * 0.1 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className={`bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-600 transition-all duration-200 ${
              copied
                ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Link2 className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </motion.div>
      </div>

      {/* Share Stats */}
      <div className="text-sm text-gray-500 dark:text-gray-500">
        <p>Help others discover ColorizeAI by sharing this article</p>
      </div>
    </div>
  )
} 