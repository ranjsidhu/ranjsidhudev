/**
 * @jest-environment jsdom
 */
type ClientModule = typeof import("@/lib/recaptchaClient");

const env = process.env as Record<string, string | undefined>;
const ORIGINAL_KEY = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// The site key is read at import time, so load a fresh module per case.
const loadClient = (siteKey: string | undefined) => {
  if (siteKey === undefined) delete env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  else env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = siteKey;
  let mod: ClientModule | undefined;
  jest.isolateModules(() => {
    mod = require("@/lib/recaptchaClient");
  });
  return mod as ClientModule;
};

const installGrecaptcha = (execute: jest.Mock) => {
  window.grecaptcha = { ready: (callback) => callback(), execute };
};

afterEach(() => {
  delete window.grecaptcha;
});

afterAll(() => {
  if (ORIGINAL_KEY === undefined) delete env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  else env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = ORIGINAL_KEY;
});

describe("getRecaptchaToken", () => {
  it("exposes the configured site key", () => {
    expect(loadClient("site-key").RECAPTCHA_SITE_KEY).toBe("site-key");
  });

  it("resolves with a token for the given action", async () => {
    const execute = jest.fn().mockResolvedValue("token-123");
    installGrecaptcha(execute);

    await expect(
      loadClient("site-key").getRecaptchaToken("contact_form"),
    ).resolves.toBe("token-123");
    expect(execute).toHaveBeenCalledWith("site-key", {
      action: "contact_form",
    });
  });

  it("waits for grecaptcha.ready before executing", async () => {
    let readyCallback: (() => void) | undefined;
    const execute = jest.fn().mockResolvedValue("token");
    window.grecaptcha = {
      ready: (callback) => {
        readyCallback = callback;
      },
      execute,
    };

    const pending = loadClient("site-key").getRecaptchaToken("contact_form");
    expect(execute).not.toHaveBeenCalled();
    readyCallback?.();
    await expect(pending).resolves.toBe("token");
  });

  it("rejects when the script has not loaded", async () => {
    await expect(
      loadClient("site-key").getRecaptchaToken("contact_form"),
    ).rejects.toThrow("reCAPTCHA is not available");
  });

  it("rejects when no site key is configured", async () => {
    const execute = jest.fn();
    installGrecaptcha(execute);
    await expect(
      loadClient(undefined).getRecaptchaToken("contact_form"),
    ).rejects.toThrow("reCAPTCHA is not available");
    expect(execute).not.toHaveBeenCalled();
  });

  it("rejects when execute fails", async () => {
    installGrecaptcha(jest.fn().mockRejectedValue(new Error("blocked")));
    await expect(
      loadClient("site-key").getRecaptchaToken("contact_form"),
    ).rejects.toThrow("blocked");
  });
});
