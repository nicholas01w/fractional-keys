'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, buttonStyles } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { SignupWithIntent } from '@/types';

const investmentRanges = ['£50–£100', '£100–£300', '£300–£500', '£500–£1k', '£1k+'];
const experienceLevels = ['New', 'Some experience', 'Experienced'];

export function AdminDashboard() {
  const [signups, setSignups] = useState<SignupWithIntent[]>([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    consentedPercent: 0,
    topCampaign: 'N/A',
    rangeCounts: {} as Record<string, number>
  });
  const [search, setSearch] = useState('');
  const [consent, setConsent] = useState('');
  const [investmentRange, setInvestmentRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSignups = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (consent) params.set('consent', consent);
    if (investmentRange) params.set('investment_range', investmentRange);
    if (experienceLevel) params.set('experience_level', experienceLevel);
    if (utmCampaign) params.set('utm_campaign', utmCampaign);

    const response = await fetch(`/api/admin/signups?${params.toString()}`);
    if (response.ok) {
      const data = await response.json();
      setSignups(data.signups);
      setMetrics(data.metrics);
    }
    setLoading(false);
  }, [search, consent, investmentRange, experienceLevel, utmCampaign]);

  useEffect(() => {
    fetchSignups();
  }, [fetchSignups]);

  const rangeDistribution = useMemo(() => {
    return Object.entries(metrics.rangeCounts).map(([range, count]) => ({
      range,
      count
    }));
  }, [metrics.rangeCounts]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="gradient-card">
          <p className="text-xs text-white/50">Total signups</p>
          <p className="mt-2 text-2xl font-semibold">{metrics.total}</p>
        </Card>
        <Card className="gradient-card">
          <p className="text-xs text-white/50">% consented</p>
          <p className="mt-2 text-2xl font-semibold">{metrics.consentedPercent}%</p>
        </Card>
        <Card className="gradient-card">
          <p className="text-xs text-white/50">Top UTM campaign</p>
          <p className="mt-2 text-base font-semibold">{metrics.topCampaign}</p>
        </Card>
        <Card className="gradient-card">
          <p className="text-xs text-white/50">Top investment ranges</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            {rangeDistribution.length === 0 && <li>No data yet</li>}
            {rangeDistribution.slice(0, 3).map((item) => (
              <li key={item.range}>
                {item.range}: {item.count}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="gradient-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Input
            placeholder="Search email or name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            value={consent}
            onChange={(event) => setConsent(event.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
          >
            <option value="">Consent: all</option>
            <option value="yes">Consent: yes</option>
            <option value="no">Consent: no</option>
          </select>
          <select
            value={investmentRange}
            onChange={(event) => setInvestmentRange(event.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
          >
            <option value="">Investment range</option>
            {investmentRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <select
            value={experienceLevel}
            onChange={(event) => setExperienceLevel(event.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
          >
            <option value="">Experience level</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <Input
            placeholder="UTM campaign"
            value={utmCampaign}
            onChange={(event) => setUtmCampaign(event.target.value)}
          />
          <Button type="button" onClick={fetchSignups} disabled={loading}>
            {loading ? 'Refreshing...' : 'Apply'}
          </Button>
          <a
            className={buttonStyles('secondary')}
            href={`/api/admin/signups/export?search=${encodeURIComponent(search)}&consent=${encodeURIComponent(consent)}&investment_range=${encodeURIComponent(investmentRange)}&experience_level=${encodeURIComponent(experienceLevel)}&utm_campaign=${encodeURIComponent(utmCampaign)}`}
          >
            Export CSV
          </a>
        </div>
      </Card>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase text-white/60">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Investment range</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Goals</th>
              <th className="px-4 py-3">Cities</th>
              <th className="px-4 py-3">Consent</th>
              <th className="px-4 py-3">UTM campaign</th>
              <th className="px-4 py-3">Referral</th>
            </tr>
          </thead>
          <tbody>
            {signups.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center text-white/60">
                  No signups found.
                </td>
              </tr>
            )}
            {signups.map((signup) => (
              <tr key={signup.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-xs text-white/60">
                  {new Date(signup.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{signup.email}</td>
                <td className="px-4 py-3">{signup.first_name ?? '—'}</td>
                <td className="px-4 py-3">{signup.investor_intent?.investment_range ?? '—'}</td>
                <td className="px-4 py-3">{signup.investor_intent?.experience_level ?? '—'}</td>
                <td className="px-4 py-3 text-xs text-white/60">
                  {signup.investor_intent?.goals?.join(', ') ?? '—'}
                </td>
                <td className="px-4 py-3 text-xs text-white/60">
                  {signup.investor_intent?.cities?.join(', ') ?? '—'}
                </td>
                <td className="px-4 py-3">
                  {signup.marketing_consent ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 text-xs text-white/60">
                  {signup.utm_campaign ?? '—'}
                </td>
                <td className="px-4 py-3 text-xs text-white/60">
                  {signup.referral_code ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
