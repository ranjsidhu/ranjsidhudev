import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Socials } from "@/app/components";
import { navLinks } from "@/constants";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="gradient-divider" />

      <div className="bg-[#030014] relative">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-8 relative">
          {/* CTA strip */}
          <div className="glass-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Ready to start a project?
              </h3>
              <p className="text-slate-400 text-sm">
                Let&apos;s build something great together.
              </p>
            </div>
            <Link
              href="/contact"
              className="group shrink-0 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <span className="text-2xl font-bold gradient-text block mb-3">
                Ranj Sidhu
              </span>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
                Full-stack engineer crafting polished, production-ready web
                experiences. Based in the UK, available worldwide.
              </p>
              <div className="flex gap-4">
                <Socials size={18} />
              </div>
            </div>

            {/* Pages */}
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em] block mb-4">
                Pages
              </span>
              <div className="flex flex-col gap-3">
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

            {/* Contact */}
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em] block mb-4">
                Contact
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:ranj@ranjsidhu.dev"
                  className="text-slate-400 text-sm hover:text-violet-300 transition-colors"
                >
                  ranj@ranjsidhu.dev
                </a>
                <span className="text-slate-500 text-sm">Based in the UK</span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="gradient-divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} Ranj Sidhu</span>
            <span className="flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-rose-400" /> using
              Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
