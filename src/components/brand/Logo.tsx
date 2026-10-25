import { useId } from "react";
import { logoSvg, type LogoTone, type LogoVariant } from "@/brand/logo";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  title?: string;
  className?: string;
};

// Inline SVG so gradients render crisply at any size. Size it with width or height classes.
export function Logo({ variant = "lockup", tone = "dark", title, className }: LogoProps) {
  const idPrefix = `logo${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <span
      className={cn("inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-full", className)}
      dangerouslySetInnerHTML={{ __html: logoSvg({ variant, tone, idPrefix, title }) }}
    />
  );
}
