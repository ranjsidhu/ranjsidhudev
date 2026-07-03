import { CheckCircle, Lock, Mail, Shield, ShieldCheck } from "lucide-react";
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

const ICON_COLORS = [
  "from-violet-500/20 to-violet-500/5 text-violet-400",
  "from-cyan-500/20 to-cyan-500/5 text-cyan-400",
  "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
  "from-rose-500/20 to-rose-500/5 text-rose-400",
];

const BORDER_COLORS = [
  "hover:border-violet-500/30",
  "hover:border-cyan-500/30",
  "hover:border-emerald-500/30",
  "hover:border-rose-500/30",
];

const BULLET_COLORS = [
  "bg-violet-400",
  "bg-cyan-400",
  "bg-emerald-400",
  "bg-rose-400",
];

const sections = [
  {
    icon: Shield,
    title: "Responsible Disclosure",
    paragraphs: [
      "I take the security of my website and services seriously. If you believe you've found a security vulnerability, I appreciate your help in disclosing it to me in a responsible manner.",
    ],
    email: true,
    items: [
      "Description of the vulnerability",
      "Steps to reproduce the issue",
      "Potential impact of the vulnerability",
      "Any suggested fixes (if available)",
    ],
  },
  {
    icon: ShieldCheck,
    title: "What to Expect",
    paragraphs: ["When you report a security vulnerability, you can expect:"],
    items: [
      "Prompt acknowledgment of your report",
      "Regular updates on the progress of fixing the vulnerability",
      "Credit for your discovery (if you wish to be credited)",
      "No legal action against you for responsible disclosure",
    ],
  },
  {
    icon: Lock,
    title: "Security Practices",
    paragraphs: [
      "I maintain several security practices to protect my website and services:",
    ],
    items: [
      "Regular security updates and patches",
      "Secure coding practices and code reviews",
      "Dependency vulnerability scanning",
      "HTTPS encryption for all communications",
      "Regular security assessments",
    ],
  },
  {
    icon: Mail,
    title: "Contact",
    paragraphs: [],
    contactOnly: true,
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[20%] left-[10%] w-125 h-125 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-100 h-100 bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
          <AnimateOnScroll animation="scale-in">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-in-up" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Security <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              How I protect my services and how you can help by reporting
              vulnerabilities responsibly.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Cards ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid gap-6">
          {sections.map((section, i) => (
            <AnimateOnScroll
              key={section.title}
              animation="fade-in-up"
              delay={i * 0.1}
            >
              <div
                className={`group glass-card rounded-3xl p-8 md:p-10 ${BORDER_COLORS[i]} transition-all duration-500 relative overflow-hidden`}
              >
                <div
                  className={`absolute -bottom-16 -right-16 w-32 h-32 ${BULLET_COLORS[i]}/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform pointer-events-none`}
                />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${ICON_COLORS[i]} flex items-center justify-center`}
                    >
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  </div>

                  {section.contactOnly ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <p className="text-slate-400">
                        For security-related concerns, reach out at
                      </p>
                      <a
                        href="mailto:ranj@ranjsidhu.dev"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
                      >
                        <Mail className="w-4 h-4" />
                        ranj@ranjsidhu.dev
                      </a>
                    </div>
                  ) : (
                    <>
                      {section.paragraphs.map((p) => (
                        <p
                          key={p}
                          className="text-slate-400 leading-relaxed mb-5"
                        >
                          {p}
                        </p>
                      ))}

                      {section.email && (
                        <p className="text-slate-400 mb-5 leading-relaxed">
                          Please email{" "}
                          <a
                            href="mailto:ranj@ranjsidhu.dev"
                            className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                          >
                            ranj@ranjsidhu.dev
                          </a>{" "}
                          with the following information:
                        </p>
                      )}

                      {section.items && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {section.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${BULLET_COLORS[i].replace("bg-", "text-")} mt-0.5 shrink-0`}
                              />
                              <span className="text-slate-300 text-sm">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
