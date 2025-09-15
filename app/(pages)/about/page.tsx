"use client";

import Image from "next/image";
import Link from "next/link";
import { homepageSkills } from "@/constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="w-full max-w-3xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Ranj Sidhu"
            width={96}
            height={96}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-black mb-4">
            About Me
          </h1>
          <p className="text-black/80 text-lg mb-4">
            I’m Ranj, a software engineer who cares about craft and calm,
            reliable delivery.
          </p>
          <p className="text-black/70">
            I focus on building user‑centric web experiences with a strong
            attention to accessibility, performance, and maintainability. I
            enjoy shaping clear interfaces, sensible systems, and collaborating
            closely from idea to shipped product.
          </p>

          <div className="flex gap-3 mt-6">
            <Link
              href="https://www.linkedin.com/in/ranjsidhu/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-black text-white font-light tracking-widest uppercase hover:bg-black/80 transition text-sm"
            >
              Connect on LinkedIn
            </Link>
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-full border border-black text-black font-light tracking-widest uppercase hover:bg-black hover:text-white transition text-sm"
            >
              View Work
            </Link>
          </div>

          <div className="mt-10 w-full text-left">
            <h2 className="text-xl font-light tracking-wider text-black mb-3 text-center">
              Highlights
            </h2>
            <ul className="list-disc marker:text-black/40 text-black/80 space-y-2 max-w-2xl mx-auto">
              <li>
                Product‑minded engineer with a focus on usability and outcomes.
              </li>
              <li>
                Experience across front‑end (React/Next.js) and back‑end
                (Node.js, PostgreSQL).
              </li>
              <li>
                Comfortable shaping features end‑to‑end: from UI to APIs to
                deploys.
              </li>
            </ul>
          </div>

          <div className="mt-10 w-full">
            <h3 className="text-xl font-light tracking-wider text-black mb-3 text-center">
              Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {homepageSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1 bg-black/10 text-black/80 rounded-full text-xs font-light tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
