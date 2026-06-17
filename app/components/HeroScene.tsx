"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Socials } from "@/app/components";

const PARTICLE_COUNT = 30;
const PARTICLE_COLORS = ["particle-violet", "particle-cyan", "particle-rose"];

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 1 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.4,
    color: PARTICLE_COLORS[i % 3],
  }));
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState<
    ReturnType<typeof generateParticles>
  >([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={containerRef}
      className="animated-gradient-bg relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Mouse glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124, 58, 237, 0.08), rgba(6, 182, 212, 0.04), transparent 60%)`,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`particle ${p.color}`}
            style={{
              left: `${p.left}%`,
              bottom: "-5%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content — left-aligned, large typography */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="max-w-3xl">
          <div className="hero-animate hero-animate-delay-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-300 tracking-wide">
              Available for new projects
            </span>
          </div>

          <h1 className="hero-animate hero-animate-delay-2 text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] mb-6">
            I build <span className="gradient-text">digital experiences</span>{" "}
            that matter.
          </h1>

          <p className="hero-animate hero-animate-delay-3 text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
            Full-stack engineer specialising in Next.js, React, and Node.js. I
            turn ideas into polished, production-ready products.
          </p>

          <div className="hero-animate hero-animate-delay-4 flex flex-wrap gap-4 mb-12">
            <Link
              href="/projects"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium tracking-wide text-base hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              See my work
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl border border-violet-500/30 text-white font-medium tracking-wide text-base hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300"
            >
              Let&apos;s talk
            </Link>
          </div>

          <div className="hero-animate hero-animate-delay-5 flex items-center gap-6">
            <Socials size={22} />
            <span className="w-px h-6 bg-violet-500/20" />
            <span className="text-sm text-slate-500">ranj@ranjsidhu.dev</span>
          </div>
        </div>

        {/* Right side decorative element — stats cards */}
        <div className="hidden lg:flex absolute right-12 xl:right-20 top-1/2 -translate-y-1/2 flex-col gap-4 hero-animate hero-animate-delay-5">
          {[
            { value: "2+", label: "Years Experience" },
            { value: "5+", label: "Projects Delivered" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl px-8 py-5 text-center min-w-[180px] hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-animate hero-animate-delay-5 absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-violet-500/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-violet-400/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
