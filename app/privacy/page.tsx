import { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | ColorizeAI",
  description: "Learn how ColorizeAI handles your photos and personal data. We respect your privacy and are committed to protecting your information.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: February 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                ColorizeAI ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our photo colorization service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Photos You Upload</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you use ColorizeAI to colorize photos, we process your images to provide the colorization service. We treat your photos with the utmost care and confidentiality.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you create an account, we collect your email address and any profile information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Data</h3>
              <p className="text-gray-600 leading-relaxed">
                We collect anonymous usage data to improve our service, including device type, operating system, and app usage patterns. This data is aggregated and cannot identify individual users.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and improve our photo colorization service</li>
                <li>To communicate with you about your account or our services</li>
                <li>To send you updates and marketing communications (with your consent)</li>
                <li>To analyze usage patterns and improve user experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We understand that your photos contain precious memories. Here's how we handle them:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Processing:</strong> Photos are processed securely to generate colorized versions</li>
                <li><strong>Storage:</strong> We do not permanently store your original photos on our servers</li>
                <li><strong>No Training:</strong> Your personal photos are not used to train our AI models</li>
                <li><strong>No Sharing:</strong> We never share your photos with third parties</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website uses essential cookies to ensure proper functionality. We may also use analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="text-gray-600 mt-4">
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@colorizeai.app" className="text-pink-500 hover:underline">
                  privacy@colorizeai.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
