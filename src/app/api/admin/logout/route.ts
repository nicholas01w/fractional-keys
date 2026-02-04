import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/admin-auth';

export async function POST() {
  clearAdminSession();
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
