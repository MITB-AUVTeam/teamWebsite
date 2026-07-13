import React, { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';
import logoImg from '@/assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png';

interface PreloaderProps {
  onFinished: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable body scroll on mount
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const duration = 1300; // 1300ms duration

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let animFrameId: number;

    const updateProgress = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeInOutCubic(t);
      const currentProgress = easedT * 100;

      setProgress(currentProgress);

      if (t < 1) {
        animFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Count reached 100. Trigger exit sequence.
        setIsExiting(true);
        const exitTimeout = setTimeout(() => {
          sessionStorage.setItem("preloader-seen", "true");
          onFinished();
        }, 700); // Wait 700ms for exit animation
        return () => clearTimeout(exitTimeout);
      }
    };

    animFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrameId);
      document.body.style.overflow = originalStyle;
    };
  }, [onFinished]);

  const displayProgress = Math.min(Math.round(progress), 100);
  const paddedNumber = String(displayProgress).padStart(3, '0');

  return (
    <div
      className={`${styles.wrapper} ${isExiting ? styles.exiting : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className={`${styles.brandContent} ${isExiting ? styles.brandExiting : ''}`}>
        <img src={logoImg} alt="AUV Logo" className={styles.logo} />
        
        <div className={styles.progressBlock}>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Loading</span>
            <span className={styles.statusPercentage}>{paddedNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
