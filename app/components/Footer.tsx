import Link from "next/link";
import { Socials } from "@/app/components";

export default function Footer() {
  return (
    <footer className="w-full border-t border-violet-500/10 bg-[#030014] py-12 px-4 flex flex-col items-center mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-32 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-64 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 relative">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <span className="text-white font-light tracking-widest uppercase text-lg mb-2">
            Ranj Sidhu
          </span>
          <span className="text-slate-400 text-xs mb-2">Software Engineer</span>
          <span className="text-slate-500 text-xs">Based in the UK</span>
          <span className="text-slate-500 text-xs mt-2">
            &copy; {new Date().getFullYear()} Ranj Sidhu
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-violet-300/70 font-medium mb-3 tracking-wider uppercase text-xs">
            Connect
          </span>
          <div className="flex gap-4 mb-3">
            <Socials size={24} />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <span className="text-violet-300/70 font-medium mb-3 tracking-wider uppercase text-xs">
            Let&apos;s Connect
          </span>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full border border-violet-500/30 text-white font-light tracking-widest uppercase hover:bg-violet-500/10 hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
