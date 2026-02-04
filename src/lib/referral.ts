export function generateReferralCode() {
  return `FK${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
