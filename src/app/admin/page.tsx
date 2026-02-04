import { AdminShell } from '@/components/admin-shell';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Admin dashboard',
  description: 'Admin dashboard for waitlist management.'
};

export default function AdminPage() {
  const authed = isAdminAuthenticated();

  return (
    <div className="container py-16">
      <Card className="gradient-card">
        <AdminShell initialAuthed={authed} />
      </Card>
    </div>
  );
}
