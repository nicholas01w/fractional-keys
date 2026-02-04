import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieBanner } from '@/components/cookie-banner';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fractionalkeys.example'),
  title: {
    default: 'Fractional Keys – Property investing in £10 increments',
    template: '%s | Fractional Keys'
  },
  description:
    'Join the Fractional Keys waitlist to access curated UK rental properties in bite-sized £10 increments.',
  openGraph: {
    title: 'Fractional Keys – Launch MVP',
    description:
      'Own fractions of high-quality rental property starting from £10. Join the waitlist today.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Keys – Launch MVP',
    description:
      'Own fractions of high-quality rental property starting from £10. Join the waitlist today.'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Fractional Keys',
              url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fractionalkeys.example',
              description:
                'Fractional Keys enables people to access UK rental property investing in £10 increments.'
            })
          }}
        />
      </body>
    </html>
  );
}
