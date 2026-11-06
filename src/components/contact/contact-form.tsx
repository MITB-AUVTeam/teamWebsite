import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { PillButton } from "@/components/ui/pill-button";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base text-white placeholder:text-slate-500 transition-colors duration-300 hover:border-white/20 focus:border-tone focus:outline-none focus:ring-4 focus:ring-tone/10 disabled:opacity-50";
const labelClass = "mb-2 block font-mono text-xs text-slate-400";

/** Hairline under a field that GSAP draws in while the field has focus. */
function FocusBar() {
  return <span aria-hidden="true" className="cf-bar pointer-events-none absolute inset-x-3 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-tone-deep via-tone to-tone-soft" />;
}

interface SentReceipt {
  name: string;
  email: string;
  at: Date;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Takes the form's place after a successful send: a sonar contact locks on with a
 * check, then a short receipt of what was sent and where the reply will go.
 */
function SentPanel({ receipt, onReset }: { receipt: SentReceipt; onReset: () => void }) {
  const reduced = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const firstName = receipt.name.trim().split(/\s+/)[0];
  const time = receipt.at.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });

  // Screen readers and keyboard users land on the confirmation, not on a vanished form
  useEffect(() => heading.current?.focus({ preventScroll: true }), []);

  const rise = (delay: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };

  return (
    <motion.div
      role="status"
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-center py-6 text-center md:py-10"
    >
      {/* Sonar lock: rings ping out from a contact that resolves into a check */}
      <div aria-hidden="true" className="relative flex h-32 w-32 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-tone/20" />
        <span className="absolute inset-[18%] rounded-full border border-dashed border-tone/25" />
        {!reduced &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-[30%] rounded-full border border-tone"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2.4, delay: 0.3 + i * 0.6, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
            />
          ))}
        <motion.span
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-tone/15 shadow-[0_0_40px_-6px_var(--t1)] ring-1 ring-tone/60"
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-tone-soft" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            />
          </svg>
        </motion.span>
      </div>

      <motion.p {...rise(0.5)} className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-tone/80 sm:tracking-[0.3em]">
        Transmission received · {time} IST
      </motion.p>
      <motion.h3 {...rise(0.6)} ref={heading} tabIndex={-1} className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
        Thanks, {firstName}. <span className="font-serif font-normal italic text-water">Message received.</span>
      </motion.h3>
      <motion.p {...rise(0.7)} className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
        It has reached the team's inbox. We'll reply to you by email as soon as we can.
      </motion.p>

      <motion.dl
        {...rise(0.8)}
        className="mt-8 w-full max-w-sm divide-y divide-white/[0.06] rounded-xl border border-white/10 bg-white/[0.02] text-left font-mono text-xs"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="uppercase tracking-[0.2em] text-slate-500">From</dt>
          <dd className="truncate text-slate-200">{receipt.name}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="uppercase tracking-[0.2em] text-slate-500">Reply to</dt>
          <dd className="truncate text-slate-200">{receipt.email}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="uppercase tracking-[0.2em] text-slate-500">Status</dt>
          <dd className="flex items-center gap-2 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Delivered
          </dd>
        </div>
      </motion.dl>

      <motion.button
        {...rise(0.9)}
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:border-tone/50 hover:text-white"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Send another message
      </motion.button>
    </motion.div>
  );
}

/**
 * Message form; sends through EmailJS with the same service, template and fields as before.
 * GSAP: fields stagger in and a glowing bar draws under the focused field. A
 * successful send swaps the form for a confirmation panel.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [receipt, setReceipt] = useState<SentReceipt | null>(null);
  // EmailJS's own reason for a failed send (e.g. "412 Gmail_API: Invalid grant"), shown on the dev server only
  const [errorDetail, setErrorDetail] = useState("");

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".cf-field", {
        y: 36,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true },
      });
    },
    { scope: formRef },
  );

  const onFocusChange = contextSafe((e: React.FocusEvent<HTMLFormElement>, focused: boolean) => {
    const bar = (e.target as HTMLElement).closest(".cf-field")?.querySelector(".cf-bar");
    if (!bar) return;
    gsap.to(bar, { scaleX: focused ? 1 : 0, duration: focused ? 0.7 : 0.45, ease: focused ? "expo.out" : "power3.in" });
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Fetch credentials from environmental configuration securely
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_9c5mufs";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_7si8nb1";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "WaWWR9SKl2a8lUbdO";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: name,
          from_name: name,
          email: email,
          reply_to: email,
          message: message,
        },
        publicKey
      );
      setReceipt({ name, email, at: new Date() });
      setSubmitStatus("success");
      // Clear fields upon successful dispatch
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS dispatch failure:", error);
      const e = error as { status?: number; text?: string; message?: string };
      setErrorDetail([e?.status, e?.text ?? e?.message].filter(Boolean).join(" ") || String(error));
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {submitStatus === "success" && receipt ? (
        <SentPanel
          key="sent"
          receipt={receipt}
          onReset={() => {
            setSubmitStatus("idle");
            setReceipt(null);
          }}
        />
      ) : (
    <motion.form
      key="form"
      ref={formRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.35 } }}
      className="flex flex-col gap-6 lg:flex-1"
      onSubmit={handleSubmit}
      onFocus={(e) => onFocusChange(e, true)}
      onBlur={(e) => onFocusChange(e, false)}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="cf-field relative">
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            disabled={isSubmitting}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
          <FocusBar />
        </div>
        <div className="cf-field relative">
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={fieldClass}
          />
          <FocusBar />
        </div>
      </div>
      <div className="cf-field relative lg:flex lg:flex-1 lg:flex-col">
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          rows={7}
          required
          disabled={isSubmitting}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your request..."
          className={`${fieldClass} resize-none lg:flex-1`}
        />
        <FocusBar />
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === "error" && (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-xl border border-rose-400/20 bg-rose-500/[0.06] p-4 text-rose-300"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">
              Failed to send message. Please try again or email us directly.
              {import.meta.env.DEV && errorDetail && <span className="mt-1 block font-mono text-xs opacity-80">EmailJS: {errorDetail}</span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="cf-field flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Prefer email? <a href="mailto:auv.mitblr@manipal.edu" className="text-white underline decoration-slate-600 underline-offset-4 transition-colors hover:text-tone hover:decoration-tone">auv.mitblr@manipal.edu</a>
        </p>
        <span className="relative w-full sm:w-auto">
        <PillButton type="submit" disabled={isSubmitting} arrow={!isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              Sending
              <Loader2 className="h-4 w-4 animate-spin" />
            </span>
          ) : (
            "Send message"
          )}
        </PillButton>
        </span>
      </div>
    </motion.form>
      )}
    </AnimatePresence>
  );
}
