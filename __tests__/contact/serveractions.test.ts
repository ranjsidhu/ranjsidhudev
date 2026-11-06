// Module scope keeps this file's mock names private.
export {};

type ServerActionsModule = typeof import("@/app/(pages)/contact/serveractions");

const mockHeaders = jest.fn();
jest.mock("next/headers", () => ({ headers: () => mockHeaders() }));

const mockSendEmail = jest.fn();
jest.mock("@/app/api/utils/sendEmail", () => ({
  sendEmail: (...args: unknown[]) => mockSendEmail(...args),
}));

const mockVerifyRecaptcha = jest.fn();
jest.mock("@/lib/recaptcha", () => ({
  verifyRecaptcha: (...args: unknown[]) => mockVerifyRecaptcha(...args),
}));

const mockLogger = { info: jest.fn(), warn: jest.fn(), error: jest.fn() };
jest.mock("@/lib/logger", () => ({
  __esModule: true,
  default: {
    info: (...args: unknown[]) => mockLogger.info(...args),
    warn: (...args: unknown[]) => mockLogger.warn(...args),
    error: (...args: unknown[]) => mockLogger.error(...args),
  },
}));

const valid = {
  name: "Alice Visitor",
  email: "alice@example.com",
  enquiryType: "hiring",
  message: "I would like to work together.",
};

// A fresh module per test resets the in-memory rate-limit counters.
const loadAction = () => {
  let mod: ServerActionsModule | undefined;
  jest.isolateModules(() => {
    mod = require("@/app/(pages)/contact/serveractions");
  });
  return (mod as ServerActionsModule).submitContactForm;
};

const fromIp = (ip: string) =>
  mockHeaders.mockResolvedValue(new Headers({ "x-forwarded-for": ip }));

const allLogs = () =>
  JSON.stringify([
    mockLogger.info.mock.calls,
    mockLogger.warn.mock.calls,
    mockLogger.error.mock.calls,
  ]);

beforeEach(() => {
  fromIp("203.0.113.5");
  mockVerifyRecaptcha.mockResolvedValue(true);
  mockSendEmail.mockResolvedValue({ MessageId: "msg-1" });
});

describe("submitContactForm", () => {
  it("sends the email and returns only a success flag", async () => {
    const result = await loadAction()(valid, "token");

    expect(result).toEqual({ success: true });
    expect(mockVerifyRecaptcha).toHaveBeenCalledWith("token", "203.0.113.5");
    expect(mockSendEmail).toHaveBeenCalledTimes(1);

    const [replyTo, subject, html] = mockSendEmail.mock.calls[0];
    expect(replyTo).toBe("alice@example.com");
    expect(subject).toBe("New Contact Form Submission");
    expect(html).toContain("Hiring Opportunity");
    expect(html).toContain("I would like to work together.");
  });

  it("escapes visitor markup before it reaches the email", async () => {
    await loadAction()(
      { ...valid, name: '</span><a href="https://attacker.example">x</a>' },
      "token",
    );
    const html: string = mockSendEmail.mock.calls[0][2];
    expect(html).not.toContain("<a href");
    expect(html).toContain("&lt;a href=&quot;https://attacker.example&quot;");
  });

  it("rejects invalid input without verifying reCAPTCHA or sending", async () => {
    const result = await loadAction()(
      { ...valid, email: "not-an-email" },
      "token",
    );

    expect(result).toEqual({ success: false });
    expect(mockVerifyRecaptcha).not.toHaveBeenCalled();
    expect(mockSendEmail).not.toHaveBeenCalled();
    expect(mockLogger.warn).toHaveBeenCalledWith(
      { reason: "invalid_input" },
      "Contact form submission rejected",
    );
  });

  it("rejects a failed reCAPTCHA check without sending", async () => {
    mockVerifyRecaptcha.mockResolvedValue(false);
    const result = await loadAction()(valid, "bad-token");

    expect(result).toEqual({ success: false });
    expect(mockSendEmail).not.toHaveBeenCalled();
    expect(mockLogger.warn).toHaveBeenCalledWith(
      { reason: "recaptcha" },
      "Contact form submission rejected",
    );
  });

  it("returns a bare failure flag and logs details when sending fails", async () => {
    const sesError = Object.assign(new Error("Email address is not verified"), {
      name: "MessageRejected",
      $metadata: { httpStatusCode: 400, requestId: "req-123" },
    });
    mockSendEmail.mockRejectedValue(sesError);

    const result = await loadAction()(valid, "token");

    expect(result).toEqual({ success: false });
    expect(mockLogger.error).toHaveBeenCalledWith(
      {
        err: {
          name: "MessageRejected",
          message: "Email address is not verified",
          httpStatusCode: 400,
          requestId: "req-123",
        },
      },
      "Contact form submission failed",
    );
  });

  it("logs a generic error name when a non-Error is thrown", async () => {
    mockSendEmail.mockRejectedValue("SES unavailable");
    await expect(loadAction()(valid, "token")).resolves.toEqual({
      success: false,
    });
    expect(mockLogger.error).toHaveBeenCalledWith(
      {
        err: {
          name: "UnknownError",
          message: undefined,
          httpStatusCode: undefined,
          requestId: undefined,
        },
      },
      "Contact form submission failed",
    );
  });

  it("returns a failure flag when reading request headers throws", async () => {
    mockHeaders.mockRejectedValue(new Error("no request context"));
    await expect(loadAction()(valid, "token")).resolves.toEqual({
      success: false,
    });
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("allows 3 submissions per IP, then rate limits that IP only", async () => {
    const submit = loadAction();
    const results = [];
    for (let i = 0; i < 4; i++) results.push(await submit(valid, "token"));

    expect(results.map((r) => r.success)).toEqual([true, true, true, false]);
    expect(mockSendEmail).toHaveBeenCalledTimes(3);
    expect(mockLogger.warn).toHaveBeenCalledWith(
      { reason: "rate_limited" },
      "Contact form submission rejected",
    );

    fromIp("198.51.100.7");
    await expect(submit(valid, "token")).resolves.toEqual({ success: true });
  });

  it("applies the rate limit before reCAPTCHA verification", async () => {
    const submit = loadAction();
    for (let i = 0; i < 5; i++) await submit(valid, "token");
    expect(mockVerifyRecaptcha).toHaveBeenCalledTimes(3);
  });

  it("counts invalid submissions toward the rate limit", async () => {
    const submit = loadAction();
    for (let i = 0; i < 3; i++) await submit({}, "token");
    await expect(submit(valid, "token")).resolves.toEqual({ success: false });
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("caps total submissions at 30 per hour across all IPs", async () => {
    const submit = loadAction();
    for (let i = 0; i < 30; i++) {
      fromIp(`203.0.113.${i}`);
      await expect(submit(valid, "token")).resolves.toEqual({ success: true });
    }
    fromIp("198.51.100.99");
    await expect(submit(valid, "token")).resolves.toEqual({ success: false });
    expect(mockSendEmail).toHaveBeenCalledTimes(30);
  });

  it("never logs the visitor's personal details", async () => {
    const submit = loadAction();
    await submit(valid, "token");
    mockSendEmail.mockRejectedValue(new Error("boom"));
    await submit(valid, "token");

    const logged = allLogs();
    expect(logged).not.toContain(valid.email);
    expect(logged).not.toContain(valid.name);
    expect(logged).not.toContain(valid.message);
    expect(logged).not.toContain("203.0.113.5");
  });
});
