import { baz } from "@/content/baz";

// The torn edge between Inqbex dark and BAZ paper on desktop. On phones the paper sits
// below the headline with a ragged top edge instead (.baz-hero-paper in globals.css).
const tear = "polygon(57% 0, 100% 0, 100% 100%, 43% 100%, 49% 64%, 45.5% 60%, 52% 30%)";

// 01 Hero (BZ-1): a torn line splits the screen. The headline starts in Inqbex type and
// finishes in BAZ capitals; a slow red × turns across the seam.
export function BazHero() {
  const { hero } = baz;
  return (
    <section className="relative isolate overflow-hidden bg-base text-ink lg:min-h-[max(100svh,760px)]">
      <div aria-hidden className="absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute inset-0 bg-paper" style={{ clipPath: tear }} />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgb(19_17_16/0.07)_2px,transparent_2px),linear-gradient(90deg,rgb(19_17_16/0.07)_2px,transparent_2px)] bg-[size:120px_120px]"
          style={{ clipPath: tear }}
        />
        <span className="baz-bob absolute left-[49%] top-[110px] size-[120px] rotate-45 bg-baz-yellow" />
        <span className="absolute right-0 top-[330px] h-[200px] w-[9%] bg-baz-green" />
        <span className="absolute bottom-[-160px] left-[30%] size-[360px] rounded-full border-2 border-baz-red" />
        <span className="absolute bottom-0 right-[7%] h-[90px] w-[240px] bg-baz-blue" />
      </div>
      {/* The slow × sits over the seam; pulled back on phones */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[56%] -z-10 -translate-x-1/2 -translate-y-1/2 font-baz text-[clamp(280px,36vw,520px)] font-black leading-none text-baz-red opacity-[0.16] mix-blend-multiply max-lg:top-[38%] max-lg:opacity-[0.1] max-lg:mix-blend-normal"
      >
        <span className="baz-spin inline-block">×</span>
      </span>

      <div className="relative mx-auto grid min-h-[inherit] w-full max-w-[1440px] grid-cols-1 items-center gap-x-14 px-[var(--gutter)] lg:grid-cols-2">
        <div className="flex max-w-[560px] flex-col gap-[26px] pb-16 pt-36 lg:py-0 lg:pt-10">
          <p className="eyebrow flex items-center gap-3.5">
            <span aria-hidden className="h-px w-8 bg-primary-intense" />
            {hero.eyebrow}
          </p>
          <h1 className="flex flex-col gap-[18px]">
            <span className="text-[clamp(44px,5vw,76px)] leading-[1.03] tracking-[-0.03em]">{hero.lead}</span>
            <span className="font-baz text-[clamp(30px,3.2vw,46px)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-baz-yellow">
              {hero.clash}
            </span>
          </h1>
          <p className="max-w-[46ch] text-lg leading-[1.65] text-ink-muted">{hero.body}</p>
        </div>

        <div
          aria-hidden
          className="baz-hero-paper flex flex-col items-end gap-[18px] text-right max-lg:-mx-[var(--gutter)] max-lg:bg-paper max-lg:px-[var(--gutter)] max-lg:pb-14 max-lg:pt-20 lg:justify-self-end lg:pt-40"
        >
          <span className="font-baz text-[clamp(64px,8vw,128px)] font-black uppercase leading-[0.86] tracking-[-0.05em] text-baz-ink">
            {hero.shout[0]}
            <br />
            {hero.shout[1]}
            <br />
            <span className="text-baz-red">{hero.shout[2]}</span>
            <br />
            <span className="text-baz-blue">{hero.shout[3]}</span>
          </span>
          <span className="font-baz text-xs font-bold uppercase tracking-[0.22em] text-baz-ink">{hero.tag}</span>
        </div>
      </div>
    </section>
  );
}
