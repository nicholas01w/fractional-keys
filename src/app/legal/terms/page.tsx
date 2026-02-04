export const metadata = {
  title: 'Terms of use',
  description: 'Terms of use for Fractional Keys.'
};

export default function TermsPage() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-semibold">Terms of use</h1>
      <div className="mt-6 space-y-4 text-sm text-white/70">
        <p>
          Fractional Keys provides this website for informational purposes only.
          By using the site, you agree to the terms below.
        </p>
        <p>
          The waitlist is not an offer to invest and does not create any
          contractual relationship. We may update these terms at any time.
        </p>
        <p>
          You must not rely on any information on this site as financial advice.
          Investments can go down as well as up and you may not get back the
          amount invested.
        </p>
        <p>
          If you have questions about these terms, contact us at
          hello@fractionalkeys.com.
        </p>
      </div>
    </div>
  );
}
