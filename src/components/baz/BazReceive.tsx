import { baz } from "@/content/baz";
import { cn } from "@/lib/cn";

const tone: Record<string, { card: string; body: string; label: string; mark: string }> = {
  paper: { card: "", body: "text-baz-muted", label: "text-[#6b6565]", mark: "border-baz-ink" },
  yellow: { card: "bg-baz-yellow", body: "text-[#2a2524]", label: "", mark: "border-baz-ink" },
  blue: { card: "bg-baz-blue text-paper", body: "text-[#e4e7ff]", label: "", mark: "border-paper" },
};

// 04 What clients receive (BZ-4): an Inqbex dark panel beside a hard-ruled BAZ grid of
// deliverables, each marked as in every engagement or depending on scope.
export function BazReceive() {
  const { receive: r } = baz;
  return (
    <section className="flex flex-wrap bg-paper text-baz-ink lg:min-h-[900px]">
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[26px] bg-base px-[var(--gutter)] py-[var(--section-y)] text-ink lg:px-16">
        <p className="eyebrow">{r.eyebrow}</p>
        <h2 className="flex flex-col gap-2">
          <span className="font-baz text-[clamp(48px,5vw,80px)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-baz-yellow">
            {r.shout}
          </span>
          <span className="text-[clamp(34px,3.4vw,50px)] leading-[1.05] tracking-[-0.025em]">{r.title}</span>
        </h2>
        <p className="max-w-[38ch] text-[17px] leading-[1.65] text-ink-muted">{r.body}</p>
        <div className="mt-auto flex flex-col gap-3 pt-6 text-sm">
          <span className="flex items-center gap-3">
            <span aria-hidden className="size-3.5 bg-baz-red" />
            Every engagement
          </span>
          <span className="flex items-center gap-3">
            <span aria-hidden className="box-border size-3.5 border-2 border-ink" />
            Depending on scope
          </span>
        </div>
      </div>

      <ul className="grid min-w-0 flex-[2_1_640px] grid-cols-1 border-baz-ink sm:grid-cols-2 lg:border-l-2 xl:grid-cols-3">
        {r.items.map((item) => {
          const t = tone[item.tone];
          return (
            <li key={item.k} className={cn("flex flex-col gap-3.5 border-b-2 border-r-2 border-baz-ink px-[var(--gutter)] py-11 sm:px-10", t.card)}>
              <span className="flex items-center justify-between">
                <span className={cn("font-baz text-xs font-bold tracking-[0.16em]", item.tone === "paper" && "text-baz-red-ink")}>
                  {item.k}
                </span>
                <span
                  aria-hidden
                  className={cn("box-border size-3.5", item.every ? "bg-baz-red" : cn("border-2", t.mark))}
                />
              </span>
              <h3 className="text-2xl leading-[1.2] text-inherit">{item.title}</h3>
              <p className={cn("text-[15px] leading-[1.6]", t.body)}>{item.body}</p>
              <span
                className={cn(
                  "mt-auto font-baz text-[11px] font-bold uppercase tracking-[0.16em]",
                  item.every ? (item.tone === "paper" ? "text-baz-red-ink" : "") : t.label,
                )}
              >
                {item.every ? "Every engagement" : "Depending on scope"}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
