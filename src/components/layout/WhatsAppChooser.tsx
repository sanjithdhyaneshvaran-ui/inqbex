"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";

// Every WhatsApp button on the site is a plain wa.me link to the first team, so it still
// works without JavaScript. This listens for those clicks and asks which team to message
// instead, keeping the button's prefilled text. Links that name a team (data-team) skip it.
export function WhatsAppChooser() {
  const [text, setText] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setText(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="https://wa.me/"]') as HTMLAnchorElement | null;
      if (!a || a.hasAttribute("data-team")) return;
      e.preventDefault();
      opener.current = a;
      setText(new URL(a.href).searchParams.get("text") ?? "");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return <AnimatePresence>{text !== null && <ChooserDialog text={text} onClose={close} />}</AnimatePresence>;
}

function ChooserDialog({ text, onClose }: { text: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  // Modal: focus moves in, Tab stays inside, Escape or a click outside closes it
  useEffect(() => {
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation(); // don't also close the mobile menu underneath
        return onClose();
      }
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
    window.addEventListener("keydown", onKey, true);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener("keydown", onKey, true);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#0b0910]/70 p-4 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: ease.outQuart }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-chooser-title"
        className="flex w-full max-w-[420px] flex-col gap-6 rounded-[28px] border border-ink/[0.12] bg-surface p-7 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: ease.outQuart }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="eyebrow">WhatsApp</p>
            <h2 id="wa-chooser-title" className="font-display text-2xl font-semibold leading-tight text-ink-strong">
              Which team would you like to message?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/[0.06] hover:text-ink-strong"
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {site.whatsapp.map((t) => (
            <li key={t.team}>
              <a
                href={`https://wa.me/${t.number}?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-team={t.team}
                data-track="whatsapp_click"
                onClick={onClose}
                className="group flex items-center gap-4 rounded-2xl border border-ink/[0.12] bg-base px-5 py-4 transition-colors hover:border-primary-intense/70 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-strong"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-intense text-white">
                  <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5z" />
                  </svg>
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-display text-lg font-semibold text-ink-strong">{t.team} team</span>
                  <span className="text-sm text-ink-muted">{t.display}</span>
                </span>
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a3f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-[250ms] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
