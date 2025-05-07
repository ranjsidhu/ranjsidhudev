import { ProjectDetails } from "@/app/components";

export default function TutoringToSuccessProjectPage() {
  return (
    <ProjectDetails
      title="Tutoring To Success"
      tagline="A bespoke online presence for a local tutoring agency."
      description="A custom website, designed and developed specifically for a local tutoring business. Every page and feature was tailored to showcase their services, build trust with parents, and make it easy for families to get in touch."
      benefits={[
        "Showcases the agency's unique approach and success stories",
        "Easy for parents to find information and make contact",
        "Professional, trustworthy design that stands out locally",
        "Mobile-friendly and accessible for all users",
        "Built to support the agency's growth and reputation",
      ]}
      role="I worked directly with the agency to understand their values, goals, and the needs of their clients. The result: a website that reflects their passion for education and helps more families connect with their services."
      url="https://www.tutoringtosuccess.co.uk/"
    />
  );
}
