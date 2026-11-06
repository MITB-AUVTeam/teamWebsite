import React, { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';
import logoImg from '@/assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png';

interface PreloaderProps {
  onFinished: () => void;
}

/** Boot checks, each shown once loading passes its threshold (percent). */
const BOOT_LOG = [
  { at: 0, text: 'Power bus' },
  { at: 18, text: 'Sonar array' },
  { at: 38, text: 'IMU calibration' },
  { at: 58, text: 'Vision stack' },
  { at: 78, text: 'Thrusters armed' },
];

const MAX_DEPTH = 120;

/**
 * Boot sequence: a sonar scope sweeps around the logo while the depth counter
 * runs and system checks report in, then the screen irises shut into the scope.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable body scroll on mount
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const duration = 1700;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let animFrameId: number;
    let exitTimeout: number | undefined;

    const updateProgress = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      setProgress(easeInOutCubic(t) * 100);

      if (t < 1) {
        animFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Count reached 100. Trigger exit sequence.
        setIsExiting(true);
        exitTimeout = window.setTimeout(() => {
          sessionStorage.setItem("preloader-seen", "true");
          onFinished();
        }, 800); // Wait for the iris to close
      }
    };

    animFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.clearTimeout(exitTimeout);
      document.body.style.overflow = originalStyle;
    };
  }, [onFinished]);

  const displayProgress = Math.min(Math.round(progress), 100);
  const depth = ((progress / 100) * MAX_DEPTH).toFixed(1).padStart(5, '0');
  const done = displayProgress >= 100;

  return (
    <div
      data-preloader
      className={`${styles.wrapper} ${isExiting ? styles.exiting : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${displayProgress}%`}
    >
      <div className={styles.grid} aria-hidden="true" />

      {/* Viewfinder corners */}
      <div className={styles.frame} aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className={`${styles.stage} ${isExiting ? styles.stageExiting : ''}`} aria-hidden="true">
        {/* Sonar scope */}
        <div className={styles.scope}>
          <div className={styles.ring} />
          <div className={`${styles.ring} ${styles.ringDashed}`} />
          <div className={`${styles.ring} ${styles.ringInner}`} />
          <div className={styles.crossH} />
          <div className={styles.crossV} />
          <div className={styles.ticks}>
            {Array.from({ length: 60 }, (_, i) => (
              <span key={i} style={{ transform: `rotate(${i * 6}deg)` }} className={i % 5 === 0 ? styles.tickMajor : undefined} />
            ))}
          </div>
          <div className={styles.sweep} />
          <span className={styles.ping} />
          <span className={`${styles.ping} ${styles.pingLate}`} />
          <span className={styles.blip} />
          <img src={logoImg} alt="" className={styles.logo} />
        </div>
      </div>

      {/* Readouts */}
      <div className={`${styles.readouts} ${isExiting ? styles.readoutsExiting : ''}`} aria-hidden="true">
        <div className={styles.log}>
          {BOOT_LOG.filter((l) => progress >= l.at).map((l) => (
            <div key={l.text} className={styles.logLine}>
              <span className={styles.logPrompt}>&gt;</span>
              <span>{l.text}</span>
              <span className={styles.ok}>OK</span>
            </div>
          ))}
          {done && (
            <div className={`${styles.logLine} ${styles.logFinal}`}>
              <span className={styles.logPrompt}>&gt;</span>
              <span>Descending</span>
            </div>
          )}
        </div>

        <div className={styles.depth}>
          <span className={styles.depthLabel}>Depth</span>
          <span className={styles.depthValue}>
            {depth}
            <small>m</small>
          </span>
          <div className={styles.track}>
            <div className={styles.fill} style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <div className={styles.meta}>
            <span>Team AUV · MIT Bengaluru</span>
            <span className={styles.count}>{String(displayProgress).padStart(3, '0')}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
