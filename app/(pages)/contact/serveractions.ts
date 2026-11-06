"use server";

import { headers } from "next/headers";
import { formatEmail } from "@/app/api/contact/emailtemplate";
import { sendEmail } from "@/app/api/utils/sendEmail";
import { parseContactDetails } from "@/constants";
import logger from "@/lib/logger";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyRecaptcha } from "@/lib/recaptcha";

const SUBJECT = "New Contact Form Submission";

// Per-client and per-instance submission limits.
const PER_CLIENT_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };
const GLOBAL_LIMIT = { limit: 30, windowMs: 60 * 60 * 1000 };

type SubmitResult = { success: boolean };

/** Logs only non-sensitive error details: never request data or addresses. */
const errorSummary = (error: unknown) => {
  const err = error as {
    name?: string;
    message?: string;
    $metadata?: { httpStatusCode?: number; requestId?: string };
  };
  return {
    name: err?.name ?? "UnknownError",
    message: err?.message,
    httpStatusCode: err?.$metadata?.httpStatusCode,
    requestId: err?.$metadata?.requestId,
  };
};

export async function submitContactForm(
  details: unknown,
  recaptchaToken: unknown,
): Promise<SubmitResult> {
  try {
    const clientIp = getClientIp(await headers());

    if (
      !consumeRateLimit(`ip:${clientIp}`, PER_CLIENT_LIMIT) ||
      !consumeRateLimit("global", GLOBAL_LIMIT)
    ) {
      logger.warn(
        { reason: "rate_limited" },
        "Contact form submission rejected",
      );
      return { success: false };
    }

    const contact = parseContactDetails(details);
    if (!contact) {
      logger.warn(
        { reason: "invalid_input" },
        "Contact form submission rejected",
      );
      return { success: false };
    }

    if (!(await verifyRecaptcha(recaptchaToken, clientIp))) {
      logger.warn({ reason: "recaptcha" }, "Contact form submission rejected");
      return { success: false };
    }

    const html = formatEmail(contact, SUBJECT);
    const res = await sendEmail(contact.email, SUBJECT, html);
    logger.info(
      { messageId: res.MessageId, enquiryType: contact.enquiryType },
      "Contact form email sent",
    );
    return { success: true };
  } catch (error: unknown) {
    logger.error(
      { err: errorSummary(error) },
      "Contact form submission failed",
    );
    return { success: false };
  }
}
