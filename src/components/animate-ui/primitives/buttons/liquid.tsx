'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { Slot, type WithAsChild } from '@/components/animate-ui/primitives/animate/slot';

type LiquidButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    delay?: string;
    fillHeight?: string;
    hoverScale?: number;
    tapScale?: number;
  }
>;

function LiquidButton({
  delay = '0.2s',
  fillHeight = '0px',
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  style,
  ...props
}: LiquidButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{
        scale: hoverScale,
        '--liquid-button-fill-height': '100%',
        transition: {
          '--liquid-button-fill-height': { duration: 0 },
        },
      }}
      style={
        {
          ...style,
          '--liquid-button-fill-height': fillHeight,
          background:
            'linear-gradient(var(--liquid-button-color) 0 0) no-repeat 0% 100% / 100% var(--liquid-button-fill-height, 0px)',
          backgroundColor: 'var(--liquid-button-background-color)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'border-box',
          transition: `background ${delay} ease-out, color ${delay} ease-out`,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { LiquidButton, type LiquidButtonProps };
