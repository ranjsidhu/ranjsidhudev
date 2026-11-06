import type { NextConfig } from "next";

type Header = { key: string; value: string };

// Loads next.config.ts fresh under the given NODE_ENV.
const loadHeaders = async (nodeEnv: string) => {
  const env = process.env as Record<string, string | undefined>;
  const original = env.NODE_ENV;
  env.NODE_ENV = nodeEnv;
  let config: NextConfig | undefined;
  try {
    jest.isolateModules(() => {
      config = require("@/next.config").default;
    });
  } finally {
    env.NODE_ENV = original;
  }
  const routes = await (config as NextConfig).headers?.();
  return { config: config as NextConfig, routes };
};

const headerMap = (headers: Header[]) =>
  Object.fromEntries(headers.map((h) => [h.key, h.value]));

const directives = (csp: string) =>
  Object.fromEntries(
    csp.split("; ").map((d) => {
      const [name, ...values] = d.split(" ");
      return [name, values];
    }),
  );

describe("next.config security headers", () => {
  it("applies the headers to every route", async () => {
    const { routes } = await loadHeaders("production");
    expect(routes).toHaveLength(1);
    expect(routes?.[0].source).toBe("/:path*");
  });

  it("sets the expected security headers", async () => {
    const { routes } = await loadHeaders("production");
    const headers = headerMap(routes?.[0].headers as Header[]);

    expect(headers["Strict-Transport-Security"]).toBe(
      "max-age=63072000; includeSubDomains",
    );
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
  });

  it("locks down the production CSP", async () => {
    const { routes } = await loadHeaders("production");
    const csp = directives(
      headerMap(routes?.[0].headers as Header[])["Content-Security-Policy"],
    );

    expect(csp["default-src"]).toEqual(["'self'"]);
    expect(csp["frame-ancestors"]).toEqual(["'none'"]);
    expect(csp["object-src"]).toEqual(["'none'"]);
    expect(csp["base-uri"]).toEqual(["'self'"]);
    expect(csp["form-action"]).toEqual(["'self'"]);
    expect(csp).toHaveProperty("upgrade-insecure-requests");
    expect(csp["script-src"]).not.toContain("'unsafe-eval'");
    expect(csp["connect-src"]).not.toContain("ws:");
  });

  it("allows only the reCAPTCHA origins it needs", async () => {
    const { routes } = await loadHeaders("production");
    const csp = directives(
      headerMap(routes?.[0].headers as Header[])["Content-Security-Policy"],
    );

    expect(csp["script-src"]).toEqual(
      expect.arrayContaining([
        "https://www.google.com/recaptcha/",
        "https://www.gstatic.com/recaptcha/",
      ]),
    );
    expect(csp["frame-src"]).toEqual(
      expect.arrayContaining([
        "https://www.google.com/recaptcha/",
        "https://recaptcha.google.com/recaptcha/",
      ]),
    );
    expect(csp["connect-src"]).toContain("https://www.google.com/recaptcha/");
  });

  it("relaxes the CSP for the development server", async () => {
    const { routes } = await loadHeaders("development");
    const csp = directives(
      headerMap(routes?.[0].headers as Header[])["Content-Security-Policy"],
    );

    expect(csp["script-src"]).toContain("'unsafe-eval'");
    expect(csp["connect-src"]).toEqual(expect.arrayContaining(["ws:", "wss:"]));
    expect(csp).not.toHaveProperty("upgrade-insecure-requests");
  });

  it("hides the X-Powered-By header", async () => {
    const { config } = await loadHeaders("production");
    expect(config.poweredByHeader).toBe(false);
  });
});
