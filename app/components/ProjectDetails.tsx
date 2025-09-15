import type { ProjectDetailsProps } from "@/types";
import Link from "next/link";

export default function ProjectDetails({
  title,
  tagline,
  description,
  benefits,
  work,
  url,
}: ProjectDetailsProps) {
  return (
    <div
      data-testid="project-details"
      className="min-h-screen bg-white flex flex-col items-center py-16 px-4"
    >
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Title & Tagline */}
        <h1
          data-testid="project-details-title"
          className="text-4xl md:text-5xl font-light text-black tracking-widest uppercase text-center mb-2"
        >
          {title}
        </h1>
        <p
          data-testid="project-details-tagline"
          className="text-black/70 text-xl text-center mb-8 max-w-xl"
        >
          {tagline}
        </p>

        {/* What Was Delivered? */}
        <div
          data-testid="project-details-delivered"
          className="w-full border border-black/10 rounded-2xl bg-white shadow-sm p-8 mb-8"
        >
          <h2
            data-testid="project-details-delivered-title"
            className="text-2xl font-light text-black mb-4 tracking-wider text-center"
          >
            What Was Delivered?
          </h2>
          <p
            data-testid="project-details-delivered-desc"
            className="text-black/80 text-lg text-center"
          >
            {description}
          </p>
        </div>

        {/* Key Benefits */}
        <div
          data-testid="project-details-benefits"
          className="w-full border border-black/10 rounded-2xl bg-white shadow-sm p-8 mb-8"
        >
          <h2
            data-testid="project-details-benefits-title"
            className="text-2xl font-light text-black mb-4 tracking-wider text-center"
          >
            Key Benefits
          </h2>
          <ul
            data-testid="project-details-benefits-list"
            className="list-disc pl-6 space-y-3 text-black/80 text-base max-w-lg mx-auto"
          >
            {benefits.map((bn) => (
              <li key={bn}>{bn}</li>
            ))}
          </ul>
        </div>

        {/* My Role & Approach */}
        <div
          data-testid="project-details-role"
          className="w-full border border-black/10 rounded-2xl bg-white shadow-sm p-8 mb-10"
        >
          <h2
            data-testid="project-details-role-title"
            className="text-2xl font-light text-black mb-4 tracking-wider text-center"
          >
            My Role &amp; Approach
          </h2>
          <p
            data-testid="project-details-role-desc"
            className="text-black/80 text-lg text-center mb-2"
          >
            {work}
          </p>
        </div>

        {/* Call to Action */}
        <Link
          data-testid="project-details-visit-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 px-8 py-3 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-base"
        >
          Visit Website
        </Link>
      </div>
    </div>
  );
}
