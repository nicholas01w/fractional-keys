import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fractionalkeys.example';
  const routes = [
    '',
    '/how-it-works',
    '/properties',
    '/about',
    '/faq',
    '/contact',
    '/waitlist',
    '/survey',
    '/thank-you',
    '/legal/terms',
    '/legal/privacy',
    '/legal/cookies',
    '/legal/risk-disclaimer'
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
