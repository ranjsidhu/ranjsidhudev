import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
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

const PROJECT_ACCENTS = [
  {
    tag: "text-violet-400/60",
    border: "hover:border-violet-500/30",
    glow: "bg-violet-600/8",
  },
  {
    tag: "text-cyan-400/60",
    border: "hover:border-cyan-500/30",
    glow: "bg-cyan-500/8",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #06b6d4 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <Image
            src="/colournobg.png"
            alt=""
            width={300}
            height={300}
            className="logo-invert opacity-[0.02] w-64 h-64"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <AnimateOnScroll animation="fade-in-up">
            <p className="text-cyan-400/70 text-xs uppercase tracking-[0.3em] mb-3">
              Selected Work
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
              Projects
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              A selection of work demonstrating modern web development, clean
              code, and thoughtful user experiences.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Project cards ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {PROJECTS.map((project, i) => {
          const accent = PROJECT_ACCENTS[i % PROJECT_ACCENTS.length];
          return (
            <AnimateOnScroll
              key={project.slug}
              animation="fade-in-up"
              delay={i * 0.15}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`group block glass-card rounded-2xl overflow-hidden ${accent.border} transition-all duration-500`}
              >
                <div className="relative">
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-violet-500/10">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-white/5 rounded-md px-3 py-1 text-slate-500 text-xs font-light truncate max-w-xs mx-auto text-center">
                        {project.url.replace("https://", "")}
                      </div>
                    </div>
                  </div>

                  <div className="relative h-44 sm:h-52 md:h-72 lg:h-80 overflow-hidden lg:flex">
                    <div className="relative h-full w-full lg:basis-1/2 lg:border-r lg:border-violet-500/10 overflow-hidden">
                      <DelayedIframe
                        src={project.url}
                        title={`${project.title} preview`}
                        delay={800}
                      />
                    </div>

                    <div className="hidden lg:flex lg:basis-1/2 flex-col justify-between p-6 xl:p-8 bg-white/2">
                      <div>
                        <p
                          className={`${accent.tag} text-xs uppercase tracking-[0.3em] mb-3`}
                        >
                          Snapshot
                        </p>
                        <h4 className="text-2xl font-light text-white/85 mb-3">
                          {project.title}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                          {project.summary}
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 bg-violet-500/10 text-violet-300/60 rounded-md text-xs font-light tracking-wider border border-violet-500/15"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-2 text-violet-300 text-sm">
                          View project
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-[#030014] via-transparent to-transparent opacity-60 lg:from-transparent" />
                    <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/3 transition-colors duration-500" />
                  </div>
                </div>

                <div className="p-6 md:p-8 flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0 lg:hidden">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl font-extralight text-violet-500/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl font-light text-white tracking-wide group-hover:text-violet-200 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base line-clamp-2 mb-4">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-violet-500/10 text-violet-300/60 rounded-md text-xs font-light tracking-wider border border-violet-500/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-violet-500/30 shrink-0 mt-2 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300 lg:hidden" />
                </div>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </section>
    </div>
  );
}
