import {
  ArrowRight,
  Code2,
  ExternalLink,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll, HeroScene, Socials } from "@/app/components";
import { homepageSkills, PROJECTS } from "@/constants";

export default async function HomePage() {
  return (
    <>
      <HeroScene />

      {/* ── Bento Grid — What I Do ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 gradient-divider" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                What I Do
              </h2>
            </div>
          </AnimateOnScroll>

          {/* Bento layout — one large + two stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <AnimateOnScroll animation="fade-in-up" className="lg:col-span-3">
              <div className="group h-full glass-card rounded-3xl p-8 md:p-10 hover:border-violet-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-violet-500/10 rounded-full blur-[80px] group-hover:bg-violet-500/20 transition-colors pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Web Applications
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed max-w-md mb-6">
                    Full-stack apps built with Next.js, React, and Node.js —
                    performant, accessible, and production-ready. From complex
                    dashboards to sleek marketing sites.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "TypeScript", "Node.js"].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-violet-500/10 text-violet-300 text-xs border border-violet-500/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="lg:col-span-2 flex flex-col gap-5">
              <AnimateOnScroll animation="fade-in-up" delay={0.1}>
                <div className="group glass-card rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center mb-5">
                      <Layers className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Product Engineering
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      End-to-end development from idea to deployment, with
                      scalable architecture built in from day one.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={0.2}>
                <div className="group glass-card rounded-3xl p-8 hover:border-rose-500/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-rose-500/10 rounded-full blur-[60px] group-hover:bg-rose-500/20 transition-colors pointer-events-none" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 flex items-center justify-center mb-5">
                      <Code2 className="w-5 h-5 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      APIs & Integrations
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      RESTful APIs, third-party integrations, and database
                      design with PostgreSQL.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects — large visual cards ── */}
      <section className="relative py-24 px-6">
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Featured Projects
              </h2>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <AnimateOnScroll
                key={project.slug}
                animation="fade-in-up"
                delay={i * 0.15}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block glass-card rounded-3xl overflow-hidden hover:border-violet-500/30 transition-all duration-500"
                >
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-violet-500/10">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-white/5 rounded-md px-3 py-1 text-slate-500 text-xs truncate max-w-[200px] mx-auto text-center">
                        {project.url.replace("https://www.", "")}
                      </div>
                    </div>
                  </div>

                  {/* Gradient preview area */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))"
                            : "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.1))",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-violet-500/10 text-violet-300/70 rounded-lg text-xs border border-violet-500/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll animation="fade-in-up" delay={0.3}>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 transition-colors"
              >
                View all projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Tech Stack — Scrolling Marquee ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="gradient-divider mb-16" />
        <AnimateOnScroll animation="fade-in">
          <p className="text-center text-sm text-slate-500 uppercase tracking-[0.3em] mb-10">
            Technologies I work with
          </p>
        </AnimateOnScroll>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee">
            {["a", "b"].flatMap((set) =>
              homepageSkills.map((skill) => (
                <span
                  key={`${set}-${skill}`}
                  className="shrink-0 px-6 py-3 rounded-2xl glass-card text-sm text-slate-300 font-medium tracking-wide whitespace-nowrap"
                >
                  {skill}
                </span>
              )),
            )}
          </div>
        </div>
        <div className="gradient-divider mt-16" />
      </section>

      {/* ── CTA — Full width gradient ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <AnimateOnScroll animation="fade-in-up">
            <div className="glass-card rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-8">
                  <Image
                    src="/colournobg.png"
                    alt=""
                    width={40}
                    height={40}
                    className="logo-invert w-8 h-8 object-contain"
                  />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Let&apos;s build something{" "}
                  <span className="gradient-text">great</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                  Have a project in mind? I&apos;d love to hear about it and
                  explore how we can work together.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <Link
                    href="/contact"
                    className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium tracking-wide hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    Start a conversation
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>

                <div className="flex justify-center gap-5">
                  <Socials size={20} />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
