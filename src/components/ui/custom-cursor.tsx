import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-part cursor for fine pointers: a crisp dot that tracks exactly and a
 * ring that trails on a spring. Over links/buttons the ring swells; over any
 * element with data-cursor="Label" it becomes a filled disc showing that label.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const sense = (target: Element | null) => {
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor || null);
      setHovering(!!target?.closest("a, button, [role='button'], label, select, summary"));
    };
    let last = { x: 0, y: 0 };
    let resense = 0;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      last = { x: e.clientX, y: e.clientY };
      setVisible(true);
      sense(e.target as Element | null);
    };
    const onDown = () => setPressed(true);
    // A click can open a dialog under a still pointer; re-read what is beneath it.
    const onUp = () => {
      setPressed(false);
      window.clearTimeout(resense);
      resense = window.setTimeout(() => sense(document.elementFromPoint(last.x, last.y)), 120);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.clearTimeout(resense);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 52 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100001]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: pressed ? 0.85 : 1,
          backgroundColor: label ? "rgba(34,211,238,1)" : "rgba(34,211,238,0)",
          borderColor: label ? "rgba(34,211,238,1)" : hovering ? "rgba(165,243,252,0.9)" : "rgba(255,255,255,0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        // border width is static; colour animates above
        initial={false}
      >
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-950"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </div>
  );
}
