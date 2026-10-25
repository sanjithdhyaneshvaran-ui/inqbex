"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// "The tear" (option A, chosen by Inqbex): crossing into or out of /inqbex-baz, a crack
// runs down the current page along the same torn edge the BAZ hero uses, then the two
// halves fly apart to reveal the new page underneath. Red going into BAZ, purple coming
// back. The halves are live copies of the current page taken at the moment of the click.
// Modified clicks, history navigation and reduced motion skip it.

const BAZ = "/inqbex-baz";
const LEFT = "polygon(0 0, 57% 0, 52% 30%, 45.5% 60%, 49% 64%, 43% 100%, 0 100%)";
const RIGHT = "polygon(57% 0, 100% 0, 100% 100%, 43% 100%, 49% 64%, 45.5% 60%, 52% 30%)";
const SEAM = "57,0 52,30 45.5,60 49,64 43,100";

// Copies the visible page into a fixed layer clipped to one side of the tear. The outer
// layer is transformed, so fixed elements in the copy (the header) stay pinned to it.
function half(clip: string) {
  const outer = document.createElement("div");
  outer.setAttribute("aria-hidden", "true");
  outer.inert = true;
  Object.assign(outer.style, {
    position: "fixed",
    inset: "0",
    zIndex: "100",
    overflow: "hidden",
    clipPath: clip,
    transform: "translateZ(0)",
    background: getComputedStyle(document.body).backgroundColor,
    pointerEvents: "none",
    willChange: "transform",
  });
  const inner = document.createElement("div");
  inner.style.marginTop = `${-window.scrollY}px`;
  for (const node of Array.from(document.body.children)) {
    if (node.tagName === "SCRIPT" || node.hasAttribute("data-tear")) continue;
    inner.appendChild(node.cloneNode(true));
  }
  // Motion styles may live in running animations rather than inline styles; copy the
  // values on screen so animated-in content doesn't copy as hidden
  const sel = '[style*="opacity"], [style*="transform"]';
  const liveAnimated = document.body.querySelectorAll<HTMLElement>(
    `:scope > :not([data-tear], script):is(${sel}), :scope > :not([data-tear], script) :is(${sel})`,
  );
  inner.querySelectorAll<HTMLElement>(sel).forEach((copy, i) => {
    const src = liveAnimated[i];
    if (!src) return;
    const cs = getComputedStyle(src);
    copy.style.opacity = cs.opacity;
    copy.style.transform = cs.transform === "none" ? "" : cs.transform;
  });
  // Canvases copy empty; paint each with its current frame
  const live = document.body.querySelectorAll<HTMLCanvasElement>(":scope > :not([data-tear]) canvas");
  inner.querySelectorAll("canvas").forEach((copy, i) => {
    const src = live[i];
    if (!src) return;
    try {
      const img = document.createElement("img");
      img.src = src.toDataURL();
      img.className = copy.className;
      img.alt = "";
      img.style.cssText = copy.style.cssText;
      img.style.opacity = "1";
      copy.replaceWith(img);
    } catch {
      /* tainted or unavailable: leave the copy blank */
    }
  });
  outer.appendChild(inner);
  outer.setAttribute("data-tear", "");
  return outer;
}

// The crack, drawn in screen pixels so the line stays solid while it draws
function seam(color: string) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const points = SEAM.split(" ")
    .map((p) => p.split(",").map(Number))
    .map(([x, y]) => `${(x / 100) * w},${(y / 100) * h}`)
    .join(" ");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("data-tear", "");
  Object.assign(svg.style, { position: "fixed", inset: "0", width: "100%", height: "100%", zIndex: "101", pointerEvents: "none" });
  svg.innerHTML = `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
  const line = svg.querySelector("polyline")!;
  const length = Math.ceil(w + h); // longer than the seam, so the dash covers it
  line.style.strokeDasharray = `${length}`;
  line.style.strokeDashoffset = `${length}`;
  return { svg, line, length };
}

export function TearTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  const busy = useRef(false);
  const arrived = useRef<{ path: string; resolve: () => void } | null>(null);

  useEffect(() => {
    pathRef.current = pathname;
    const a = arrived.current;
    if (a && a.path === pathname) {
      arrived.current = null;
      // Give the new page two frames to paint under the halves
      requestAnimationFrame(() => requestAnimationFrame(a.resolve));
    }
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tear = async (href: string, to: string) => {
      busy.current = true;
      const color = to === BAZ ? "#ec3013" : "#9d4edd";
      let left: HTMLDivElement, right: HTMLDivElement, made: ReturnType<typeof seam>;
      try {
        left = half(LEFT);
        right = half(RIGHT);
        made = seam(color);
      } catch {
        // If the page can't be copied, still go where the visitor asked
        busy.current = false;
        router.push(href);
        return;
      }
      const { svg: line, line: crack, length } = made;
      document.body.append(left, right, line);
      const layers = [left, right, line];
      try {
        const landed = new Promise<void>((resolve) => {
          arrived.current = { path: to, resolve };
          setTimeout(resolve, 4000); // reveal anyway if the route stalls
        });
        router.push(href);

        // The crack runs down the seam while the new page loads underneath
        await crack.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
          duration: 280,
          easing: "ease-in",
          fill: "forwards",
        }).finished;
        await landed;
        left.animate([{ translate: "-0.6% 0" }, { translate: "0.6% 0" }, { translate: "0 0" }], { duration: 120 });
        await new Promise((r) => setTimeout(r, 120));

        line.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
        const fly = { duration: 900, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" as const };
        left.style.filter = right.style.filter = "drop-shadow(0 30px 40px rgb(0 0 0 / .55))";
        await Promise.all([
          left.animate([{ transform: "translateZ(0)" }, { transform: "translate(-62%, 7%) rotate(-6deg)" }], fly).finished,
          right.animate([{ transform: "translateZ(0)" }, { transform: "translate(62%, -7%) rotate(6deg)" }], fly).finished,
        ]);
      } finally {
        layers.forEach((l) => l.remove());
        arrived.current = null;
        busy.current = false;
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      const from = pathRef.current;
      const to = url.pathname.replace(/\/$/, "") || "/";
      if (to === from || (to !== BAZ && from !== BAZ)) return;
      if (reduce.matches) return; // plain navigation
      // Cancel the default and Next's Link handling (it skips default-prevented clicks)
      e.preventDefault();
      if (busy.current) return;
      void tear(url.pathname + url.search + url.hash, to);
    };

    // Capture phase so this runs before Link's own click handler
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
