"use client";

import { ArrowRight, Globe, Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ENQUIRY_OPTIONS, initialForm, validateEmail } from "@/constants";
import type { ContactDetails } from "@/types";
import { submitContactForm } from "./serveractions";

export default function Contact() {
  const [form, setForm] = useState<ContactDetails>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setIsSubmitting(true);
      await submitContactForm(form);
    } catch (error: unknown) {
      console.error("Error submitting form:", (error as Error).message);
      toast.error("There was an error submitting the form. Please try again.");
    } finally {
      setSubmitted(true);
      setForm(initialForm);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero — centered, impactful ── */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="absolute top-[20%] left-[10%] w-125 h-125 bg-rose-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-100 h-100 bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 mb-8">
            <MessageSquare className="w-4 h-4 text-rose-400" />
            <span className="text-sm text-slate-300 tracking-wide">
              Say hello
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s start a{" "}
            <span className="gradient-text">conversation</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say
            hello? I&apos;d love to hear from you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
      </section>

      {/* ── Quick contact methods + form ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Contact cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a
            href="mailto:ranj@ranjsidhu.dev"
            className="group glass-card rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500/20 to-violet-500/5 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <div className="text-white text-sm font-medium mb-0.5">Email</div>
              <div className="text-slate-400 text-xs">ranj@ranjsidhu.dev</div>
            </div>
          </a>

          <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-white text-sm font-medium mb-0.5">
                Response
              </div>
              <div className="text-slate-400 text-xs">Within 24 hours</div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center shrink-0">
              <div className="flex gap-1.5">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="text-white text-sm font-medium mb-0.5">
                Socials
              </div>
              <div className="text-slate-400 text-xs">Find me everywhere</div>
            </div>
          </div>
        </div>

        {/* Main form card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-emerald-400">&#10003;</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Message sent!
                </h2>
                <p className="text-slate-400 text-lg">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-slate-300 mb-2 text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-white/3 border border-violet-500/15 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-violet-500/5 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-slate-300 mb-2 text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-white/3 border border-violet-500/15 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-violet-500/5 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="block text-slate-300 mb-2 text-sm font-medium"
                  >
                    What&apos;s this about?
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    required
                    value={form.enquiryType}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-white/3 border border-violet-500/15 rounded-xl text-white focus:outline-none focus:border-violet-500/40 focus:bg-violet-500/5 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300"
                  >
                    {ENQUIRY_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.label}
                        className="bg-[#0a0118] text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-300 mb-2 text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-white/3 border border-violet-500/15 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-violet-500/5 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-disabled={isSubmitting}
                  className={`group w-full py-4 rounded-2xl text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-violet-600/50 text-white/70 cursor-not-allowed"
                      : "bg-linear-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-[1.01]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 animate-spin"
                      >
                        <title>Loading</title>
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
