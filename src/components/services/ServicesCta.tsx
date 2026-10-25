import { MagneticButton } from "@/components/ui/MagneticButton";
import { services } from "@/content/services";
import { primaryCta, whatsappUrl } from "@/content/site";

// 07 Closing CTA (7B, kept minimal): one magnetic button over a single faint outlined line
// of service names drifting slowly, with WhatsApp as a quiet text link.
export function ServicesCta() {
  const { cta } = services;
  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden border-t border-ink/[0.08] md:min-h-[640px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]"
      >
        <div className="marquee-track flex w-max whitespace-nowrap font-display text-[clamp(96px,12vw,168px)] font-semibold leading-none tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgb(231_224_214/0.07)]">
          <span className="pr-20">{cta.marquee}</span>
          <span className="pr-20">{cta.marquee}</span>
        </div>
      </div>

      <div className="container-site flex flex-col items-center gap-[22px] py-20 text-center">
        <h2 className="text-[clamp(36px,4.2vw,60px)] leading-[1.06] tracking-[-0.025em]">{cta.title}</h2>
        <p className="max-w-[480px] text-[17px] leading-[1.6] text-ink-muted">{cta.body}</p>
        <div className="my-6">
          <MagneticButton href={primaryCta.href}>{primaryCta.label}</MagneticButton>
        </div>
        <p className="text-sm text-ink-faint">
          Or{" "}
          <a
            href={whatsappUrl("your services")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            className="text-ink-soft underline underline-offset-4 hover:text-ink-strong"
          >
            message us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
