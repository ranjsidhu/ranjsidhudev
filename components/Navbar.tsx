"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030014]/80 backdrop-blur-2xl border-b border-violet-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <div className="shrink-0">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/rsolonobg.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  priority
                  className="logo-invert relative"
                />
              </div>
              <span className="hidden sm:block text-white font-semibold tracking-wide text-sm">
                Ranj Sidhu
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-white bg-violet-500/15"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-linear-to-r from-violet-500 to-cyan-400" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-3 px-5 py-2 text-sm font-medium text-white bg-linear-to-r from-violet-600 to-cyan-500 rounded-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Hire me
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:text-white hover:bg-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                <span
                  className={`block w-5 h-0.5 bg-current rounded-full transform transition duration-300 ${
                    isOpen ? "rotate-45 translate-y-0.75" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current rounded-full transition duration-300 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current rounded-full transform transition duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-0.75" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
        id="mobile-menu"
      >
        <div className="mx-4 mt-2 mb-4 p-4 rounded-2xl glass-card space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all ${
                pathname === link.href
                  ? "text-white bg-violet-500/15"
                  : "text-slate-400 hover:text-white hover:bg-violet-500/10"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/contact"
              className="block text-center px-4 py-3 rounded-xl text-base font-medium text-white bg-linear-to-r from-violet-600 to-cyan-500"
              onClick={() => setIsOpen(false)}
            >
              Hire me
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
