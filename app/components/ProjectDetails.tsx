import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
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
      {/* ── Hero — bold, left-aligned ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 mb-8">
            <span className="text-sm text-violet-300 tracking-wide">
              Project
            </span>
          </div>

          <h1
            data-testid="project-details-title"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {title}
          </h1>
          <p
            data-testid="project-details-tagline"
            className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
          >
            {tagline}
          </p>

          <Link
            data-testid="project-details-visit-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium tracking-wide hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
          >
            Visit live site
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Content — card-based sections ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-8">
        {/* Description card */}
        <div
          data-testid="project-details-delivered"
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative">
            <h2
              data-testid="project-details-delivered-title"
              className="text-xl md:text-2xl font-semibold text-white mb-6"
            >
              What Was Delivered
            </h2>
            <p
              data-testid="project-details-delivered-desc"
              className="text-slate-400 text-lg leading-relaxed max-w-3xl"
            >
              {description}
            </p>
          </div>
        </div>

        {/* Benefits grid */}
        <div data-testid="project-details-benefits">
          <h2
            data-testid="project-details-benefits-title"
            className="text-xl md:text-2xl font-semibold text-white mb-6 px-2"
          >
            Key Benefits
          </h2>
          <div
            data-testid="project-details-benefits-list"
            className="grid md:grid-cols-2 gap-4"
          >
            {benefits.map((bn, i) => {
              const colors = [
                "hover:border-violet-500/30",
                "hover:border-cyan-500/30",
                "hover:border-emerald-500/30",
                "hover:border-rose-500/30",
                "hover:border-amber-500/30",
              ];
              return (
                <div
                  key={bn}
                  className={`group flex items-start gap-4 glass-card rounded-2xl p-6 ${colors[i % colors.length]} transition-all duration-300`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">
                    {bn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role card */}
        <div
          data-testid="project-details-role"
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative">
            <h2
              data-testid="project-details-role-title"
              className="text-xl md:text-2xl font-semibold text-white mb-6"
            >
              My Role & Approach
            </h2>
            <p
              data-testid="project-details-role-desc"
              className="text-slate-400 text-lg leading-relaxed max-w-3xl"
            >
              {work}
            </p>
          </div>
        </div>

        {/* Back to projects */}
        <div className="pt-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to all projects
          </Link>
        </div>
      </section>
    </div>
  );
}
