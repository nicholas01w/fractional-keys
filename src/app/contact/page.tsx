import { ContactForm } from '@/components/contact-form';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Contact',
  description: 'Reach out to the Fractional Keys team.'
};

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Contact us</h1>
        <p className="mt-4 text-lg text-white/70">
          Send a message and we will respond within 2 business days. For GDPR data
          requests, please mention “delete my data”.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Card className="gradient-card">
          <ContactForm />
        </Card>
      </div>
    </div>
  );
}
