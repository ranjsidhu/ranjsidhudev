import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="animated-gradient-bg min-h-screen w-full flex flex-col items-center justify-center text-center relative px-4 overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Watermark monogram */}
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
        <div className="h-px w-16 bg-white/15 mx-auto mb-6" />
        <h2 className="text-lg md:text-xl font-light text-white/40 mb-10 uppercase tracking-[0.2em]">
          Page Not Found
        </h2>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-white text-[#0a0a0a] rounded-full font-light tracking-widest uppercase text-sm hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
