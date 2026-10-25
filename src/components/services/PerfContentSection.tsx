import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

// 03 Performance marketing × Content & creative (3A): two cards joined by a loop.
// Results flow from the ads to the content team, creative flows back to the ads.
export function PerfContentSection() {
  const { perfContent: s } = services;
  return (
    <section className="section-y bg-surface">
      <div className="container-site flex flex-col gap-14">
        <Reveal className="flex flex-wrap items-end gap-x-16 gap-y-6">
          <div className="flex min-w-0 flex-[1.2_1_480px] flex-col gap-5">
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 className="text-h2-sm">{s.title}</h2>
          </div>
          <p className="min-w-0 flex-[1_1_360px] text-[17px] leading-[1.65] text-ink-muted">{s.body}</p>
        </Reveal>

        <div className="flex flex-col items-stretch lg:flex-row">
          <Card id="performance" lead={s.performance.lead} leadTone="inqbex" title={s.performance.title} body={s.performance.body} list={s.performance.list}>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-[18px] text-sm text-ink-faint">
              {s.performance.stats.map((stat) => (
                <span key={stat.label}>
                  <span className="font-display font-semibold text-ink-strong">{stat.value}</span> {stat.label}
                </span>
              ))}
            </div>
          </Card>

          <Loop />

          <Card id="content" lead={s.content.lead} leadTone="baz" title={s.content.title} body={s.content.body} list={s.content.list}>
            <p className="mt-auto border-t border-ink/10 pt-[18px] text-sm leading-[1.55] text-ink-faint">{s.content.note}</p>
          </Card>
        </div>
        <p className="text-center text-[13px] text-ink-faint">{s.footnote}</p>
      </div>
    </section>
  );
}

function Card({
  id,
  lead,
  leadTone,
  title,
  body,
  list,
  children,
}: {
  id: string;
  lead: string;
  leadTone: "inqbex" | "baz";
  title: string;
  body: string;
  list: readonly string[];
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex min-w-0 flex-1">
      <article
        id={id}
        className="flex w-full scroll-mt-24 flex-col gap-[18px] rounded-3xl border border-ink/10 bg-base p-7 sm:p-9"
      >
        <span
          className={cn(
            "self-start rounded-full px-[11px] py-[5px] text-[11px] font-bold uppercase tracking-[0.1em]",
            leadTone === "inqbex" ? "bg-primary-intense text-white" : "bg-ink text-[#13101a]",
          )}
        >
          {lead}
        </span>
        <h3 className="text-[28px] leading-tight">{title}</h3>
        <p className="text-[16px] leading-[1.6] text-ink-muted">{body}</p>
        <ul className="flex list-disc flex-col gap-2 pl-[18px] text-[15px] leading-[1.5] text-ink marker:text-primary-soft">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {children}
      </article>
    </Reveal>
  );
}

// The loop between the cards: horizontal on desktop, turned upright when the cards stack.
function Loop() {
  return (
    <div aria-hidden className="relative flex flex-none items-center justify-center py-2 lg:w-[150px] lg:py-0">
      <div className="relative h-[150px] w-[240px] lg:h-[240px] lg:w-[150px]">
        <svg
          width="150"
          height="240"
          viewBox="0 0 150 240"
          className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 max-lg:rotate-90"
        >
          <path d="M0 80 C 50 20, 100 20, 150 80" fill="none" stroke="rgba(201,163,242,.18)" strokeWidth="2" />
          <path className="beam" d="M0 80 C 50 20, 100 20, 150 80" fill="none" stroke="#c9a3f2" strokeWidth="2" strokeLinecap="round" />
          <path d="M150 160 C 100 220, 50 220, 0 160" fill="none" stroke="rgba(201,163,242,.18)" strokeWidth="2" />
          <path className="beam beam-back" d="M150 160 C 100 220, 50 220, 0 160" fill="none" stroke="#9d4edd" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="absolute inset-x-0 top-[18px] text-center text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint max-lg:left-auto max-lg:right-0 max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:text-right">
          Results
        </span>
        <span className="absolute inset-x-0 bottom-[18px] text-center text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint max-lg:bottom-auto max-lg:right-auto max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:text-left">
          Creative
        </span>
      </div>
    </div>
  );
}
