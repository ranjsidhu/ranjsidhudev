import { TechTagProps } from "@/types";

export default function TechTag({ name }: TechTagProps) {
  return (
    <span
      data-testid="tech-tag-container"
      className="px-3 py-1 bg-black/5 text-black/70 rounded-full text-xs font-light tracking-wider border border-black/10"
    >
      {name}
    </span>
  );
}
