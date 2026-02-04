import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { fetchAdminSignups } from '@/lib/admin-data';

function toCsvValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) return '';
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

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

  const headers = [
    'created_at',
    'email',
    'first_name',
    'investment_range',
    'experience_level',
    'goals',
    'cities',
    'consent',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'referral_code',
    'referrer_id'
  ];

  const rows = signups.map((signup) => {
    const intent = signup.investor_intent;
    return [
      signup.created_at,
      signup.email,
      signup.first_name,
      intent?.investment_range ?? '',
      intent?.experience_level ?? '',
      intent?.goals?.join('; ') ?? '',
      intent?.cities?.join('; ') ?? '',
      signup.marketing_consent ? 'yes' : 'no',
      signup.utm_source,
      signup.utm_medium,
      signup.utm_campaign,
      signup.referral_code,
      signup.referrer_id
    ];
  });

  const csv = [headers, ...rows]
    .map((row) => row.map(toCsvValue).join(','))
    .join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="waitlist.csv"'
    }
  });
}
