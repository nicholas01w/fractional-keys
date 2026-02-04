import { hasAnalyticsConsent } from '@/lib/consent';

type TrackPayload = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? 'console';
  if (provider === 'console') {
    // eslint-disable-next-line no-console
    console.info('[analytics]', event, payload);
    return;
  }

  // TODO: Integrate provider (PostHog/GA/etc.)
  // eslint-disable-next-line no-console
  console.info('[analytics:placeholder]', provider, event, payload);
}
