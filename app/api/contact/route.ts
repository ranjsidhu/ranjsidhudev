import { type NextRequest, NextResponse } from "next/server";
import type { ContactDetails } from "@/types";
import { sendEmail } from "../utils/sendEmail";
import { formatEmail } from "./emailtemplate";

export async function POST(req: NextRequest) {
  try {
    const body: ContactDetails = await req.json();
    const html = formatEmail(body, "New Contact Form Submission");
    const res = await sendEmail(
      body.email,
      "New Contact Form Submission",
      html,
    );
    console.log("🚀 ~ POST ~ res:", res);
    return NextResponse.json({
      message: "Form submitted successfully",
      data: res,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
