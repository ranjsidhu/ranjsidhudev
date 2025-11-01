import type { Metadata } from "next";
import { ProjectDetails } from "@/app/components";

export const metadata: Metadata = {
  title: "Stellar Recruitment",
  description:
    "A bespoke recruitment system crafted for the recruitment industry. Features streamlined hiring, candidate management, and custom workflows.",
  openGraph: {
    title: "Stellar Recruitment | Ranj Sidhu",
    description:
      "Custom recruitment platform with advanced candidate management, streamlined hiring processes, and tailored workflow solutions.",
  },
};

export default function StellarRecruitmentPage() {
  return (
    <ProjectDetails
      title="Stellar Recruitment"
      tagline="Bespoke recruitment software, crafted for business impact."
      description="A custom recruitment system, designed and developed from the ground up for a client in the recruitment industry. Every feature, workflow, and interface was tailored to their unique business processes and goals."
      benefits={[
        "Built to match the client's exact requirements and branding",
        "Streamlines hiring and candidate management for their team",
        "Secure, reliable, and easy to use for all staff",
        "Enables better decision-making with clear dashboards and reporting",
        "Scalable foundation for future growth",
      ]}
      work="I worked closely with the client to understand their needs, map out workflows, and deliver a robust, user-friendly solution. The result: a system that fits seamlessly into their business and delivers real value every day."
      url="https://www.stellar-recruitment.co.uk/"
    />
  );
}
