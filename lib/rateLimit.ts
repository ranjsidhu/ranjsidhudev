/**
 * Best-effort in-memory sliding-window rate limiter.
 *
 * State lives in the memory of one server instance. On serverless platforms
 * each instance keeps its own counters and they reset on cold start, so this
 * slows down abuse but is not a hard global cap. Pair it with reCAPTCHA and,
 * for a durable limit, an edge rule (for example a Vercel Firewall rate limit).
 */

type Window = { limit: number; windowMs: number };

const buckets = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 10_000;

const prune = (now: number, windowMs: number) => {
  for (const [key, hits] of buckets) {
    if (hits.every((t) => now - t >= windowMs)) buckets.delete(key);
  }
};

/** Records one hit for `key` and returns false when it is over the limit. */
export const consumeRateLimit = (
  key: string,
  { limit, windowMs }: Window,
): boolean => {
  const now = Date.now();
  if (buckets.size > MAX_TRACKED_KEYS) prune(now, windowMs);

  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length <= limit;
};

/**
 * Client IP for rate limiting. On Vercel, x-forwarded-for is set by the edge
 * and client-supplied values are overwritten, so its first entry is the
 * client address.
 */
export const getClientIp = (requestHeaders: Headers): string => {
  const forwarded = requestHeaders.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || requestHeaders.get("x-real-ip") || "unknown";
};
