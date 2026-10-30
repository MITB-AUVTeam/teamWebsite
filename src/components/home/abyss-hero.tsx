import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import imgBg from "@/assets/hero_parallax/979650ce95a6c67ea15bbbf0ad0681f152bbf7b3.webp";
import imgLogo from "@/assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.webp";
import imgFish from "@/assets/hero_parallax/ffd48cdd2aea9c7f098608b847a7c0c99b5f4eb8.webp";
import imgRocksFront from "@/assets/hero_parallax/724bc4d4bdcd3aa5ae40dbbe2940545d28abfe9c.webp";
import imgRocksLeft from "@/assets/hero_parallax/152fd27cdd307ca2d7657a11e9e58325de922f88.webp";
import { HeroHud } from "@/components/home/hero-hud";
import imgRocksRight from "@/assets/hero_parallax/1c12efb875dc486a28207d77f13caa9aaac52df6.webp";

// The preloader covers the first ~2.5s of a fresh load; later visits start at once.
let booted = false;

const BUBBLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 3 + ((i * 7) % 9),
}));

/**
 * Opening scene: the original ocean, rock and fish layers rebuilt as a GSAP
 * stage. Layers rise into place on load, follow the cursor at different
 * depths, and pull apart on scroll as the logo sinks away.
 */
export function AbyssHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const delay = booted ? 0.15 : 2.3;
      booted = true;
      const q = gsap.utils.selector(root);

      // Entrance
      const intro = gsap.timeline({ delay, defaults: { ease: "expo.out" } });
      intro
        .from(q(".h-bg"), { scale: 1.3, autoAlpha: 0, duration: 2.6 })
        .from(q(".h-rays > *"), { autoAlpha: 0, scaleY: 0.4, transformOrigin: "top", stagger: 0.12, duration: 2 }, 0.2)
        .from(q(".h-rock-back"), { yPercent: 45, autoAlpha: 0, stagger: 0.15, duration: 2.2 }, 0.25)
        .from(q(".h-rock-front"), { yPercent: 60, duration: 2.4 }, 0.4)
        .from(q(".h-ring"), { scale: 0.4, rotate: -120, autoAlpha: 0, stagger: 0.12, duration: 2.2 }, 0.6)
        .from(q(".h-brand > *"), { y: 60, autoAlpha: 0, filter: "blur(12px)", stagger: 0.14, duration: 1.6 }, 0.9)
        .from(q(".h-fish"), { xPercent: 80, autoAlpha: 0, duration: 2.6, ease: "power3.out" }, 0.8)
        .from(q(".h-sweep"), { autoAlpha: 0, duration: 1.5 }, 1)
        .from(q(".hud-corner"), { scale: 2.5, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, 1.1)
        .from(q(".hud-panel"), { y: 24, autoAlpha: 0, filter: "blur(8px)", stagger: 0.12, duration: 1.2 }, 1.3)
        .from(q(".h-cue"), { y: 20, autoAlpha: 0, duration: 1 }, 1.6);

      // Idle life (paused while the hero is scrolled out of view)
      const idle: gsap.core.Tween[] = [];
      const bubbles: gsap.core.Tween[] = [];
      idle.push(gsap.to(q(".h-fish-inner"), { y: -14, x: -8, rotate: -2, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      idle.push(gsap.to(q(".h-ring-spin"), { rotate: 360, duration: 60, ease: "none", repeat: -1 }));
      idle.push(gsap.to(q(".h-rays > *"), {
        opacity: () => gsap.utils.random(0.25, 0.7),
        duration: () => gsap.utils.random(2.5, 5),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      }));
      q(".h-bubble").forEach((b: Element, i: number) => {
        const rise = () =>
          (bubbles[i] = gsap.fromTo(
            b,
            { y: "15vh", x: 0, autoAlpha: 0 },
            {
              y: "-110vh",
              x: gsap.utils.random(-40, 40),
              autoAlpha: gsap.utils.random(0.3, 0.8),
              duration: gsap.utils.random(7, 14),
              delay: gsap.utils.random(0, 8),
              ease: "sine.in",
              onComplete: rise,
            },
          ));
        rise();
      });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => {
          [...idle, ...bubbles].forEach((t) => (isActive ? t.resume() : t.pause()));
          root.current?.classList.toggle("fx-paused", !isActive);
        },
      });

      // Scroll: the original parallax speeds, as fractions of the distance scrolled
      // (background 0.3, back rocks 0.4, front rocks 0.6, fish drifting up and left,
      // ring turning 0.06°/px). Nothing scales or fades, so every layer keeps its size.
      // These ride on the scroll-* wrappers so they never fight the entrance tweens or
      // the cursor parallax.
      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true };
      const dist = () => root.current?.offsetHeight ?? window.innerHeight;
      gsap.to(q(".h-bg-scroll"), { y: () => dist() * 0.3, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".h-back-scroll"), { y: () => dist() * 0.4, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".h-front-scroll"), { y: () => dist() * 0.6, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".h-fish-scroll"), { x: () => dist() * -0.1, y: () => dist() * -0.15, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".h-ring-scroll"), { rotate: () => dist() * 0.06, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".h-hud"), { autoAlpha: 0, scale: 1.06, ease: "none", scrollTrigger: { ...scrub, end: "40% top" } });

      // Cursor depth parallax (mouse only)
      if (window.matchMedia("(pointer: fine)").matches) {
        const layers = [
          { sel: ".h-bg-wrap", depth: 12 },
          { sel: ".h-back-wrap", depth: 22 },
          { sel: ".h-center-wrap", depth: 14 },
          { sel: ".h-fish-wrap", depth: 40 },
          { sel: ".h-front-wrap", depth: 55 },
        ].map(({ sel, depth }) => ({
          depth,
          x: gsap.quickTo(q(sel), "x", { duration: 1.4, ease: "power3.out" }),
          y: gsap.quickTo(q(sel), "y", { duration: 1.4, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(-nx * l.depth);
            l.y(-ny * l.depth);
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100vh] w-full overflow-hidden bg-[#000910]">
      <h1 className="sr-only">Team AUV, MIT Bengaluru</h1>

      <div className="h-bg-scroll absolute inset-x-0 top-0 h-[120vh]">
        <div className="h-bg-wrap h-full w-full">
          <img src={imgBg} alt="" fetchPriority="high" className="h-bg h-full w-full object-cover opacity-60" />
        </div>
      </div>

      {/* Light rays from the surface */}
      <div aria-hidden="true" className="h-rays pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
        {[12, 30, 52, 70, 86].map((left, i) => (
          <span
            key={left}
            className="absolute -top-[10%] h-[90%] w-[9vw] origin-top bg-[radial-gradient(50%_100%_at_50%_0%,rgba(165,243,252,0.22),rgba(103,232,249,0.04)_60%,transparent)]"
            style={{ left: `${left}%`, transform: `skewX(${-18 + i * 6}deg)`, opacity: 0.4 }}
          />
        ))}
      </div>

      {/* Rocks are laid out on a stage the width of the screen, in cqw. On portrait screens
          (phones, upright tablets) the stage stays 16:9 wide and is centre-cropped, so they
          see the middle of the desktop scene instead of rocks sunk below the fold. */}
      <div className="h-back-scroll pointer-events-none absolute inset-0">
        <div className="h-back-wrap absolute inset-0">
          <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 [container-type:size] portrait:w-[177.78vh]">
          <div className="absolute bottom-[-55cqw] left-[-55cqw] w-[140cqw] md:bottom-[-35cqw] md:left-[-35cqw] md:w-[100cqw] portrait:bottom-[-35cqw] portrait:left-[-35cqw] portrait:w-[100cqw]">
            <img src={imgRocksLeft} alt="" className="h-rock-back h-auto w-full object-contain opacity-90" />
          </div>
          <div className="absolute bottom-[-55cqw] left-[45cqw] w-[180cqw] md:bottom-[-35cqw] md:left-[35cqw] md:w-[120cqw] portrait:bottom-[-35cqw] portrait:left-[35cqw] portrait:w-[120cqw]">
            <img src={imgRocksRight} alt="" className="h-rock-back h-auto w-full object-contain opacity-90" />
          </div>
          </div>
        </div>
      </div>

      {/* Bubbles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="h-bubble absolute bottom-0 rounded-full border border-cyan-100/50 bg-cyan-100/10"
            style={{ left: `${b.left}%`, width: b.size, height: b.size, opacity: 0 }}
          />
        ))}
      </div>

      <div className="h-center-wrap absolute inset-0 z-[10] flex items-center justify-center pt-16">
        <div className="h-center relative flex scale-[0.85] flex-col items-center sm:scale-75 md:scale-100">
          <div className="relative h-[290px] w-[290px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px]">
            <div className="h-ring-scroll absolute inset-0">
              <div className="h-ring-spin absolute inset-0">
                <div className="h-ring absolute inset-0 rounded-full border border-cyan-300/20">
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]" />
                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]" />
                </div>
                <div className="h-ring absolute inset-[45px] rounded-full border border-dashed border-cyan-300/25 sm:inset-[80px] md:inset-[100px]" />
                {/* Compass ticks */}
                <div className="h-ring absolute -inset-3 rounded-full sm:-inset-5">
                  {Array.from({ length: 72 }, (_, i) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom"
                      style={{ transform: `translateX(-50%) rotate(${i * 5}deg)` }}
                    >
                      <span className={`block w-px ${i % 6 === 0 ? "h-3 bg-cyan-200/60" : "h-1.5 bg-cyan-200/25"}`} />
                    </span>
                  ))}
                </div>
              </div>
              {/* Sonar sweep */}
              <div className="h-sweep absolute inset-0 overflow-hidden rounded-full">
                <div className="sonar-sweep absolute inset-0 rounded-full" />
              </div>
            </div>

            <div className="h-brand absolute inset-0 flex flex-col items-center justify-center gap-[11px]" aria-hidden="true">
              <p className="-mb-2 select-none text-xs font-medium uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] sm:-mb-4 sm:text-lg md:-mb-5 md:text-xl">Team</p>
              <img src={imgLogo} alt="" className="h-[90px] w-[180px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] sm:h-[150px] sm:w-[300px] md:h-[200px] md:w-[400px]" />
              <p className="relative -mt-2 text-center text-lg font-medium tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] sm:-mt-4 sm:text-3xl md:-mt-5 md:text-[40px]">
                MIT-BENGALURU
                <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-normal tracking-[0.3em] text-slate-300 drop-shadow-none sm:mt-4 sm:text-[11px] md:text-xs">
                  Autonomous underwater vehicles
                </span>
              </p>
            </div>

            <div className="h-fish-scroll absolute right-[-40px] top-[20px] h-[150px] w-[180px] sm:right-[-60px] sm:top-[40px] sm:h-[250px] sm:w-[300px] md:right-[-80px] md:top-[50px] md:h-[350px] md:w-[400px]">
              <div className="h-fish-wrap h-full w-full">
                <div className="h-fish h-full w-full">
                  <img src={imgFish} alt="" className="h-fish-inner h-full w-full object-contain opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-front-scroll pointer-events-none absolute inset-0 z-[2]">
        <div className="h-front-wrap absolute inset-0">
          <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 [container-type:size] portrait:w-[177.78vh]">
          <div className="absolute bottom-[-50cqw] left-[-20cqw] w-[120cqw] md:bottom-[-30cqw] md:left-[-10cqw] md:w-[80cqw] portrait:bottom-[-30cqw] portrait:left-[-10cqw] portrait:w-[80cqw]">
            <img src={imgRocksFront} alt="" className="h-rock-front h-auto w-full object-contain" />
          </div>
          </div>
        </div>
      </div>

      <HeroHud />

      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[5] h-[25vh] bg-gradient-to-t from-[#020617] via-[#020617]/85 to-transparent" />

      <div className="h-cue absolute inset-x-0 bottom-8 z-[11] flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
        Dive
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-drop absolute left-0 top-0 h-3 w-px bg-tone" />
        </span>
      </div>
    </section>
  );
}
