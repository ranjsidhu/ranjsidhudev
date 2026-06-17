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
      {/* ── Hero header ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #7c3aed 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-violet-400/70 text-xs uppercase tracking-[0.3em]">
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
            className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {tagline}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Content ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div data-testid="project-details-delivered">
          <div className="flex items-center gap-6 mb-8">
            <h2
              data-testid="project-details-delivered-title"
              className="text-xl font-light text-white tracking-wide shrink-0"
            >
              What Was Delivered?
            </h2>
            <div className="gradient-divider flex-1" />
          </div>
          <p
            data-testid="project-details-delivered-desc"
            className="text-slate-400 text-lg leading-relaxed max-w-3xl"
          >
            {description}
          </p>
        </div>

        <div data-testid="project-details-benefits">
          <div className="flex items-center gap-6 mb-8">
            <h2
              data-testid="project-details-benefits-title"
              className="text-xl font-light text-white tracking-wide shrink-0"
            >
              Key Benefits
            </h2>
            <div className="gradient-divider flex-1" />
          </div>
          <div
            data-testid="project-details-benefits-list"
            className="grid md:grid-cols-2 gap-4"
          >
            {benefits.map((bn) => (
              <div
                key={bn}
                className="group flex items-start gap-3 glass-card rounded-xl p-5 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400/60 shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors duration-300" />
                <span className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {bn}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-testid="project-details-role">
          <div className="flex items-center gap-6 mb-8">
            <h2
              data-testid="project-details-role-title"
              className="text-xl font-light text-white tracking-wide shrink-0"
            >
              My Role &amp; Approach
            </h2>
            <div className="gradient-divider flex-1" />
          </div>
          <p
            data-testid="project-details-role-desc"
            className="text-slate-400 text-lg leading-relaxed max-w-3xl"
          >
            {work}
          </p>
        </div>

        <div className="pt-4">
          <Link
            data-testid="project-details-visit-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-light tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
          >
            Visit Website
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
