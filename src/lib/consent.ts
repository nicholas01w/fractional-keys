export type ConsentChoice = 'accepted' | 'declined';

const STORAGE_KEY = 'fk_cookie_consent';

export function getStoredConsent() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
}

export function storeConsent(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, choice);
  document.cookie = `fk_cookie_consent=${choice}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === 'accepted';
}
