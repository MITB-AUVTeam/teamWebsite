import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/ui/pill-button";
import { RollText } from "@/components/ui/roll-text";
import logoImg from "../assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png";

const LINKS = [
  { name: "About", url: "/about" },
  { name: "Vehicles", url: "/vehicles" },
  { name: "Team", url: "/team" },
  { name: "Gallery", url: "/gallery" },
  { name: "Media", url: "/media" },
  { name: "Sponsors", url: "/sponsors" },
];

const MOBILE_LINKS = [{ name: "Home", url: "/" }, ...LINKS, { name: "Contact", url: "/contact" }];

const normalize = (p: string) => p.replace(/\/$/, "").toLowerCase() || "/";

/**
 * Minimal floating header: tucks away while scrolling down, returns on the way
 * up, and gains a frosted backing once the page has moved.
 */
export function Navbar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Fires every scroll frame: only touch state when a flag actually flips, so the
  // header doesn't re-render all the way down the page.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextScrolled = y > 24;
    const nextHidden = y > 240 && y > prev && !open;
    if (nextScrolled !== scrolled) setScrolled(nextScrolled);
    if (nextHidden !== hidden) setHidden(nextHidden);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = normalize(pathname);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[10000] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500",
            scrolled || open
              ? "border border-white/[0.08] bg-[#030712]/80 backdrop-blur-md"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link to="/" className="flex items-center gap-3" aria-label="AUV-MITB home">
            <img src={logoImg} alt="" className="h-9 w-auto object-contain" />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive = active === link.url;
              return (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-400 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <RollText>{link.name}</RollText>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <PillButton to="/contact" className="hidden sm:inline-flex h-11 px-5">
              Get in touch
            </PillButton>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 lg:hidden"
            >
              <span className={cn("absolute h-px w-4 bg-white transition-transform duration-300", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-4 bg-white transition-transform duration-300", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col bg-[#030712] px-6 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {MOBILE_LINKS.map((link, i) => {
                const isActive = active === link.url;
                return (
                  <li key={link.url} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={link.url}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 py-1.5 text-4xl sm:text-5xl font-semibold tracking-tight transition-colors",
                          isActive ? "text-white" : "text-slate-500 hover:text-white",
                        )}
                      >
                        <span className="w-6 text-xs font-normal tabular-nums text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                        {isActive ? <span className="font-serif italic font-normal text-water">{link.name}</span> : link.name}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-sm text-slate-500"
            >
              <a href="mailto:auv.mitb@gmail.com" className="hover:text-white">auv.mitb@gmail.com</a>
              <span>MIT Bengaluru</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
