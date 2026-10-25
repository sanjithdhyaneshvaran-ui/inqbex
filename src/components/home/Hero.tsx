"use client";

import { motion } from "framer-motion";
import { useIntroDone } from "@/components/intro/IntroProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Tinted } from "@/components/ui/Tinted";
import { home } from "@/content/home";
import { primaryCta } from "@/content/site";
import { ease } from "@/lib/motion";
import { FluidField } from "@/components/ui/FluidField";

// Draft 2 hero: full-viewport fluid field, centred two-line headline, one magnetic CTA.
export function Hero() {
  // Hold the entrance until the opening loader lifts
  const ready = useIntroDone();
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease: ease.outQuart },
  });

  return (
    <section className="relative isolate flex min-h-[max(100svh,640px)] flex-col overflow-hidden">
      <FluidField className="absolute inset-0 -z-10" />

      <div className="container-site flex flex-1 flex-col items-center justify-center gap-7 pb-24 pt-32 text-center">
        <motion.p className="eyebrow" {...enter(0)}>
          {home.hero.eyebrow}
        </motion.p>
        <motion.h1 className="text-display max-w-[15ch]" {...enter(0.1)}>
          <Tinted text={home.hero.headline} />
        </motion.h1>
        <motion.p className="text-lead max-w-[540px] text-ink-muted" {...enter(0.25)}>
          {home.hero.subheading}
        </motion.p>
        <motion.div className="mt-7" {...enter(0.4)}>
          <MagneticButton href={primaryCta.href}>{primaryCta.label}</MagneticButton>
        </motion.div>
      </div>

      <a
        href="#proof"
        aria-label="Scroll to the next section"
        className="absolute bottom-[30px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-faint transition-colors hover:text-ink"
      >
        <span>Scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-ink/[0.18]">
          <span className="scroll-cue absolute -left-px top-0 h-2 w-[3px] rounded-sm bg-ink" />
        </span>
      </a>
    </section>
  );
}

