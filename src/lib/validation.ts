import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional().nullable(),
  marketing_consent: z.boolean(),
  source: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  referral_code: z.string().optional().nullable(),
  honeypot: z.string().optional().nullable()
});

export const surveySchema = z.object({
  signup_id: z.string().uuid(),
  investment_range: z.string(),
  experience_level: z.string(),
  goals: z.array(z.string()).min(1),
  preferred_property_types: z.array(z.string()).min(1),
  cities: z.array(z.string()).min(1),
  other_city: z.string().optional().nullable(),
  liquidity_preference: z.string().optional().nullable(),
  update_frequency: z.string().optional().nullable()
});

export const contactSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().optional().nullable()
});
