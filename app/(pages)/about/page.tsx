import {
  ArrowRight,
  Code2,
  Lightbulb,
  MapPin,
  Rocket,
  Target,
} from "lucide-react";
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
  "border-violet-500/20 text-violet-300 bg-violet-500/5",
  "border-cyan-500/20 text-cyan-300 bg-cyan-500/5",
  "border-rose-500/20 text-rose-300 bg-rose-500/5",
  "border-amber-500/20 text-amber-300 bg-amber-500/5",
  "border-emerald-500/20 text-emerald-300 bg-emerald-500/5",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero — large intro with avatar ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[20%] left-[5%] w-125 h-125 bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-100 h-100 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <AnimateOnScroll animation="fade-in-up">
              <p className="text-violet-400 text-sm uppercase tracking-[0.2em] mb-4 font-medium">
                About Me
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                I&apos;m Ranj.
                <br />
                <span className="gradient-text">I build for the web.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-8">
                A software engineer who cares about craft, clean code, and calm,
                reliable delivery. I focus on building user-centric experiences
                that are accessible, performant, and maintainable.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  Based in the UK
                </div>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Target className="w-4 h-4 text-cyan-400" />
                  Full-Stack Development
                </div>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Code2 className="w-4 h-4 text-rose-400" />
                  Next.js, React, TypeScript
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scale-in">
              <div className="relative mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-violet-500/20 to-cyan-500/20 blur-2xl" />
                <div className="relative glass-card rounded-3xl p-6 flex flex-col items-center">
                  <Image
                    src="/colournobg.png"
                    alt="Ranj Sidhu"
                    width={200}
                    height={200}
                    className="logo-invert w-40 h-40 md:w-48 md:h-48 object-contain mb-4"
                  />
                  <span className="text-white font-semibold text-lg">
                    Ranj Sidhu
                  </span>
                  <span className="text-slate-400 text-sm mb-4">
                    Software Engineer
                  </span>
                  <div className="flex gap-3">
                    <Socials size={18} />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── What Drives Me — horizontal cards ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <AnimateOnScroll animation="fade-in-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-12">
            What Drives Me
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Lightbulb,
              color: "violet",
              title: "Product Thinking",
              text: "I build software that solves real problems. Every feature starts with understanding the user and the outcome we want.",
            },
            {
              icon: Code2,
              color: "cyan",
              title: "Full-Stack Craft",
              text: "Comfortable across the stack — from React/Next.js front-ends to Node.js backends with PostgreSQL.",
            },
            {
              icon: Rocket,
              color: "rose",
              title: "End-to-End Delivery",
              text: "From UI design to API architecture to deployment and monitoring. I ship features, not just code.",
            },
          ].map((item, i) => {
            const colorMap: Record<
              string,
              { bg: string; icon: string; border: string; glow: string }
            > = {
              violet: {
                bg: "from-violet-500/20 to-violet-500/5",
                icon: "text-violet-400",
                border: "hover:border-violet-500/30",
                glow: "bg-violet-500/10",
              },
              cyan: {
                bg: "from-cyan-500/20 to-cyan-500/5",
                icon: "text-cyan-400",
                border: "hover:border-cyan-500/30",
                glow: "bg-cyan-500/10",
              },
              rose: {
                bg: "from-rose-500/20 to-rose-500/5",
                icon: "text-rose-400",
                border: "hover:border-rose-500/30",
                glow: "bg-rose-500/10",
              },
            };
            const colors = colorMap[item.color] ?? colorMap.violet;

            return (
              <AnimateOnScroll
                key={item.title}
                animation="fade-in-up"
                delay={i * 0.12}
              >
                <div
                  className={`group glass-card rounded-3xl p-8 ${colors.border} transition-all duration-500 h-full relative overflow-hidden`}
                >
                  <div
                    className={`absolute -bottom-16 -right-16 w-32 h-32 ${colors.glow} rounded-full blur-[60px] group-hover:scale-150 transition-transform pointer-events-none`}
                  />
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${colors.bg} flex items-center justify-center mb-6`}
                    >
                      <item.icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </section>

      {/* ── Skills — pill grid ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <AnimateOnScroll animation="fade-in-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-10">
            Skills & Tools
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-in-up" delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {homepageSkills.map((skill, i) => (
              <span
                key={skill}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 hover:scale-105 ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-in-up">
            <div className="glass-card rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Interested in working together?
                </h3>
                <p className="text-slate-400">
                  I&apos;m always open to new projects and opportunities.
                </p>
              </div>
              <Link
                href="/contact"
                className="group shrink-0 px-8 py-4 rounded-2xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-medium tracking-wide hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                Get in touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
