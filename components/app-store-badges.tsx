import Image from "next/image"
import Link from "next/link"

export function AppStoreBadges() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Available on:</p>
      <div className="flex gap-3">
        <Link href="#" className="transition-transform hover:scale-105">
          <Image
            src="/placeholder.svg?height=60&width=180"
            alt="Download on the App Store"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>
        <Link href="#" className="transition-transform hover:scale-105">
          <Image
            src="/placeholder.svg?height=60&width=180"
            alt="Get it on Google Play"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>
      </div>
    </div>
  )
}
