"use client";

import Link from "next/link";
import Image from "next/image";
import { FeaturedProject, Socials } from "../components";
import { homepageSkills } from "@/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-5 select-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(180deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Ranj Sidhu Logo"
            width={120}
            height={120}
            className="mb-8"
          />
          <h1 className="text-5xl md:text-7xl font-light tracking-widest uppercase text-black text-center mb-4 animate-fadein">
            Ranj Sidhu
          </h1>
          <h2 className="text-xl md:text-2xl text-black/70 font-light tracking-wider text-center mb-8 animate-slideup">
            Software Engineer • Personal Portfolio
          </h2>
          <div className="flex gap-4 mt-2">
            <Link
              href="#projects"
              className="px-8 py-3 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-base"
            >
              View Portfolio
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-full border border-black text-black font-light tracking-widest uppercase shadow-sm hover:bg-black hover:text-white transition text-base"
            >
              About Me
            </Link>
          </div>
          {/* Social Icons */}
          <div className="flex gap-6 mt-8">
            <Socials size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h3 className="text-2xl font-light text-black mb-4 tracking-wider">
          Hi, I&apos;m Ranj
        </h3>
        <p className="text-black/80 text-lg mb-4">
          I build thoughtful, user‑centric web experiences with Next.js, React,
          and TypeScript.
        </p>
        <p className="text-black/60 text-base">
          This portfolio highlights selected work, experiments, and the craft
          behind how I ship.
        </p>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="w-full max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-light text-black mb-10 tracking-wider text-center">
          Featured Projects
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <FeaturedProject
            title="Stellar Recruitment"
            tagline="              A bespoke recruitment system, crafted for a client in the
              recruitment industry. Streamlines hiring, candidate management,
              and empowers teams with custom workflows."
            slug="/projects/stellar-recruitment"
            scaledText="SR"
          />
          <FeaturedProject
            title="Tutoring To Success"
            tagline="A custom website for a local tutoring agency, designed to build
              trust, showcase success stories, and make it easy for families to
              connect."
            slug="/projects/tutoring-to-success"
            scaledText="TTS"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h3 className="text-2xl font-light text-black mb-6 tracking-wider">
          Expertise
        </h3>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {homepageSkills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-1 bg-black/10 text-black/80 rounded-full text-xs font-light tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h3 className="text-2xl font-light text-black mb-4 tracking-wider">
          Explore More
        </h3>
        <p className="text-black/80 text-lg mb-8">
          Learn more about me and my approach, or dive into recent writing.
        </p>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="px-10 py-4 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-lg hover:bg-black/80 transition text-lg"
          >
            About
          </Link>
        </div>
      </section>
    </div>
  );
}
