import Link from "next/link";
import type { ProjectProps } from "@/types";
import TechTag from "./TechTag";

export default function Project({ title, slug, summary, tech }: ProjectProps) {
  return (
    <div
      data-testid="project-container"
      className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex-1">
        <Link
          href={`/projects/${slug}`}
          data-testid="project-slug-link"
          className="text-2xl font-light text-white mb-2 group-hover:text-white/80 hover:cursor-pointer transition"
        >
          {title}
        </Link>
        <p
          data-testid="project-summary"
          className="text-white/40 mb-4 text-base md:text-lg"
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
          className="px-6 py-2 rounded-full border border-white/20 text-white font-light tracking-widest uppercase hover:bg-white/5 transition text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
