"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { nav, primaryCta } from "@/content/site";
import { ease } from "@/lib/motion";
import { MobileMenu } from "./MobileMenu";

// Stacking navbar (inspired by 21st.dev "stacking-navbar"): full width at the top,
// condenses into a floating glass bar once you scroll, tucks away while scrolling
// down and returns as soon as you scroll up.
export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 80);
    // Only hide after the hero, and never while the menu is open
    setHidden(!menuOpen && y > 600 && y > prev + 4 ? true : y < prev - 4 ? false : hidden);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: ease.outQuart }}
      >
        <div className="px-[var(--gutter)] pt-0 lg:px-6">
          <motion.div
            initial={false}
            animate={condensed ? "condensed" : "top"}
            variants={{
              top: {
                maxWidth: 1328,
                marginTop: 16,
                height: 64,
                paddingLeft: 0,
                paddingRight: 0,
                backgroundColor: "rgba(19, 16, 26, 0)",
                boxShadow: "inset 0 0 0 1px rgba(231, 224, 214, 0), 0 0 0 0 rgba(0,0,0,0)",
              },
              condensed: {
                maxWidth: 820,
                marginTop: 12,
                height: 60,
                paddingLeft: 20,
                paddingRight: 10,
                backgroundColor: "rgba(19, 16, 26, 0.72)",
                boxShadow:
                  "inset 0 0 0 1px rgba(231, 224, 214, 0.1), 0 16px 40px -16px rgba(0,0,0,0.7)",
              },
            }}
            transition={{ duration: 0.5, ease: ease.outQuart }}
            className="mx-auto grid grid-cols-[1fr_auto] items-center gap-6 rounded-full backdrop-blur-xl md:grid-cols-[1fr_auto_1fr]"
          >
            {/* The lockup's tagline sits under the wordmark, so the box is nudged down a touch
                to put the wordmark itself on the same centre line as the links and button. */}
            <Link href="/" aria-label="Inqbex Growth Studio, home" className="flex items-center justify-self-start">
              <Logo
                variant="lockup"
                title="Inqbex Growth Studio"
                className={`aspect-[1730/490] w-auto translate-y-[6%] transition-[height] duration-500 ease-out-quart ${
                  condensed ? "h-[38px]" : "h-[46px]"
                }`}
              />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="rounded-full px-4 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink-strong aria-[current=page]:text-ink-strong aria-[current=page]:underline aria-[current=page]:decoration-primary-intense aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 justify-self-end">
              <Button href={primaryCta.href} size="sm" className="hidden sm:inline-flex">
                {primaryCta.label}
              </Button>
              <button
                ref={menuButton}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(true)}
                className="inline-flex h-[42px] items-center gap-2 rounded-full px-4 text-[15px] font-medium text-ink shadow-[inset_0_0_0_1px_rgb(231_224_214/0.16)] backdrop-blur-md transition-colors hover:text-ink-strong md:hidden"
              >
                Menu
                <span aria-hidden className="flex flex-col gap-1">
                  <span className="h-px w-4 bg-current" />
                  <span className="h-px w-4 bg-current" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu onClose={closeMenu} />
        )}
      </AnimatePresence>
    </>
  );
}
