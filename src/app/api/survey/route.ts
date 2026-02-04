import { NextResponse } from 'next/server';
import { surveySchema } from '@/lib/validation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = surveySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid survey data.' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { data: signup } = await supabase
    .from('waitlist_signups')
    .select('id')
    .eq('id', parsed.data.signup_id)
    .maybeSingle();

  if (!signup) {
    return NextResponse.json({ message: 'Signup not found.' }, { status: 404 });
  }

  const { error } = await supabase.from('investor_intent').insert({
    signup_id: parsed.data.signup_id,
    investment_range: parsed.data.investment_range,
    experience_level: parsed.data.experience_level,
    goals: parsed.data.goals,
    preferred_property_types: parsed.data.preferred_property_types,
    cities: parsed.data.cities,
    other_city: parsed.data.other_city,
    liquidity_preference: parsed.data.liquidity_preference,
    update_frequency: parsed.data.update_frequency
  });

  if (error) {
    console.error('Survey insert failed', error);
    return NextResponse.json(
      { message: 'Unable to save your answers.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
