"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { baz, type Owner } from "@/content/baz";
import { cn } from "@/lib/cn";

// Each stage is styled by whoever leads it: Inqbex dark editorial, BAZ paper and caps,
// or both together in plum with a yellow frame.
const look: Record<Owner, { card: string; bar: string; stroke: string; title: string; muted: string; rule: string }> = {
  inqbex: {
    card: "bg-[#1c1526] text-ink-strong border border-primary-intense/40",
    bar: "bg-primary-intense",
    stroke: "[-webkit-text-stroke:1.5px_#9d4edd]",
    title: "font-display text-xl font-semibold tracking-[-0.01em]",
    muted: "text-ink-muted",
    rule: "border-ink/[0.14]",
  },
  baz: {
    card: "bg-paper text-baz-ink border-2 border-baz-ink",
    bar: "bg-baz-red",
    stroke: "[-webkit-text-stroke:1.5px_#131110]",
    title: "font-baz text-[22px] font-black uppercase tracking-[-0.03em]",
    muted: "text-baz-muted",
    rule: "border-baz-ink/20",
  },
  both: {
    card: "bg-primary text-ink-strong border-2 border-baz-yellow",
    bar: "bg-[linear-gradient(90deg,#9d4edd_50%,#ec3013_50%)]",
    stroke: "[-webkit-text-stroke:1.5px_#ffc22e]",
    title: "font-display text-xl font-semibold tracking-[-0.01em]",
    muted: "text-ink",
    rule: "border-baz-yellow/35",
  },
};

// 03 The operating model (BZ-3, the signature section): six stages, with filters that
// highlight what Inqbex leads, what BAZ leads and what they do together.
export function BazModel() {
  const { model } = baz;
  const [filter, setFilter] = useState<"all" | Owner>("all");

  return (
    <section className="bg-base py-[var(--section-y)]">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-11 px-[var(--gutter)] lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-7">
          <div className="flex flex-col gap-[18px]">
            <p className="eyebrow">{model.eyebrow}</p>
            <h2 className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5">
              <span className="text-[clamp(34px,3.6vw,52px)] leading-[1.06] tracking-[-0.025em]">{model.title}</span>
              <span className="font-baz text-[clamp(40px,4.4vw,64px)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-baz-yellow">
                {model.shout}
              </span>
            </h2>
          </div>
          <div role="group" aria-label="Highlight stages by who leads" className="flex flex-wrap gap-2">
            {model.filters.map((f) => {
              const on = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id as "all" | Owner)}
                  className={cn(
                    "h-10 border-2 px-4 font-baz text-xs font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-baz-yellow",
                    on ? "border-baz-yellow bg-baz-yellow text-baz-ink" : "border-ink/30 text-ink hover:border-baz-yellow",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {model.stages.map((s) => {
            const l = look[s.owner];
            const lit = filter === "all" || filter === s.owner;
            return (
              <li
                key={s.n}
                className={cn(
                  "relative flex min-h-[300px] flex-col gap-3.5 px-5 pb-6 pt-[22px] transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 xl:min-h-[380px]",
                  l.card,
                  lit ? "opacity-100" : "opacity-[0.22]",
                )}
              >
                <span aria-hidden className={cn("absolute inset-x-0 top-0 h-2", l.bar)} />
                <span aria-hidden className={cn("mt-2 font-baz text-[64px] font-black leading-[0.9] tracking-[-0.05em] text-transparent", l.stroke)}>
                  {s.n}
                </span>
                <h3 className={cn("leading-[1.1] text-inherit", l.title)}>
                  <span className="sr-only">Stage {s.n}: </span>
                  {s.title}
                </h3>
                <p className={cn("text-[14.5px] leading-[1.55]", l.muted)}>{s.body}</p>
                <p className={cn("mt-auto flex flex-col gap-1.5 border-t pt-3.5 text-xs leading-[1.4]", l.rule)}>
                  <span>
                    <span className="font-extrabold uppercase tracking-[0.12em]">Leads</span> · {s.lead}
                  </span>
                  <span className={l.muted}>
                    <span className="font-extrabold uppercase tracking-[0.12em]">With</span> · {s.with}
                  </span>
                </p>
              </li>
            );
          })}
        </ol>

        <div className="relative xl:h-[70px]">
          <svg aria-hidden width="100%" height="70" viewBox="0 0 1000 70" preserveAspectRatio="none" className="absolute inset-0 hidden xl:block">
            <path
              className="baz-loop"
              d="M915 2 C 915 60, 900 60, 600 60 L 260 60 C 245 60, 245 40, 245 2"
              fill="none"
              stroke="#ffc22e"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="relative text-center xl:pt-6">
            <span className="bg-base px-3.5 py-1.5 text-sm font-semibold text-baz-yellow">{model.loop}</span>
          </p>
        </div>
        <p className="max-w-[70ch] text-sm leading-[1.6] text-ink-faint">{model.note}</p>
      </div>
    </section>
  );
}
