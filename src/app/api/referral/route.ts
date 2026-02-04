import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { generateReferralCode } from '@/lib/referral';

export async function POST(request: Request) {
  const body = await request.json();
  const signupId = body?.signup_id;
  if (!signupId) {
    return NextResponse.json({ message: 'Missing signup id.' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { data: signup, error } = await supabase
    .from('waitlist_signups')
    .select('id, referral_code')
    .eq('id', signupId)
    .maybeSingle();

  if (error || !signup) {
    return NextResponse.json({ message: 'Signup not found.' }, { status: 404 });
  }

  if (signup.referral_code) {
    return NextResponse.json({ referral_code: signup.referral_code }, { status: 200 });
  }

  const newCode = generateReferralCode();
  const { error: updateError } = await supabase
    .from('waitlist_signups')
    .update({ referral_code: newCode })
    .eq('id', signupId);

  if (updateError) {
    return NextResponse.json({ message: 'Unable to create code.' }, { status: 500 });
  }

  return NextResponse.json({ referral_code: newCode }, { status: 200 });
}
