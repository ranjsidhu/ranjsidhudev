import { ContactDetails } from "@/types";
import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../utils/sendEmail";

export async function POST(req: NextRequest) {
  try {
    const body: ContactDetails = await req.json();
    const html = formatEmail(body, "New Contact Form Submission");
    await sendEmail(body.email, "New Contact Form Submission", html);
    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
