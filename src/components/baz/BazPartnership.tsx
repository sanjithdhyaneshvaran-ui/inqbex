import { Reveal } from "@/components/ui/Reveal";
import { baz } from "@/content/baz";
import { cn } from "@/lib/cn";

const tile: Record<string, string> = {
  paper: "bg-paper text-baz-ink",
  yellow: "bg-baz-yellow text-baz-ink",
  blue: "bg-baz-blue text-paper",
  red: "bg-baz-red-deep text-paper",
};

// 02 How the partnership works (BZ-2): the page splits down the middle. Inqbex's half is
// a calm editorial list; BAZ's half is a stack of loud blocks. A red × pins the two together.
export function BazPartnership() {
  const { partnership: p } = baz;
  return (
    <section className="relative bg-base lg:bg-[linear-gradient(90deg,#13101a_50%,#f3f2f2_50%)]">
      <div className="relative mx-auto flex w-full max-w-[calc(var(--container-site)+var(--gutter)*2)] flex-col lg:gap-16 lg:px-[var(--gutter)] lg:pb-[120px] lg:pt-[110px]">
        <div className="grid grid-cols-1 items-end lg:grid-cols-2 lg:gap-x-28">
          <Reveal className="flex flex-col gap-[18px] px-[var(--gutter)] pt-[var(--section-y)] lg:px-0 lg:pt-0">
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 className="text-[clamp(34px,3.6vw,52px)] leading-[1.06] tracking-[-0.025em]">
              {p.title}
              <span className="sr-only"> shared outcome.</span>
            </h2>
          </Reveal>
          <p
            aria-hidden
            className="hidden font-baz text-[clamp(40px,4.6vw,68px)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-baz-ink lg:block"
          >
            {p.shout} <span className="text-baz-red">{p.shoutRed}</span>
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-x-28">
          <div className="flex flex-col gap-[22px] px-[var(--gutter)] pb-16 pt-10 lg:px-0 lg:py-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink/[0.18] pb-[18px]">
              <h3 className="whitespace-nowrap text-[28px]">{p.inqbex.title}</h3>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-soft">{p.inqbex.tag}</span>
            </div>
            <ul className="flex flex-col">
              {p.inqbex.items.map((item, i) => (
                <li
                  key={item.name}
                  className={cn("flex flex-col gap-1.5 py-[18px]", i < p.inqbex.items.length - 1 && "border-b border-ink/10")}
                >
                  <span className="font-display text-[19px] font-semibold text-ink-strong">{item.name}</span>
                  <span className="text-[15px] leading-[1.55] text-ink-muted">{item.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[22px] bg-paper px-[var(--gutter)] py-16 text-baz-ink lg:bg-transparent lg:px-0 lg:py-0">
            <p aria-hidden className="font-baz text-[44px] font-black uppercase leading-[0.9] tracking-[-0.05em] lg:hidden">
              {p.shout} <span className="text-baz-red">{p.shoutRed}</span>
            </p>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-baz-ink pb-[18px]">
              <h3 className="whitespace-nowrap font-baz text-[32px] font-black uppercase tracking-[-0.04em] text-baz-ink">{p.baz.title}</h3>
              <span className="font-baz text-xs font-bold uppercase tracking-[0.16em] text-baz-red-ink">{p.baz.tag}</span>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {p.baz.items.map((item, i) => (
                <li
                  key={item.name}
                  className={cn(
                    "flex flex-col gap-2 border-2 border-baz-ink p-5",
                    tile[item.tone],
                    i === p.baz.items.length - 1 && "col-span-2",
                  )}
                >
                  <span className={cn("font-baz text-[11px] font-bold tracking-[0.16em]", item.tone === "paper" && "text-baz-red-ink")}>
                    {item.n}
                  </span>
                  <span className="font-baz text-[clamp(17px,1.6vw,20px)] font-black uppercase leading-none tracking-[-0.03em]">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-[1.55] text-baz-muted">{p.baz.note}</p>
          </div>

          <div
            aria-hidden
            className="absolute left-1/2 top-[46%] hidden size-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-baz-red font-baz text-[54px] font-black leading-none text-paper shadow-[0_0_0_10px_#13101a,0_0_0_12px_#9d4edd] lg:flex"
          >
            ×
          </div>
        </div>

        <div className="flex justify-center bg-paper px-[var(--gutter)] pb-16 lg:bg-transparent lg:p-0">
          <p className="rounded-full border border-primary-intense bg-primary px-[26px] py-3.5 text-center text-[15px] font-semibold text-ink-strong">
            {p.pill}
          </p>
        </div>
      </div>
    </section>
  );
}
