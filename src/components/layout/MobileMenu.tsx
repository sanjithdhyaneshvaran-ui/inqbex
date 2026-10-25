"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { pages, primaryCta, site, whatsappUrl } from "@/content/site";
import { ease } from "@/lib/motion";

// Full-screen menu for phones and tablets. Modal: traps focus, closes on Escape,
// locks page scroll, and the header returns focus to the Menu button on close.
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={panel}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col bg-base/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: ease.outQuart }}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" onClick={onClose} aria-label="Inqbex Growth Studio, home">
          <Logo variant="lockup" title="Inqbex Growth Studio" className="aspect-[1730/490] h-[30px] w-auto" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-small text-ink shadow-[inset_0_0_0_1px_rgb(231_224_214/0.16)]"
        >
          Close
          <span aria-hidden className="relative block size-4">
            <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Menu" className="container-site flex flex-1 flex-col justify-center">
        <motion.ul
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
        >
          {pages.map((item) => (
            <motion.li
              key={item.href}
              className="overflow-hidden border-b border-line"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outQuart } },
              }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-baseline justify-between py-4 font-display text-[clamp(2rem,8vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-ink transition-colors hover:text-ink-strong"
              >
                {item.label}
                <span aria-hidden className="text-h3 text-ink-faint">
                  ↗
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <div className="container-site flex flex-col gap-6 pb-10">
        <Button href={primaryCta.href} onClick={onClose} size="lg" className="w-full">
          {primaryCta.label}
        </Button>
        <div className="flex justify-between text-small text-ink-muted">
          <a href={`mailto:${site.email}`} className="hover:text-ink-strong">
            {site.email}
          </a>
          <span className="flex gap-5">
            <a href={whatsappUrl("the website")} target="_blank" rel="noopener noreferrer" className="hover:text-ink-strong">
              WhatsApp
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink-strong">
              Instagram
            </a>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
