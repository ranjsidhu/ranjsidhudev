import { CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ProjectDetailsProps } from "@/types";

export default function ProjectDetails({
  title,
  tagline,
  description,
  benefits,
  work,
  url,
}: ProjectDetailsProps) {
  return (
    <div data-testid="project-details" className="min-h-screen">
      {/* ── Hero header with animated gradient ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em]">
              Project
            </p>
          </div>
          <h1
            data-testid="project-details-title"
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4"
          >
            {title}
          </h1>
          <p
            data-testid="project-details-tagline"
            className="text-white/40 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {tagline}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ── Content sections ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* What Was Delivered */}
        <div data-testid="project-details-delivered">
          <div className="flex items-center gap-6 mb-8">
            <h2
              data-testid="project-details-delivered-title"
              className="text-xl font-light text-white tracking-wide shrink-0"
            >
              What Was Delivered?
            </h2>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <p
            data-testid="project-details-delivered-desc"
            className="text-white/45 text-lg leading-relaxed max-w-3xl"
          >
            {description}
          </p>
        </div>

        {/* Key Benefits */}
        <div data-testid="project-details-benefits">
          <div className="flex items-center gap-6 mb-8">
            <h2
              data-testid="project-details-benefits-title"
              className="text-xl font-light text-white tracking-wide shrink-0"
            >
              Key Benefits
            </h2>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <div
            data-testid="project-details-benefits-list"
            className="grid md:grid-cols-2 gap-4"
          >
            {benefits.map((bn) => (
              <div
                key={bn}
                className="group flex items-start gap-3 bg-white/2 border border-white/5 rounded-xl p-5 hover:border-white/10 hover:bg-white/4 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400/60 shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors duration-300" />
                <span className="text-white/45 text-sm leading-relaxed">
                  {bn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* My Role & Approach */}
        <div data-testid="project-details-role">
          <div className="flex items-center gap-6 mb-8">
            <h2
              data-testid="project-details-role-title"
              className="text-xl font-light text-white tracking-wide shrink-0"
            >
              My Role &amp; Approach
            </h2>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <p
            data-testid="project-details-role-desc"
            className="text-white/45 text-lg leading-relaxed max-w-3xl"
          >
            {work}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link
            data-testid="project-details-visit-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0a0a0a] font-light tracking-widest uppercase text-sm hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            Visit Website
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
