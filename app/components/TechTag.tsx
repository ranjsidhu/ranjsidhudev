import type { TechTagProps } from "@/types";

export default function TechTag({ name }: TechTagProps) {
  return (
    <span
      data-testid="tech-tag-container"
      className="px-3 py-1 bg-white/5 text-white/50 rounded-full text-xs font-light tracking-wider border border-white/10"
    >
      {name}
    </span>
  );
}
