"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ENQUIRY_OPTIONS, initialForm, validateEmail } from "@/constants";
import { submitContactForm } from "./serveractions";
import type { ContactDetails } from "@/types";

export default function Contact() {
  const [form, setForm] = useState<ContactDetails>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await submitContactForm(form);
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      toast.error("There was an error submitting the form. Please try again.");
    } finally {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white border border-black/10 rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-light text-black mb-2 tracking-widest uppercase text-center">
          Contact
        </h1>
        <p className="text-black/60 mb-8 text-center">
          Let&apos;s connect! Fill out the form below and I&apos;ll get back to
          you soon.
        </p>
        {submitted ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-light text-black mb-2">Thank you!</h2>
            <p className="text-black/60">Your message has been received.</p>
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
                className="block text-black/80 mb-1 font-light tracking-wider"
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
                className="w-full px-4 py-2 border border-black/10 rounded-lg bg-white text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-black/80 mb-1 font-light tracking-wider"
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
                className="w-full px-4 py-2 border border-black/10 rounded-lg bg-white text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
                placeholder="Your email"
              />
            </div>
            <div>
              <label
                htmlFor="enquiryType"
                className="block text-black/80 mb-1 font-light tracking-wider"
              >
                Enquiry Type
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                required
                value={form.enquiryType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-black/10 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition"
              >
                {ENQUIRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-black/80 mb-1 font-light tracking-wider"
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
                className="w-full px-4 py-2 border border-black/10 rounded-lg bg-white text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 transition resize-none"
                placeholder="Type your message here..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-black text-white font-light tracking-widest uppercase hover:bg-black/80 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
