import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * Declarative GSAP effects for every page. Mark elements up and this wires them
 * to ScrollTrigger after each route change, then reverts on the next one:
 *
 *   data-gsap="batch"                 direct children rise in, staggered, as they enter
 *   data-gsap="lines"                 text splits into lines that slide up out of a mask
 *   data-gsap="drift" data-speed="-30"  scrubbed sideways drift (xPercent over the scroll)
 *   data-gsap="parallax" data-speed="20" scrubbed vertical drift (yPercent)
 *   data-gsap="zoom"                  scales from 0.85 to 1 while scrolling into view
 *   data-gsap="spin" data-speed="90"  scrubbed rotation in degrees
 */
export function GsapPageFx({ routeKey }: { routeKey: string }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];

    let cancelled = false;
    let id = 0;
    // Wait for the web fonts (so text splits on its final line breaks), then a beat
    // more so the new route has rendered.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      id = window.setTimeout(() => {
        const root = document.querySelector("main");
        if (!root) return;

        ctx = gsap.context(() => {
          root.querySelectorAll<HTMLElement>('[data-gsap="batch"]').forEach((group) => {
            const items = Array.from(group.children) as HTMLElement[];
            gsap.set(items, { y: 70, autoAlpha: 0, scale: 0.97 });
            ScrollTrigger.batch(items, {
              // Items sit 70px low while hidden, so start as soon as they peek in;
              // a later start left empty bands under section headings
              start: "top bottom",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.09, duration: 1.2, overwrite: true }),
            });
          });

          root.querySelectorAll<HTMLElement>('[data-gsap="lines"]').forEach((el) => {
            const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "gsap-line" });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 110,
              stagger: 0.08,
              duration: 1.3,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          });

          root.querySelectorAll<HTMLElement>('[data-gsap="drift"]').forEach((el) => {
            const speed = Number(el.dataset.speed ?? -20);
            gsap.fromTo(
              el,
              { xPercent: 0 },
              { xPercent: speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
            );
          });

          root.querySelectorAll<HTMLElement>('[data-gsap="parallax"]').forEach((el) => {
            const speed = Number(el.dataset.speed ?? 15);
            gsap.fromTo(
              el,
              { yPercent: -speed / 2 },
              { yPercent: speed / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
            );
          });

          root.querySelectorAll<HTMLElement>('[data-gsap="zoom"]').forEach((el) => {
            gsap.fromTo(
              el,
              { scale: 0.85 },
              { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.6 } },
            );
          });

          root.querySelectorAll<HTMLElement>('[data-gsap="spin"]').forEach((el) => {
            const deg = Number(el.dataset.speed ?? 90);
            gsap.to(el, { rotate: deg, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
          });
        }, root);

        // Images settle in after first paint; re-measure once they have.
        window.setTimeout(() => ScrollTrigger.refresh(), 600);
      }, 80);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(id);
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, [routeKey]);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
