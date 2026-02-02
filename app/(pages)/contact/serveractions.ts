"use server";

import { formatEmail } from "@/app/api/contact/emailtemplate";
import { sendEmail } from "@/app/api/utils/sendEmail";
import type { ContactDetails } from "@/types";

export async function submitContactForm(details: ContactDetails) {
  try {
    const html = formatEmail(details, "New Contact Form Submission");
    await sendEmail(details.email, "New Contact Form Submission", html);
    return { success: true, data: { message: "Form submitted successfully" } };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message,
      data: null,
    };
  }
}
