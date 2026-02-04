import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'About',
  description: 'Learn about the mission behind Fractional Keys.'
};

const principles = [
  'Transparency in every property report.',
  'Responsible landlord standards for tenants.',
  'Building long-term wealth access for everyone.'
];

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Our mission</h1>
        <p className="mt-4 text-lg text-white/70">
          Fractional Keys exists to make property investing more accessible and
          transparent. We believe anyone should be able to build wealth through
          real estate without needing large upfront capital.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="gradient-card">
          <h2 className="text-2xl font-semibold">Founder story</h2>
          <p className="mt-3 text-sm text-white/70">
            Our founding team comes from property operations, fintech, and
            compliance. We are currently assembling advisors to ensure the
            platform launches responsibly.
          </p>
        </Card>
        <Card className="gradient-card">
          <h2 className="text-2xl font-semibold">Principles</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {principles.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
