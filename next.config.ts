import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Next.js injects inline bootstrap scripts and the site uses inline styles,
// so 'unsafe-inline' is required for script-src and style-src without a
// nonce-based (fully dynamic) setup. reCAPTCHA origins are path-scoped per
// Google's CSP guidance. The frame-src project origins are for project
// preview iframes.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.gstatic.com/recaptcha/",
  "font-src 'self'",
  `connect-src 'self' https://www.google.com/recaptcha/${isDev ? " ws: wss:" : ""}`,
  "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/ https://www.stellar-recruitment.co.uk https://www.tutoringtosuccess.co.uk",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
