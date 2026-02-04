import { SurveyForm } from '@/components/survey-form';
import { Card } from '@/components/ui/card';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Investor intent survey',
  description: 'Tell us about your investment preferences.'
};

type SurveyPageProps = {
  searchParams?: { signup_id?: string };
};

async function signupExists(signupId: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('waitlist_signups')
      .select('id')
      .eq('id', signupId)
      .maybeSingle();
    return Boolean(data);
  } catch (error) {
    console.error('Survey validation error', error);
    return false;
  }
}

export default async function SurveyPage({ searchParams }: SurveyPageProps) {
  const signupId = searchParams?.signup_id;
  const isValid = signupId ? await signupExists(signupId) : false;

  if (!signupId || !isValid) {
    return (
      <div className="container py-16">
        <Card className="gradient-card max-w-xl">
          <h1 className="text-2xl font-semibold">Survey link required</h1>
          <p className="mt-2 text-sm text-white/70">
            Please join the waitlist first so we can capture your preferences.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Investor intent survey</h1>
        <p className="mt-4 text-lg text-white/70">
          These answers help us prioritise the right properties and updates for
          you.
        </p>
      </div>
      <div className="mt-10 max-w-3xl">
        <Card className="gradient-card">
          <SurveyForm signupId={signupId} />
        </Card>
      </div>
    </div>
  );
}
