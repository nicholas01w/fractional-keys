import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { SignupWithIntent } from '@/types';

export type SignupFilters = {
  search?: string;
  consent?: 'yes' | 'no';
  investment_range?: string;
  experience_level?: string;
  utm_campaign?: string;
};

export async function fetchAdminSignups(filters: SignupFilters) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('waitlist_signups')
    .select(
      `
      id,
      email,
      first_name,
      marketing_consent,
      consent_timestamp,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      referral_code,
      referrer_id,
      created_at,
      investor_intent (
        investment_range,
        experience_level,
        goals,
        preferred_property_types,
        cities,
        other_city,
        liquidity_preference,
        update_frequency,
        created_at
      )
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  let signups: SignupWithIntent[] = (data ?? []).map((signup: any) => {
    const intentList = signup.investor_intent ?? [];
    const latestIntent = intentList.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    return {
      ...signup,
      investor_intent: latestIntent ?? null
    };
  });

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    signups = signups.filter(
      (signup) =>
        signup.email.toLowerCase().includes(searchLower) ||
        signup.first_name?.toLowerCase().includes(searchLower)
    );
  }

  if (filters.consent) {
    signups = signups.filter((signup) =>
      filters.consent === 'yes'
        ? signup.marketing_consent
        : !signup.marketing_consent
    );
  }

  if (filters.investment_range) {
    signups = signups.filter(
      (signup) =>
        signup.investor_intent?.investment_range ===
        filters.investment_range
    );
  }

  if (filters.experience_level) {
    signups = signups.filter(
      (signup) =>
        signup.investor_intent?.experience_level ===
        filters.experience_level
    );
  }

  if (filters.utm_campaign) {
    signups = signups.filter(
      (signup) => signup.utm_campaign === filters.utm_campaign
    );
  }

  return signups;
}
