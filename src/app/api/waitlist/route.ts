import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request';
import { generateReferralCode } from '@/lib/referral';

export async function POST(request: Request) {
  const ip = getClientIp();
  const rateLimit = checkRateLimit(getRateLimitKey(ip, 'waitlist'));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again soon.' },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ id: 'spam' }, { status: 200 });
  }

  const supabase = createServerSupabaseClient();
  let referrerId: string | null = null;

  if (parsed.data.referral_code) {
    const { data: referrer } = await supabase
      .from('waitlist_signups')
      .select('id')
      .eq('referral_code', parsed.data.referral_code)
      .maybeSingle();
    referrerId = referrer?.id ?? null;
  }

  const { data, error } = await supabase
    .from('waitlist_signups')
    .insert({
      email: parsed.data.email.toLowerCase(),
      first_name: parsed.data.first_name,
      marketing_consent: parsed.data.marketing_consent,
      consent_timestamp: parsed.data.marketing_consent ? new Date().toISOString() : null,
      source: parsed.data.source,
      utm_source: parsed.data.utm_source,
      utm_medium: parsed.data.utm_medium,
      utm_campaign: parsed.data.utm_campaign,
      utm_content: parsed.data.utm_content,
      utm_term: parsed.data.utm_term,
      referral_code: generateReferralCode(),
      referrer_id: referrerId
    })
    .select('id')
    .maybeSingle();

  if (error) {
    const { data: existing } = await supabase
      .from('waitlist_signups')
      .select('id')
      .eq('email', parsed.data.email.toLowerCase())
      .maybeSingle();

    if (existing?.id) {
      return NextResponse.json({ id: existing.id }, { status: 200 });
    }

    console.error('Waitlist insert failed', error);
    return NextResponse.json(
      { message: 'Unable to save your details.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data?.id }, { status: 200 });
}
