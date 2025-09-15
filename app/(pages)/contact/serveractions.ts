"use server";

import type { ContactDetails } from "@/types";

export async function submitContactForm(details: ContactDetails) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`,
      {
        method: "POST",
        body: JSON.stringify(details),
      }
    );
    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
}
