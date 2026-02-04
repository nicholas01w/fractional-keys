'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { waitlistSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function WaitlistForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [utmValues, setUtmValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(
      (key) => {
        const value = params.get(key);
        if (value) utmData[key] = value;
      }
    );
    const source = params.get('source');
    if (source) utmData.source = source;
    const ref = params.get('ref');
    if (ref) utmData.referral_code = ref;
    setUtmValues(utmData);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get('email')?.toString() || '',
      first_name: formData.get('first_name')?.toString() || undefined,
      marketing_consent: formData.get('marketing_consent') === 'on',
      honeypot: formData.get('company')?.toString() || undefined,
      source: utmValues.source,
      utm_source: utmValues.utm_source,
      utm_medium: utmValues.utm_medium,
      utm_campaign: utmValues.utm_campaign,
      utm_content: utmValues.utm_content,
      utm_term: utmValues.utm_term,
      referral_code: utmValues.referral_code
    };

    const parsed = waitlistSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      setMessage('Please enter a valid email to join the waitlist.');
      return;
    }

    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data)
    });

    if (!response.ok) {
      setStatus('error');
      const errorPayload = await response.json().catch(() => ({}));
      setMessage(errorPayload.message ?? 'Unable to join right now.');
      return;
    }

    const data = await response.json();
    setStatus('success');
    track('waitlist_submitted');
    router.push(`/survey?signup_id=${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="first_name" placeholder="First name (optional)" />
        <Input name="email" placeholder="Email" required type="email" />
      </div>
      <Input
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <label className="flex items-start gap-3 text-sm text-white/70">
        <Checkbox name="marketing_consent" />
        <span>
          I would like to receive product updates, newsletters, and launch
          announcements from Fractional Keys.
        </span>
      </label>
      <p className="text-xs text-white/50">
        We will still send essential service emails about your waitlist status.
      </p>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Join waitlist'}
      </Button>
      {message && <Toast>{message}</Toast>}
    </form>
  );
}
