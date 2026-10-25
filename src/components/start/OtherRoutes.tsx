import { site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";

// 03 Other ways to connect (approved ST-3): a quiet footer-style strip that doesn't
// compete with the form. "Book a call" appears once a booking link is configured.
export function OtherRoutes() {
  const routes = [
    { label: "WhatsApp", value: <WhatsAppNumbers />, href: whatsappUrl("a new project"), external: true, track: "whatsapp_click" },
    site.bookingUrl && { label: "Book a call", value: "Pick a time that suits you", href: site.bookingUrl, external: true },
    { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  ].filter((r) => !!r);

  return (
    <section id="connect" className="scroll-mt-24 border-t border-ink/[0.08] bg-[#0f0c15]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-start gap-x-16 gap-y-8 px-[var(--gutter)] pb-20 pt-[72px]">
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-faint">Prefer not to fill a form?</p>
          <p className="font-display text-[22px] font-medium leading-[1.35] text-ink">Reach us directly instead.</p>
        </div>
        <div className="grid min-w-0 flex-[2.4_1_560px] grid-cols-1 gap-y-6 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {routes.map((r, i) => (
            <a
              key={r.label}
              href={r.href}
              {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...("track" in r ? { "data-track": r.track } : {})}
              className={cn(
                "group flex flex-col gap-1.5 rounded-lg py-1 sm:px-6",
                i === 0 && "sm:pl-0",
                i > 0 && "sm:border-l sm:border-ink/10",
              )}
            >
              <span className="flex items-center gap-2 text-[13px] font-semibold text-ink-faint">
                {r.label}
                <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a3f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-[250ms] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
              <span className="text-[17px] font-semibold text-ink-strong">{r.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Both team numbers, each under its city, so a number never wraps mid-way
function WhatsAppNumbers() {
  return (
    <span className="flex flex-col gap-2">
      {site.whatsapp.map((t) => (
        <span key={t.team} className="flex flex-col">
          <span className="text-[13px] font-medium text-ink-muted">{t.team}</span>
          <span className="whitespace-nowrap">{t.display}</span>
        </span>
      ))}
    </span>
  );
}
