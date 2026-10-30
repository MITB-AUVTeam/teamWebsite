import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null when smooth scrolling is off (reduced motion / touch). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Site-wide inertial scrolling. Skipped for reduced motion and touch devices,
 * where native scrolling already feels right.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const instance = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    // GSAP's ticker drives Lenis so ScrollTrigger and the scroll position never drift apart.
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Modals and menus lock scrolling with body overflow: hidden; pause Lenis to match.
    const lock = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") instance.stop();
      else instance.start();
    });
    lock.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    // Glide to same-page anchors. Lenis's own `anchors` option grabs every link with a "#",
    // including other pages (/vehicles#mechanical) and the PDF's #page=N, and then errors.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.host !== location.host || a.pathname !== location.pathname || a.hash.length < 2) return;
      const el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      instance.scrollTo(el, { offset: -120 });
    };
    document.addEventListener("click", onClick);
    setLenis(instance);
    return () => {
      document.removeEventListener("click", onClick);
      lock.disconnect();
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export default SmoothScroll;
