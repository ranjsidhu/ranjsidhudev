import { MapPin, Target, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll, Socials } from "@/app/components";
import { homepageSkills } from "@/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ranj Sidhu, a software engineer specialising in user-centric web development with expertise in Next.js, React, and TypeScript.",
  openGraph: {
    title: "About | Ranj Sidhu",
    description:
      "Discover more about Ranj Sidhu's background, skills, and approach to software development.",
  },
};

const SKILL_COLORS = [
  "border-violet-500/15 text-violet-300/70 hover:border-violet-400/30 hover:text-violet-200 hover:bg-violet-500/10",
  "border-cyan-500/15 text-cyan-300/70 hover:border-cyan-400/30 hover:text-cyan-200 hover:bg-cyan-500/10",
  "border-rose-500/15 text-rose-300/70 hover:border-rose-400/30 hover:text-rose-200 hover:bg-rose-500/10",
  "border-amber-500/15 text-amber-300/70 hover:border-amber-400/30 hover:text-amber-200 hover:bg-amber-500/10",
  "border-emerald-500/15 text-emerald-300/70 hover:border-emerald-400/30 hover:text-emerald-200 hover:bg-emerald-500/10",
];

const HIGHLIGHT_COLORS = [
  "text-violet-500/20",
  "text-cyan-500/20",
  "text-rose-500/20",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #7c3aed 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <Image
            src="/colournobg.png"
            alt=""
            width={400}
            height={400}
            className="logo-invert opacity-[0.03] w-80 h-80"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <AnimateOnScroll animation="fade-in-up">
            <p className="text-violet-400/70 text-xs uppercase tracking-[0.3em] mb-3">
              Get to Know Me
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
              About
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              A software engineer who cares about craft and calm, reliable
              delivery.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Split layout ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 md:gap-16">
          <AnimateOnScroll
            animation="fade-in"
            className="md:sticky md:top-24 md:self-start"
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-3xl" />
                <Image
                  src="/colournobg.png"
                  alt="Ranj Sidhu"
                  width={180}
                  height={180}
                  className="logo-invert relative w-36 h-36 md:w-44 md:h-44 object-contain"
                />
              </div>
              <div className="space-y-3 text-center md:text-left">
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <span>Based in the UK</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span>Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <span>Next.js, React, TypeScript</span>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Link
                  href="/projects"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-light tracking-wider uppercase text-xs hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
                >
                  View Work
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-full border border-violet-500/30 text-white font-light tracking-wider uppercase text-xs hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300"
                >
                  Contact
                </Link>
              </div>
              <div className="mt-6 flex gap-4">
                <Socials size={18} />
              </div>
            </div>
          </AnimateOnScroll>

          <div className="space-y-20">
            <AnimateOnScroll animation="fade-in-up">
              <div>
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  I&apos;m Ranj, a software engineer who cares about craft and
                  calm, reliable delivery.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  I focus on building user-centric web experiences with a strong
                  attention to accessibility, performance, and maintainability.
                  I enjoy shaping clear interfaces, sensible systems, and
                  collaborating closely from idea to shipped product.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in-up">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-xl font-light text-white tracking-wide shrink-0">
                  Highlights
                </h2>
                <div className="gradient-divider flex-1" />
              </div>
              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    text: "Product-minded engineer with a focus on usability and outcomes. I build software that solves real problems.",
                  },
                  {
                    num: "02",
                    text: "Experience across front-end (React/Next.js) and back-end (Node.js, PostgreSQL). Comfortable across the stack.",
                  },
                  {
                    num: "03",
                    text: "Comfortable shaping features end-to-end: from UI design to API architecture to deployment and monitoring.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.num}
                    className="group flex gap-6 items-start p-4 -mx-4 rounded-xl hover:bg-violet-500/5 transition-colors duration-300"
                  >
                    <span
                      className={`text-3xl font-extralight ${HIGHLIGHT_COLORS[i]} shrink-0 w-10 group-hover:text-violet-400/30 transition-colors duration-300`}
                    >
                      {item.num}
                    </span>
                    <p className="text-slate-400 leading-relaxed pt-1 group-hover:text-slate-300 transition-colors">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in-up">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-xl font-light text-white tracking-wide shrink-0">
                  Skills
                </h2>
                <div className="gradient-divider flex-1" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {homepageSkills.map((skill, i) => (
                  <div
                    key={skill}
                    className={`bg-white/3 border rounded-xl px-4 py-3.5 text-sm font-light transition-all duration-300 ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
