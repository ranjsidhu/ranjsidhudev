// Module scope keeps this file's mock names private.
export {};

type SendEmailModule = typeof import("@/app/api/utils/sendEmail");

const mockSend = jest.fn();
const mockClientConfig = jest.fn();

jest.mock("@aws-sdk/client-sesv2", () => ({
  SESv2Client: class {
    constructor(config: unknown) {
      mockClientConfig(config);
    }
    send = (command: unknown) => mockSend(command);
  },
  SendEmailCommand: class {
    constructor(public input: unknown) {}
  },
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

const ENV_KEYS = [
  "AWS_REGION",
  "AWS_AK",
  "AWS_SECRET_ACCESS_KEY",
  "SENDER_EMAIL",
  "ADMIN_DESTINATION_EMAIL",
] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

// Loads a fresh copy so the lazily cached SES client starts empty.
const loadSendEmail = () => {
  let mod: SendEmailModule | undefined;
  jest.isolateModules(() => {
    mod = require("@/app/api/utils/sendEmail");
  });
  return (mod as SendEmailModule).sendEmail;
};

beforeEach(() => {
  process.env.AWS_REGION = "eu-west-2";
  process.env.AWS_AK = "test-access-key";
  process.env.AWS_SECRET_ACCESS_KEY = "test-secret-key";
  process.env.SENDER_EMAIL = "site@example.com";
  process.env.ADMIN_DESTINATION_EMAIL = "owner@example.com";
  mockSend.mockResolvedValue({ MessageId: "msg-1" });
});

afterAll(() => {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
});

describe("sendEmail", () => {
  it("sends the email to the owner with the visitor as reply-to", async () => {
    const sendEmail = loadSendEmail();
    const res = await sendEmail("visitor@example.com", "Subject", "<p>Hi</p>");

    expect(res).toEqual({ MessageId: "msg-1" });
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend.mock.calls[0][0].input).toEqual({
      FromEmailAddress: "site@example.com",
      Destination: { ToAddresses: ["owner@example.com"] },
      ReplyToAddresses: ["visitor@example.com"],
      FeedbackForwardingEmailAddress: "owner@example.com",
      Content: {
        Simple: {
          Subject: { Data: "Subject" },
          Body: { Html: { Data: "<p>Hi</p>" } },
        },
      },
    });
  });

  it("configures the SES client from the environment", async () => {
    await loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>");
    expect(mockClientConfig).toHaveBeenCalledWith({
      region: "eu-west-2",
      credentials: {
        accessKeyId: "test-access-key",
        secretAccessKey: "test-secret-key",
      },
    });
  });

  it("creates the SES client once and reuses it", async () => {
    const sendEmail = loadSendEmail();
    await sendEmail("a@example.com", "S", "<p>1</p>");
    await sendEmail("b@example.com", "S", "<p>2</p>");
    expect(mockClientConfig).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("uses the default credential chain when no static keys are set", async () => {
    delete process.env.AWS_AK;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    await loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>");

    expect(mockClientConfig).toHaveBeenCalledWith({ region: "eu-west-2" });
    expect(mockLogger.info).toHaveBeenCalledWith(
      { credentials: "default-chain" },
      "SES client initialized",
    );
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("logs that static keys are in use without logging the keys", async () => {
    await loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>");
    expect(mockLogger.info).toHaveBeenCalledWith(
      { credentials: "static" },
      "SES client initialized",
    );
    const logged = JSON.stringify(mockLogger.info.mock.calls);
    expect(logged).not.toContain("test-access-key");
    expect(logged).not.toContain("test-secret-key");
  });

  it.each(["AWS_AK", "AWS_SECRET_ACCESS_KEY"] as const)(
    "throws when only %s is missing from the key pair",
    async (key) => {
      delete process.env[key];
      await expect(
        loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>"),
      ).rejects.toThrow(
        "AWS_AK and AWS_SECRET_ACCESS_KEY must be set together, or both left unset",
      );
      expect(mockSend).not.toHaveBeenCalled();
    },
  );

  it.each(["SENDER_EMAIL", "ADMIN_DESTINATION_EMAIL", "AWS_REGION"] as const)(
    "throws when %s is missing",
    async (key) => {
      delete process.env[key];
      await expect(
        loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>"),
      ).rejects.toThrow(`${key} environment variable is required`);
      expect(mockSend).not.toHaveBeenCalled();
    },
  );

  it("propagates SES errors instead of swallowing them", async () => {
    mockSend.mockRejectedValue(new Error("MessageRejected"));
    await expect(
      loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>"),
    ).rejects.toThrow("MessageRejected");
  });

  it("does not log the visitor's email address", async () => {
    await loadSendEmail()("visitor@example.com", "Subject", "<p>Hi</p>");
    const logged = JSON.stringify([
      mockLogger.info.mock.calls,
      mockLogger.warn.mock.calls,
      mockLogger.error.mock.calls,
    ]);
    expect(logged).not.toContain("visitor@example.com");
  });
});
