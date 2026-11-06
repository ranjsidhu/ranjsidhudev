import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";

describe("consumeRateLimit", () => {
  const window = { limit: 3, windowMs: 60_000 };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("allows hits up to the limit and rejects the next one", () => {
    const key = "test:limit";
    expect([1, 2, 3, 4].map(() => consumeRateLimit(key, window))).toEqual([
      true,
      true,
      true,
      false,
    ]);
  });

  it("tracks each key separately", () => {
    for (let i = 0; i < 3; i++) consumeRateLimit("test:a", window);
    expect(consumeRateLimit("test:a", window)).toBe(false);
    expect(consumeRateLimit("test:b", window)).toBe(true);
  });

  it("allows hits again once the window has passed", () => {
    const key = "test:window";
    for (let i = 0; i < 3; i++) consumeRateLimit(key, window);
    expect(consumeRateLimit(key, window)).toBe(false);

    jest.advanceTimersByTime(window.windowMs);
    expect(consumeRateLimit(key, window)).toBe(true);
  });

  it("uses a sliding window rather than a fixed reset", () => {
    const key = "test:sliding";
    consumeRateLimit(key, window);
    jest.advanceTimersByTime(30_000);
    consumeRateLimit(key, window);
    consumeRateLimit(key, window);

    // The first hit expires at 60s; the two at 30s still count.
    jest.advanceTimersByTime(30_000);
    expect(consumeRateLimit(key, window)).toBe(true);
    expect(consumeRateLimit(key, window)).toBe(false);
  });

  it("counts rejected hits, so retrying while blocked does not help", () => {
    const key = "test:rejected";
    for (let i = 0; i < 10; i++) consumeRateLimit(key, window);
    jest.advanceTimersByTime(window.windowMs - 1);
    expect(consumeRateLimit(key, window)).toBe(false);
  });
});

describe("consumeRateLimit cleanup", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("prunes stale keys without forgetting active ones", () => {
    const window = { limit: 3, windowMs: 60_000 };
    for (let i = 0; i <= 10_000; i++) consumeRateLimit(`stale:${i}`, window);

    jest.advanceTimersByTime(window.windowMs - 1);
    for (let i = 0; i < 3; i++) consumeRateLimit("active", window);

    // Stale keys are now expired; this hit pushes the map over its cap.
    jest.advanceTimersByTime(1);
    expect(consumeRateLimit("trigger", window)).toBe(true);

    expect(consumeRateLimit("active", window)).toBe(false);
    expect(consumeRateLimit("stale:0", window)).toBe(true);
  });
});

describe("getClientIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    expect(
      getClientIp(new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" })),
    ).toBe("203.0.113.5");
  });

  it("trims whitespace", () => {
    expect(
      getClientIp(new Headers({ "x-forwarded-for": "  203.0.113.5  " })),
    ).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "198.51.100.7" }))).toBe(
      "198.51.100.7",
    );
  });

  it("returns 'unknown' when no IP header is present", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });

  it("returns 'unknown' for an empty x-forwarded-for", () => {
    expect(getClientIp(new Headers({ "x-forwarded-for": "" }))).toBe("unknown");
  });
});
