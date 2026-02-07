import { ArrowRight, Code2, Globe, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll, HeroScene, Socials } from "@/app/components";
import { homepageSkills, PROJECTS } from "@/constants";

export default async function HomePage() {
  return (
    <>
      {/* ── Interactive Hero ── */}
      <HeroScene />

      {/* ── What I Do ── */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
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
                <div className="group relative bg-white/2 border border-white/5 rounded-2xl p-8 hover:border-white/15 hover:bg-white/4 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500">
                    <item.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <h3 className="text-lg font-light text-white mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed">
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
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
              Selected Work
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
              Projects
            </h2>
            <div className="h-px bg-white/10 mb-12" />
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
                  className="group flex items-center gap-6 md:gap-10 py-8 border-b border-white/10 hover:bg-white/2 transition-colors duration-300 px-2 -mx-2 rounded-lg"
                >
                  <span className="text-3xl md:text-6xl font-extralight text-white/10 tracking-wider shrink-0 w-14 md:w-24">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-1 tracking-wide group-hover:text-white/80 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/35 text-sm md:text-base line-clamp-1">
                      {project.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 shrink-0 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll animation="fade-in-up" delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/15 text-white/60 font-light tracking-widest uppercase text-xs hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300"
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
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-12">
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
                <span className="px-4 py-2 bg-white/3 text-white/40 rounded-full text-sm font-light tracking-wider border border-white/5 hover:border-white/15 hover:text-white/60 transition-all duration-300">
                  {skill}
                </span>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Watermark monogram */}
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
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-6">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-white/35 text-base max-w-md mx-auto mb-10 leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-3.5 rounded-full bg-white text-[#0a0a0a] font-light tracking-widest uppercase text-sm hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300"
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
