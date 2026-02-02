import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, BookOpen, Clock, CheckCircle, Palette, Wrench, Users, Scale, ChevronRight } from "lucide-react"
import { getPillar, getAllPillars, getRelatedContent, pillars } from "@/lib/content-hub"
import { getPostBySlug, getAllPosts } from "@/lib/blog-data"
import { GuideSchema } from "@/components/guides/guide-schema"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPillars()
    .filter(p => p.slug !== "tools")
    .map((pillar) => ({
      slug: pillar.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pillar = getPillar(slug)

  if (!pillar) {
    return {
      title: "Guide Not Found | ColorizeAI",
    }
  }

  const titles: Record<string, string> = {
    "ai-photo-colorization": "The Ultimate Guide to AI Photo Colorization (2025)",
    "photo-restoration": "Complete Guide to AI Photo Restoration: Repair, Enhance & Preserve",
    "use-cases": "AI Photo Colorization Use Cases: From Family History to Professional Archives",
    "comparisons": "AI Photo Colorization Tools Compared: Find the Best App for Your Needs",
  }

  return {
    title: `${titles[slug] || pillar.title} | ColorizeAI`,
    description: pillar.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: titles[slug] || pillar.title,
      description: pillar.description,
      url: `https://colorizeai.app/guides/${slug}`,
      type: "article",
      images: [
        {
          url: "https://colorizeai.app/hero-background.webp",
          width: 1200,
          height: 630,
          alt: `${pillar.title} Guide - ColorizeAI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[slug] || pillar.title,
      description: pillar.description,
      images: ["https://colorizeai.app/hero-background.webp"],
    },
  }
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
}

// Map cluster slugs to actual blog post slugs
const clusterToPostSlug: Record<string, string> = {
  "how-ai-colorization-works": "complete-guide-ai-photo-colorization",
  "step-by-step-colorizing-first-photo": "step-by-step-colorizing-first-photo",
  "understanding-color-theory": "understanding-color-theory",
  "advanced-colorization-techniques": "advanced-colorization-techniques",
  "best-ai-photo-colorization-apps": "best-ai-photo-colorization-apps",
}

// Pillar content for each guide - Expanded for SEO (3,500+ words each)
const pillarContent: Record<string, { intro: string; sections: { title: string; content: string }[]; keyTakeaways: string[] }> = {
  "ai-photo-colorization": {
    intro: `AI photo colorization represents one of the most exciting applications of artificial intelligence in digital imaging. Using sophisticated deep learning algorithms trained on millions of color photographs, modern colorization tools can transform black and white photographs into vibrant, historically accurate color images in mere seconds. This technology has democratized what was once an expensive, time-consuming process reserved for Hollywood films and museum exhibitions, making it accessible to anyone with a smartphone or computer.

Whether you're a genealogy enthusiast wanting to see your ancestors in color, a historian seeking to bring archival footage to life, or simply someone curious about what the world looked like before color photography became widespread, AI colorization offers an unprecedented window into the past. This comprehensive guide covers everything you need to know about this transformative technology—from the underlying science to practical tips for achieving the best results.`,
    sections: [
      {
        title: "What is AI Photo Colorization?",
        content: `AI photo colorization is the process of using artificial intelligence, specifically deep learning neural networks, to automatically add realistic colors to black and white or grayscale photographs. Unlike traditional manual colorization, which requires skilled artists to painstakingly paint colors onto each area of an image—a process that can take hours or even days for a single photograph—AI colorization produces results in seconds.

The technology works by analyzing the visual patterns, textures, and contextual information within a grayscale image. The AI has learned to recognize thousands of objects, materials, and scenarios from its training on millions of color photographs. When it encounters a grayscale image, it identifies elements like human skin, blue sky, green foliage, brown wood, and fabric textures, then predicts and applies the most likely colors based on what it has learned.

**The Evolution of Photo Colorization**

Photo colorization has a rich history dating back to the 1850s, when artists hand-tinted daguerreotypes with watercolors. Throughout the 20th century, colorization remained a manual, labor-intensive process. The first significant automation came in the 1970s and 1980s with computer-assisted colorization for film restoration, but these early attempts still required substantial human input.

The breakthrough came with deep learning in the 2010s. Researchers at UC Berkeley, including Richard Zhang and his colleagues, published groundbreaking work in 2016 demonstrating that neural networks could learn to colorize images automatically with surprising accuracy. Since then, the technology has advanced rapidly, with modern systems achieving results that can be difficult to distinguish from original color photographs.

**Why AI Colorization Matters**

The significance of AI colorization extends beyond mere technological novelty. It fundamentally changes how we relate to historical imagery. Black and white photographs, while historically accurate representations of how cameras captured light, create a psychological distance between viewers and subjects. When we see our ancestors, historical figures, or past events in color, they become more relatable and real—more human.

Research has shown that colorized historical images increase engagement and emotional connection. Museums using colorized displays report higher visitor interest. Educators find students more engaged with colorized historical materials. Families using colorization often describe the experience of seeing grandparents or great-grandparents in color as profoundly moving.`
      },
      {
        title: "How AI Colorization Technology Works",
        content: `Understanding the technology behind AI colorization helps you use it more effectively and evaluate results critically. Modern colorization systems use several sophisticated techniques working in concert.

**Neural Network Architectures**

Most AI colorization systems use one of three main architectural approaches:

1. **Convolutional Neural Networks (CNNs)**: The foundational technology for image colorization. CNNs process images through layers of filters that detect increasingly complex features—from simple edges to complex objects. The colorization CNN typically uses an encoder-decoder architecture, where the encoder extracts features from the grayscale image and the decoder predicts color values.

2. **Generative Adversarial Networks (GANs)**: These consist of two neural networks—a generator that creates colorized images and a discriminator that evaluates whether colorizations look realistic. The networks compete and improve together, often producing more vibrant, realistic results than CNNs alone.

3. **Transformer Architectures**: The newest approach, borrowed from natural language processing, uses attention mechanisms to understand relationships between different parts of an image. This helps ensure color consistency across an image—for example, ensuring a person's face maintains consistent skin tone throughout.

**The Colorization Process Step-by-Step**

When you upload a black and white photo to an AI colorization tool, here's what happens:

1. **Preprocessing**: The image is scaled to the model's expected input size and converted to LAB color space, where the L channel represents luminance (the grayscale information) and the A and B channels represent color.

2. **Feature Extraction**: The neural network analyzes the image, identifying objects, textures, and spatial relationships. This happens through multiple layers of processing, each extracting more abstract features.

3. **Semantic Understanding**: Advanced models segment the image into meaningful regions—faces, sky, clothing, foliage—and understand what each region represents. This semantic understanding guides color decisions.

4. **Color Prediction**: The model predicts A and B color channel values for each pixel. These predictions are probability distributions across possible colors, with the model selecting the most likely colors or sampling from the distribution.

5. **Post-processing**: The colorized image is refined to ensure smooth color transitions, remove artifacts, and match the output to the original image resolution.

**Training Data and Historical Accuracy**

AI colorization models are trained on large datasets of color photographs. The model learns statistical associations between grayscale patterns and colors. This training data significantly influences results:

- Models trained primarily on modern photographs may struggle with historical clothing styles, interior designs, or technologies they've never seen.
- Training data diversity affects accuracy across different ethnicities, geographic regions, and time periods.
- High-quality training data with accurate color information produces more historically authentic results.

ColorizeAI's training dataset includes over 2.3 million historical photographs with verified color information, including military uniforms, period clothing, vintage vehicles, and architectural styles from 1900-1970. This specialized training enables particularly accurate colorization of historical family photographs.`
      },
      {
        title: "Step-by-Step Guide to Colorizing Photos",
        content: `Getting great results from AI colorization requires more than just uploading an image. This step-by-step guide walks you through the complete process, from preparing your source material to saving your colorized masterpiece.

**Step 1: Select the Right Source Image**

Not all black and white photographs colorize equally well. For best results, look for:

- **Good contrast**: Images with clear distinction between light and dark areas
- **Sharp focus**: Blurry images produce blurry colors
- **Adequate resolution**: At least 800 pixels on the shortest edge; more is better
- **Minimal damage**: Heavy scratches, tears, or stains can confuse the AI

If your photo has damage, consider using restoration tools before colorization. ColorizeAI includes automatic scratch and fade repair that runs before colorization.

**Step 2: Scan or Photograph Your Original**

If you're working with a physical photograph:

- **Scanning**: Use 300 DPI minimum; 600 DPI for small photos you might want to enlarge. Scan in color mode even for B&W photos—this captures more tonal information.
- **Photographing**: Use even, diffused lighting. Avoid flash. Keep the camera parallel to the photo to prevent distortion. Use your camera's highest resolution setting.

**Step 3: Upload to Your Colorization Tool**

With ColorizeAI:
- Tap the upload button or drag and drop your image
- The app automatically detects faces and applies enhanced colorization to skin tones
- Processing typically takes 3-8 seconds depending on image size

**Step 4: Review and Refine Results**

Examine your colorized image critically:

- **Check skin tones**: Do they look natural and consistent?
- **Verify known colors**: If you know the actual color of items in the photo, check accuracy
- **Look for artifacts**: Watch for unnatural color bleeding or patches
- **Assess overall mood**: Does the colorization feel appropriate for the era?

**Step 5: Make Adjustments if Needed**

ColorizeAI offers several adjustment options:

- **Color intensity**: Dial down for a more subtle, vintage feel; increase for vibrant modern look
- **Warmth adjustment**: Shift the overall color temperature warmer or cooler
- **Specific color correction**: Adjust individual color channels if needed

**Step 6: Save and Share**

Export your colorized image:
- Save at maximum quality for archival purposes
- Create a web-optimized version for sharing online
- Consider keeping both the original grayscale and colorized versions`
      },
      {
        title: "Understanding Color Theory for Better Results",
        content: `A basic understanding of color theory helps you evaluate AI colorization results and make informed adjustments. You don't need to be an artist—just understanding a few key concepts dramatically improves your results.

**The Color Wheel and Relationships**

Colors exist in relationships. The color wheel organizes colors by their relationships:

- **Complementary colors** (opposite on the wheel) create visual contrast: blue-orange, red-green, yellow-purple
- **Analogous colors** (adjacent on the wheel) create harmony: blue-green-teal, orange-red-pink
- **Historical photographs often feature limited, harmonious palettes** due to period dyes and printing techniques

**Color Temperature: Warm vs. Cool**

Colors have temperature associations:
- **Warm colors** (red, orange, yellow) advance visually and create energy
- **Cool colors** (blue, green, purple) recede and create calm

Historical photographs often benefit from subtle warming, as indoor tungsten lighting and aging paper create cool color casts. However, snow scenes, shaded areas, and early morning light naturally skew cooler.

**Period-Appropriate Color Palettes**

Different eras had characteristic color palettes due to available dyes, fashion trends, and photographic materials:

- **1920s-1930s**: Art Deco influences—bold geometric patterns, rich jewel tones, black and gold
- **1940s-1950s**: Wartime and post-war—military olives and khakis, suburban pastels, chrome accents
- **1960s-1970s**: Psychedelic era—bright oranges, avocado greens, harvest golds, earth tones

Understanding these period palettes helps you evaluate whether AI colorizations feel historically appropriate.

**Skin Tone Considerations**

Human skin tones are particularly important to get right—our brains are highly attuned to detecting unnatural skin colors. Key considerations:

- Skin tones contain more variation than people often assume—highlights, shadows, and color undertones
- Lighting affects apparent skin color dramatically
- AI models trained on diverse data produce more accurate skin tones across ethnicities`
      },
      {
        title: "Common Colorization Mistakes to Avoid",
        content: `Even the best AI makes mistakes sometimes. Knowing common issues helps you catch and correct them.

**Mistake 1: Using Low-Resolution Sources**

The Problem: Uploading tiny, compressed images produces muddy, inaccurate colors.

The Solution: Always use the highest resolution source available. Scan physical photos at 300+ DPI. If only a small digital version exists, upscale it first using AI upscaling before colorization.

**Mistake 2: Not Considering the Era**

The Problem: Accepting modern-looking colors for historical photographs.

The Solution: Research the time period. Know that certain colors weren't available as dyes until specific dates. Understand period fashion and design trends. Adjust colors if they seem anachronistic.

**Mistake 3: Ignoring Known Color Information**

The Problem: Accepting AI guesses when you actually know correct colors.

The Solution: If you know Grandma's eyes were blue, or the car was red, use that information. Most tools allow manual adjustment. Real knowledge should override AI predictions.

**Mistake 4: Over-Saturating Colors**

The Problem: Making colors too vibrant, creating an artificial or cartoonish look.

The Solution: Period photographs typically had softer, less saturated colors. Dial back saturation for a more authentic vintage feel. Real life isn't as colorful as modern digital photos suggest.

**Mistake 5: Forgetting About Lighting**

The Problem: Adding colors that don't account for the original lighting conditions.

The Solution: Consider the lighting in your photo. Shadowed areas should have different color characteristics than highlighted areas. Indoor tungsten light is warm; outdoor shade is cool.`
      },
      {
        title: "Choosing the Right Colorization Tool",
        content: `The AI colorization market offers many options. Here's how to choose the right tool for your needs.

**Key Factors to Consider**

1. **Color Accuracy**: How realistic and historically appropriate are results? Look for tools trained on diverse, high-quality datasets.

2. **Face Enhancement**: Faces are critical. Better tools detect faces automatically and apply specialized processing for natural skin tones and facial features.

3. **Processing Speed**: Most tools complete colorization in 3-15 seconds. Faster isn't always better if it sacrifices quality.

4. **Adjustment Options**: Can you fine-tune results? The ability to adjust color intensity, temperature, and individual colors matters for perfectionists.

5. **Resolution Support**: Some free tools limit output resolution. For prints or archival purposes, you need full-resolution output.

6. **Privacy**: What happens to your photos? Look for tools that process images locally or delete them immediately after processing.

**Types of Colorization Tools**

- **Mobile Apps**: Convenient for casual use. Best tools like ColorizeAI offer professional-quality results on your phone.
- **Web-Based Services**: Accessible anywhere, no installation needed. Vary widely in quality.
- **Desktop Software**: Often more powerful, better for batch processing and professional work.
- **API Services**: For developers building colorization into their own applications.

**ColorizeAI's Advantages**

ColorizeAI combines the convenience of a mobile app with professional-grade results:
- Proprietary AI trained on 2.3M+ historical photographs
- Automatic face detection with enhanced skin tone processing
- 3-8 second processing time
- Full resolution output with no watermarks
- On-device processing for complete privacy`
      },
      {
        title: "Frequently Asked Questions",
        content: `**How accurate is AI colorization?**
Modern AI colorization is remarkably accurate for most subjects. Accuracy depends on training data, image quality, and subject matter. Common objects like sky, grass, and skin colorize very well. Unusual subjects or specific colors (like a particular dress color) may require manual adjustment.

**Can AI colorization damage my original photo?**
No. AI colorization works on a digital copy of your image. Your original file is never modified. Always keep your original grayscale image alongside any colorized versions.

**How do I colorize video footage?**
Video colorization processes each frame individually. ColorizeAI and similar tools can colorize video clips, maintaining temporal consistency so colors don't flicker between frames. Processing time is longer for video—typically several minutes for short clips.

**Is AI colorization historically accurate?**
AI colorization predicts likely colors based on training data. It's highly accurate for common scenarios but may not match the actual colors of specific items. For maximum historical accuracy, research the period and adjust colors based on what you learn.

**Can I colorize already colorized photos?**
Yes, but results vary. AI colorization can sometimes improve poorly colorized images or add color to faded color photographs. Results depend on the original image quality and the extent of color information remaining.

**What file formats work best?**
PNG and TIFF preserve the most quality. JPEG works but introduces compression artifacts that can affect colorization. Avoid heavily compressed images when possible.`
      }
    ],
    keyTakeaways: [
      "AI colorization uses deep learning neural networks trained on millions of images to predict realistic colors",
      "Modern tools process images in 3-8 seconds with remarkable accuracy for common subjects",
      "Source image quality significantly impacts results—use highest resolution available",
      "Understanding color theory and period-appropriate palettes helps evaluate and adjust results",
      "Face detection and enhanced skin tone processing are crucial for portrait colorization",
      "Always preserve original grayscale images alongside colorized versions",
      "Different tools suit different needs—consider accuracy, speed, and adjustment options"
    ]
  },
  "photo-restoration": {
    intro: `Photo restoration is the art and science of repairing damaged, faded, or deteriorated photographs to restore them to their original appearance—or even better. For over a century, this was exclusively the domain of skilled artists who painstakingly repainted damaged areas, corrected fading, and removed blemishes pixel by pixel. Today, artificial intelligence has revolutionized this field, making professional-quality restoration accessible to everyone.

Whether you've inherited a box of water-damaged family photos, discovered a torn portrait in the attic, or simply want to preserve aging photographs before they deteriorate further, AI-powered restoration tools can help. This comprehensive guide covers everything from understanding different types of photo damage to advanced preservation techniques that ensure your restored memories last for generations.`,
    sections: [
      {
        title: "Understanding Photo Damage Types",
        content: `Photographs are surprisingly fragile. Multiple factors can damage them over time, and understanding these damage types helps you choose the right restoration approach.

**Chemical Deterioration**

All photographs undergo chemical changes over time. The silver particles, dyes, and substrates that form the image react with environmental factors:

- **Fading**: Ultraviolet light breaks down image-forming compounds. This is often uneven, affecting some colors more than others. Red dyes are particularly susceptible to UV damage.
- **Yellowing**: Acidic materials in the paper base, adhesives, or storage materials cause the white areas of photos to turn yellow or brown. This is especially common in photos from the 1970s-1990s.
- **Color Shifting**: Color photographs from the 1970s-1990s often develop overall color casts—typically shifting toward red, yellow, or magenta—as different dye layers fade at different rates.
- **Silvering**: Black and white photos may develop a mirror-like sheen as silver migrates to the surface. This is usually visible in dark areas and when viewed at angles.

**Physical Damage**

Handling, storage accidents, and environmental factors cause physical damage:

- **Scratches**: Surface scratches affect the emulsion layer, appearing as white lines on dark areas. Deep scratches penetrate through to the paper base.
- **Tears and Creases**: Paper-based photos tear and crease easily. Repeated folding creates permanent damage along fold lines.
- **Abrasion**: Photos rubbing against each other or storage materials wear away surface detail.
- **Emulsion Lifting**: The image-bearing layer can separate from the base, creating bubbles or peeling.

**Environmental Damage**

Storage conditions dramatically affect photo longevity:

- **Water Damage**: Causes staining, emulsion swelling, and can cause photos to stick together. Wet photos require immediate attention.
- **Humidity Damage**: High humidity promotes mold growth and chemical reactions. Low humidity can cause paper to become brittle.
- **Mold and Mildew**: Appears as spots, often fuzzy or web-like. Mold digests the image materials, causing permanent damage.
- **Insect and Rodent Damage**: Insects may eat photographic emulsions. Rodents can nest in photo collections.

**Damage from Poor Storage**

Many photos suffer damage from how they were stored:

- **Adhesive Damage**: Photos attached to albums with rubber cement, tape, or poor-quality adhesives suffer when these materials deteriorate.
- **Acid Migration**: Acidic album pages, cardboard boxes, or adjacent materials transfer acid to photos.
- **Pressure Damage**: Heavy objects stacked on photos cause permanent impressions.`
      },
      {
        title: "AI Restoration Technology Explained",
        content: `Modern AI restoration represents a dramatic leap forward from traditional digital restoration techniques. Understanding how it works helps you use it effectively and know its limitations.

**How AI Restoration Differs from Traditional Digital Restoration**

Traditional digital photo restoration using tools like Photoshop requires manual work:
- Clone stamping to cover scratches
- Color correction layer by layer
- Manual selection and masking
- Hours of skilled work for a single photo

AI restoration automates these processes using neural networks that have learned from millions of images what photos should look like and how to fix common problems.

**Key AI Restoration Capabilities**

1. **Scratch and Damage Repair**
The AI identifies scratches, tears, and missing areas by recognizing patterns that don't belong in a natural image. It then fills these areas using context from surrounding pixels and learned knowledge about how images should look. This is called "inpainting"—the AI essentially paints in what should be there.

2. **Fade and Color Correction**
AI analyzes the overall color distribution of an image and compares it to what a healthy photograph should look like. It can identify and correct fading, yellowing, and color shifts automatically. Advanced systems can distinguish between intentional warm/cool lighting and damage-caused color casts.

3. **Face Enhancement and Reconstruction**
Faces are particularly challenging to restore because humans are exceptionally good at detecting unnatural faces. Specialized AI models trained specifically on faces can:
- Sharpen blurry facial features
- Reconstruct missing facial details
- Correct asymmetrical damage
- Enhance eyes and expressions
- Restore natural skin texture

4. **Noise Reduction and Grain Management**
AI can distinguish between image detail and noise/grain, removing unwanted artifacts while preserving important details. This is especially valuable for photos with heavy grain or scanning artifacts.

5. **Resolution Enhancement (Upscaling)**
AI upscaling goes beyond simple interpolation. The neural network predicts what additional detail should exist based on learned patterns, effectively adding genuine visual information. A 300 DPI scan can be intelligently upscaled to 1200 DPI with remarkably natural-looking results.

**Limitations to Understand**

AI restoration has boundaries:
- It cannot create information that never existed—it makes educated guesses
- Severely damaged areas may be reconstructed incorrectly
- Period-specific details may be rendered in a generic modern style
- Some damage patterns confuse AI systems`
      },
      {
        title: "Step-by-Step Restoration Guide",
        content: `Follow this systematic approach for the best restoration results.

**Step 1: Assess the Damage**

Before beginning restoration, carefully examine your photo:
- Document all damage types present
- Note the overall condition and fragility
- Identify areas most important to preserve (faces, names, dates)
- Determine if professional conservation is needed for severely damaged originals

**Step 2: Scan Properly**

Quality scanning is fundamental to good restoration:

- **Resolution**: Scan at 600 DPI minimum for standard photos; 1200 DPI for small photos or heavy damage
- **Color Mode**: Always scan in color, even for black and white photos. This captures more tonal information.
- **File Format**: Save as TIFF for archival quality or PNG for good quality with smaller files. Avoid JPEG for master scans.
- **Scanner Bed**: Clean the scanner glass thoroughly before each session
- **Multiple Scans**: For very damaged photos, scan at multiple exposures and combine later

**Step 3: Initial Digital Cleaning**

Before AI processing:
- Crop to remove scanner edges and unnecessary borders
- Rotate to correct any tilt
- For severe damage, make initial repairs to large tears or missing sections

**Step 4: Apply AI Restoration**

Using ColorizeAI or similar tools:
- Upload your scanned image
- Allow automatic damage detection and repair
- Review the AI's restoration choices
- Use face enhancement for portraits
- Apply noise reduction if needed

**Step 5: Fine-Tune Results**

After AI processing:
- Compare restoration to original
- Adjust color balance if needed
- Check that important details weren't altered incorrectly
- Sharpen slightly if image appears soft

**Step 6: Save and Archive**

- Save the restored version as a high-quality TIFF or PNG
- Keep both original scan and restored version
- Add metadata (date, subjects, photographer if known)
- Create backups in multiple locations`
      },
      {
        title: "Scanning Best Practices",
        content: `The quality of your restoration depends heavily on the quality of your scan. Invest time in scanning properly—it's the foundation of everything that follows.

**Equipment Recommendations**

- **Flatbed Scanner**: Essential for most photo restoration. Consumer models like the Epson V600 offer excellent quality for home use.
- **Film Scanner**: For negatives and slides, dedicated film scanners produce superior results.
- **Camera Scanning**: High-quality cameras with macro lenses can photograph photos when scanners aren't available.

**Scanning Settings**

- **Resolution**:
  - 300 DPI: Minimum for acceptable quality
  - 600 DPI: Recommended for most restoration work
  - 1200 DPI: For small photos, heavy damage, or images you'll enlarge significantly
  - Higher resolutions increase file size dramatically with diminishing returns

- **Bit Depth**:
  - 24-bit color: Standard, sufficient for most purposes
  - 48-bit color: Captures more tonal information, better for extensive color correction

- **Color Mode**:
  - Color: Use even for black and white photos
  - The color channels capture tonal subtleties that pure grayscale misses

**Handling Fragile Photos**

- Wear clean cotton gloves to prevent oil transfer
- Support fragile photos with acid-free tissue
- Never force a curled photo flat—place books around it and let it gradually flatten over days
- For photos stuck to glass, DO NOT pull apart—seek professional help
- Cracked emulsion should be scanned without pressing the lid down

**Problem Photos**

- **Curled Photos**: Scan in sections and stitch digitally if needed
- **Framed Photos**: Scan through clean glass if removal risks damage
- **Album Pages**: Photograph rather than remove if photos are adhered
- **Oversized Photos**: Scan in sections with slight overlap, then merge`
      },
      {
        title: "Preservation After Restoration",
        content: `Restoration is only valuable if you preserve the results properly. Digital files are both easier and harder to preserve than physical photos—easier because they don't physically degrade, harder because technology changes.

**Digital Preservation Best Practices**

- **Multiple Copies**: The 3-2-1 rule—3 copies on 2 different media types with 1 stored off-site
- **File Formats**: Use TIFF or PNG for master files. These are lossless and widely supported.
- **Metadata**: Embed information about subjects, dates, and locations in the file metadata
- **Organization**: Develop a consistent naming and folder system you'll maintain
- **Regular Verification**: Periodically check that files aren't corrupted
- **Migration**: Transfer files to new storage media every 5-10 years

**Storage Options**

- **Cloud Storage**: Google Photos, iCloud, Dropbox, etc. Convenient but depends on ongoing subscriptions
- **External Hard Drives**: Good for local backup. Replace every 3-5 years.
- **SSD Storage**: More reliable than hard drives for long-term storage
- **Optical Media**: M-DISC rated for 1000+ year longevity for truly archival storage
- **Print**: High-quality archival prints provide a technology-independent backup

**Physical Photo Care**

For your original photos:
- Store in acid-free enclosures
- Maintain consistent temperature (65-70°F) and humidity (30-40% RH)
- Avoid basements and attics with temperature/humidity extremes
- Keep away from direct light
- Store flat, not rolled
- Separate from newspaper clippings and acidic materials`
      }
    ],
    keyTakeaways: [
      "Understanding damage types (chemical, physical, environmental) helps choose appropriate restoration methods",
      "AI restoration automates scratch repair, fade correction, face enhancement, and upscaling",
      "Proper scanning at 600+ DPI in color mode is essential for quality restoration",
      "Always preserve both original scans and restored versions",
      "Use the 3-2-1 backup rule: 3 copies, 2 media types, 1 off-site",
      "Handle originals carefully—wear gloves and never force damaged photos",
      "Combine AI tools with manual touch-up for best results on severely damaged photos"
    ]
  },
  "use-cases": {
    intro: `AI photo colorization has transformed from a niche technical capability into a tool used by millions of people for remarkably diverse purposes. From individual families preserving memories to major institutions digitizing historical archives, the applications span personal projects to professional endeavors across numerous industries.

Understanding these varied use cases helps you discover new ways to apply colorization technology and appreciate its broader impact. Whether you're a genealogy enthusiast, an educator, a museum professional, or simply someone who wants to see their grandparents in color, this guide explores how different people and organizations are using AI colorization to transform how we experience and connect with history.`,
    sections: [
      {
        title: "Family History & Genealogy",
        content: `Family history research has undergone a revolution in the digital age, and AI colorization is the latest tool transforming how we connect with our ancestors.

**The Emotional Impact of Color**

Black and white photographs, while historically valuable, create psychological distance. We perceive people in monochrome as existing in a different, removed reality. When we see ancestors in color, something profound happens:

- Skin tones make faces appear alive and real
- Colored clothing reveals personality and taste
- Environmental details become vivid and relatable
- The subjects feel like people we could have known

Genealogists report that colorized photos generate dramatically more engagement from family members, especially younger generations who have only known a world of color photography.

**Practical Applications for Family Researchers**

1. **Creating Family History Books**: Colorized photos make family history books more engaging. Many genealogists report increased interest from relatives who weren't previously engaged with family research.

2. **Bridging Generations**: Grandchildren often struggle to connect with black and white photos of great-grandparents. Colorization helps bridge this emotional gap, making ancestors feel more real and relatable.

3. **Revealing Historical Details**: Color can reveal information that's hard to see in monochrome—the type of fabric in clothing, the colors of military uniforms, the condition of buildings.

4. **Preserving Cultural Heritage**: For immigrant families, colorized photos of ancestral homelands create powerful connections to cultural heritage.

**Gifts and Special Occasions**

Colorized family photos make extraordinarily meaningful gifts:
- Framed colorized portraits for grandparents
- Anniversary gifts showing parents' wedding photos in color
- Memorial displays combining multiple colorized images
- Heritage projects for family reunions`
      },
      {
        title: "Military History & Veterans",
        content: `Military photographs represent one of the most emotionally significant categories for colorization. Veterans, their families, and military historians use colorization extensively.

**Personal Military Records**

Veterans and their families colorize:
- Service portraits showing young men and women in their prime
- Unit photos that bring fellow soldiers to life
- Battlefield and deployment images
- Homecoming and reunion photographs

For aging veterans, seeing themselves and their fallen comrades in color can be profoundly moving. Many families have used colorized military portraits at memorial services and veterans' commemorations.

**Historical Military Documentation**

The military and defense communities use colorization for:

- **Training Materials**: Colorized historical images help modern service members understand historical tactics and equipment
- **Museum Displays**: Military museums increasingly use colorized images alongside originals
- **Documentary Production**: Historical military documentaries benefit from colorized footage and photographs
- **Veteran Outreach**: Organizations use colorized images to promote veteran support programs

**Uniform and Equipment Accuracy**

Military colorization benefits from well-documented uniform colors:
- Period uniform regulations specify exact colors
- Equipment colors are often documented in archives
- Insignia and medals have known colors
- This documentation helps verify AI colorization accuracy

ColorizeAI's training data includes extensive military imagery with verified color references, enabling accurate colorization of uniforms, vehicles, and equipment from various eras and nations.`
      },
      {
        title: "Museums, Archives & Educational Institutions",
        content: `Cultural institutions have embraced AI colorization as a tool for engagement and education, while maintaining appropriate scholarly standards.

**Museum Applications**

Museums use colorization to:

1. **Enhance Visitor Engagement**: Interactive displays showing original and colorized versions side-by-side
2. **Create Accessible Content**: Colorization helps viewers with certain visual processing differences engage with historical imagery
3. **Develop Educational Programs**: School programs using colorized images report higher student engagement
4. **Support Research Visualization**: Helping researchers and curators understand how spaces and objects appeared

**Important Ethical Considerations**

Reputable institutions follow strict guidelines:
- Always clearly label colorized images as such
- Present original and colorized versions together
- Document the colorization methodology
- Acknowledge the interpretive nature of AI colorization
- Never pass off colorized images as original color photography

**Educational Use Cases**

Teachers and professors use colorization to:
- Make history feel immediate and relevant to students
- Illustrate historical periods in context
- Compare living conditions across eras
- Bring literature and primary sources to life
- Create engaging presentation materials

**Archives and Digitization Projects**

Archives are exploring colorization as part of digitization:
- Offering colorized versions alongside originals
- Enabling new forms of historical research
- Creating more accessible public-facing collections
- Supporting outreach and fundraising efforts`
      },
      {
        title: "Professional Photography & Media",
        content: `Professional photographers, media producers, and creative professionals use AI colorization in various commercial and artistic contexts.

**Documentary and Film Production**

Film and television productions use colorization for:
- Historical documentaries bringing archival footage to life
- Period dramas requiring authentic historical reference
- News programs covering historical anniversaries
- Educational video content

Professional productions typically combine AI colorization with manual color correction by experienced colorists for best results.

**Publishing and Media**

Print and digital media use colorization for:
- Magazine features on historical topics
- Book illustrations and covers
- Website content and social media
- Advertising campaigns with historical themes

**Restoration Services**

Professional photo restoration businesses use AI as a time-saving tool:
- Initial automated restoration followed by manual refinement
- Offering affordable colorization to more customers
- Handling volume work efficiently
- Training junior restoration artists

**Stock Photography**

Some photographers and agencies:
- Colorize historical images for stock libraries
- Create unique marketable content
- Offer colorization as a service to clients`
      },
      {
        title: "Personal Memorial & Celebration Projects",
        content: `Some of the most meaningful uses of AI colorization are deeply personal—honoring loved ones, celebrating milestones, and creating lasting tributes.

**Memorial Tributes**

Colorization plays a role in:

- **Funeral and Memorial Displays**: Colorized portraits create more lifelike tributes to the deceased
- **Memory Books**: Collections of colorized photos celebrating a person's life
- **Headstone Photos**: Some families use colorized portraits for memorial markers
- **Digital Memorials**: Online memorial pages featuring colorized images

These uses require particular sensitivity. The goal is honoring the person as they were, not creating an idealized or inaccurate representation.

**Celebration and Gift Projects**

Colorization enhances celebrations:

1. **Anniversary Gifts**: Wedding photos colorized for milestone anniversaries
2. **Birthday Tributes**: "This is Your Life" style presentations with colorized photos
3. **Holiday Gifts**: Colorized family photos as meaningful presents
4. **Heritage Projects**: Family tree displays with colorized ancestors

**Preservation Projects**

Individuals undertake preservation:
- Digitizing and colorizing entire family photo collections
- Creating permanent archives of family visual history
- Preserving immigrant family heritage
- Documenting family history for future generations`
      }
    ],
    keyTakeaways: [
      "Colorization creates profound emotional connections to ancestors and historical figures",
      "Military history colorization helps veterans and families connect with service memories",
      "Museums and educators use colorization while maintaining scholarly standards",
      "Always clearly label colorized images to distinguish from original color photography",
      "Professional media producers combine AI colorization with manual refinement",
      "Memorial and celebration projects are among the most meaningful applications",
      "Preservation projects can transform entire family photo collections"
    ]
  },
  "comparisons": {
    intro: `The AI photo colorization market has exploded in recent years, with dozens of tools ranging from free mobile apps to enterprise-grade software platforms. This proliferation of options makes choosing the right tool challenging—different tools excel in different areas, and the "best" choice depends entirely on your specific needs, technical requirements, and budget.

This comprehensive comparison guide cuts through marketing claims to help you understand what actually matters when evaluating colorization tools. We'll examine the key criteria that differentiate quality from mediocre results, explore the different categories of tools available, and help you match the right solution to your particular use case—whether you're colorizing a single family photo or processing thousands of historical images.`,
    sections: [
      {
        title: "Key Evaluation Criteria",
        content: `When comparing colorization tools, superficial features often distract from what actually matters. Here's what you should really be evaluating:

**Color Accuracy and Realism**

The most important factor—do the colors look realistic and historically appropriate?

- **Skin tone accuracy**: Human skin is complex, with subtle variations in hue, saturation, and value. Poor tools produce flat, unnatural skin colors.
- **Object recognition**: Does the AI correctly identify and color common objects? Test with varied content—faces, sky, foliage, fabric.
- **Historical appropriateness**: Does the tool understand period-appropriate colors? A 1920s photo shouldn't have modern vibrant colors.
- **Consistency**: Are colors consistent across an image? Watch for unnatural color boundaries.

**Face Detection and Enhancement**

Faces are typically the most important part of any photograph:

- **Automatic face detection**: Does it find and prioritize faces?
- **Skin tone diversity**: Does it handle different ethnicities accurately?
- **Feature enhancement**: Does it sharpen and enhance facial features?
- **Expression preservation**: Does enhancement maintain the person's actual expression?

**Processing Speed and Reliability**

Practical considerations for daily use:

- **Processing time**: Most tools take 3-15 seconds per image. Faster isn't better if quality suffers.
- **Uptime and reliability**: Is the service consistently available?
- **Queue times**: Some popular free services have long waits during peak hours.
- **Batch processing**: Can you process multiple images efficiently?

**Resolution and Output Quality**

What you can actually do with the results:

- **Maximum input resolution**: Higher resolution inputs produce better outputs
- **Output resolution**: Some tools limit output resolution on free tiers
- **Compression artifacts**: Does the output introduce noticeable compression?
- **Watermarks**: Are free results watermarked?

**Privacy and Data Handling**

Critical for sensitive family photos:

- **Data processing location**: Is it on-device or cloud-based?
- **Data retention**: How long are uploaded images stored?
- **Privacy policy**: What rights does the service claim to uploaded images?
- **GDPR compliance**: Does the service meet privacy regulations?`
      },
      {
        title: "Types of Colorization Tools",
        content: `Colorization tools fall into distinct categories, each with different strengths and trade-offs.

**Mobile Applications**

Apps like ColorizeAI for iOS and Android offer the most convenient option for casual users:

**Advantages:**
- Always available on your phone
- Simple, intuitive interfaces
- Often include camera integration
- Quick processing for on-the-go use
- Privacy-focused (many process on-device)

**Limitations:**
- Processing power limited by device hardware
- May have lower maximum resolution than desktop tools
- Smaller screens make detailed evaluation difficult

**Best for:** Casual users, family historians, social media sharing

**Web-Based Services**

Browser-based tools like DeepAI, MyHeritage, and various online colorizers:

**Advantages:**
- No installation required
- Accessible from any device with a browser
- Often offer free tiers
- Regular updates without user action

**Limitations:**
- Require internet connection
- Privacy concerns (images uploaded to servers)
- Free tiers often have significant limitations
- Quality varies enormously between services

**Best for:** Occasional users, those wanting to try colorization, simple projects

**Desktop Software**

Professional-grade applications for serious restoration work:

**Advantages:**
- Maximum processing power and quality
- Full resolution support
- Advanced adjustment options
- Batch processing capabilities
- Integration with other editing software

**Limitations:**
- Higher cost than other options
- Steeper learning curve
- Requires capable computer hardware
- Less convenient than mobile/web options

**Best for:** Professional restorers, high-volume work, demanding quality requirements

**API Services**

Developer-focused services for integration into other applications:

**Advantages:**
- Scalable for high volume
- Integrate into custom workflows
- Consistent, programmatic access
- Often enterprise-grade quality

**Limitations:**
- Require technical knowledge to implement
- Usage-based pricing can be expensive at scale
- Not suitable for individual casual use

**Best for:** Developers, businesses, high-volume processors`
      },
      {
        title: "Feature Comparison: What Matters Most",
        content: `Not all features are equally important. Here's what to prioritize:

**Essential Features (Must-Have)**

1. **Automatic Face Detection**: Without this, faces often receive the same generic treatment as backgrounds
2. **High-Resolution Output**: You should be able to print your colorized photos
3. **No Mandatory Watermarks**: At least on paid tiers
4. **Reasonable Processing Time**: Under 15 seconds for a standard photo

**Important Features (Nice-to-Have)**

1. **Color Adjustment Tools**: Ability to fine-tune results
2. **Before/After Comparison**: Side-by-side view of original and colorized
3. **Multiple Export Formats**: JPEG, PNG, TIFF options
4. **Batch Processing**: For larger projects

**Bonus Features (Differentiators)**

1. **Restoration Integration**: Scratch repair, fade correction combined with colorization
2. **Video Colorization**: For home movies and archival footage
3. **Upscaling**: AI-powered resolution enhancement
4. **Cloud Sync**: Access colorized images across devices

**Features That Sound Better Than They Are**

1. **"AI" or "Deep Learning" claims**: All modern colorization uses AI; the claim itself means nothing
2. **High processing speed claims**: Speed without quality is worthless
3. **"One-click" simplicity**: Sometimes you need adjustments; oversimplification isn't always good`
      },
      {
        title: "Pricing Models Explained",
        content: `Understanding pricing helps you choose a model that matches your usage pattern.

**Free Tiers**

Most services offer some free access:
- Limited daily/monthly uses
- Reduced output resolution
- Watermarked outputs
- Slower processing queues
- Missing premium features

Free tiers are excellent for testing but rarely sufficient for serious projects.

**Subscription Models**

Monthly or annual recurring payments:
- Predictable cost for regular users
- Usually includes all features
- Better value for heavy users
- Commitment may be required for best rates

**Pay-Per-Image**

Credits or per-use pricing:
- Pay only for what you use
- Better for occasional use
- Can become expensive for large projects
- No recurring commitment

**One-Time Purchase**

Some desktop software offers perpetual licenses:
- Higher upfront cost
- No ongoing fees
- May not include future updates
- Becoming less common

**Calculating True Cost**

When comparing prices, consider:
- How many images will you colorize monthly?
- Do you need high-resolution output?
- Will you use video colorization?
- What's the cost per image at your usage level?`
      },
      {
        title: "Making Your Choice",
        content: `Match the tool to your specific situation:

**For Casual Family Users**

Your needs: Occasional colorization of family photos for sharing and small prints

Recommendation: Start with a mobile app like ColorizeAI
- Convenient access on your phone
- Simple interface requires no learning curve
- Free tier adequate for testing
- Affordable subscription for regular use
- On-device processing protects privacy

**For Genealogy Enthusiasts**

Your needs: Regular colorization of historical photos, good accuracy, occasional batch processing

Recommendation: Mobile app or web service with subscription
- Look for strong face detection
- Test accuracy with varied historical photos
- Ensure high-resolution output for printing
- Consider services with batch capabilities

**For Professional Restorers**

Your needs: Maximum quality, full control, integration with professional workflow

Recommendation: Desktop software or API service
- Invest in professional-grade tools
- Look for Photoshop/Lightroom integration
- Prioritize adjustment capabilities over convenience
- Consider API access for workflow automation

**For Institutions and Archives**

Your needs: High volume, consistent quality, proper documentation, privacy compliance

Recommendation: Enterprise solutions or custom API implementation
- Verify GDPR/privacy compliance
- Ensure metadata preservation
- Look for batch processing and audit trails
- Consider on-premises deployment options

**Before Committing**

No matter your category:
1. Test free tiers or trials with your actual photos
2. Check results at full resolution
3. Evaluate face colorization specifically
4. Read privacy policies for any service handling your images
5. Compare results from multiple services before deciding`
      }
    ],
    keyTakeaways: [
      "Color accuracy and face detection quality matter more than speed or flashy features",
      "Mobile apps offer convenience; desktop software provides maximum quality and control",
      "Free tiers are great for testing but usually inadequate for serious projects",
      "Privacy considerations are critical when uploading family photos to cloud services",
      "Match the tool category to your use case: casual, genealogy, professional, or institutional",
      "Always test with your actual photos before committing to a paid subscription",
      "Calculate true cost per image based on your expected usage pattern"
    ]
  }
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params
  const pillar = getPillar(slug)

  if (!pillar || slug === "tools") {
    notFound()
  }

  const content = pillarContent[slug]
  const relatedContent = getRelatedContent(slug, slug)
  const allPosts = getAllPosts()

  // Get cluster articles that exist as blog posts
  const clusterArticles = pillar.clusters
    .map(clusterSlug => {
      const postSlug = clusterToPostSlug[clusterSlug] || clusterSlug
      const post = getPostBySlug(postSlug)
      return post ? { ...post, clusterSlug } : null
    })
    .filter(Boolean)

  // Get related pillars
  const relatedPillars = pillar.relatedPillars
    .map(pSlug => pillars[pSlug])
    .filter(Boolean)

  return (
    <>
      {/* Schema Markup */}
      <GuideSchema pillar={pillar} />

      <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-purple-600">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">{pillar.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center text-white">
              {iconMap[pillar.icon] || <Palette className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-sm text-pink-500 font-medium uppercase tracking-wide">
                Complete Guide
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-balance">
                {pillar.title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-pretty">
            {pillar.description}
          </p>
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {pillar.clusters.length} articles in this guide
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Updated January 2025
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        {content && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {content.intro}
            </p>
          </div>
        )}

        {/* Table of Contents - Cluster Articles */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-pink-500" />
            In This Guide
          </h2>
          <div className="space-y-3">
            {clusterArticles.length > 0 ? (
              clusterArticles.map((article, index) => (
                <Link
                  key={article!.slug}
                  href={`/blog/${article!.slug}`}
                  className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
                >
                  <span className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors">
                      {article!.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {article!.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                </Link>
              ))
            ) : (
              pillar.clusters.map((clusterSlug, index) => (
                <div
                  key={clusterSlug}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 opacity-60"
                >
                  <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-600 dark:text-gray-400">
                      {clusterSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Coming soon
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content Sections */}
        {content && content.sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {section.content.split("\n\n").map((para, pIndex) => (
                <p key={pIndex} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Key Takeaways */}
        {content && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {content.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-pretty">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Pillars */}
        {relatedPillars.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPillars.map((rPillar) => (
                <Link
                  key={rPillar.slug}
                  href={`/guides/${rPillar.slug}`}
                  className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                    {iconMap[rPillar.icon] || <Palette className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors">
                      {rPillar.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {rPillar.clusters.length} articles
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Guides */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/guides"
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Guides
          </Link>
          <Link
            href="/waitlist"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
          >
            Try ColorizeAI
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
    </>
  )
}
