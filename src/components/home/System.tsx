import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

// 03 The Inqbex system: four disciplines in a 2×2 grid around one glowing objective,
// each tile anchored to its outer corner.
export function System() {
  const { system } = home;
  return (
    <section className="section-y">
      <div className="container-site flex flex-wrap items-center gap-16">
        <Reveal className="flex min-w-0 flex-[1_1_360px] flex-col gap-6">
          <p className="eyebrow">{system.eyebrow}</p>
          <h2 className="text-h2">{system.title}</h2>
          <p className="max-w-[46ch] text-lg leading-[1.65] text-ink-muted">{system.body}</p>
          <TextLink href={system.link.href}>{system.link.label}</TextLink>
        </Reveal>

        <Reveal className="relative flex min-w-0 flex-[1.35_1_560px] flex-col sm:block">
          <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-line-strong/60 bg-surface sm:grid-cols-2">
            {system.disciplines.map((d, i) => (
              <div
                key={d.name}
                className={cn(
                  "flex flex-col gap-3 border-line-strong/60 p-8 sm:p-10",
                  i < 2 ? "sm:pb-[150px]" : "sm:pt-[150px]",
                  // Right-hand tiles mirror the left so every tile reads from its outer corner,
                  // clear of the objective ring
                  i % 2 === 1 && "sm:items-end sm:text-right",
                  i % 2 === 0 && "sm:border-r",
                  i < 2 && "border-b",
                  i === 2 && "max-sm:border-b",
                )}
              >
                <h3 className="text-2xl">{d.name}</h3>
                <p className="max-w-[30ch] text-[15px] leading-[1.6] text-ink-muted">{d.body}</p>
              </div>
            ))}
          </div>
          {/* The objective sits at the centre; on phones it leads the list instead */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary-soft/35 sm:block"
          />
          <div className="order-first mx-auto mb-6 flex size-[176px] flex-col items-center justify-center gap-1.5 rounded-full border border-primary-intense bg-[radial-gradient(circle_at_50%_35%,#3a2353,#261732_70%)] p-5 text-center shadow-[0_0_60px_-10px_rgb(157_78_221/0.55)] sm:absolute sm:left-1/2 sm:top-1/2 sm:mb-0 sm:-translate-x-1/2 sm:-translate-y-1/2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-soft">
              {system.centre.kicker}
            </span>
            <span className="font-display text-lg font-semibold leading-tight text-ink-strong">
              {system.centre.label}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

