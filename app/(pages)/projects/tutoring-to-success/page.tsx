import type { Metadata } from "next";
import { ProjectDetails } from "@/app/components";

export const metadata: Metadata = {
  title: "Tutoring To Success",
  description:
    "A custom website for a local tutoring agency, designed to build trust, showcase success stories, and make it easy for families to connect.",
  openGraph: {
    title: "Tutoring To Success | Ranj Sidhu",
    description:
      "Professional tutoring website featuring success stories, easy booking system, and engaging content for families seeking educational support.",
  },
};

export default function TutoringToSuccessPage() {
  return (
    <ProjectDetails
      title="Tutoring To Success"
      tagline="Empowering students through personalized education."
      description="A custom website for a local tutoring agency, designed to build trust, showcase success stories, and make it easy for families to connect with qualified tutors."
      benefits={[
        "Professional, trustworthy online presence",
        "Easy-to-use booking and contact system",
        "Showcases student success stories and testimonials",
        "Mobile-friendly design for parents on the go",
        "Clear presentation of services and expertise",
      ]}
      role="I designed and developed a website that reflects the agency's commitment to quality education, making it easy for families to find the right tutor for their needs."
      url="https://www.tutoringtosuccess.co.uk/"
    />
  );
}
