import { ReferralCard } from '@/components/referral-card';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Thank you',
  description: 'You are on the Fractional Keys waitlist.'
};

export default function ThankYouPage() {
  return (
    <div className="container py-16">
      <Card className="gradient-card max-w-3xl">
        <h1 className="text-3xl font-semibold">You are on the list</h1>
        <p className="mt-3 text-sm text-white/70">
          Thanks for sharing your preferences. We will keep you updated as we
          release the first property briefs.
        </p>
        <div className="mt-6">
          <ReferralCard />
        </div>
      </Card>
    </div>
  );
}
