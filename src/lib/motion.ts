import type { Transition, Variants } from "framer-motion";

// Shared motion tokens. Keep transitions small and purposeful (brief: "Motion").
// Wrap the app in <MotionConfig reducedMotion="user"> so these respect OS settings.

export const ease = {
  outQuart: [0.25, 1, 0.5, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
} as const;

export const transition: Record<"fast" | "base" | "slow", Transition> = {
  fast: { duration: duration.fast, ease: ease.outQuart },
  base: { duration: duration.base, ease: ease.outQuart },
  slow: { duration: duration.slow, ease: ease.outQuart },
};

// Default reveal for editorial blocks entering the viewport.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

export const stagger = (step = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step } },
});
