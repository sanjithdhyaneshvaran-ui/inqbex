"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

// 02 Websites & digital infrastructure (2A): a real site in a browser frame that tilts
// back and flattens into view as it reaches the middle of the screen. Hover flattens it
// straight away; reduced motion shows it flat.
export function WebSection() {
  const { web } = services;
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "start 25%"] });
  const scrollTilt = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const flat = reduce || hover;

  return (
    <section id="websites" className="section-y scroll-mt-16 border-t border-ink/[0.08]">
      <div className="container-site flex flex-wrap items-center gap-16">
        <Reveal className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <p className="eyebrow">{web.eyebrow}</p>
          <h2 className="text-h2-sm">{web.title}</h2>
          <p className="max-w-[48ch] text-[17px] leading-[1.65] text-ink-muted">{web.body}</p>
          <ul className="mt-2 flex flex-col border-t border-ink/[0.12]">
            {web.list.map((item) => (
              <li key={item.name} className="flex justify-between gap-6 border-b border-ink/[0.12] py-3.5">
                <span className="font-semibold text-ink-strong">{item.name}</span>
                <span className="text-right text-sm text-ink-faint">{item.note}</span>
              </li>
            ))}
          </ul>
          <TextLink href={web.link.href}>{web.link.label}</TextLink>
        </Reveal>

        <figure
          className="m-0 flex min-w-0 flex-[1.2_1_520px] flex-col gap-4 [perspective:1200px]"
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <motion.div
            ref={frame}
            className="origin-bottom rounded-[22px] border border-ink/[0.14] bg-elevated p-2.5 shadow-[0_40px_80px_-30px_rgb(157_78_221/0.45)]"
            style={flat ? undefined : { rotateX: scrollTilt, scale: scrollScale }}
            animate={flat ? { rotateX: 0, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden className="flex gap-1.5 px-1.5 pb-2.5 pt-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-[9px] rounded-full bg-primary-muted" />
              ))}
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-[14px] bg-base">
              <Image
                src={web.showcase.image}
                alt={web.showcase.alt}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
          <figcaption className="flex flex-wrap justify-between gap-2 text-sm text-ink-faint">
            <span>
              <span className="font-semibold text-ink">{web.showcase.name}</span> · {web.showcase.part}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
              <span aria-hidden className="size-1.5 rounded-full bg-primary-soft" />
              {web.showcase.tag}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
