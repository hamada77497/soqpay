export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: June 2025</p>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>By using SoqPay, you agree to these Terms. If you do not agree, please do not use the application.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p>You must be a verified Pi Network user to use SoqPay. You are responsible for all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Marketplace Rules</h2>
          <p>You may not list illegal items, stolen goods, or anything that violates Pi Network's policies. We reserve the right to remove any listing without notice.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
          <p>All payments are processed on the Pi Network blockchain. Transactions are final and cannot be reversed by SoqPay.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p>SoqPay is provided &quot;as is&quot;. We are not liable for any damages arising from your use of the service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>We may update these Terms. Continued use means you accept the changes.</p>
        </section>
      </div>
    </div>
  )
}