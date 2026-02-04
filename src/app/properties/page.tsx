import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { buttonStyles } from '@/components/ui/button';

export const metadata = {
  title: 'Properties',
  description: 'Preview the first Fractional Keys properties coming soon.'
};

const mockProperties = [
  { name: 'Manchester – Northern Quarter', type: '2-bed flat', status: 'Coming soon' },
  { name: 'Birmingham – Jewellery Quarter', type: '3-bed house', status: 'Coming soon' },
  { name: 'London – Zone 3 commuter hub', type: '1-bed flat', status: 'Coming soon' }
];

export default function PropertiesPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Properties launching soon</h1>
        <p className="mt-4 text-lg text-white/70">
          We are curating our first set of rental homes. Join the waitlist to be
          notified when the first property brief is ready.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mockProperties.map((property) => (
          <Card key={property.name} className="gradient-card">
            <p className="text-sm text-white/50">{property.status}</p>
            <h3 className="mt-2 text-lg font-semibold">{property.name}</h3>
            <p className="mt-1 text-sm text-white/70">{property.type}</p>
          </Card>
        ))}
      </div>

      <Card className="gradient-card mt-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Be the first to know</h2>
            <p className="mt-2 text-sm text-white/70">
              Get launch alerts and property briefings delivered to your inbox.
            </p>
          </div>
          <Link href="/waitlist" className={buttonStyles('primary')}>
            Notify me
          </Link>
        </div>
      </Card>
    </div>
  );
}
