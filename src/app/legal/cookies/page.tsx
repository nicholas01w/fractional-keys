export const metadata = {
  title: 'Cookie policy',
  description: 'Cookie policy for Fractional Keys.'
};

export default function CookiesPage() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-semibold">Cookie policy</h1>
      <div className="mt-6 space-y-4 text-sm text-white/70">
        <p>
          We use essential cookies to keep the site secure and functional. These
          cannot be switched off.
        </p>
        <p>
          Analytics cookies help us understand usage and improve the experience.
          They are optional and require your consent.
        </p>
        <p>
          You can change your cookie preferences at any time by clearing your
          browser storage or revisiting the cookie banner.
        </p>
      </div>
    </div>
  );
}
