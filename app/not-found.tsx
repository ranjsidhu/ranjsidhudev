import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="animated-gradient-bg min-h-screen w-full flex flex-col items-center justify-center text-center relative px-6 overflow-hidden">
      <div className="absolute top-[20%] -left-32 w-125 h-125 bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-32 w-100 h-100 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-75 h-75 bg-rose-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        {/* Big 404 */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter">
            <span className="gradient-text">404</span>
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 bg-violet-500/10 rounded-full blur-[80px]" />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Page not found
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="group px-6 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3.5 rounded-xl border border-violet-500/30 text-white font-medium hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
