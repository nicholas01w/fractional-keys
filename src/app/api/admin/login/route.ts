import { NextResponse } from 'next/server';
import { setAdminSession } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const body = await request.json();
  const password = body?.password;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { message: 'Admin password not configured.' },
      { status: 500 }
    );
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json({ message: 'Invalid password.' }, { status: 401 });
  }

  setAdminSession();
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
