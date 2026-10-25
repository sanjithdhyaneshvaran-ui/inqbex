import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { pages, primaryCta, site, whatsappUrl } from "@/content/site";

const linkClass = "text-ink-muted transition-colors hover:text-ink-strong";
const headingClass = "text-xs font-bold uppercase tracking-[0.2em] text-ink-faint";

// Footer: studio column, the four pages, direct contact and a closing invitation, spread
// across the width so no column floats on its own.
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-14 pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Inqbex Growth Studio, home" className="self-start">
              <Logo variant="lockup" title="Inqbex Growth Studio" className="aspect-[1730/490] h-[68px] w-auto" />
            </Link>
            <p className="max-w-[36ch] text-[15px] leading-[1.6] text-ink-muted">
              Strategy, web, content and paid media around one commercial objective.
              <br />
              {site.locations.join(" · ")}.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-5">
            <p className={headingClass}>Pages</p>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5">
            <p className={headingClass}>Contact</p>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              {/* Each line already names its team, so these skip the chooser */}
              {site.whatsapp.map((t) => (
                <li key={t.team}>
                  <a
                    href={whatsappUrl("the website", t.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-team={t.team}
                    data-track="whatsapp_click"
                    className={linkClass}
                  >
                    WhatsApp {t.team} {t.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram @inqbex.in
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5">
            <p className={headingClass}>Start a project</p>
            <p className="max-w-[30ch] text-[15px] leading-[1.6] text-ink-muted">
              A rough idea, a launch date or a full brief. Tell us what needs to move.
            </p>
            <Button href={primaryCta.href} size="sm">
              {primaryCta.label}
            </Button>
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-sm`}>
                Or book a 30-minute call
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink-faint sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <Link href="/privacy" className="hover:text-ink">
              Privacy policy
            </Link>
          </p>
          <p>
            Content production with{" "}
            <a href={site.partner.website} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              BAZ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
