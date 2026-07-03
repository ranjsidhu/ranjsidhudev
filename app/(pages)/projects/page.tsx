import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Folder,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AnimateOnScroll } from "@/app/components";
import { PROJECTS } from "@/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of bespoke web solutions and software projects, including recruitment systems and educational platforms.",
  openGraph: {
    title: "Projects | Ranj Sidhu",
    description:
      "Featured projects including Stellar Recruitment and Tutoring To Success, showcasing expertise in custom web development and software solutions.",
  },
};

const ACCENTS = [
  {
    glow: "bg-violet-500/15",
    border: "hover:border-violet-500/40",
    tag: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    number: "from-violet-500/20 to-transparent",
    dot: "bg-violet-400",
    check: "text-violet-400",
    highlight: "border-violet-500/10 hover:border-violet-500/25",
    visitBg: "from-violet-600 to-cyan-500",
  },
  {
    glow: "bg-cyan-500/15",
    border: "hover:border-cyan-500/40",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    number: "from-cyan-500/20 to-transparent",
    dot: "bg-cyan-400",
    check: "text-cyan-400",
    highlight: "border-cyan-500/10 hover:border-cyan-500/25",
    visitBg: "from-cyan-500 to-emerald-400",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[15%] right-[5%] w-150 h-150 bg-violet-600/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[10%] w-100 h-100 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-28">
          <AnimateOnScroll animation="fade-in-up">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 mb-8">
                <Folder className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-slate-300 tracking-wide">
                  Portfolio
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
                Work that <span className="gradient-text">speaks</span>
                <br />
                for itself.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                Real products, real users. Each project built from scratch with
                modern tech and a focus on impact.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in-up" delay={0.2}>
            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { value: `${PROJECTS.length}`, label: "Projects" },
                { value: "100%", label: "Custom Built" },
                { value: "Live", label: "In Production" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <div>
                    <span className="text-white font-bold text-lg">
                      {stat.value}
                    </span>
                    <span className="text-slate-500 text-sm ml-2">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Project showcases ── */}
      <section className="py-12">
        {PROJECTS.map((project, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const isEven = i % 2 === 0;

          return (
            <div key={project.slug} className="relative">
              <div
                className={`absolute ${isEven ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-125 h-125 ${accent.glow} rounded-full blur-[180px] pointer-events-none opacity-50`}
              />

              <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <AnimateOnScroll
                  animation={isEven ? "slide-in-left" : "slide-in-right"}
                >
                  <div className="relative">
                    {/* Watermark number */}
                    <div
                      className={`absolute -top-8 ${isEven ? "-left-4" : "-right-4"} text-[12rem] md:text-[16rem] font-black leading-none bg-linear-to-b ${accent.number} bg-clip-text text-transparent select-none pointer-events-none z-0`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10">
                      {/* Meta bar */}
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`w-2 h-2 rounded-full ${accent.dot}`} />
                        <span className="text-slate-500 text-sm uppercase tracking-[0.2em]">
                          Project {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="w-8 h-px bg-slate-700" />
                        <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      </div>

                      {/* Title + summary */}
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                        {project.summary}
                      </p>

                      {/* Highlights grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                        {project.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className={`flex items-center gap-3 p-4 rounded-xl glass-card ${accent.highlight} transition-all duration-300`}
                          >
                            <CheckCircle
                              className={`w-4 h-4 ${accent.check} shrink-0`}
                            />
                            <span className="text-slate-300 text-sm font-medium">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech + actions row */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${accent.tag}`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r ${accent.visitBg} text-white text-sm font-medium hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300`}
                          >
                            Visit live site
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-2 text-violet-300 text-sm font-medium hover:text-violet-200 hover:gap-3 transition-all"
                          >
                            Case study
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>

              {i < PROJECTS.length - 1 && (
                <div className="max-w-6xl mx-auto px-6">
                  <div className="gradient-divider" />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
