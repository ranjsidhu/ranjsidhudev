import { ArrowRight, ExternalLink, Folder, Lock, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AnimateOnScroll, DelayedIframe } from "@/app/components";
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
    gradient: "from-violet-600 to-cyan-500",
    glow: "bg-violet-500/15",
    glowAlt: "bg-cyan-500/10",
    border: "hover:border-violet-500/40",
    tag: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    number: "from-violet-500/20 to-transparent",
    dot: "bg-violet-400",
  },
  {
    gradient: "from-cyan-500 to-emerald-400",
    glow: "bg-cyan-500/15",
    glowAlt: "bg-emerald-500/10",
    border: "hover:border-cyan-500/40",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    number: "from-cyan-500/20 to-transparent",
    dot: "bg-cyan-400",
  },
  {
    gradient: "from-rose-500 to-amber-400",
    glow: "bg-rose-500/15",
    glowAlt: "bg-amber-500/10",
    border: "hover:border-rose-500/40",
    tag: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    number: "from-rose-500/20 to-transparent",
    dot: "bg-rose-400",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero — editorial, impactful ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[15%] right-[5%] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

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

          {/* Stats strip */}
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

      {/* ── Full-width project showcases ── */}
      <section className="py-12">
        {PROJECTS.map((project, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const isEven = i % 2 === 0;

          return (
            <div key={project.slug} className="relative">
              {/* Ambient glow per project */}
              <div
                className={`absolute ${isEven ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-[500px] h-[500px] ${accent.glow} rounded-full blur-[180px] pointer-events-none opacity-50`}
              />

              <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <AnimateOnScroll
                  animation={isEven ? "slide-in-left" : "slide-in-right"}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className={`group block relative ${accent.border} transition-all duration-500`}
                  >
                    {/* Project number watermark */}
                    <div
                      className={`absolute -top-8 ${isEven ? "-left-4" : "-right-4"} text-[12rem] md:text-[16rem] font-black leading-none bg-gradient-to-b ${accent.number} bg-clip-text text-transparent select-none pointer-events-none z-0`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10">
                      {/* Top bar with project info */}
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`w-2 h-2 rounded-full ${accent.dot}`} />
                        <span className="text-slate-500 text-sm uppercase tracking-[0.2em]">
                          Project {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="w-8 h-px bg-slate-700" />
                        <span className="text-slate-500 text-sm">
                          {project.url.replace("https://www.", "")}
                        </span>
                      </div>

                      {/* Title + description row */}
                      <div
                        className={`grid md:grid-cols-[1fr_auto] gap-8 mb-8 items-end ${isEven ? "" : "md:direction-rtl"}`}
                      >
                        <div
                          className={isEven ? "" : "md:order-2 md:text-right"}
                        >
                          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors leading-tight">
                            {project.title}
                          </h2>
                          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                            {project.summary}
                          </p>
                        </div>
                        <div
                          className={`flex flex-col gap-3 ${isEven ? "" : "md:order-1"}`}
                        >
                          <div className="flex flex-wrap gap-2 md:justify-end">
                            {project.tech.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${accent.tag}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Browser preview — full width, dramatic */}
                      <div className="glass-card rounded-2xl overflow-hidden">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5 bg-white/3">
                          <div className="flex gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-rose-500/50 group-hover:bg-rose-500 transition-colors" />
                            <span className="w-3 h-3 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors" />
                            <span className="w-3 h-3 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors" />
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="bg-white/5 rounded-lg px-4 py-1.5 text-slate-500 text-xs max-w-sm mx-auto text-center flex items-center justify-center gap-2">
                              <Lock className="w-3 h-3" />
                              {project.url.replace("https://", "")}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Preview area */}
                        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
                          <DelayedIframe
                            src={project.url}
                            title={`${project.title} preview`}
                            delay={600 + i * 400}
                          />
                          {/* Fade overlay at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="inline-flex items-center gap-3 text-violet-300 font-medium group-hover:gap-4 transition-all">
                          View full case study
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-slate-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live in production
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              </div>

              {/* Divider between projects */}
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
