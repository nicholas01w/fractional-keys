import { describe, expect, it } from 'vitest';
import { contactSchema, surveySchema, waitlistSchema } from '../src/lib/validation';

describe('validation schemas', () => {
  it('validates waitlist payloads', () => {
    const result = waitlistSchema.safeParse({
      email: 'test@example.com',
      first_name: 'Ada',
      marketing_consent: true
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid contact payloads', () => {
    const result = contactSchema.safeParse({
      email: 'not-an-email',
      message: 'Hi'
    });

    expect(result.success).toBe(false);
  });

  it('requires survey arrays', () => {
    const result = surveySchema.safeParse({
      signup_id: 'f73a3a7b-74d8-4bb4-9d32-9b0efb180b4a',
      investment_range: '£50–£100',
      experience_level: 'New',
      goals: ['Monthly income'],
      preferred_property_types: ['Flats'],
      cities: ['London']
    });

    expect(result.success).toBe(true);
  });
});
