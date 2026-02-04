import { WaitlistForm } from '@/components/waitlist-form';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Join the waitlist',
  description: 'Join the Fractional Keys waitlist and share your investment goals.'
};

export default function WaitlistPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Join the waitlist</h1>
        <p className="mt-4 text-lg text-white/70">
          Get early access to fractional property launches and help us shape the
          platform.
        </p>
      </div>
      <div className="mt-10 max-w-2xl">
        <Card className="gradient-card">
          <WaitlistForm />
        </Card>
      </div>
    </div>
  );
}
