export const metadata = {
  title: 'Risk disclaimer',
  description: 'Important risk disclosures for Fractional Keys.'
};

export default function RiskDisclaimerPage() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-semibold">Risk disclaimer</h1>
      <div className="mt-6 space-y-4 text-sm text-white/70">
        <p>
          Fractional Keys is preparing a platform for fractional property
          investing. This website does not constitute an offer to invest.
        </p>
        <p>
          Property values can fall as well as rise. Rental income is not
          guaranteed, and you may lose some or all of your investment.
        </p>
        <p>
          Past performance is not indicative of future results. Any future
          secondary market liquidity is not guaranteed.
        </p>
        <p>
          The information provided is not financial advice. You should seek
          independent advice before making any investment decisions.
        </p>
      </div>
    </div>
  );
}
