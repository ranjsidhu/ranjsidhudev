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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Header with animated gradient ── */}
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
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
              Selected Work
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
              Projects
            </h1>
            <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
              A selection of work demonstrating modern web development, clean
              code, and thoughtful user experiences.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ── Project cards with previews ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {PROJECTS.map((project, i) => (
          <AnimateOnScroll
            key={project.slug}
            animation="fade-in-up"
            delay={i * 0.15}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block bg-white/2 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-500"
            >
              {/* Browser mockup */}
              <div className="relative">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-white/5 rounded-md px-3 py-1 text-white/25 text-xs font-light truncate max-w-xs mx-auto text-center">
                      {project.url.replace("https://", "")}
                    </div>
                  </div>
                </div>

                {/* Iframe preview */}
                <div className="relative h-44 sm:h-52 md:h-72 lg:h-80 overflow-hidden lg:flex">
                  <div className="relative h-full w-full lg:basis-1/2 lg:border-r lg:border-white/5 overflow-hidden">
                    <DelayedIframe
                      src={project.url}
                      title={`${project.title} preview`}
                      delay={800}
                    />
                  </div>

                  {/* Desktop side panel */}
                  <div className="hidden lg:flex lg:basis-1/2 flex-col justify-between p-6 xl:p-8 bg-white/2">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
                        Snapshot
                      </p>
                      <h4 className="text-2xl font-light text-white/85 mb-3">
                        {project.title}
                      </h4>
                      <p className="text-white/35 text-sm leading-relaxed line-clamp-4">
                        {project.summary}
                      </p>
                    </div>
                    <div className="mt-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-white/3 text-white/30 rounded-md text-xs font-light tracking-wider border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 text-white/60 text-sm">
                        View project
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Gradient fade overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/2 transition-colors duration-500" />
                </div>
              </div>

              {/* Project info */}
              <div className="p-6 md:p-8 flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0 lg:hidden">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl font-extralight text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-white tracking-wide group-hover:text-white/80 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-white/35 text-sm md:text-base line-clamp-2 mb-4">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-white/3 text-white/30 rounded-md text-xs font-light tracking-wider border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 shrink-0 mt-2 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300 lg:hidden" />
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </section>
    </div>
  );
}
