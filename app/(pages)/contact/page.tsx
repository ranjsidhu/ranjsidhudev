import type { Metadata } from "next";
import Contact from "./Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ranj Sidhu for bespoke web solutions, software development projects, and collaborations.",
  openGraph: {
    title: "Contact | Ranj Sidhu",
    description:
      "Connect with me to discuss your next project, whether it's a custom web application, recruitment system, or educational platform.",
  },
};

export default function ContactPage() {
  return <Contact />;
}
