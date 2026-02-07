"use client";

import { useEffect, useState } from "react";

interface DelayedIframeProps {
  src: string;
  title: string;
  delay?: number;
}

export function DelayedIframe({ src, title, delay = 800 }: DelayedIframeProps) {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIframe(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
      {/* Loading placeholder */}
      <div
        className={`absolute inset-0 bg-white/2 flex items-center justify-center transition-opacity duration-500 ${
          showIframe ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-white/20 text-sm">Loading preview...</p>
        </div>
      </div>

      {/* Iframe */}
      {showIframe && (
        <iframe
          src={src}
          title={title}
          className="absolute top-0 left-0 w-full h-full pointer-events-none origin-top-left bg-[#0a0a0a] animate-in fade-in duration-500"
          style={{
            width: "1440px",
            height: "900px",
            transform: "scale(0.42)",
          }}
          loading="lazy"
          sandbox="allow-same-origin"
          tabIndex={-1}
        />
      )}
    </>
  );
}
