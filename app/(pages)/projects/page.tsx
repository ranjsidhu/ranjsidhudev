import { ArrowRight, Folder } from "lucide-react";
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

const ACCENT_GRADIENTS = [
  "from-violet-500/20 to-cyan-500/10",
  "from-cyan-500/20 to-emerald-500/10",
  "from-rose-500/20 to-amber-500/10",
];

const ACCENT_BORDERS = [
  "hover:border-violet-500/30",
  "hover:border-cyan-500/30",
  "hover:border-rose-500/30",
];

const TAG_COLORS = [
  "bg-violet-500/10 text-violet-300 border-violet-500/15",
  "bg-cyan-500/10 text-cyan-300 border-cyan-500/15",
  "bg-rose-500/10 text-rose-300 border-rose-500/15",
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
          <AnimateOnScroll animation="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
              <Folder className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300 tracking-wide">
                Portfolio
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Selected <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Real-world applications built with modern tech stacks, clean
              architecture, and a focus on delivering genuine value.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Project cards — alternating layout ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {PROJECTS.map((project, i) => {
          const isEven = i % 2 === 0;
          return (
            <AnimateOnScroll
              key={project.slug}
              animation={isEven ? "slide-in-left" : "slide-in-right"}
              delay={0.1}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`group block glass-card rounded-3xl overflow-hidden ${ACCENT_BORDERS[i % ACCENT_BORDERS.length]} transition-all duration-500`}
              >
                <div
                  className={`grid md:grid-cols-2 ${isEven ? "" : "md:direction-rtl"}`}
                >
                  {/* Preview side */}
                  <div
                    className={`relative h-64 md:h-auto md:min-h-[380px] overflow-hidden ${isEven ? "" : "md:order-2"}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length]} z-0`}
                    />
                    {/* Browser chrome */}
                    <div className="absolute top-4 left-4 right-4 z-10">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/30 backdrop-blur-md rounded-t-xl border border-white/5">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                        </div>
                        <div className="flex-1 mx-2">
                          <div className="bg-white/5 rounded-md px-3 py-1 text-slate-500 text-xs truncate max-w-[200px] mx-auto text-center">
                            {project.url.replace("https://www.", "")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[52px] left-4 right-4 bottom-4 z-10 rounded-b-xl overflow-hidden border border-white/5 border-t-0">
                      <DelayedIframe
                        src={project.url}
                        title={`${project.title} preview`}
                        delay={800}
                      />
                    </div>
                  </div>

                  {/* Content side */}
                  <div
                    className={`p-8 md:p-10 lg:p-12 flex flex-col justify-center ${isEven ? "" : "md:order-1"}`}
                  >
                    <span className="text-6xl font-black text-white/5 mb-4 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${TAG_COLORS[i % TAG_COLORS.length]}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-violet-300 text-sm font-medium group-hover:gap-3 transition-all">
                      View case study
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </section>
    </div>
  );
}
