import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProjectRowProps } from "@/types";
import TechTag from "./TechTag";

export default function ProjectRow({
  number,
  title,
  tagline,
  slug,
  tech,
}: ProjectRowProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex items-center gap-6 md:gap-10 py-8 border-b border-white/10 hover:bg-white/2 transition-colors duration-300 px-2 -mx-2 rounded-lg"
    >
      <span className="text-3xl md:text-5xl font-extralight text-white/15 tracking-wider shrink-0 w-12 md:w-20">
        {number}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl md:text-2xl font-light text-white mb-1 tracking-wide">
          {title}
        </h3>
        <p className="text-white/40 text-sm md:text-base line-clamp-1">
          {tagline}
        </p>
        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tech.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>
        )}
      </div>
      <ArrowRight className="w-5 h-5 text-white/30 shrink-0 arrow-slide transition-transform duration-300" />
    </Link>
  );
}
