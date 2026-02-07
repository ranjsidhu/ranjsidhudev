import { Lock, Mail, RefreshCw, Shield, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { AnimateOnScroll } from "@/app/components";

export const metadata: Metadata = {
  title: "Security Policy",
  description:
    "Security policy and responsible disclosure guidelines for Ranj Sidhu's website and services.",
  openGraph: {
    title: "Security Policy | Ranj Sidhu",
    description:
      "Learn about our security practices and how to responsibly report security vulnerabilities.",
  },
};

const sections = [
  {
    icon: Shield,
    title: "Responsible Disclosure",
    content: (
      <>
        <p className="text-white/45 mb-4 leading-relaxed">
          I take the security of my website and services seriously. If you
          believe you&apos;ve found a security vulnerability, I appreciate your
          help in disclosing it to me in a responsible manner.
        </p>
        <p className="text-white/45 mb-5 leading-relaxed">
          Please email{" "}
          <a
            href="mailto:ranj@ranjsidhu.dev"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ranj@ranjsidhu.dev
          </a>{" "}
          with the following information:
        </p>
        <ul className="space-y-3 text-white/45">
          {[
            "Description of the vulnerability",
            "Steps to reproduce the issue",
            "Potential impact of the vulnerability",
            "Any suggested fixes (if available)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "What to Expect",
    content: (
      <>
        <p className="text-white/45 mb-5 leading-relaxed">
          When you report a security vulnerability, you can expect:
        </p>
        <ul className="space-y-3 text-white/45">
          {[
            "Prompt acknowledgment of your report",
            "Regular updates on the progress of fixing the vulnerability",
            "Credit for your discovery (if you wish to be credited)",
            "No legal action against you for responsible disclosure",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "Security Practices",
    content: (
      <>
        <p className="text-white/45 mb-5 leading-relaxed">
          I maintain several security practices to protect my website and
          services:
        </p>
        <ul className="space-y-3 text-white/45">
          {[
            "Regular security updates and patches",
            "Secure coding practices and code reviews",
            "Dependency vulnerability scanning",
            "HTTPS encryption for all communications",
            "Regular security assessments",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p className="text-white/45">
        For security-related concerns, please contact me at{" "}
        <a
          href="mailto:ranj@ranjsidhu.dev"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          ranj@ranjsidhu.dev
        </a>
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* ── Header with animated gradient ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-20">
          <AnimateOnScroll animation="fade-in-up">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 text-white/40" />
            </div>
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
              Trust & Safety
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide">
              Security Policy
            </h1>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ── Content cards ── */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        {sections.map((section, i) => (
          <AnimateOnScroll
            key={section.title}
            animation="fade-in-up"
            delay={i * 0.1}
          >
            <div className="group bg-white/2 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <section.icon className="w-4.5 h-4.5 text-white/40" />
                </div>
                <h2 className="text-xl font-light text-white tracking-wide">
                  {section.title}
                </h2>
              </div>
              {section.content}
            </div>
          </AnimateOnScroll>
        ))}
      </section>
    </div>
  );
}
