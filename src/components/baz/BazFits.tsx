import { Reveal } from "@/components/ui/Reveal";
import { baz } from "@/content/baz";

const row = "mx-auto flex w-full max-w-[calc(var(--container-site)+var(--gutter)*2)] flex-wrap items-center justify-between gap-x-12 gap-y-4 px-[var(--gutter)]";
const shout = "font-baz text-[clamp(34px,4.6vw,66px)] font-black uppercase leading-[0.9] tracking-[-0.05em]";
const dots = ["text-baz-red", "text-baz-blue", "text-baz-yellow", "text-baz-green"];

// 05 When this model fits (BZ-5): four full-bleed bands, each a different brief and a
// different clash of the two styles, with a strip of content formats running through.
export function BazFits() {
  const { fits } = baz;
  const tape = Array.from({ length: 6 }, () => fits.tape).flat();
  return (
    <section className="bg-base">
      <Reveal className={`${row} items-end pb-12 pt-[var(--section-y)]`}>
        <div className="flex flex-col gap-[18px]">
          <p className="eyebrow">{fits.eyebrow}</p>
          <h2 className="text-[clamp(34px,3.6vw,52px)] leading-[1.06] tracking-[-0.025em]">{fits.title}</h2>
        </div>
        <p className="text-[15px] text-ink-faint">{fits.note}</p>
      </Reveal>

      <ol>
        <li className="relative overflow-hidden bg-baz-red-deep text-paper">
          <div className={`${row} py-[34px]`}>
            <h3 className="flex items-baseline gap-[22px] text-inherit">
              <span className="font-baz text-sm font-bold tracking-[0.16em]">01</span>
              <span className={shout}>Product launches</span>
            </h3>
            <p className="max-w-[380px] text-[16px] leading-[1.55]">
              A fixed date, a lot of content to make, and paid media that has to be ready on day one.
            </p>
          </div>
          <span aria-hidden className="absolute -top-[30px] right-[30%] size-[70px] rotate-45 bg-baz-yellow" />
        </li>

        <li className="relative overflow-hidden bg-paper text-baz-ink">
          <div className={`${row} pb-[22px] pt-[34px]`}>
            <h3 className="flex items-baseline gap-[22px] text-inherit">
              <span className="font-baz text-sm font-bold tracking-[0.16em] text-baz-red-ink">02</span>
              <span className={shout}>Always-on content</span>
            </h3>
            <p className="max-w-[380px] text-[16px] leading-[1.55] text-[#3a3535]">
              Consumer brands that need a steady flow of posts, reels and stories, every week.
            </p>
          </div>
          <div aria-hidden className="overflow-hidden border-t-2 border-baz-ink py-2.5">
            <div className="baz-tape flex w-max gap-7 whitespace-nowrap font-baz text-[13px] font-bold uppercase tracking-[0.2em]">
              {[0, 1].map((half) => (
                <span key={half} className="flex gap-7">
                  {tape.map((t, i) => (
                    <span key={i} className="flex gap-7">
                      <span>{t}</span>
                      <span className={dots[i % dots.length]}>●</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </li>

        <li className="relative overflow-hidden border-t border-primary-intense/40 bg-[#1c1526] text-ink-strong">
          <div className={`${row} py-[38px]`}>
            <h3 className="flex items-baseline gap-[22px]">
              <span className="font-display text-sm font-semibold text-primary-soft">03</span>
              <span className="text-[clamp(30px,3.8vw,54px)] leading-none tracking-[-0.03em]">Paid social creative systems</span>
            </h3>
            <span className="flex items-center gap-5">
              <span aria-hidden className="flex gap-1.5">
                <span className="h-[46px] w-[26px] rounded-md bg-primary-intense" />
                <span className="h-[46px] w-[26px] rounded-md bg-[#6e3a9e]" />
                <span className="h-[46px] w-[26px] rounded-md bg-primary-muted" />
              </span>
              <p className="max-w-[320px] text-[16px] leading-[1.55] text-ink-muted">
                Ad creative made in tested variants, so the account always has something new to learn from.
              </p>
            </span>
          </div>
        </li>

        <li className="relative overflow-hidden bg-baz-blue bg-[linear-gradient(rgb(243_242_242/0.12)_2px,transparent_2px),linear-gradient(90deg,rgb(243_242_242/0.12)_2px,transparent_2px)] bg-[size:60px_60px] text-paper">
          <div className={`${row} pb-10 pt-[34px]`}>
            <h3 className="flex items-baseline gap-[22px] text-inherit">
              <span className="font-baz text-sm font-bold tracking-[0.16em]">04</span>
              <span className={shout}>
                Content with a <span className="text-baz-yellow">business case</span>
              </span>
            </h3>
            <p className="max-w-[380px] text-[16px] leading-[1.55]">
              Brands that need every piece of content tied to a commercial plan, not just a posting schedule.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
}
