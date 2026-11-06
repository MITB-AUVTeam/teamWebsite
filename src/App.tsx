import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/pages/Home";
import { AboutPage } from "@/pages/AboutPage";
import { VehiclesPage } from "@/pages/VehiclesPage";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";
import { ContactUs } from "@/pages/ContactUs";
import { GalleryPage } from "@/pages/GalleryPage";
import { MediaPage } from "@/pages/MediaPage";
import { SponsorsPage } from "@/pages/SponsorsPage";
import { NotFound } from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { Preloader } from "@/components/ui/Preloader/Preloader";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SonarClick } from "@/components/ui/sonar-click";
import { DiveTransition, type DivePhase } from "@/components/ui/dive-transition";
import { RouteErrorBoundary } from "@/components/route-error-boundary";
import { GsapPageFx } from "@/components/ui/gsap-page-fx";
import { DepthGauge } from "@/components/ui/depth-gauge";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { usePageMeta } from "@/lib/use-page-meta";
import { routeMeta, SEABED } from "@/lib/routes";
import { prefersReducedMotion } from "@/lib/gsap";
import { motion } from "framer-motion";

export default function App() {
  const location = useLocation();
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  // The page on screen lags the URL while the dive transition covers the old one.
  const [shown, setShown] = useState(location);
  const [phase, setPhase] = useState<DivePhase>("idle");
  const latest = useRef(location);
  latest.current = location;
  const from = useRef(routeMeta(location.pathname).depth);

  // Start a dive whenever the URL moves to another page; a click mid-dive waits for this one to finish.
  useEffect(() => {
    if (phase !== "idle") return;
    if (location.pathname === shown.pathname) {
      if (location !== shown) setShown(location);
      return;
    }
    if (prefersReducedMotion()) {
      setShown(location);
      return;
    }
    from.current = routeMeta(shown.pathname).depth;
    setPhase("cover");
  }, [location, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCovered = () => {
    setShown(latest.current);
    setPhase("reveal");
  };

  // Safety net: if an animation-complete event is ever missed (e.g. a backgrounded tab),
  // finish the dive anyway rather than leaving the water over the page.
  useEffect(() => {
    if (phase === "idle") return;
    const id = window.setTimeout(() => (phase === "cover" ? onCovered() : setPhase("idle")), phase === "cover" ? 2500 : 2000);
    return () => window.clearTimeout(id);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // After a page change, keyboard and screen-reader focus starts on the new page
  const lastShown = useRef(shown.pathname);
  useEffect(() => {
    if (lastShown.current === shown.pathname) return;
    lastShown.current = shown.pathname;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [shown.pathname]);

  const meta = routeMeta(shown.pathname);
  const target = routeMeta(location.pathname);
  usePageMeta(meta);
  // 0 at the surface, 1 on the seabed: deeper pages get darker water and more drifting snow
  const abyss = meta.depth / SEABED;

  return (
    <SmoothScroll>
      <div className="tone-cyan grain relative min-h-screen overflow-x-clip bg-[#030712] text-slate-50 selection:bg-tone/30 selection:text-white">
        <a href="#main" className="skip-link">Skip to content</a>
        {isPreloaderActive && <Preloader onFinished={() => setIsPreloaderActive(false)} />}

        {/* Light from the surface fades and the water darkens as the dive goes deeper */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute -top-[40vh] left-1/2 h-[80vh] w-[140vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(12,74,110,0.22),transparent)] transition-opacity duration-[1500ms]"
            style={{ opacity: 1 - abyss * 0.75 }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,#010409)] transition-opacity duration-[1500ms]" style={{ opacity: abyss * 0.7 }} />
          <div className="marine-snow absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: 0.15 + abyss * 0.6 }} />
        </div>

        <ScrollProgress />
        <CustomCursor />
        <SonarClick />
        <DepthGauge base={meta.depth} />
        <DiveTransition
          phase={phase}
          label={target.label}
          fromDepth={from.current}
          toDepth={target.depth}
          onCovered={onCovered}
          onDone={() => setPhase("idle")}
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <ScrollToTop watch={shown.pathname} />
          <GsapPageFx routeKey={shown.pathname} />
          <p aria-live="polite" className="sr-only">{meta.label} page</p>
          <Navbar />
          <motion.main
            id="main"
            tabIndex={-1}
            key={shown.pathname}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <RouteErrorBoundary key={shown.pathname}>
            <Routes location={shown}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/team" element={<TeamSectionBlock />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </RouteErrorBoundary>
          </motion.main>
          <SoundToggle />
          <Analytics debug={false} />
        </div>
      </div>
    </SmoothScroll>
  );
}
