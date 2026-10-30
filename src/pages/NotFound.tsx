import { useLocation } from "react-router-dom";
import { Eyebrow } from "@/components/ui/section-heading";
import { PillButton } from "@/components/ui/pill-button";

/** Off the map: a sonar still sweeps for the lost page. */
export function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-32 text-center">
      <div aria-hidden="true" className="holo-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="sonar-sweep pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(640px,120vw)] w-[min(640px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-tone/10 opacity-50"
      />

      <Eyebrow className="mb-8 justify-center">Signal lost</Eyebrow>
      <p aria-hidden="true" className="font-mono text-sm tabular-nums tracking-[0.3em] text-tone/70">DEPTH 404.0 m</p>
      <h1 className="mt-6 text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-8xl">
        Lost <span className="font-serif font-normal italic text-water">at sea.</span>
      </h1>
      <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-slate-300">
        Our sonar can't find{" "}
        <code className="break-all rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-base text-tone-soft">{pathname}</code>. The page may
        have moved, or never existed.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <PillButton to="/">Surface to Home</PillButton>
        <PillButton to="/contact" variant="ghost">
          Report it
        </PillButton>
      </div>
    </section>
  );
}
