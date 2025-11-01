import { type NextRequest, NextResponse } from "next/server";
import type { ContactDetails } from "@/types";
import { sendEmail } from "../utils/sendEmail";
import { formatEmail } from "./emailtemplate";

export async function POST(req: NextRequest) {
  try {
    const body: ContactDetails = await req.json();
    const html = formatEmail(body, "New Contact Form Submission");
    await sendEmail(body.email, "New Contact Form Submission", html);
    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
