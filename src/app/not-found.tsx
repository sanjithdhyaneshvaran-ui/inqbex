import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { pages, primaryCta } from "@/content/site";

// Shown for any address that isn't one of the four pages, including old links to
// Work or About.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-site flex min-h-[80svh] flex-col items-start justify-center gap-6 pb-24 pt-40">
        <p className="eyebrow">Page not found</p>
        <h1 className="text-h2 max-w-[18ch]">This page isn&apos;t part of the system.</h1>
        <p className="text-lead max-w-[48ch] text-ink-muted">
          The address may have changed, or the page was never here. These are the pages that are:
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[16px] font-semibold">
          {pages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="text-primary-soft underline underline-offset-[6px] hover:text-primary-pale">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href={primaryCta.href} size="lg" className="mt-4">
          {primaryCta.label}
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
