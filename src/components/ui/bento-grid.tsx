import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-slate-900/40 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1.5">
      <Icon className="h-12 w-12 origin-left transform-gpu text-slate-400 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-blue-400" />
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        {name}
      </h3>
      <p className="max-w-lg text-slate-500 dark:text-slate-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute top-4 right-4 z-20 flex opacity-0 -translate-y-2 transform-gpu transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button 
        variant="secondary" 
        asChild 
        className="group/btn pointer-events-auto rounded-full bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:bg-blue-600 hover:border-blue-500 text-slate-200 hover:text-white transition-all duration-300 px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transform-gpu h-auto"
      >
        <Link to={href} className="flex items-center gap-1">
          {cta}
          <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-slate-800/20" />
  </div>
);

export { BentoCard, BentoGrid };
