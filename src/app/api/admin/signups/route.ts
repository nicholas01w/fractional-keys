import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { fetchAdminSignups } from '@/lib/admin-data';

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const signups = await fetchAdminSignups({
    search: searchParams.get('search') ?? undefined,
    consent: (searchParams.get('consent') as 'yes' | 'no') ?? undefined,
    investment_range: searchParams.get('investment_range') ?? undefined,
    experience_level: searchParams.get('experience_level') ?? undefined,
    utm_campaign: searchParams.get('utm_campaign') ?? undefined
  });

  const total = signups.length;
  const consented = signups.filter((signup) => signup.marketing_consent).length;
  const consentedPercent = total > 0 ? Math.round((consented / total) * 100) : 0;

  const campaignCounts: Record<string, number> = {};
  const rangeCounts: Record<string, number> = {};

  signups.forEach((signup) => {
    if (signup.utm_campaign) {
      campaignCounts[signup.utm_campaign] =
        (campaignCounts[signup.utm_campaign] ?? 0) + 1;
    }
    const range = signup.investor_intent?.investment_range;
    if (range) {
      rangeCounts[range] = (rangeCounts[range] ?? 0) + 1;
    }
  });

  const topCampaign = Object.entries(campaignCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

  return NextResponse.json({
    signups,
    metrics: {
      total,
      consentedPercent,
      topCampaign,
      rangeCounts
    }
  });
}
