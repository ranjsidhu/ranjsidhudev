"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
