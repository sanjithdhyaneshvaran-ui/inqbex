"use client";

import Image from "next/image";
import { useState } from "react";
import { baz } from "@/content/baz";
import { cn } from "@/lib/cn";

const sticker: Record<string, string> = {
  red: "bg-baz-red-deep text-paper",
  blue: "bg-baz-blue text-paper",
  yellow: "bg-baz-yellow text-baz-ink",
  green: "bg-baz-green text-baz-ink",
};

// 06 Selected partner work (approved "contact sheet"): four tilted prints taped to BAZ's
// paper grid, each with a number sticker and a calm Inqbex caption of who did what.
// Hover or focus straightens a print and brings it forward while the others fade;
// Stephin Lalan's print switches to the live site. On phones the prints become a
// swipeable row. Each print opens the client's Instagram.
export function BazWork() {
  const { work } = baz;
  const [hot, setHot] = useState(-1);

  return (
    <section id="partner-work" className="scroll-mt-20 overflow-hidden border-t-2 border-baz-ink bg-paper bg-[linear-gradient(rgb(19_17_16/0.06)_2px,transparent_2px),linear-gradient(90deg,rgb(19_17_16/0.06)_2px,transparent_2px)] bg-[size:120px_120px] text-baz-ink">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-16 px-[var(--gutter)] py-[var(--section-y)] lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="flex flex-col gap-[18px]">
            <p className="flex items-center gap-3 font-baz text-xs font-bold uppercase tracking-[0.2em] text-baz-red-ink">
              <span aria-hidden className="h-0.5 w-7 bg-baz-red" />
              {work.eyebrow}
            </p>
            <h2 className="flex flex-wrap items-baseline gap-x-[22px] gap-y-1 text-baz-ink">
              <span className="font-baz text-[clamp(52px,7vw,112px)] font-black uppercase leading-[0.86] tracking-[-0.055em]">
                {work.shout}
              </span>
              <span className="max-w-[22ch] text-[clamp(20px,1.8vw,26px)] leading-[1.3] tracking-[-0.01em] text-primary-muted">
                {work.title}
              </span>
            </h2>
          </div>
          <p className="max-w-[320px] text-xs text-[#6b6565] lg:text-right">{work.note}</p>
        </div>

        <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-7 overflow-x-auto px-[var(--gutter)] pb-6 pt-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:items-start md:gap-x-7 md:gap-y-10 md:overflow-visible md:px-0 md:pb-0">
          {work.cards.map((c, i) => {
            const on = hot === i;
            const dim = hot !== -1 && !on;
            return (
              <li
                key={c.name}
                className="relative w-[78vw] max-w-[320px] flex-none snap-center md:w-auto md:max-w-none md:flex-[var(--grow)_1_240px] md:[margin-top:var(--offset)]"
                style={{ "--grow": c.grow, "--offset": `${c.offset}px`, zIndex: on ? 3 : 1 } as React.CSSProperties}
              >
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} on Instagram (${c.handle})`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHot(i)}
                  onPointerLeave={() => setHot(-1)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(-1)}
                  className="block transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-[3px] focus-visible:outline-offset-8 focus-visible:outline-baz-red"
                  style={{
                    transform: `rotate(${on ? 0 : c.rot}deg) scale(${on ? 1.04 : 1})`,
                    opacity: dim ? 0.55 : 1,
                    filter: `saturate(${dim ? 0.4 : 1})`,
                  }}
                >
                  <span className="relative block border-2 border-baz-ink bg-white px-2.5 pt-2.5 shadow-[10px_10px_0_#131110]">
                    <span
                      aria-hidden
                      className="absolute -top-3.5 left-1/2 z-[2] -ml-[46px] h-[26px] w-[92px] bg-baz-yellow/85"
                      style={{ transform: `rotate(${c.tape}deg)` }}
                    />
                    <span className="relative block overflow-hidden bg-baz-ink" style={{ aspectRatio: c.ratio }}>
                      <Image
                        src={c.img}
                        alt={c.alt}
                        fill
                        sizes="(min-width: 768px) 320px, 78vw"
                        className="object-cover"
                        style={{ objectPosition: c.pos }}
                      />
                      {"img2" in c && (
                        <Image
                          src={c.img2}
                          alt={c.alt2}
                          fill
                          sizes="(min-width: 768px) 320px, 78vw"
                          className="object-cover object-top transition-opacity duration-[600ms]"
                          style={{ opacity: on ? 1 : 0 }}
                        />
                      )}
                      <span className="absolute bottom-2.5 left-2.5 bg-baz-ink px-[9px] py-1.5 font-baz text-[11px] font-bold tracking-[0.08em] text-paper">
                        {c.handle}
                      </span>
                    </span>
                    <span className="flex items-center justify-between gap-2 px-0.5 pb-3 pt-2.5 font-baz text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b6565]">
                      <span>{c.frame}</span>
                      <span>{c.credit}</span>
                    </span>
                    <span
                      className={cn(
                        "absolute -right-[18px] top-6 z-[3] flex min-w-[108px] flex-col items-center justify-center border-2 border-baz-ink px-3.5 py-3 text-center",
                        sticker[c.sticker],
                      )}
                      style={{ transform: `rotate(${c.stickerRot}deg)` }}
                    >
                      <span className="font-baz text-[30px] font-black leading-[0.95] tracking-[-0.04em]">{c.big}</span>
                      <span className="mt-1 font-baz text-[10px] font-bold uppercase tracking-[0.14em]">{c.small}</span>
                    </span>
                  </span>
                </a>
                <div className="mt-[26px] flex flex-col gap-3 bg-base px-5 pb-[22px] pt-5 text-ink">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl">{c.name}</h3>
                    <span className="text-[13px] text-ink-faint">{c.sector}</span>
                  </div>
                  <dl className="flex flex-col gap-2 text-sm leading-[1.5]">
                    <div className="flex gap-2.5">
                      <dt className="w-[52px] flex-none pt-0.5 font-display text-xs font-semibold text-primary-soft">Inqbex</dt>
                      <dd className="text-ink-soft">{c.inqbex}</dd>
                    </div>
                    <div className="flex gap-2.5">
                      <dt className="w-[52px] flex-none pt-0.5 font-baz text-xs font-black tracking-[0.04em] text-baz-red-light">BAZ</dt>
                      <dd className="text-ink-soft">{c.bazPart}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
