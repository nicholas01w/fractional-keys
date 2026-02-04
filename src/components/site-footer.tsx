import Link from 'next/link';

const legalLinks = [
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/risk-disclaimer', label: 'Risk disclaimer' }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container flex flex-col gap-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-white/80">Fractional Keys</p>
          <p>Building access to property investing in £10 increments.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <span className="rounded-full border border-white/10 px-3 py-1">LinkedIn</span>
          <span className="rounded-full border border-white/10 px-3 py-1">X</span>
        </div>
      </div>
    </footer>
  );
}
