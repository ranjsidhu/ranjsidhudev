"use server";

import { formatEmail } from "@/app/api/contact/emailtemplate";
import { sendEmail } from "@/app/api/utils/sendEmail";
import logger from "@/lib/logger";
import type { ContactDetails } from "@/types";

export async function submitContactForm(details: ContactDetails) {
  logger.info(
    { enquiryType: details.enquiryType },
    "Contact form submission received",
  );

  try {
    const html = formatEmail(details, "New Contact Form Submission");
    const res = await sendEmail(
      details.email,
      "New Contact Form Submission",
      html,
    );
    logger.info(
      { messageId: res?.MessageId },
      "Contact form email sent successfully",
    );
    return {
      success: true,
      data: { message: "Form submitted successfully", res },
    };
  } catch (error: unknown) {
    const errMsg = (error as Error).message || "Unknown error";
    logger.error(
      { err: errMsg, enquiryType: details.enquiryType },
      "Contact form submission failed",
    );
    return {
      success: false,
      error: errMsg,
      data: null,
    };
  }
}
