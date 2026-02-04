const memoryStore = new Map<string, { count: number; reset: number }>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60_000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  reset: number;
};

export function checkRateLimit(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const existing = memoryStore.get(key);

  if (!existing || existing.reset < now) {
    memoryStore.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      reset: existing.reset
    };
  }

  existing.count += 1;
  memoryStore.set(key, existing);
  return {
    allowed: true,
    remaining: limit - existing.count,
    reset: existing.reset
  };
}

export function getRateLimitKey(ip: string | null, route: string) {
  return `${route}:${ip ?? 'unknown'}`;
}
