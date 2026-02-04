'use client';

import { useState } from 'react';
import { AdminLogin } from '@/components/admin-login';
import { AdminDashboard } from '@/components/admin-dashboard';
import { Button } from '@/components/ui/button';

export function AdminShell({ initialAuthed }: { initialAuthed: boolean }) {
  const [authed, setAuthed] = useState(initialAuthed);

  if (!authed) {
    return (
      <div className="max-w-md">
        <AdminLogin onSuccess={() => setAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Waitlist signups</h2>
        <Button
          variant="secondary"
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            setAuthed(false);
          }}
        >
          Sign out
        </Button>
      </div>
      <AdminDashboard />
    </div>
  );
}
