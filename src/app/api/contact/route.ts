import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request';

export async function POST(request: Request) {
  const ip = getClientIp();
  const rateLimit = checkRateLimit(getRateLimitKey(ip, 'contact'), 3, 60_000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: 'Too many messages. Please try again later.' },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid message.' }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('contact_messages').insert({
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    message: parsed.data.message
  });

  if (error) {
    console.error('Contact insert failed', error);
    return NextResponse.json(
      { message: 'Unable to send your message.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
