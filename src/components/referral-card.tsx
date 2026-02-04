'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';

export function ReferralCard() {
  const [code, setCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadReferral() {
      const signupId = window.localStorage.getItem('fk_signup_id');
      if (!signupId) return;
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signup_id: signupId })
      });
      if (response.ok) {
        const data = await response.json();
        setCode(data.referral_code);
        setShareUrl(`${window.location.origin}/waitlist?ref=${data.referral_code}`);
      }
    }

    loadReferral();
  }, []);

  if (!code) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>Invite friends to join once your referral code is ready.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
      <p className="font-semibold text-white">Refer a friend</p>
      <p className="mt-2">Share your unique referral link:</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <code className="rounded-lg bg-black/40 px-3 py-1 text-xs text-white">
          {shareUrl ?? 'Generating link...'}
        </code>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (!shareUrl) return;
            navigator.clipboard.writeText(shareUrl).then(() => {
              setMessage('Link copied to clipboard!');
            });
          }}
        >
          Copy link
        </Button>
      </div>
      {message && <Toast className="mt-3">{message}</Toast>}
    </div>
  );
}
