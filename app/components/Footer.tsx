import Link from "next/link";
import { Socials } from "@/app/components";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0a] py-12 px-4 flex flex-col items-center mt-auto">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <span className="text-white font-light tracking-widest uppercase text-lg mb-2">
            Ranj Sidhu
          </span>
          <span className="text-white/40 text-xs mb-2">Software Engineer</span>
          <span className="text-white/25 text-xs">Based in the UK</span>
          <span className="text-white/25 text-xs mt-2">
            &copy; {new Date().getFullYear()} Ranj Sidhu
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white/50 font-medium mb-3 tracking-wider uppercase text-xs">
            Connect
          </span>
          <div className="flex gap-4 mb-3">
            <Socials size={24} />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <span className="text-white/50 font-medium mb-3 tracking-wider uppercase text-xs">
            Let&apos;s Connect
          </span>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full border border-white/20 text-white font-light tracking-widest uppercase hover:bg-white/5 transition text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
