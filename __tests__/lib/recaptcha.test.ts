import { RECAPTCHA_ACTION } from "@/constants";
import { verifyRecaptcha } from "@/lib/recaptcha";

jest.mock("@/lib/logger", () => ({
  __esModule: true,
  default: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
const mockLogger = jest.requireMock("@/lib/logger").default as Record<
  "info" | "warn" | "error",
  jest.Mock
>;

const ORIGINAL_SECRET = process.env.RECAPTCHA_SECRET_KEY;

const googleResponse = (body: object, init: ResponseInit = { status: 200 }) =>
  new Response(JSON.stringify(body), init);

const passing = { success: true, score: 0.9, action: RECAPTCHA_ACTION };

let fetchMock: jest.SpyInstance;

beforeEach(() => {
  process.env.RECAPTCHA_SECRET_KEY = "test-secret";
  fetchMock = jest.spyOn(global, "fetch");
});

afterAll(() => {
  process.env.RECAPTCHA_SECRET_KEY = ORIGINAL_SECRET;
});

describe("verifyRecaptcha", () => {
  it("passes a successful token with the right action and a high score", async () => {
    fetchMock.mockResolvedValue(googleResponse(passing));
    await expect(verifyRecaptcha("token", "203.0.113.5")).resolves.toBe(true);
  });

  it("posts the secret, token and client IP to Google", async () => {
    fetchMock.mockResolvedValue(googleResponse(passing));
    await verifyRecaptcha("token", "203.0.113.5");

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://www.google.com/recaptcha/api/siteverify");
    expect(init.method).toBe("POST");
    const body = init.body as URLSearchParams;
    expect(body.get("secret")).toBe("test-secret");
    expect(body.get("response")).toBe("token");
    expect(body.get("remoteip")).toBe("203.0.113.5");
  });

  it("omits remoteip when the client IP is unknown", async () => {
    fetchMock.mockResolvedValue(googleResponse(passing));
    await verifyRecaptcha("token", "unknown");
    const body = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(body.has("remoteip")).toBe(false);
  });

  it("accepts a score exactly at the threshold", async () => {
    fetchMock.mockResolvedValue(googleResponse({ ...passing, score: 0.5 }));
    await expect(verifyRecaptcha("token")).resolves.toBe(true);
  });

  it.each([
    ["success is false", { ...passing, success: false }],
    ["the score is below 0.5", { ...passing, score: 0.4 }],
    ["the score is missing", { success: true, action: RECAPTCHA_ACTION }],
    ["the action does not match", { ...passing, action: "login" }],
  ])("fails when %s", async (_label, body) => {
    fetchMock.mockResolvedValue(googleResponse(body));
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
    expect(mockLogger.warn).toHaveBeenCalled();
  });

  it("fails closed without calling Google when the secret is missing", async () => {
    delete process.env.RECAPTCHA_SECRET_KEY;
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalled();
  });

  it.each([
    ["undefined", undefined],
    ["a number", 123],
    ["an empty string", ""],
    ["an oversized string", "a".repeat(4097)],
  ])("fails without calling Google when the token is %s", async (_l, token) => {
    await expect(verifyRecaptcha(token)).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails when Google returns a non-OK status", async () => {
    fetchMock.mockResolvedValue(googleResponse({}, { status: 500 }));
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
  });

  it("fails when the request throws", async () => {
    fetchMock.mockRejectedValue(new TypeError("network down"));
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
    expect(mockLogger.error).toHaveBeenCalledWith(
      { err: "TypeError" },
      "reCAPTCHA verification errored",
    );
  });

  it("logs a generic name when a non-Error is thrown", async () => {
    fetchMock.mockRejectedValue("offline");
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
    expect(mockLogger.error).toHaveBeenCalledWith(
      { err: "UnknownError" },
      "reCAPTCHA verification errored",
    );
  });

  it("never logs the secret or the token", async () => {
    fetchMock.mockResolvedValue(googleResponse({ ...passing, score: 0.1 }));
    await verifyRecaptcha("secret-token-value");
    const logged = JSON.stringify([
      mockLogger.warn.mock.calls,
      mockLogger.error.mock.calls,
    ]);
    expect(logged).not.toContain("test-secret");
    expect(logged).not.toContain("secret-token-value");
  });
});
