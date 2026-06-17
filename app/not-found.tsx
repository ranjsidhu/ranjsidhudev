import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="animated-gradient-bg min-h-screen w-full flex flex-col items-center justify-center text-center relative px-4 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #7c3aed 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/colournobg.png"
          alt=""
          width={500}
          height={500}
          className="logo-invert opacity-[0.03] w-80 h-80 md:w-md md:h-112"
        />
      </div>

      <div className="relative z-10">
        <h1 className="text-8xl md:text-[10rem] font-light tracking-widest mb-2 leading-none">
          <span className="gradient-text">404</span>
        </h1>
        <div className="h-px w-16 gradient-divider mx-auto mb-6" />
        <h2 className="text-lg md:text-xl font-light text-slate-400 mb-10 uppercase tracking-[0.2em]">
          Page Not Found
        </h2>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-full font-light tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
