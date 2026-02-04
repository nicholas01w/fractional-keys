import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { buttonStyles } from '@/components/ui/button';

export const metadata = {
  title: 'How it works',
  description:
    'Understand how Fractional Keys will fractionalise property investing into £10 increments.'
};

const timeline = [
  {
    title: 'Apply to the waitlist',
    detail: 'Tell us your goals, preferred cities, and investment comfort.'
  },
  {
    title: 'Review launch property briefs',
    detail:
      'We will share detailed investment packs for each property in the pilot.'
  },
  {
    title: 'Confirm fractional allocation',
    detail:
      'Select the amount you want to allocate in £10 increments (tokens).'
  },
  {
    title: 'Ongoing updates',
    detail:
      'Track occupancy, maintenance, and performance updates in your dashboard.'
  },
  {
    title: 'Future liquidity',
    detail:
      'We plan to add resale windows for those seeking liquidity later on.'
  }
];

export default function HowItWorksPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">How it works</h1>
        <p className="mt-4 text-lg text-white/70">
          Fractional Keys is building a clean, compliant way to access rental
          property in £10 increments. This page outlines the MVP journey.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {timeline.map((item) => (
          <Card key={item.title} className="gradient-card">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-white/70">{item.detail}</p>
          </Card>
        ))}
      </div>

      <Card className="gradient-card mt-12">
        <h2 className="text-2xl font-semibold">The £10 increments concept</h2>
        <p className="mt-3 text-sm text-white/70">
          We plan to split each property into a fixed number of fractional tokens.
          Each token represents a small share of the property and any net rental
          income. This does not guarantee returns and will be explained in detail
          before launch.
        </p>
        <p className="mt-3 text-sm text-white/70">
          Joining the waitlist is not an offer to invest. It simply helps us size
          demand and deliver the right property mix.
        </p>
        <div className="mt-6">
          <Link href="/waitlist" className={buttonStyles('primary')}>
            Join the waitlist
          </Link>
        </div>
      </Card>
    </div>
  );
}
