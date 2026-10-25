"use client";

import { motion } from "framer-motion";
import { useIntroDone } from "@/components/intro/IntroProvider";
import { FluidField } from "@/components/ui/FluidField";
import { tintClass } from "@/components/ui/Tinted";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

// 01 Hero (1B): the headline resolves word by word out of a blur over a quieter
// version of the Home fluid field, then chips jump to each service below.
export function ServicesHero() {
  const ready = useIntroDone();
  const { hero } = services;
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="relative isolate flex min-h-[max(92svh,640px)] flex-col overflow-hidden">
      <FluidField look="quiet" className="absolute inset-0 -z-10" />
      <div className="container-site flex flex-1 flex-col items-center justify-center gap-7 pb-20 pt-32 text-center">
        <motion.p className="eyebrow" {...fade(0)}>
          {hero.eyebrow}
        </motion.p>
        <h1 className="text-display max-w-[14ch]">
          <span className="sr-only">{hero.words.join(" ").replaceAll("*", "")}</span>
          <span aria-hidden>
            {hero.words.map((word, i) => {
              const tinted = word.startsWith("*");
              return (
                <span key={word}>
                  <motion.span
                    className={cn("inline-block", tinted && tintClass)}
                    initial={{ opacity: 0, y: "0.35em", filter: "blur(10px)" }}
                    animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.16, ease }}
                  >
                    {word.replaceAll("*", "")}
                  </motion.span>
                  {i < hero.words.length - 1 && " "}
                </span>
              );
            })}
          </span>
        </h1>
        <motion.p className="text-lead max-w-[560px] text-ink-muted" {...fade(0.9)}>
          {hero.body}
        </motion.p>
        <motion.nav
          aria-label="Services on this page"
          className="mt-3 flex flex-wrap justify-center gap-2.5"
          {...fade(1.1)}
        >
          {hero.chips.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className={cn(
                "rounded-full border px-[18px] py-2.5 text-sm transition-colors duration-300",
                "primary" in chip
                  ? "border-primary-intense bg-primary-intense/[0.22] font-bold text-ink-strong hover:bg-primary-intense/35"
                  : "border-ink/20 bg-base/45 font-semibold text-ink hover:border-primary-soft hover:bg-primary-intense/[0.18]",
              )}
            >
              {chip.label}
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
