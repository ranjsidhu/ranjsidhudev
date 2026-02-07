"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Socials } from "@/app/components";

const PARTICLE_COUNT = 30;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.25,
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

  // Tilt for orbital rings based on mouse
  const tiltX = (mouse.y - 0.5) * 15;
  const tiltY = (mouse.x - 0.5) * -15;

  return (
    <section
      ref={containerRef}
      className="animated-gradient-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(139, 92, 246, 0.06), rgba(59, 130, 246, 0.03), transparent 60%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
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
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Ring 1 */}
          <div className="orbit-ring orbit-ring-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="orbit-dot orbit-dot-accent" />
            <div
              className="orbit-dot"
              style={{ top: "auto", bottom: "-3px", left: "30%" }}
            />
          </div>

          {/* Ring 2 */}
          <div className="orbit-ring orbit-ring-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="orbit-dot orbit-dot-blue" />
            <div
              className="orbit-dot"
              style={{
                top: "50%",
                left: "auto",
                right: "-3px",
                marginLeft: 0,
              }}
            />
          </div>

          {/* Ring 3 */}
          <div className="orbit-ring orbit-ring-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <div className="orbit-dot orbit-dot-accent" />
          </div>

          {/* Logo at center */}
          <div className="relative z-10 w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
            <Image
              src="/colournobg.png"
              alt="Ranj Sidhu"
              width={240}
              height={240}
              priority
              className="logo-invert w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="hero-animate hero-animate-delay-1 text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-wide mb-4">
          Ranj Sidhu
        </h1>

        <p className="hero-animate hero-animate-delay-2 text-white/40 text-base md:text-lg mb-2 tracking-wider uppercase">
          Software Engineer
        </p>

        <p className="hero-animate hero-animate-delay-3 text-white/30 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Crafting thoughtful web experiences with modern technologies.
          <br className="hidden sm:block" />
          From idea to shipped product.
        </p>

        <div className="hero-animate hero-animate-delay-4 flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/projects"
            className="px-8 py-3 rounded-full bg-white text-[#0a0a0a] font-light tracking-widest uppercase text-sm hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-white/20 text-white font-light tracking-widest uppercase text-sm hover:bg-white/5 hover:border-white/40 transition-all duration-300"
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
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
