import type { Metadata } from "next";
import { Project } from "@/app/components";
import { PROJECTS } from "@/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of bespoke web solutions and software projects, including recruitment systems and educational platforms.",
  openGraph: {
    title: "Projects | Ranj Sidhu",
    description:
      "Featured projects including Stellar Recruitment and Tutoring To Success, showcasing expertise in custom web development and software solutions.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light text-black tracking-widest uppercase text-center mb-4">
          Projects
        </h1>
        <p className="text-black/60 text-lg text-center mb-12 max-w-2xl mx-auto">
          A selection of my work, demonstrating my skills in modern web
          development, clean code, and elegant user experiences. Each project
          highlights my attention to detail, technical expertise, and commitment
          to delivering value.
        </p>
        <div className="space-y-10">
          {PROJECTS.map((project) => (
            <Project
              key={project.slug}
              slug={project.slug}
              title={project.title}
              summary={project.summary}
              tech={project.tech}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
