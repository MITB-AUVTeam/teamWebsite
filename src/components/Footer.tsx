import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/ui/smooth-scroll";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";

const socials = [
  { href: "https://github.com/MITB-AUVTeam", label: "GitHub" },
  { href: "https://www.linkedin.com/company/team-auv-mit-b/", label: "LinkedIn" },
  { href: "https://www.instagram.com/auv_mitb?igsh=azA2d2N3eGlqdDlh", label: "Instagram" },
  { href: "https://www.youtube.com/@TeamAUVMIT-B", label: "YouTube" },
];

const sitemap = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/team", label: "Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/media", label: "Media & Works" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/contact", label: "Contact Us" },
];

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{title}</h4>
      {children}
    </div>
  );
}

const linkClass = "text-slate-300 transition-colors duration-300 hover:text-white";

export function Footer() {
  const lenis = useLenis();
  const wordmark = useRef<HTMLDivElement>(null);

  // GSAP: the wordmark's letters surface one by one as the footer scrolls in.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".fw-letter", {
        yPercent: 100,
        rotate: 8,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: wordmark.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
      });
    },
    { scope: wordmark },
  );
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer className="relative mt-auto w-full overflow-hidden border-t border-white/[0.06]">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--t1)_7%,transparent),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-24 md:pt-32">
        <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1] tracking-[-0.03em] text-white">
            Let's build what goes <span className="font-serif italic font-normal text-water">below.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <PillButton to="/contact">Contact us</PillButton>
            <PillButton to="/sponsors" variant="ghost">Partner with us</PillButton>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-white/[0.08] pt-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Column title="Write to us">
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:auv.mitblr@manipal.edu" className={linkClass}>auv.mitblr@manipal.edu</a></li>
                <li><a href="mailto:auv.mitb@gmail.com" className={linkClass}>auv.mitb@gmail.com</a></li>
                <li className="pt-2">
                  <a href="tel:+918210876521" className={linkClass}>+91 82108 76521</a>
                  <span className="ml-2 text-slate-500">Animesh Mishra</span>
                </li>
                <li>
                  <a href="tel:+919113095603" className={linkClass}>+91 91130 95603</a>
                  <span className="ml-2 text-slate-500">Siddharth P S</span>
                </li>
              </ul>
            </Column>
          </div>

          <div className="col-span-2 sm:col-span-1 md:col-span-3">
            <Column title="Visit">
              <a
                href="https://maps.app.goo.gl/FBcetpnuBDREDUjG7"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm leading-relaxed text-slate-300 transition-colors hover:text-white"
              >
                Team AUV Workshop<br />
                Room 209, 210 AB-4<br />
                Manipal Institute of Technology<br />
                Bengaluru, Karnataka, India
              </a>
            </Column>
          </div>

          <nav aria-label="Footer" className="col-span-2 sm:col-span-1 md:col-span-3">
            <Column title="Pages">
              <ul className="grid grid-cols-3 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {sitemap.map(({ to, label }) => (
                  <li key={to}><Link to={to} className={linkClass}>{label}</Link></li>
                ))}
              </ul>
            </Column>
          </nav>

          <div className="md:col-span-2">
            <Column title="Follow">
              <ul className="space-y-3 text-sm">
                {socials.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}</a>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
        </div>

        <div ref={wordmark} className="mt-20 select-none overflow-hidden" aria-hidden="true">
          <p className="flex translate-y-[18%] justify-center text-[18vw] md:text-[17vw] font-semibold leading-[0.8] tracking-[-0.06em]">
            {/* The gradient only paints inside each letter's box, and the tight tracking makes
                that box narrower than the glyph (the V's arm overhangs). Padding widens the
                painted area; the matching negative margin keeps the spacing unchanged. */}
            {"AUV·MITB".split("").map((ch, i) => (
              <span key={i} className="fw-letter -mx-[0.12em] inline-block bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text px-[0.12em] text-transparent">
                {ch}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:px-8">
          <p>&copy; {new Date().getFullYear()} Team AUV, MIT Bengaluru</p>
          <button type="button" onClick={toTop} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
