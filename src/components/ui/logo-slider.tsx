import { cn } from "@/lib/utils";

export interface LogoItem {
  logo: string;
  alt: string;
  href?: string;
}

interface LogoSliderProps {
  items: LogoItem[];
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
}

/**
 * Quiet, endlessly drifting logo row with faded edges. Logos render in one
 * white tone (several are dark marks that vanish on navy) and brighten on
 * hover; the row pauses while hovered.
 */
export function LogoSlider({ items, speed = 40, className }: LogoSliderProps) {
  // Repeat until one copy comfortably exceeds wide screens, then render twice for the seamless loop.
  const copy = Array.from({ length: Math.max(2, Math.ceil(8 / items.length)) }, () => items).flat();

  return (
    <div
      className={cn(
        "group/slider relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        className="ticker flex w-max items-center group-hover/slider:[animation-play-state:paused]"
        style={{ ["--duration" as string]: `${speed}s` }}
      >
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {copy.map((item, i) => {
              const img = (
                <img
                  src={item.logo}
                  alt={half === 0 && i < items.length ? item.alt : ""}
                  className="h-14 w-auto max-w-[160px] object-contain opacity-50 brightness-0 invert transition-opacity duration-500 hover:opacity-100 md:h-20 md:max-w-[200px]"
                  loading="lazy"
                />
              );
              return (
                <li key={`${half}-${i}`} className="flex h-28 items-center px-8 md:h-36 md:px-14">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={half === 1 || i >= items.length ? -1 : undefined}
                      aria-label={item.alt}
                    >
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
