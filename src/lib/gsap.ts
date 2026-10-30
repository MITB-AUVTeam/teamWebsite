import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** The site's signature ease, matching the framer-motion curve [0.22, 1, 0.36, 1]. */
gsap.defaults({ ease: "expo.out", duration: 1.1 });

// Phones resize the viewport whenever the address bar slides in or out; re-measuring
// every trigger mid-swipe is a visible hitch, so ScrollTrigger ignores those.
ScrollTrigger.config({ ignoreMobileResize: true });

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
