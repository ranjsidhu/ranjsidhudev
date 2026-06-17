import { ArrowRight, Code2, Globe, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll, HeroScene, Socials } from "@/app/components";
import { homepageSkills, PROJECTS } from "@/constants";

const SKILL_COLORS = [
  "border-violet-500/20 text-violet-300 hover:border-violet-400/40 hover:bg-violet-500/10",
  "border-cyan-500/20 text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10",
  "border-rose-500/20 text-rose-300 hover:border-rose-400/40 hover:bg-rose-500/10",
  "border-amber-500/20 text-amber-300 hover:border-amber-400/40 hover:bg-amber-500/10",
  "border-emerald-500/20 text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/10",
];

const CARD_ACCENTS = [
  {
    border: "hover:border-violet-500/30",
    icon: "text-violet-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]",
  },
  {
    border: "hover:border-cyan-500/30",
    icon: "text-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
  },
  {
    border: "hover:border-rose-500/30",
    icon: "text-rose-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]",
  },
];

export default async function HomePage() {
  return (
    <>
      <HeroScene />

      {/* ── What I Do ── */}
      <section className="relative py-32 px-6">
        <div className="absolute top-0 left-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <p className="text-violet-400/70 text-xs uppercase tracking-[0.3em] mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-16">
              What I Do
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Web Applications",
                description:
                  "Full-stack apps built with Next.js, React, and Node.js — performant, accessible, and production-ready.",
              },
              {
                icon: Layers,
                title: "Product Engineering",
                description:
                  "End-to-end product development from idea to deployment, with a focus on scalable architecture.",
              },
              {
                icon: Code2,
                title: "APIs & Integrations",
                description:
                  "RESTful APIs, third-party integrations, and database design with PostgreSQL and modern tooling.",
              },
            ].map((item, i) => (
              <AnimateOnScroll
                key={item.title}
                animation="fade-in-up"
                delay={i * 0.15}
              >
                <div
                  className={`group relative glass-card rounded-2xl p-8 ${CARD_ACCENTS[i].border} ${CARD_ACCENTS[i].glow} transition-all duration-500`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500">
                    <item.icon className={`w-5 h-5 ${CARD_ACCENTS[i].icon}`} />
                  </div>
                  <h3 className="text-lg font-light text-white mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="relative py-32 px-6">
        <div className="absolute top-1/3 -right-32 w-64 h-64 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <p className="text-cyan-400/70 text-xs uppercase tracking-[0.3em] mb-3">
              Selected Work
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
              Projects
            </h2>
            <div className="gradient-divider mb-12" />
          </AnimateOnScroll>

          <div className="space-y-0">
            {PROJECTS.map((project, i) => (
              <AnimateOnScroll
                key={project.slug}
                animation="fade-in-up"
                delay={i * 0.1}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-center gap-6 md:gap-10 py-8 border-b border-violet-500/10 hover:bg-violet-500/5 transition-colors duration-300 px-2 -mx-2 rounded-lg"
                >
                  <span className="text-3xl md:text-6xl font-extralight text-violet-500/15 tracking-wider shrink-0 w-14 md:w-24 group-hover:text-violet-400/25 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-1 tracking-wide group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base line-clamp-1">
                      {project.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-violet-500/30 shrink-0 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll animation="fade-in-up" delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-violet-500/20 text-violet-300 font-light tracking-widest uppercase text-xs hover:bg-violet-500/10 hover:border-violet-400/40 transition-all duration-300"
              >
                All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <AnimateOnScroll animation="fade-in">
            <p className="text-emerald-400/70 text-xs uppercase tracking-[0.3em] mb-12">
              Tech Stack
            </p>
          </AnimateOnScroll>
          <div className="flex flex-wrap justify-center gap-3">
            {homepageSkills.map((skill, i) => (
              <AnimateOnScroll
                key={skill}
                animation="scale-in"
                delay={i * 0.05}
              >
                <span
                  className={`px-4 py-2 bg-white/3 rounded-full text-sm font-light tracking-wider border transition-all duration-300 ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                >
                  {skill}
                </span>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/colournobg.png"
              alt=""
              width={400}
              height={400}
              className="logo-invert w-64 h-64 md:w-96 md:h-96 object-contain opacity-[0.03]"
            />
          </div>

          <AnimateOnScroll animation="fade-in-up">
            <p className="text-rose-400/70 text-xs uppercase tracking-[0.3em] mb-6">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-slate-400 text-base max-w-md mx-auto mb-10 leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-light tracking-widest uppercase text-sm hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
            >
              Start a Conversation
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in" delay={0.3}>
            <div className="mt-12 flex justify-center gap-5">
              <Socials size={20} />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
