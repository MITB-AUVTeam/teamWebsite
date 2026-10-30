import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "auv-sound";

/**
 * Underwater soundscape, synthesised with Web Audio so there is nothing to download:
 * a low filtered rumble that slowly breathes, plus a sonar ping every few seconds
 * and on every page dive. Off by default; the choice is remembered.
 */
class Soundscape {
  private ctx = new AudioContext();
  private master = this.ctx.createGain();
  private timer = 0;

  constructor() {
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);

    // Brown noise through a low-pass: the hum of deep water
    const len = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last * 3.5;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 320;
    const hum = this.ctx.createGain();
    hum.gain.value = 0.5;

    // Slow swell on the filter so the rumble moves like a current
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoDepth = this.ctx.createGain();
    lfoDepth.gain.value = 140;
    lfo.connect(lfoDepth).connect(lowpass.frequency);

    noise.connect(lowpass).connect(hum).connect(this.master);
    noise.start();
    lfo.start();
  }

  /** Sonar ping: a decaying sine with a fading echo. */
  ping(pitch = 1180) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.94, t + 1.6);
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

    const echo = this.ctx.createDelay();
    echo.delayTime.value = 0.42;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.32;
    echo.connect(feedback).connect(echo);

    osc.connect(env);
    env.connect(this.master);
    env.connect(echo).connect(this.master);
    osc.start(t);
    osc.stop(t + 2);
    window.setTimeout(() => {
      env.disconnect();
      echo.disconnect();
      feedback.disconnect();
    }, 6000);
  }

  async start() {
    await this.ctx.resume();
    this.master.gain.setTargetAtTime(0.5, this.ctx.currentTime, 0.6);
    const loop = () => {
      this.ping();
      this.timer = window.setTimeout(loop, 6500 + Math.random() * 4000);
    };
    this.timer = window.setTimeout(loop, 1200);
  }

  stop() {
    window.clearTimeout(this.timer);
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.25);
    window.setTimeout(() => this.ctx.state === "running" && this.master.gain.value < 0.01 && this.ctx.suspend(), 1500);
  }
}

export function SoundToggle() {
  const [on, setOn] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const scape = useRef<Soundscape | null>(null);

  // Browsers only allow audio after a gesture, so a saved "on" resumes on the first tap or key
  useEffect(() => {
    let saved = false;
    try {
      saved = localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      /* storage blocked: stay off */
    }
    if (!saved) return;
    const resume = () => setOn(true);
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, []);

  useEffect(() => {
    if (on) {
      scape.current ??= new Soundscape();
      scape.current.start();
    } else scape.current?.stop();
    try {
      localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      /* storage blocked: nothing to remember */
    }
  }, [on]);

  // Get out of the way of the footer's buttons. The footer is swapped on every page
  // change, so look it up each time; one rect read per frame at most.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const footer = document.querySelector("footer");
      setAtFooter(!!footer && footer.getBoundingClientRect().top < window.innerHeight - 40);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Ping deeper on every page dive
  useEffect(() => {
    if (!on) return;
    const onDive = () => scape.current?.ping(880);
    window.addEventListener("auv:dive", onDive);
    return () => window.removeEventListener("auv:dive", onDive);
  }, [on]);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      data-cursor={on ? "Mute" : "Sound"}
      tabIndex={atFooter ? -1 : 0}
      aria-hidden={atFooter || undefined}
      className={cn(
        "group fixed bottom-5 left-5 z-[60] flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-[#020617]/85 px-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-[opacity,transform,color,border-color] duration-500 hover:border-tone/40 hover:text-white md:bottom-6 md:left-6",
        atFooter && "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("sound-bar w-[2px] rounded-full bg-current", on ? "text-tone" : "h-[3px]")}
            style={on ? { animationDelay: `${i * 0.15}s` } : undefined}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{on ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
