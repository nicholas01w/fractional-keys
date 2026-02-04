export type WaitlistSignup = {
  id: string;
  email: string;
  first_name: string | null;
  marketing_consent: boolean;
  consent_timestamp: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referral_code: string | null;
  referrer_id: string | null;
  created_at: string;
};

export type InvestorIntent = {
  investment_range: string;
  experience_level: string;
  goals: string[];
  cities: string[];
  preferred_property_types: string[];
  other_city: string | null;
  liquidity_preference: string | null;
  update_frequency: string | null;
  created_at: string;
};

export type SignupWithIntent = WaitlistSignup & {
  investor_intent?: InvestorIntent | null;
};
