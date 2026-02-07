"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Socials } from "@/app/components";
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

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
            Say Hello
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
            Get in Touch
          </h1>
          <p className="text-white/40 text-lg max-w-xl leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say
            hello? I&apos;d love to hear from you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ── Split layout ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-16 items-start">
          {/* Left column — branding & info */}
          <div className="flex flex-col items-center md:items-start md:sticky md:top-24">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-purple-500/5 blur-3xl" />
              <Image
                src="/colournobg.png"
                alt="Ranj Sidhu"
                width={140}
                height={140}
                className="logo-invert relative w-28 h-28 md:w-36 md:h-36 object-contain"
              />
            </div>

            <div className="group flex items-center gap-3 mb-6 p-3 -mx-3 rounded-xl hover:bg-white/2 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                <Mail className="w-4 h-4 text-white/50" />
              </div>
              <a
                href="mailto:ranj@ranjsidhu.dev"
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                ranj@ranjsidhu.dev
              </a>
            </div>

            <div className="flex gap-4">
              <Socials size={20} />
            </div>
          </div>

          {/* Right column — form */}
          <div className="bg-white/2 border border-white/5 rounded-2xl p-8 md:p-10 hover:border-white/10 transition-colors duration-500">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">&#10003;</span>
                </div>
                <h2 className="text-2xl font-light text-white mb-3">
                  Thank you!
                </h2>
                <p className="text-white/40">
                  Your message has been received. I&apos;ll get back to you
                  soon.
                </p>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white/40 mb-2 text-xs font-light tracking-wider uppercase"
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
                    className="w-full px-4 py-3 bg-white/3 border border-white/5 rounded-xl text-white placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/40 mb-2 text-xs font-light tracking-wider uppercase"
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
                    className="w-full px-4 py-3 bg-white/3 border border-white/5 rounded-xl text-white placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all duration-300"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="block text-white/40 mb-2 text-xs font-light tracking-wider uppercase"
                  >
                    Enquiry Type
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    required
                    value={form.enquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/3 border border-white/5 rounded-xl text-white focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all duration-300"
                  >
                    {ENQUIRY_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.label}
                        className="bg-[#111] text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white/40 mb-2 text-xs font-light tracking-wider uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/3 border border-white/5 rounded-xl text-white placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all duration-300 resize-none"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-full text-sm font-light tracking-widest uppercase transition-all duration-300 ${
                    isSubmitting
                      ? "bg-white/50 text-[#0a0a0a] cursor-not-allowed"
                      : "bg-white text-[#0a0a0a] hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
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
                    </span>
                  ) : (
                    "Send Message"
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
