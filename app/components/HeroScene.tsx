"use client";

import Image from "next/image";
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

  const tiltX = (mouse.y - 0.5) * 15;
  const tiltY = (mouse.x - 0.5) * -15;

  return (
    <section
      ref={containerRef}
      className="animated-gradient-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124, 58, 237, 0.12), rgba(6, 182, 212, 0.06), transparent 60%)`,
        }}
      />

      {/* Floating particles */}
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

      {/* Orbital system */}
      <div
        className="relative flex items-center justify-center mb-10"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="orbit-ring orbit-ring-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="orbit-dot orbit-dot-accent" />
            <div
              className="orbit-dot"
              style={{ top: "auto", bottom: "-4px", left: "30%" }}
            />
          </div>

          <div className="orbit-ring orbit-ring-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="orbit-dot orbit-dot-blue" />
            <div
              className="orbit-dot"
              style={{
                top: "50%",
                left: "auto",
                right: "-4px",
                marginLeft: 0,
              }}
            />
          </div>

          <div className="orbit-ring orbit-ring-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <div className="orbit-dot orbit-dot-accent" />
          </div>

          <div className="relative z-10 w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
            <Image
              src="/colournobg.png"
              alt="Ranj Sidhu"
              width={240}
              height={240}
              priority
              className="logo-invert w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-[0_0_60px_rgba(124,58,237,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="hero-animate hero-animate-delay-1 text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-wide mb-4">
          Ranj Sidhu
        </h1>

        <p className="hero-animate hero-animate-delay-2 text-sm md:text-lg mb-2 tracking-wider uppercase">
          <span className="gradient-text font-medium">Software Engineer</span>
        </p>

        <p className="hero-animate hero-animate-delay-3 text-slate-400 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Crafting thoughtful web experiences with modern technologies.
          <br className="hidden sm:block" />
          From idea to shipped product.
        </p>

        <div className="hero-animate hero-animate-delay-4 flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-light tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105 transition-all duration-300"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-violet-500/30 text-white font-light tracking-widest uppercase text-sm hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>

        <div className="hero-animate hero-animate-delay-5 flex justify-center gap-5">
          <Socials size={20} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-animate hero-animate-delay-5 absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border border-violet-500/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-violet-400/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
