import { RECAPTCHA_ACTION } from "@/constants";
import logger from "@/lib/logger";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;
const TIMEOUT_MS = 5000;

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

/**
 * Verifies a reCAPTCHA v3 token with Google. Fails closed: a missing secret,
 * network error, wrong action or low score all return false.
 */
export const verifyRecaptcha = async (
  token: unknown,
  remoteIp?: string,
): Promise<boolean> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    logger.error("RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 4096) {
    logger.warn({ reason: "missing_token" }, "reCAPTCHA verification failed");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) {
      logger.error(
        { status: res.status },
        "reCAPTCHA verification request failed",
      );
      return false;
    }

    const data = (await res.json()) as SiteVerifyResponse;
    const passed =
      data.success === true &&
      data.action === RECAPTCHA_ACTION &&
      typeof data.score === "number" &&
      data.score >= MIN_SCORE;

    if (!passed) {
      logger.warn(
        {
          reason: "rejected",
          score: data.score,
          action: data.action,
          errorCodes: data["error-codes"],
        },
        "reCAPTCHA verification failed",
      );
    }
    return passed;
  } catch (error: unknown) {
    logger.error(
      { err: (error as Error)?.name ?? "UnknownError" },
      "reCAPTCHA verification errored",
    );
    return false;
  }
};
