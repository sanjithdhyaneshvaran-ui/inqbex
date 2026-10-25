"use client";

import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, buttonClass } from "./Button";
import Link from "next/link";

type MagneticButtonProps = {
  /** Renders a link when set; otherwise a <button> of the given type (e.g. a form submit). */
  href?: string;
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
  particleCount?: number;
  /** Particle colours, cycled. Defaults to the Inqbex purple and white. */
  palette?: string[];
};

const inqbexPalette = ["#faf9f6", "#c9a3f2"];

type Particle = { x: number; y: number; size: number; color: string; square: boolean };

// Magnetize button (after 21st.dev "magnetize-button" by kokonutd): purple and white
// particles float loosely around the button; on hover, focus or touch they spring into
// its centre and the button gives a slight shake as they land. On leave they spring back
// out. Reduced motion keeps the particles resting and skips the shake.
export function MagneticButton({
  href,
  type = "button",
  children,
  className,
  buttonClassName,
  icon,
  particleCount = 12,
  palette = inqbexPalette,
}: MagneticButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [attracting, setAttracting] = useState(false);
  const particlesControl = useAnimation();
  const buttonControl = useAnimation();
  const reduce = useReducedMotion();

  // Random rest positions, created on the client so they differ per visit
  useEffect(() => {
    const spread = Math.min(180, window.innerWidth / 2 - 16);
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        x: Math.random() * spread * 2 - spread,
        y: Math.random() * 180 - 90,
        size: i % 3 === 0 ? 7 : 5,
        color: palette[i % palette.length],
        square: palette !== inqbexPalette && i % 2 === 1, // BAZ mixes in square confetti
      })),
    );
  }, [particleCount, palette]);

  const attract = useCallback(() => {
    if (reduce) return;
    setAttracting(true);
    particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
    buttonControl.start({
      x: [0, -3, 3, -2, 2, -1, 0],
      rotate: [0, -1, 1, -0.6, 0.6, 0],
      transition: { duration: 0.5, delay: 0.32, ease: "easeInOut" },
    });
  }, [reduce, particlesControl, buttonControl]);

  const release = useCallback(() => {
    setAttracting(false);
    particlesControl.start((i: number) => ({
      x: particles[i]?.x ?? 0,
      y: particles[i]?.y ?? 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }));
  }, [particlesControl, particles]);

  // Link and button share every handler and class; only the element differs
  const Tag = (href ? Link : "button") as React.ElementType;

  return (
    <motion.span animate={buttonControl} className={cn("relative inline-flex", className)}>
      <Tag
        {...(href ? { href } : { type })}
        onMouseEnter={attract}
        onMouseLeave={release}
        onFocus={attract}
        onBlur={release}
        onTouchStart={attract}
        onTouchEnd={release}
        className={cn(buttonClass({ size: "lg" }), "min-w-40 touch-manipulation", buttonClassName)}
      >
        {particles.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            custom={i}
            initial={{ x: p.x, y: p.y }}
            animate={particlesControl}
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 transition-opacity duration-300",
              p.square ? "rounded-[1px]" : "rounded-full",
              attracting ? "opacity-100" : "opacity-45",
            )}
            style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2, background: p.color }}
          />
        ))}
        <span className="relative flex items-center justify-center gap-2.5">
          {children}
          <span className={cn("inline-flex transition-transform duration-300", attracting && "scale-110")}>
            {icon ?? <ArrowIcon />}
          </span>
        </span>
      </Tag>
    </motion.span>
  );
}
