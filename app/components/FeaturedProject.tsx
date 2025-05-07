import Link from "next/link";
import type { FeaturedProjectProps } from "@/types";

export default function FeaturedProject({
  title,
  tagline,
  slug,
  scaledText,
}: FeaturedProjectProps) {
  return (
    <div className="group border border-black/10 rounded-2xl bg-white shadow-sm p-8 flex flex-col justify-between hover:shadow-lg transition relative overflow-hidden">
      <h4 className="text-xl font-light text-black mb-2 group-hover:underline transition">
        {title}
      </h4>
      <p className="text-black/70 mb-4">{tagline}</p>
      <Link
        href={slug}
        className="inline-block mt-auto px-6 py-2 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-sm"
      >
        View Details
      </Link>
      <span className="absolute right-6 top-6 text-6xl text-black/5 font-bold select-none">
        {scaledText}
      </span>
    </div>
  );
}
