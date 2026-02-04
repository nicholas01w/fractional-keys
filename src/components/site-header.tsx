import Link from 'next/link';

const navLinks = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold">
          Fractional Keys
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/waitlist"
          className="hidden rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 md:inline-flex"
        >
          Join waitlist
        </Link>
        <Link
          href="/waitlist"
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 md:hidden"
        >
          Join
        </Link>
      </div>
    </header>
  );
}
