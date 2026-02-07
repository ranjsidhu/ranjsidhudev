"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ComingSoonPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);

    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center relative">
      {/* Animated lines */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(10)].map((_, i) => (
          <div
            key={`horizontal-${i.toString()}`}
            className="absolute h-px bg-white/5"
            style={{
              left: 0,
              right: 0,
              top: `${i * 10 + 5}%`,
              transform: `translateY(-50%) translateX(${
                Math.sin((seconds + i * 5) * 0.05) * 50
              }px)`,
              opacity: 0.05 + (i % 3) * 0.02,
              transition: "transform 2s ease-out",
            }}
          />
        ))}

        {[...Array(10)].map((_, i) => (
          <div
            key={`vertical-${i.toString()}`}
            className="absolute w-px bg-white/5 h-full"
            style={{
              top: 0,
              bottom: 0,
              left: `${i * 10 + 5}%`,
              transform: `translateX(-50%) translateY(${
                Math.sin((seconds + i * 5) * 0.05) * 50
              }px)`,
              opacity: 0.05 + (i % 3) * 0.02,
              transition: "transform 2s ease-out",
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div
        className={`relative flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
          loaded ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-12 relative">
          <div className="w-48 h-48 md:w-64 md:h-64 relative">
            <Image
              src="/logo.png"
              alt="Ranj Sidhu"
              width={512}
              height={512}
              priority
              className="object-contain logo-invert"
            />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-white text-3xl md:text-4xl font-light tracking-widest uppercase">
            Coming Soon
          </h1>

          <div className="h-px w-24 bg-white/20 mx-auto my-8" />

          <div className="inline-flex items-center py-2 px-4 border border-white/10 rounded-full">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-3" />
            <span className="text-white/50 text-sm tracking-wider uppercase">
              In Development
            </span>
          </div>
        </div>
      </div>

      <button
        style={{ zIndex: 100 }}
        onClick={() => router.push("/contact")}
        className="mt-6 px-8 py-3 bg-white text-[#0a0a0a] rounded-full font-light tracking-widest uppercase hover:cursor-pointer hover:bg-white/90 transition"
        type="button"
      >
        Get in touch
      </button>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};

export default ComingSoonPage;
