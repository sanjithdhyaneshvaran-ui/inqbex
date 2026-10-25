import Link from "next/link";
import { cn } from "@/lib/cn";

// Underlined purple text link for in-section calls to action.
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "self-start text-[16px] font-semibold text-primary-soft underline underline-offset-[6px] transition-colors hover:text-primary-pale",
        className,
      )}
    >
      {children}
    </Link>
  );
}
