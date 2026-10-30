import { useLayoutEffect } from "react";
import { useLenis } from "@/components/ui/smooth-scroll";

// Same hazard on reload: don't let the browser restore a deep scroll position under fresh triggers.
if (typeof history !== "undefined" && "scrollRestoration" in history) history.scrollRestoration = "manual";

interface ScrollToTopProps {
  watch: unknown;
}

/**
 * Jumps to the top on every page change. It is a layout effect rendered before
 * <main>, so it runs before the new page's GSAP setup: building ScrollTriggers
 * while still scrolled to the old page's bottom makes `once` triggers fire and
 * kill themselves mid-refresh, which crashes ScrollTrigger. Pages with a #hash
 * (e.g. /team#mechanical) scroll on to their target themselves afterwards.
 */
export default function ScrollToTop({ watch }: ScrollToTopProps) {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [watch]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
