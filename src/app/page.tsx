import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonStyles } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';

const steps = [
  {
    title: 'Join the waitlist',
    description: 'Tell us your goals so we can match you with the right property.'
  },
  {
    title: 'Explore curated homes',
    description:
      'We source well-managed UK rentals and publish clear due diligence packs.'
  },
  {
    title: 'Invest from £10',
    description:
      'Own fractional tokens linked to the underlying property with transparent pricing.'
  },
  {
    title: 'Track performance',
    description: 'Monitor updates, occupancy, and annual statements in one place.'
  },
  {
    title: 'Exit options',
    description:
      'Future secondary liquidity options mean you can exit when terms allow.'
  }
];

const faqs = [
  {
    title: 'Is the waitlist an offer to invest?',
    content:
      'No. Joining the waitlist simply registers your interest so we can notify you when the platform is ready.'
  },
  {
    title: 'How does £10 investing work?',
    content:
      'We plan to fractionalise property ownership into tokens starting at £10. This will be explained in detail before any launch.'
  },
  {
    title: 'Is this regulated?',
    content:
      'We are preparing our compliance roadmap and will share the regulatory status before any investment goes live.'
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="container py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <Badge>Launching soon</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Own fractions of UK rental property from just £10.
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Fractional Keys makes property investing accessible, transparent, and
              modern. Join the waitlist to shape our first property launch.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/waitlist" className={buttonStyles('primary')}>
                Join waitlist
              </Link>
              <Link
                href="/how-it-works"
                className={buttonStyles('secondary')}
              >
                See how it works
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">
              Not financial advice. Investments can go down as well as up.
            </p>
          </div>
          <Card className="gradient-card">
            <h3 className="text-lg font-semibold">Waitlist perks</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>• Early access to launch properties</li>
              <li>• Priority invitations to investor briefings</li>
              <li>• Founding member updates and feedback loops</li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/10 p-4 text-sm">
              <p className="font-semibold text-white">Target launch window</p>
              <p className="text-white/70">Q2 2025 – UK pilot portfolio</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <Link href="/how-it-works" className="text-sm text-brand-200">
            Explore details →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="gradient-card">
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/70">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="gradient-card">
            <h3 className="text-lg font-semibold">Why Fractional Keys</h3>
            <p className="mt-3 text-sm text-white/70">
              We combine diligent property sourcing with transparent reporting and
              better landlord standards.
            </p>
          </Card>
          <Card className="gradient-card">
            <h3 className="text-lg font-semibold">Trust & transparency</h3>
            <p className="mt-3 text-sm text-white/70">
              Every property comes with a full due diligence pack and occupancy
              updates.
            </p>
          </Card>
          <Card className="gradient-card">
            <h3 className="text-lg font-semibold">Landlord rulebook</h3>
            <p className="mt-3 text-sm text-white/70">
              We only work with operators committed to safe, high-quality housing.
            </p>
          </Card>
        </div>
      </section>

      <section className="container py-12">
        <Card className="gradient-card">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">
                Ready to be first in line?
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Join the waitlist and help us build the most trusted fractional
                property platform.
              </p>
            </div>
            <Link href="/waitlist" className={buttonStyles('primary')}>
              Join waitlist
            </Link>
          </div>
        </Card>
      </section>

      <section className="container py-12">
        <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-white/40">
            Social proof coming soon
          </p>
          <p className="mt-3 text-lg">Investor stories and property highlights</p>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-6 max-w-2xl">
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="container py-16">
        <Card className="gradient-card">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Stay in the loop</h3>
              <p className="mt-2 text-sm text-white/70">
                Get launch alerts, pilot property updates, and early access.
              </p>
            </div>
            <Link href="/waitlist" className={buttonStyles('primary')}>
              Join waitlist
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
