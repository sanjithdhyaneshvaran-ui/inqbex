import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { home } from "@/content/home";
import { primaryCta, site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";
import Link from "next/link";

// 06 Start a project: the three-step engagement, then the routes to begin.
// "Book a discovery call" only appears once a booking link is configured.
export function StartProject() {
  const { start } = home;
  const routes = [
    site.bookingUrl && {
      key: "book",
      href: site.bookingUrl,
      icon: <CalendarIcon />,
      title: "Book a discovery call",
      body: "A short conversation about fit and the brief. Times shown in your timezone.",
      action: "Choose a time",
      recommended: true,
    },
    {
      key: "brief",
      href: primaryCta.href,
      icon: <BriefIcon />,
      title: "Send a project brief",
      body: "Tell us what needs to change and your timing. We will review it and reply through the details you provide.",
      action: "Write a brief",
      recommended: !site.bookingUrl,
    },
    {
      key: "whatsapp",
      href: whatsappUrl("a new project"),
      icon: <WhatsAppIcon />,
      title: "Message us on WhatsApp",
      body: (
        <>
          Quickest for a first question.
          {site.whatsapp.map((t) => (
            <span key={t.team} className="block whitespace-nowrap">
              {t.team} {t.display}
            </span>
          ))}
        </>
      ),
      action: "Start a chat",
      recommended: false,
    },
  ].filter((r) => !!r);

  return (
    <section
      id="start"
      className="bg-[radial-gradient(120%_80%_at_50%_0%,#261732_0%,#13101a_60%)] pb-[var(--section-y)] pt-[calc(var(--section-y)+8px)]"
    >
      <div className="container-site flex flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <p className="eyebrow">{start.eyebrow}</p>
          <h2 className="text-h1">{start.title}</h2>
          <p className="max-w-[560px] text-lg leading-[1.65] text-ink-muted">{start.body}</p>
        </Reveal>

        <ol className="grid grid-cols-1 border-y border-line-strong/60 md:grid-cols-3">
          {start.process.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "flex gap-4 py-7 md:px-7",
                i === 0 && "md:pl-0",
                i === 2 && "md:pr-0",
                i > 0 && "max-md:border-t max-md:border-line-strong/60",
              )}
            >
              <span className="font-display text-sm font-semibold text-primary-soft">{i + 1}</span>
              <span className="flex flex-col gap-1.5">
                <span className="font-display text-lg font-semibold text-ink-strong">{step.title}</span>
                <span className="text-[15px] leading-[1.55] text-ink-muted">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-5">
          {routes.map((r) => {
            const external = r.href.startsWith("http");
            const props = {
              className: cn(
                "group flex h-full flex-col gap-4 rounded-3xl border p-8 text-ink transition-colors",
                r.recommended
                  ? "border-primary-intense/55 bg-elevated hover:border-primary-intense"
                  : "border-ink/[0.12] bg-surface hover:border-ink/25",
              ),
              ...(r.key === "whatsapp" ? { "data-track": "whatsapp_click" } : {}),
            };
            const inner = (
              <>
                <span className="flex items-center justify-between">
                  {r.icon}
                  {r.recommended && (
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-soft">Recommended</span>
                  )}
                </span>
                <span className="font-display text-2xl font-semibold text-ink-strong">{r.title}</span>
                <span className="text-[15px] leading-[1.6] text-ink-muted">{r.body}</span>
                <span
                  className={cn(
                    buttonClass({ variant: r.recommended ? "primary" : "outline" }),
                    "mt-auto self-start shadow-none",
                  )}
                >
                  {r.action}
                </span>
              </>
            );
            return (
              <RevealItem key={r.key}>
                {external ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" {...props}>
                    {inner}
                  </a>
                ) : (
                  <Link href={r.href} {...props}>
                    {inner}
                  </Link>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="text-center text-sm text-ink-faint">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="text-primary-soft underline underline-offset-4 hover:text-primary-pale">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}

const iconProps = {
  "aria-hidden": true,
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#c9a3f2",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

function BriefIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
      <path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h5" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5z" />
    </svg>
  );
}
