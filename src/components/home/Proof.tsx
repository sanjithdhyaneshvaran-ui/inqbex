import { home } from "@/content/home";
import { cn } from "@/lib/cn";

// 02 Proof: a slim light strip with four Meta campaign figures.
export function Proof() {
  const { proof } = home;
  return (
    <section id="proof" aria-label={proof.label} className="scroll-mt-20 bg-ink text-[#13101a]">
      <div className="container-site flex flex-col gap-9 pb-11 pt-14">
        <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {proof.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col-reverse gap-2.5 border-base/15 pr-4 sm:pr-7",
                i % 2 === 1 && "border-l pl-4 sm:pl-7",
                i === 2 && "lg:border-l lg:pl-7",
              )}
            >
              <dt className="text-[15px] font-semibold text-[#3a3346]">{stat.label}</dt>
              <dd className="font-display text-stat font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="border-t border-base/15 pt-6 text-[13px] text-[#4a4252]">{proof.note}</p>
      </div>
    </section>
  );
}
