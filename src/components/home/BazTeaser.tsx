import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { home, type Lead } from "@/content/home";
import { cn } from "@/lib/cn";
import { TextLink } from "@/components/ui/TextLink";

const leadLabel: Record<Lead, string> = { inqbex: "Inqbex", both: "Both teams", baz: "BAZ" };

const leadPill: Record<Lead, string> = {
  inqbex: "bg-primary-intense text-white px-[11px] py-[5px]",
  both: "border border-primary-soft text-primary-pale px-2.5 py-1",
  baz: "bg-ink text-[#13101a] px-[11px] py-[5px]",
};

// 05 Inqbex × BAZ: the six-step production loop, who leads each step, and the contrast
// with hiring separate vendors.
export function BazTeaser() {
  const { baz } = home;
  return (
    <section className="section-y bg-surface">
      <div className="container-site flex flex-col gap-16">
        <Reveal className="flex flex-wrap items-end gap-x-16 gap-y-8">
          <div className="flex min-w-0 flex-[1.2_1_480px] flex-col gap-5">
            <p className="eyebrow">{baz.eyebrow}</p>
            <h2 className="text-h2">{baz.title}</h2>
          </div>
          <p className="min-w-0 flex-[1_1_360px] text-lg leading-[1.65] text-ink-muted">{baz.body}</p>
        </Reveal>

        <RevealGroup as="ol" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {baz.steps.map((step, i) => (
            <RevealItem
              as="li"
              key={step.title}
              className={cn(
                "flex flex-col gap-3.5 rounded-[20px] border bg-base px-4 py-5 sm:px-[22px] sm:py-6",
                i === baz.steps.length - 1 ? "border-primary-intense/45" : "border-ink/10",
              )}
            >
              <span
                className={cn(
                  "self-start rounded-full text-[11px] font-bold uppercase tracking-[0.1em]",
                  leadPill[step.lead],
                )}
              >
                {leadLabel[step.lead]}
              </span>
              <span className="font-display text-lg font-semibold leading-tight text-ink-strong">{step.title}</span>
              <span className="text-sm leading-[1.55] text-ink-muted">{step.body}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
          <div className="flex flex-col gap-2.5 rounded-[20px] border border-dashed border-ink/[0.18] px-8 py-7">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-faint">{baz.compare.separate.label}</span>
            <p className="text-[16px] leading-[1.6] text-ink-muted">{baz.compare.separate.body}</p>
          </div>
          <div className="flex flex-col gap-2.5 rounded-[20px] border border-primary-intense/45 bg-primary px-8 py-7">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-soft">{baz.compare.together.label}</span>
            <p className="text-[16px] leading-[1.6] text-ink">{baz.compare.together.body}</p>
          </div>
        </div>

        <TextLink href={baz.link.href} className="self-center">
          {baz.link.label}
        </TextLink>
      </div>
    </section>
  );
}
