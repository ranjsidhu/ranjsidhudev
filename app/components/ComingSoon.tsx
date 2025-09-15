"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ComingSoonPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);

    // Animation timer
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center relative">
      {/* Animated lines */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(10)].map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className="absolute h-px bg-black/5"
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
          ></div>
        ))}

        {[...Array(10)].map((_, i) => (
          <div
            key={`vertical-${i}`}
            className="absolute w-px bg-black/5 h-full"
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
          ></div>
        ))}
      </div>

      {/* Central content container */}
      <div
        className={`relative flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
          loaded ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo */}
        <div className="mb-12 relative">
          <div className="w-48 h-48 md:w-64 md:h-64 relative">
            <Image
              src="/logo.png"
              alt="Ranj Sidhu"
              width={512}
              height={512}
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Text elements */}
        <div className="text-center space-y-4">
          <h1 className="text-black text-3xl md:text-4xl font-light tracking-widest uppercase">
            Coming Soon
          </h1>

          <div className="h-[1px] w-24 bg-black/20 mx-auto my-8"></div>

          <div className="inline-flex items-center py-2 px-4 border border-black/10 rounded-full">
            <div className="h-2 w-2 bg-black rounded-full animate-pulse mr-3"></div>
            <span className="text-black/60 text-sm tracking-wider uppercase">
              In Development
            </span>
          </div>
        </div>
      </div>

      <button
        style={{ zIndex: 100 }}
        onClick={() => router.push("/contact")}
        className="mt-6 px-8 py-3 bg-black text-white rounded-full font-light tracking-widest uppercase shadow-sm hover:cursor-pointer hover:bg-black/80 transition"
        type="button"
      >
        Get in touch
      </button>

      {/* Subtle background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.01) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  );
};

export default ComingSoonPage;
