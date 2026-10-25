import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

type Project = (typeof home.work.projects)[number];

// 04 Selected work: four sites in an even 2×2 grid, then a route to the partner work.
export function Work() {
  const { work } = home;
  return (
    <section id="work" className="section-y border-t border-ink/[0.08]">
      <div className="container-site flex flex-col gap-14">
        <Reveal className="flex flex-col gap-5">
          <p className="eyebrow">{work.eyebrow}</p>
          <h2 className="text-h2">{work.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {work.projects.map((p) => (
            <Reveal key={p.name}>
              <WorkCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <MagneticButton href={work.bazLink.href}>{work.bazLink.label}</MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-elevated">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 768px) 620px, 100vw"
          className={cn(
            "object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]",
            project.name === "BRB Holdings" ? "object-center" : "object-top",
          )}
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-base/[0.78] px-3.5 py-[7px] text-xs font-bold uppercase tracking-[0.12em] text-ink sm:left-[18px] sm:top-[18px]">
          <span aria-hidden className="size-1.5 rounded-full bg-primary-soft" />
          {project.tag}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[28px] leading-tight">{project.name}</h3>
        <p className="max-w-[52ch] text-[16px] leading-[1.6] text-ink-muted">{project.summary}</p>
        <p className="text-sm text-ink-faint">
          Our part <span className="ml-2 text-ink">{project.part}</span>
        </p>
      </div>
    </>
  );

  const className = "group flex flex-col gap-6";
  // Only link out where a live site address is confirmed
  return "href" in project ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className, "rounded-3xl focus-visible:outline-offset-[6px]")}
    >
      {body}
    </a>
  ) : (
    <article className={className}>{body}</article>
  );
}
