'use client';

import { useState } from 'react';
import { contactSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { track } from '@/lib/analytics';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name')?.toString() || undefined,
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      honeypot: formData.get('company')?.toString() || undefined
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      setMessage('Please complete all required fields correctly.');
      return;
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data)
    });

    if (!response.ok) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setMessage('Thanks! We will reply within 2 business days.');
    event.currentTarget.reset();
    track('contact_submitted');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" required type="email" />
      </div>
      <Input
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <textarea
        name="message"
        required
        rows={5}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
        placeholder="How can we help?"
      />
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </Button>
      {message && <Toast>{message}</Toast>}
    </form>
  );
}
