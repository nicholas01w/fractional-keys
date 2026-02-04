'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getStoredConsent, storeConsent } from '@/lib/consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    setVisible(!consent);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-white/10 bg-slate-900/95 p-6 text-sm text-white shadow-xl md:inset-x-auto md:right-6 md:w-[420px]">
      <p className="font-semibold">We use cookies</p>
      <p className="mt-2 text-white/70">
        We use essential cookies to keep the site running. Analytics cookies are
        optional and help us improve the experience.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          onClick={() => {
            storeConsent('accepted');
            setVisible(false);
          }}
        >
          Accept analytics
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            storeConsent('declined');
            setVisible(false);
          }}
        >
          Essential only
        </Button>
      </div>
    </div>
  );
}
