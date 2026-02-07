import Link from "next/link";
import type { ProjectProps } from "@/types";
import TechTag from "./TechTag";

export default function Project({ title, slug, summary, tech }: ProjectProps) {
  return (
    <div
      data-testid="project-container"
      className="border border-black/10 rounded-2xl shadow-sm bg-white p-8 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition group"
    >
      <div className="flex-1">
        <Link
          href={`/projects/${slug}`}
          data-testid="project-slug-link"
          className="text-2xl font-light text-black mb-2 group-hover:underline hover:cursor-pointer transition"
        >
          {title}
        </Link>
        <p
          data-testid="project-summary"
          className="text-black/70 mb-4 text-base md:text-lg"
        >
          {summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-2" data-testid="project-tech">
          {tech.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>
      </div>
      <div className="mt-6 md:mt-0 md:ml-8 shrink-0 flex items-center">
        <Link
          href={`/projects/${slug}`}
          data-testid="project-link"
          className="px-6 py-2 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
