import Link from "next/link";
import type { FeaturedProjectProps } from "@/types";

export default function FeaturedProject({
  title,
  tagline,
  slug,
  scaledText,
}: FeaturedProjectProps) {
  return (
    <div className="group bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden">
      <h4 className="text-xl font-light text-white mb-2 group-hover:text-white/80 transition">
        {title}
      </h4>
      <p className="text-white/40 mb-6">{tagline}</p>
      <Link
        href={slug}
        className="inline-block mt-auto px-6 py-2 rounded-full border border-white/20 text-white font-light tracking-widest uppercase hover:bg-white/5 transition text-sm"
      >
        View Details
      </Link>
      <span className="absolute right-6 top-6 text-6xl text-white/3 font-bold select-none">
        {scaledText}
      </span>
    </div>
  );
}
