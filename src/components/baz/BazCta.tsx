import { MagneticButton } from "@/components/ui/MagneticButton";
import { baz } from "@/content/baz";
import { primaryCta } from "@/content/site";

// The Home magnetize button with BAZ colours mixed into the particles
const bazPalette = ["#faf9f6", "#ec3013", "#ffc22e", "#1b34ff", "#c9a3f2"];

// 07 Closing CTA (BZ-7): "Discuss an INQBEX × BAZ engagement" over a huge outlined ×.
export function BazCta() {
  const { cta } = baz;
  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-base md:min-h-[640px]">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-[54%] font-baz text-[clamp(480px,62vw,900px)] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgb(236_48_19/0.22)]"
      >
        ×
      </span>
      <span aria-hidden className="absolute left-[9%] top-[18%] -z-10 size-[54px] rotate-45 bg-baz-yellow" />
      <span aria-hidden className="absolute bottom-[14%] right-0 -z-10 h-3.5 w-[120px] bg-baz-blue" />

      <div className="container-site flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="flex flex-col items-center gap-2.5">
          <span className="text-[clamp(32px,3.6vw,52px)] leading-[1.05] tracking-[-0.025em]">{cta.lead}</span>
          <span className="font-baz text-[clamp(50px,7vw,112px)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-paper">
            Inqbex <span className="text-baz-red">×</span> BAZ
          </span>
          <span className="text-[clamp(32px,3.6vw,52px)] leading-[1.05] tracking-[-0.025em]">{cta.tail}</span>
        </h2>
        <p className="max-w-[460px] text-[17px] leading-[1.6] text-ink-muted">{cta.body}</p>
        <div className="my-6">
          <MagneticButton href={primaryCta.href} palette={bazPalette} buttonClassName="h-[60px] px-9">
            {primaryCta.label}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
