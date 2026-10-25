"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

// 05 How we work (5B): five columns; the active one widens to show the step in full.
// Hover, focus or tap opens a step. Below desktop width the steps stack and open downwards.
export function HowWeWorkSection() {
  const { howWeWork: s } = services;
  const [open, setOpen] = useState(0);

  return (
    <section className="section-y border-t border-ink/[0.08]">
      <div className="container-site flex flex-col gap-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 className="text-h2-sm">{s.title}</h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-[1.6] text-ink-muted">{s.body}</p>
        </Reveal>

        <ol className="flex flex-col gap-3 lg:min-h-[440px] lg:flex-row">
          {s.steps.map((step, i) => {
            const on = i === open;
            return (
              <li
                key={step.short}
                className="flex min-w-0 transition-[flex-grow] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] lg:basis-[120px]"
                style={{ flexGrow: on ? 6 : 1 }}
              >
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`step-${i}`}
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                  className={cn(
                    "relative flex w-full flex-col justify-between gap-5 overflow-hidden rounded-[22px] border p-[22px] text-left transition-[background-color,border-color] duration-[400ms] sm:p-[26px]",
                    on ? "border-primary-intense/60 bg-[#1c1526]" : "border-ink/10 bg-[#17121f] hover:border-ink/20",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-display text-sm font-semibold text-primary-soft">0{i + 1}</span>
                    {on && (
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
                        Step {i + 1} of {s.steps.length}
                      </span>
                    )}
                    {!on && <span className="font-display text-[17px] font-semibold leading-tight text-ink lg:hidden">{step.short}</span>}
                  </span>
                  <span id={`step-${i}`} hidden={!on} className="max-w-[460px] flex-col gap-3.5 [&:not([hidden])]:flex">
                    <span className="font-display text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] text-ink-strong">
                      {step.title}
                    </span>
                    <span className="text-[16px] leading-[1.6] text-ink-soft">{step.body}</span>
                    <span className="mt-1.5 border-t border-ink/[0.12] pt-3.5 text-sm leading-[1.5] text-ink-muted">
                      <span className="font-bold text-primary-pale">You get:</span> {step.get}
                    </span>
                  </span>
                  {!on && (
                    <span className="hidden font-display text-[17px] font-semibold leading-tight text-ink lg:block">
                      {step.short}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
