export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: June 2025</p>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>When you use SoqPay, we collect your Pi Network username and public wallet address. This information is required to identify you and process transactions through the Pi Network blockchain.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>Your information is used only to facilitate peer-to-peer transactions on the SoqPay marketplace. We do not share, sell, or rent your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
          <p>We implement standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Contact</h2>
          <p>If you have questions about this policy, please contact us via the Pi Browser.</p>
        </section>
      </div>
    </div>
  )
}