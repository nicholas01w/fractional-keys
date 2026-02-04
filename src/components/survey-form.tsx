'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { surveySchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { track } from '@/lib/analytics';

const investmentRanges = [
  '£50–£100',
  '£100–£300',
  '£300–£500',
  '£500–£1k',
  '£1k+'
];

const experienceLevels = ['New', 'Some experience', 'Experienced'];
const goalOptions = [
  'Monthly income',
  'Long-term growth',
  'Diversification',
  'Learning property investing'
];
const propertyTypes = ['Flats', 'Houses', 'HMOs', 'Mixed', 'Not sure'];
const cities = [
  'London',
  'Manchester',
  'Birmingham',
  'Liverpool',
  'Leeds',
  'Bristol',
  'Other'
];
const liquidityOptions = ['3–6 months', '6–12 months', '12+ months', 'Not sure'];
const updateOptions = ['Weekly', 'Monthly', 'Major milestones only'];

export function SurveyForm({ signupId }: { signupId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [otherCity, setOtherCity] = useState('');

  function toggleValue(list: string[], value: string, setList: (v: string[]) => void) {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      signup_id: signupId,
      investment_range: formData.get('investment_range')?.toString() || '',
      experience_level: formData.get('experience_level')?.toString() || '',
      goals: selectedGoals,
      preferred_property_types: selectedTypes,
      cities: selectedCities,
      other_city: otherCity || undefined,
      liquidity_preference: formData.get('liquidity_preference')?.toString() || undefined,
      update_frequency: formData.get('update_frequency')?.toString() || undefined
    };

    const parsed = surveySchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      setMessage('Please complete all required fields before submitting.');
      return;
    }

    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data)
    });

    if (!response.ok) {
      setStatus('error');
      setMessage('Unable to save your answers. Please try again.');
      return;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fk_signup_id', signupId);
    }
    track('survey_submitted');
    router.push('/thank-you');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <p className="text-sm font-semibold">Investment range</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {investmentRanges.map((range) => (
            <label key={range} className="flex items-center gap-2 text-sm text-white/70">
              <input type="radio" name="investment_range" value={range} required />
              {range}
            </label>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm font-semibold">Experience level</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center gap-2 text-sm text-white/70">
              <input type="radio" name="experience_level" value={level} required />
              {level}
            </label>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm font-semibold">Goals (select all that apply)</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {goalOptions.map((goal) => (
            <label key={goal} className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={selectedGoals.includes(goal)}
                onChange={() => toggleValue(selectedGoals, goal, setSelectedGoals)}
              />
              {goal}
            </label>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm font-semibold">Preferred property types</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleValue(selectedTypes, type, setSelectedTypes)}
              />
              {type}
            </label>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm font-semibold">Preferred cities</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {cities.map((city) => (
            <label key={city} className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => toggleValue(selectedCities, city, setSelectedCities)}
              />
              {city}
            </label>
          ))}
        </div>
        {selectedCities.includes('Other') && (
          <input
            value={otherCity}
            onChange={(event) => setOtherCity(event.target.value)}
            placeholder="Which city?"
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
          />
        )}
      </section>

      <section>
        <p className="text-sm font-semibold">Liquidity preference</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {liquidityOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-white/70">
              <input type="radio" name="liquidity_preference" value={option} />
              {option}
            </label>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm font-semibold">Update frequency</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {updateOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-white/70">
              <input type="radio" name="update_frequency" value={option} />
              {option}
            </label>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit survey'}
        </Button>
        {message && <Toast>{message}</Toast>}
      </div>
    </form>
  );
}
