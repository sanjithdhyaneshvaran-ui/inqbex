import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "lg" | "md" | "sm";

type ButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"a">, "href" | "className" | "children">;

// Pill CTA from the approved designs. Primary: solid accent purple with a soft glow
// (one per view). Outline: hairline pill for secondary routes. Ghost: the header's
// translucent pill. External and mailto/WhatsApp links render as a plain <a>.
const base =
  "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-bold tracking-[0.01em] " +
  "transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-out-quart " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-strong " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-intense text-white " +
    "shadow-[0_10px_40px_-8px_rgb(157_78_221/0.6),inset_0_1px_0_rgb(255_255_255/0.25)] " +
    "hover:shadow-[0_14px_48px_-8px_rgb(157_78_221/0.8),inset_0_1px_0_rgb(255_255_255/0.3)]",
  outline:
    "border border-ink/[0.28] text-ink-strong hover:border-primary-soft/70 hover:bg-ink/[0.04]",
  ghost:
    "border border-ink/[0.22] bg-base/35 font-semibold text-ink-strong backdrop-blur-md hover:border-ink/40",
};

const sizes: Record<Size, string> = {
  lg: "h-[58px] px-[34px] text-[16px]",
  md: "h-12 px-[22px] text-[15px]",
  sm: "h-[42px] px-5 text-[15px]",
};

export function buttonClass({ variant = "primary", size = "md" }: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({ href, variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(buttonClass({ variant, size }), className);
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
