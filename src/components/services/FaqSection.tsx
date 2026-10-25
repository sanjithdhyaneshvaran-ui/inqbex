"use client";

import { useId, useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";

// 06 FAQs (6A): a split layout with a WhatsApp nudge beside a single-open accordion.
export function FaqSection() {
  const { faq } = services;
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <section className="section-y border-t border-ink/[0.08]">
      <div className="container-site flex flex-wrap items-start gap-14">
        <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="text-h2-sm">{faq.title}</h2>
          <div className="mt-4 flex max-w-[360px] flex-col gap-3 rounded-[22px] border border-primary-intense/50 bg-primary p-[26px]">
            <span className="font-display text-[19px] font-semibold text-ink-strong">{faq.nudge.title}</span>
            <span className="text-[15px] leading-[1.55] text-ink-soft">{faq.nudge.body}</span>
            <a
              href={whatsappUrl("your services")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              className={cn(buttonClass({ size: "md" }), "h-[46px] self-start px-5 shadow-none")}
            >
              {faq.nudge.action}
            </a>
            <span className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink-faint">
              {site.whatsapp.map((t) => (
                <span key={t.team} className="whitespace-nowrap">
                  {t.team} {t.display}
                </span>
              ))}
            </span>
          </div>
        </Reveal>

        <div className="min-w-0 flex-[1.6_1_520px] border-t border-ink/[0.12]">
          {faq.items.map((item, i) => {
            const on = i === open;
            return (
              <div key={item.q} className="border-b border-ink/[0.12]">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={on}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 rounded-lg py-[22px] text-left"
                  >
                    <span className="font-display text-[clamp(17px,1.5vw,19px)] font-medium leading-[1.35] text-ink-strong">
                      {item.q}
                    </span>
                    <svg
                      aria-hidden
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c9a3f2"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className={cn("flex-none transition-transform duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]", on && "rotate-45")}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  hidden={!on}
                  className="pb-6 pr-12 text-[16px] leading-[1.65] text-ink-muted"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
