"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

// 04 Integrated growth (4A): the three services slowly orbit the client's objective.
// Pointing at, focusing or tapping a node shows its role in the panel beside it; the
// orbit pauses while the pointer is over it. Reduced motion keeps the orbit still.
export function IntegratedSection() {
  const { integrated: s } = services;
  const [picked, setPicked] = useState(0);
  const [paused, setPaused] = useState(false);
  const detail = s.nodes[picked];

  return (
    <section
      id="integrated"
      // Clip sideways so the orbiting nodes never widen the page on phones
      className="section-y scroll-mt-16 overflow-x-clip bg-[radial-gradient(60%_70%_at_30%_50%,#1f1529_0%,#13101a_70%)]"
    >
      <div className="container-site flex flex-wrap items-center gap-14">
        <div
          className={cn("flex min-w-0 flex-[1_1_480px] justify-center", paused && "orbit-paused")}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* Inset keeps the 112px nodes inside the frame at every size */}
          <div className="relative aspect-square w-[520px] max-w-[calc(100%-56px)] sm:max-w-full">
            <div aria-hidden className="absolute inset-[6%] rounded-full border border-dashed border-primary-soft/[0.32]" />
            <div aria-hidden className="absolute inset-[24%] rounded-full border border-ink/[0.06]" />
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-full border border-primary-intense bg-[radial-gradient(circle_at_50%_35%,#3a2353,#261732_70%)] p-4 text-center shadow-[0_0_80px_-10px_rgb(157_78_221/0.6)]">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-soft">{s.centre.kicker}</span>
              <span className="font-display text-[clamp(14px,3.4vw,20px)] font-semibold leading-tight text-ink-strong">
                {s.centre.label}
              </span>
            </div>
            <div className="orbit-ring absolute inset-[6%]">
              {s.nodes.map((node, i) => {
                const a = (node.angle * Math.PI) / 180;
                const on = i === picked;
                return (
                  <button
                    key={node.label}
                    type="button"
                    aria-pressed={on}
                    aria-controls="integrated-detail"
                    onClick={() => setPicked(i)}
                    onFocus={() => setPicked(i)}
                    onPointerEnter={() => setPicked(i)}
                    className={cn(
                      "orbit-node absolute size-[clamp(84px,22vw,112px)] -translate-x-1/2 -translate-y-1/2 rounded-full border p-2.5 font-display text-[clamp(13px,3.2vw,15px)] font-semibold leading-tight text-ink-strong transition-[background-color,border-color,box-shadow] duration-[250ms]",
                      on
                        ? "border-primary-pale bg-primary-intense text-white shadow-[0_0_40px_-6px_rgb(157_78_221/0.8)]"
                        : "border-ink/[0.22] bg-[#1f1828] hover:border-primary-soft",
                    )}
                    style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 className="text-h2-sm">{s.title}</h2>
          <p className="max-w-[48ch] text-[17px] leading-[1.65] text-ink-muted">{s.body}</p>
          <div
            id="integrated-detail"
            aria-live="polite"
            className="flex flex-col gap-2 rounded-[20px] border border-primary-intense/45 bg-[#1c1526] px-[26px] py-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-soft">{detail.kicker}</span>
            <span className="font-display text-xl font-semibold text-ink-strong">{detail.title}</span>
            <span className="text-[15px] leading-[1.6] text-ink-soft">{detail.body}</span>
          </div>
          <ul className="flex list-disc flex-col gap-2 pl-[18px] text-[15px] leading-[1.5] text-ink marker:text-primary-soft">
            {s.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <TextLink href={s.link.href}>{s.link.label}</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
