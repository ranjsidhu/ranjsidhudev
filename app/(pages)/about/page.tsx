import { MapPin, Target, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll, Socials } from "@/app/components";
import { homepageSkills } from "@/constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Header with animated gradient ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Monogram watermark */}
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
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
              Get to Know Me
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
              About
            </h1>
            <p className="text-white/40 text-lg max-w-xl leading-relaxed">
              A software engineer who cares about craft and calm, reliable
              delivery.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ── Split layout ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 md:gap-16">
          {/* Left column — sticky sidebar */}
          <AnimateOnScroll
            animation="fade-in"
            className="md:sticky md:top-24 md:self-start"
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-purple-500/5 blur-3xl" />
                <Image
                  src="/colournobg.png"
                  alt="Ranj Sidhu"
                  width={180}
                  height={180}
                  className="logo-invert relative w-36 h-36 md:w-44 md:h-44 object-contain"
                />
              </div>
              <div className="space-y-3 text-center md:text-left">
                <div className="flex items-center gap-2.5 text-white/40 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Based in the UK</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/40 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <span>Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/40 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <span>Next.js, React, TypeScript</span>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Link
                  href="/projects"
                  className="px-6 py-2.5 rounded-full bg-white text-[#0a0a0a] font-light tracking-wider uppercase text-xs hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                  View Work
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-full border border-white/20 text-white font-light tracking-wider uppercase text-xs hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                >
                  Contact
                </Link>
              </div>
              <div className="mt-6 flex gap-4">
                <Socials size={18} />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right column — scrolling content */}
          <div className="space-y-20">
            {/* Bio */}
            <AnimateOnScroll animation="fade-in-up">
              <div>
                <p className="text-white/70 text-lg leading-relaxed mb-4">
                  I&apos;m Ranj, a software engineer who cares about craft and
                  calm, reliable delivery.
                </p>
                <p className="text-white/45 leading-relaxed">
                  I focus on building user-centric web experiences with a strong
                  attention to accessibility, performance, and maintainability.
                  I enjoy shaping clear interfaces, sensible systems, and
                  collaborating closely from idea to shipped product.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Highlights — numbered items */}
            <AnimateOnScroll animation="fade-in-up">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-xl font-light text-white tracking-wide shrink-0">
                  Highlights
                </h2>
                <div className="h-px bg-white/10 flex-1" />
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
                ].map((item) => (
                  <div
                    key={item.num}
                    className="group flex gap-6 items-start p-4 -mx-4 rounded-xl hover:bg-white/2 transition-colors duration-300"
                  >
                    <span className="text-3xl font-extralight text-white/10 shrink-0 w-10 group-hover:text-white/20 transition-colors duration-300">
                      {item.num}
                    </span>
                    <p className="text-white/55 leading-relaxed pt-1">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Skills grid */}
            <AnimateOnScroll animation="fade-in-up">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-xl font-light text-white tracking-wide shrink-0">
                  Skills
                </h2>
                <div className="h-px bg-white/10 flex-1" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {homepageSkills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white/45 font-light hover:border-white/15 hover:text-white/60 hover:bg-white/4 transition-all duration-300"
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
