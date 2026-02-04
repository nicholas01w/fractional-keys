export const metadata = {
  title: 'Privacy policy',
  description: 'Privacy policy for Fractional Keys.'
};

export default function PrivacyPage() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-semibold">Privacy policy</h1>
      <div className="mt-6 space-y-4 text-sm text-white/70">
        <p>
          We collect your contact details and survey responses to build and
          improve the Fractional Keys platform. We never sell your data.
        </p>
        <p>
          We store data securely in Supabase and only grant access to authorised
          team members. You can request deletion of your data at any time by
          contacting us.
        </p>
        <p>
          Legal basis: we process your data under legitimate interests and
          consent (for marketing communications).
        </p>
        <p>
          You have the right to access, correct, or delete your data. For GDPR
          requests, email hello@fractionalkeys.com.
        </p>
      </div>
    </div>
  );
}
