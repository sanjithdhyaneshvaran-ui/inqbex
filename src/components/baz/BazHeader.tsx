"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { nav, primaryCta } from "@/content/site";

// The Inqbex × BAZ page's own header (BZ-1): the Inqbex logo locked up with "× BAZ." on the
// dark side, and BAZ's Archivo caps and black block button on the paper side. It sits over
// the hero and scrolls away with it.
export function BazHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-6 px-[var(--gutter)] py-[26px]">
        <Link href="/" aria-label="Inqbex Growth Studio, home" className="flex items-center gap-3.5">
          <Logo variant="lockup" title="Inqbex Growth Studio" className="aspect-[1730/490] h-8 w-auto" />
          <span aria-hidden className="font-baz text-[26px] font-black text-baz-red">
            ×
          </span>
          <span aria-hidden className="font-baz text-[26px] font-black tracking-[-0.04em] text-ink-strong">
            BAZ<span className="text-baz-red">.</span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-7 font-baz text-[13px] font-bold uppercase tracking-[0.14em] text-baz-ink lg:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === "/inqbex-baz" ? "page" : undefined}
              className="transition-colors hover:text-baz-red-ink aria-[current=page]:text-baz-red-ink focus-visible:outline-baz-red"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-3 bg-baz-ink px-[18px] py-[13px] text-paper transition-colors hover:bg-baz-red-deep"
          >
            {primaryCta.label}
            <span aria-hidden className="h-0.5 w-[18px] bg-baz-red transition-colors group-hover:bg-paper" />
          </Link>
        </nav>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          className="inline-flex h-[42px] items-center gap-2 border-2 border-ink-strong px-4 font-baz text-[13px] font-bold uppercase tracking-[0.14em] text-ink-strong lg:hidden"
        >
          Menu
          <span aria-hidden className="flex flex-col gap-1">
            <span className="h-0.5 w-4 bg-baz-red" />
            <span className="h-0.5 w-4 bg-current" />
          </span>
        </button>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={closeMenu} />}</AnimatePresence>
    </>
  );
}
