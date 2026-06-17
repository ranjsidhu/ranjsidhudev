import Link from "next/link";
import { Socials } from "@/app/components";
import { navLinks } from "@/constants";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="gradient-divider" />

      <div className="bg-[#030014] relative">
        <div className="absolute top-0 left-1/3 w-[400px] h-[200px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Top row — branding + nav + socials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <span className="text-xl font-bold text-white block mb-2">
                Ranj Sidhu
              </span>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Software engineer building polished, production-ready web
                experiences from the UK.
              </p>
            </div>

            {/* Nav */}
            <div>
              <span className="text-sm font-medium text-slate-300 block mb-4">
                Navigation
              </span>
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-violet-300 transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <span className="text-sm font-medium text-slate-300 block mb-4">
                Connect
              </span>
              <div className="flex gap-4 mb-6">
                <Socials size={20} />
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
              >
                Get in touch &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="gradient-divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} Ranj Sidhu</span>
            <span>Designed & built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
