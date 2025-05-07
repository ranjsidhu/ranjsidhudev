"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

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
            Software Engineer &amp; Bespoke Web Solutions
          </h2>
          <div className="flex gap-4 mt-2">
            <Link
              href="#projects"
              className="px-8 py-3 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-base"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full border border-black text-black font-light tracking-widest uppercase shadow-sm hover:bg-black hover:text-white transition text-base"
            >
              Let&apos;s Connect
            </Link>
          </div>
          {/* Social Icons */}
          <div className="flex gap-6 mt-8">
            <Link
              href="https://www.instagram.com/ranjsidhu.dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition"
            >
              <FaInstagram size={32} color="#000" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ranjsidhu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition"
            >
              <FaLinkedin size={32} color="#000" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h3 className="text-2xl font-light text-black mb-4 tracking-wider">
          About Me
        </h3>
        <p className="text-black/80 text-lg mb-4">
          I&apos;m Ranj, a passionate software engineer specializing in building
          bespoke, high-impact web applications for businesses and agencies. I
          blend technical expertise with a deep understanding of client needs to
          deliver solutions that are not just functional, but beautiful and
          user-focused.
        </p>
        <p className="text-black/60 text-base">
          From complex recruitment platforms to elegant local business sites, I
          bring ideas to life with clean code, modern design, and a relentless
          focus on quality.
        </p>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="w-full max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-light text-black mb-10 tracking-wider text-center">
          Featured Projects
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Stellar Recruitment */}
          <div className="group border border-black/10 rounded-2xl bg-white shadow-sm p-8 flex flex-col justify-between hover:shadow-lg transition relative overflow-hidden">
            <h4 className="text-xl font-light text-black mb-2 group-hover:underline transition">
              Stellar Recruitment
            </h4>
            <p className="text-black/70 mb-4">
              A bespoke recruitment system, crafted for a client in the
              recruitment industry. Streamlines hiring, candidate management,
              and empowers teams with custom workflows.
            </p>
            <Link
              href="/projects/stellar-recruitment"
              className="inline-block mt-auto px-6 py-2 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-sm"
            >
              View Details
            </Link>
            <span className="absolute right-6 top-6 text-6xl text-black/5 font-bold select-none">
              SR
            </span>
          </div>
          {/* Tutoring To Success */}
          <div className="group border border-black/10 rounded-2xl bg-white shadow-sm p-8 flex flex-col justify-between hover:shadow-lg transition relative overflow-hidden">
            <h4 className="text-xl font-light text-black mb-2 group-hover:underline transition">
              Tutoring To Success
            </h4>
            <p className="text-black/70 mb-4">
              A custom website for a local tutoring agency, designed to build
              trust, showcase success stories, and make it easy for families to
              connect.
            </p>
            <Link
              href="/projects/tutoring-to-success"
              className="inline-block mt-auto px-6 py-2 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-sm"
            >
              View Details
            </Link>
            <span className="absolute right-6 top-6 text-6xl text-black/5 font-bold select-none">
              TTS
            </span>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h3 className="text-2xl font-light text-black mb-6 tracking-wider">
          Expertise
        </h3>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "PostgreSQL",
            "UI/UX",
            "APIs",
            "Custom Dashboards",
          ].map((skill) => (
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
          Let&apos;s Build Something Great
        </h3>
        <p className="text-black/80 text-lg mb-8">
          Ready to take your business to the next level? I&apos;m always open to
          new projects and collaborations.
        </p>
        <Link
          href="/contact"
          className="px-10 py-4 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-lg hover:bg-black/80 transition text-lg"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
