import { cookies } from 'next/headers';

const COOKIE_NAME = 'fk_admin_session';

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session?.value === 'authenticated';
}

export function setAdminSession() {
  const cookieStore = cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: 'authenticated',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
}

export function clearAdminSession() {
  const cookieStore = cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
}
