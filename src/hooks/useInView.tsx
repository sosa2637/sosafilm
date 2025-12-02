// src/hooks/useInView.ts
import { useEffect, useRef, MutableRefObject } from "react";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // si on veut un trigger une fois :
          // obs.unobserve(entry.target);
        }
      });
    }, options ?? { threshold: 0.12 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return ref as MutableRefObject<T | null>;
}
