"use client";

import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

type AnimationType = "fade-in-up" | "fade-in" | "scale-in";

export default function AnimateOnScroll({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll anim-${animation} ${className}`}
      style={delay > 0 ? { animationDelay: `${delay * 0.1}s` } : undefined}
    >
      {children}
    </div>
  );
}
