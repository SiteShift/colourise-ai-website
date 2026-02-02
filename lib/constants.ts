// Centralized site configuration for ColorizeAI
// This ensures consistency across the codebase

export const SITE_CONFIG = {
  name: 'ColorizeAI',
  url: 'https://colorizeai.app',
  email: 'hello@colorizeai.app',
  description: 'Transform black & white photos into stunning color images with AI. Restore old family photos, enhance faces, and upscale to 4K quality.',
  social: {
    twitter: 'https://twitter.com/colorizeai',
    facebook: 'https://facebook.com/colorizeai',
    instagram: 'https://instagram.com/colorizeai',
    youtube: 'https://youtube.com/colorizeai',
    linkedin: 'https://linkedin.com/company/colorizeai',
  },
  author: {
    name: 'Dr. Eleanor Grant',
    title: 'AI Research Lead',
    url: '/about',
  },
} as const

export const BASE_URL = SITE_CONFIG.url

// SEO-related constants
export const SEO_DEFAULTS = {
  titleTemplate: '%s | ColorizeAI',
  defaultTitle: 'ColorizeAI - Bring Your Memories to Life with AI Photo Colorization',
  ogImage: `${BASE_URL}/hero-background.webp`,
  twitterHandle: '@colorizeai',
} as const

// Analytics events
export const ANALYTICS_EVENTS = {
  WAITLIST_SIGNUP: 'waitlist_signup',
  CTA_CLICK: 'cta_click',
  TOOL_USED: 'tool_used',
  BLOG_READ: 'blog_read',
  SOCIAL_SHARE: 'social_share',
} as const
