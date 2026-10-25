"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ARROW_STROKE, STROKE, arrow, letters, tagline, viewBoxes } from "@/brand/logo";
import { ease } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";

type IntroLoaderProps = {
  onReveal: () => void; // page may start its own entrance
  onExited: () => void; // overlay fully gone, safe to unmount
};

// Opening loader (inspired by 21st.dev "morph-loading"): the wordmark draws itself,
// the arrow shoots out of the e, then the curtain lifts. ~1.5s, once per session,
// skippable with any click or key.
const letterPaths = [letters.iStem, letters.n, letters.q, letters.b, letters.e];

export function IntroLoader({ onReveal, onExited }: IntroLoaderProps) {
  const reduce = useReducedMotion();
  // The overlay is server-rendered; the logo mounts on the client so its initial
  // state matches the visitor's motion preference.
  const mounted = useMounted();
  const [leaving, setLeaving] = useState(false);
  const revealed = useRef(false);

  const leave = () => {
    if (revealed.current) return;
    revealed.current = true;
    onReveal();
    setLeaving(true);
  };

  useEffect(() => {
    const timer = setTimeout(leave, reduce ? 500 : 1500);
    const skip = () => leave();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    if (leaving) document.documentElement.style.overflow = "";
  }, [leaving]);

  const draw = (delay: number, duration = 0.7) =>
    reduce
      ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { delay, duration, ease: ease.inOutQuart },
        };
  const fade = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.4 } };

  return (
    <motion.div
      className="intro-loader fixed inset-0 z-[100] flex items-center justify-center bg-base"
      aria-hidden
      initial={false}
      animate={leaving ? (reduce ? { opacity: 0 } : { y: "-100%" }) : { y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: ease.inOutQuart }}
      onAnimationComplete={() => leaving && onExited()}
    >
      {mounted && (
      <motion.svg
        viewBox={viewBoxes.lockup}
        className="w-[min(72vw,520px)]"
        animate={leaving && !reduce ? { opacity: 0, y: -24 } : undefined}
        transition={{ duration: 0.4, ease: ease.outQuart }}
      >
        <defs>
          <linearGradient id="intro-silver" x1="0" y1="160" x2="0" y2="532" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#C9C4CD" />
          </linearGradient>
          <linearGradient id="intro-growth" x1="1180" y1="0" x2="1862" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#DAD6DE" />
            <stop offset="0.16" stopColor="#00D26A" />
            <stop offset="1" stopColor="#A6FF00" />
          </linearGradient>
          <mask id="intro-knockout" maskUnits="userSpaceOnUse" x="1400" y="140" width="500" height="400">
            <rect x="1400" y="140" width="500" height="400" fill="#fff" />
            <path d={arrow.shaft} fill="none" stroke="#000" strokeWidth={arrow.knockoutWidth} />
          </mask>
        </defs>

        <g fill="none" stroke="url(#intro-silver)" strokeWidth={STROKE} strokeLinejoin="round">
          {letterPaths.map((d, i) => (
            <motion.path key={d} d={d} {...draw(0.05 + i * 0.07)} />
          ))}
        </g>
        <motion.rect
          x={letters.iDot.x}
          y={letters.iDot.y}
          width={letters.iDot.size}
          height={letters.iDot.size}
          fill="url(#intro-silver)"
          {...fade(0.5)}
        />
        <motion.path d={letters.eBarCap} fill="url(#intro-silver)" {...fade(0.5)} />
        <motion.path d={letters.x} fill="url(#intro-silver)" mask="url(#intro-knockout)" {...fade(0.55)} />
        <motion.path
          d={arrow.shaft}
          fill="none"
          stroke="url(#intro-growth)"
          strokeWidth={ARROW_STROKE}
          strokeLinejoin="round"
          {...draw(0.55, 0.55)}
        />
        <motion.path
          d={arrow.head}
          fill="url(#intro-growth)"
          stroke="url(#intro-growth)"
          strokeWidth={6}
          strokeLinejoin="round"
          style={{ transformOrigin: "1795px 237px", transformBox: "view-box" }}
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.4 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: 1.0, duration: 0.35, ease: ease.outQuart },
              })}
        />
        <motion.path d={tagline} fill="#D8D3DB" {...fade(0.9)} />
      </motion.svg>
      )}
    </motion.div>
  );
}
