import { Accordion } from '@/components/ui/accordion';

export const metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about Fractional Keys.'
};

const faqs = [
  {
    title: 'Is this financial advice?',
    content:
      'No. The information on this website is for informational purposes only and does not constitute financial advice.'
  },
  {
    title: 'Can I sell my stake?',
    content:
      'Liquidity options are not available at launch. We plan to explore resale windows in the future.'
  },
  {
    title: 'What fees will apply?',
    content:
      'We will publish a transparent fee schedule before launch. No fees are charged for joining the waitlist.'
  },
  {
    title: 'What risks should I be aware of?',
    content:
      'Property values can go down, rental income is not guaranteed, and liquidity may be limited.'
  },
  {
    title: 'When will the platform launch?',
    content:
      'We are targeting a pilot launch in 2025. Join the waitlist for updates.'
  }
];

export default function FaqPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Frequently asked questions</h1>
        <p className="mt-4 text-lg text-white/70">
          Answers to common questions about our fractional property investing
          platform.
        </p>
      </div>
      <div className="mt-10 max-w-3xl">
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
