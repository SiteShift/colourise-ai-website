import { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | ColouriseAI",
  description: "Terms and conditions for using ColouriseAI photo colorization service. Please read these terms carefully before using our service.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: February 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using ColouriseAI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed">
                ColouriseAI provides AI-powered photo colorization services that transform black and white or grayscale photographs into color images. The service is provided "as is" and results may vary depending on image quality and content.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed mb-4">When using our service, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Only upload photos that you own or have permission to edit</li>
                <li>Not use the service for any illegal purposes</li>
                <li>Not upload content that is offensive, harmful, or violates others' rights</li>
                <li>Not attempt to reverse engineer or exploit our technology</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Your Content:</strong> You retain all rights to the photos you upload and the colorized versions you create. By using our service, you grant us a limited license to process your images solely for the purpose of providing the colorization service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Our Technology:</strong> The ColouriseAI service, including our AI models, software, and website, are protected by intellectual property laws. You may not copy, modify, or distribute our technology.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                AI colorization is an interpretation based on machine learning algorithms. The colors applied to your photos are predictions and may not represent the actual historical colors of the original scene. ColouriseAI makes no guarantees about the accuracy of colorization results.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, ColouriseAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability shall not exceed the amount you paid for the service in the past 12 months.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to provide reliable service but do not guarantee uninterrupted availability. We may modify, suspend, or discontinue any aspect of the service at any time without prior notice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Account Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your access to the service if you violate these terms or engage in any activity that we determine to be harmful to the service or other users.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these terms, please contact us at{" "}
                <a href="mailto:legal@colorizeai.app" className="text-pink-500 hover:underline">
                  legal@colorizeai.app
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
