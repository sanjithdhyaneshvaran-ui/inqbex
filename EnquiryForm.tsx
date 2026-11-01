"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, buttonClass } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Turnstile, turnstileSiteKey } from "@/components/start/Turnstile";
import { site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  budgetOptions,
  emptyEnquiry,
  reachOptions,
  serviceOptions,
  summaryRows,
  timingOptions,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";

type Mode = "form" | "preview" | "sending" | "sent";

// 02 Project enquiry (approved ST-2): every question on one page, inline messages for
// missing answers, a preview the visitor can edit, then a real submission to /api/enquiry.
export function EnquiryForm() {
  const [mode, setMode] = useState<Mode>("form");
  const [data, setData] = useState<Enquiry>(emptyEnquiry);
  const [tried, setTried] = useState(false);
  const [failed, setFailed] = useState(false);
  const [trap, setTrap] = useState("");
  // Spam check token from Cloudflare Turnstile; single use, so the widget restarts after a failed send
  const [botToken, setBotToken] = useState("");
  const [botCheck, setBotCheck] = useState(0);
  const startedAt = useRef(0);
  const card = useRef<HTMLDivElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Bring the new step into view and move focus to its heading for screen readers.
  // Skipped on first render so the page doesn't grab focus on load.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (mode === "sending") return;
    stepHeading.current?.focus({ preventScroll: true });
    if (mode !== "form") card.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mode]);

  const errors: EnquiryErrors = tried ? validateEnquiry(data) : {};
  const set = <K extends keyof Enquiry>(k: K, v: Enquiry[K]) => setData((d) => ({ ...d, [k]: v }));
  const toggleService = (s: string) =>
    setData((d) => ({ ...d, services: d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s] }));

  const preview = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(data);
    if (Object.keys(found).length === 0) {
      setMode("preview");
      return;
    }
    setTried(true);
    // Focus the first question that still needs an answer
    requestAnimationFrame(() => {
      card.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"] input')?.focus();
    });
  };

  const submit = async () => {
    setMode("sending");
    setFailed(false);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current, company_url: trap, turnstileToken: botToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setMode("sent");
        return;
      }
      if (res.status === 422) {
        setTried(true);
        setMode("form");
        return;
      }
      throw new Error("send failed");
    } catch {
      setFailed(true);
      setMode("preview");
      setBotToken("");
      setBotCheck((n) => n + 1);
    }
  };

  const reset = () => {
    setData(emptyEnquiry);
    setTried(false);
    setFailed(false);
    startedAt.current = Date.now();
    setMode("form");
  };

  const waitingForBotCheck = !!turnstileSiteKey && !botToken && !failed;
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  const replyBy = data.reach === "WhatsApp" ? "on WhatsApp" : data.reach === "Email" ? "by email" : "through the details you gave";

  return (
    <section id="enquiry" className="scroll-mt-24 pb-[var(--section-y)] pt-10">
      <div className="mx-auto w-full max-w-[1120px] px-[var(--gutter)]">
        <div
          ref={card}
          className="flex scroll-mt-24 flex-col gap-12 rounded-[32px] border border-ink/10 bg-surface p-[clamp(22px,4vw,64px)]"
        >
          <div className="flex flex-col gap-3.5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-label">Inqbex / Project enquiry</p>
            <h2 className="text-[clamp(30px,3.4vw,46px)] leading-[1.1] tracking-[-0.02em]">Tell us about your project.</h2>
            <p className="text-[16px] text-ink-muted">
              Takes around 2 minutes. Fields marked <span className="text-primary-pale">*</span> are required.
            </p>
          </div>

          {mode === "form" && (
            <form noValidate onSubmit={preview} aria-label="Project enquiry" className="flex flex-col">
              <h3 ref={stepHeading} tabIndex={-1} className="sr-only">
                Your answers
              </h3>

              {/* Hidden from people; bots that fill every field get caught */}
              <div aria-hidden className="absolute -left-[10000px] size-px overflow-hidden">
                <label>
                  Leave this empty
                  <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                </label>
              </div>

              <Group n="01" title="What can we help you with?" required hint="Select all that apply." as="fieldset">
                <div data-invalid={!!errors.services} className="flex flex-wrap gap-2.5">
                  {serviceOptions.map((s) => {
                    const on = data.services.includes(s);
                    return (
                      <label key={s} className={cn(optionClass(on), "min-h-12 rounded-[18px] px-[18px] py-2 sm:rounded-full")}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          name="services"
                          value={s}
                          checked={on}
                          onChange={() => toggleService(s)}
                          aria-invalid={!!errors.services}
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "inline-flex size-[18px] flex-none items-center justify-center rounded-md border text-xs text-ink-strong",
                            on ? "border-primary-intense bg-primary-intense" : "border-ink/40",
                          )}
                        >
                          {on && "✓"}
                        </span>
                        {s}
                      </label>
                    );
                  })}
                </div>
                <FieldError text={errors.services} />
              </Group>

              <Group n="02" title="A little about you" as="fieldset">
                <div className="grid grid-cols-1 gap-x-5 gap-y-[18px] sm:grid-cols-2">
                  <Field id="name" label="Name" required error={errors.name}>
                    <input id="name" type="text" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass(!!errors.name)} />
                  </Field>
                  <Field id="email" label="Email" required error={errors.email}>
                    <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass(!!errors.email)} />
                  </Field>
                  <Field id="phone" label="Mobile number" required error={errors.phone}>
                    <input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" value={data.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={inputClass(!!errors.phone)} />
                  </Field>
                  <Field id="company" label="Company or brand">
                    <input id="company" type="text" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} className={inputClass(false)} />
                  </Field>
                  <Field id="site" label="Website or Instagram" className="sm:col-span-2">
                    <input id="site" type="text" placeholder="yourbrand.com or @yourbrand" value={data.site} onChange={(e) => set("site", e.target.value)} className={inputClass(false)} />
                  </Field>
                </div>
              </Group>

              <Group n="03" title="The project">
                <div className="flex flex-col gap-[30px]">
                  <Choice
                    legend="What investment range have you planned?"
                    name="budget"
                    options={budgetOptions}
                    value={data.budget}
                    onChange={(v) => set("budget", v)}
                    error={errors.budget}
                    layout="grid"
                  />
                  <Choice
                    legend="When would you like to get started?"
                    name="timing"
                    options={timingOptions}
                    value={data.timing}
                    onChange={(v) => set("timing", v)}
                    error={errors.timing}
                    layout="pills"
                  />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="details" className="text-[15px] font-semibold text-ink">
                      Tell us a little about what you need
                    </label>
                    <textarea
                      id="details"
                      rows={5}
                      placeholder="What needs to change, what you've tried so far, any dates we should know about."
                      value={data.details}
                      onChange={(e) => set("details", e.target.value)}
                      className={cn(inputClass(false), "h-[150px] resize-y py-3.5 leading-[1.6]")}
                    />
                  </div>
                </div>
              </Group>

              <Group n="04" title="How should we reach you?" as="fieldset">
                <div className="flex flex-wrap gap-2.5">
                  {reachOptions.map((o) => {
                    const on = data.reach === o;
                    return (
                      <label key={o} className={cn(optionClass(on), "min-h-[52px] flex-[1_1_200px] rounded-[14px] px-[22px]")}>
                        <input type="radio" className="sr-only" name="reach" value={o} checked={on} onChange={() => set("reach", o)} />
                        <Ring on={on} />
                        {o}
                      </label>
                    );
                  })}
                </div>
              </Group>

              <div className="flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-9">
                <p className="max-w-[520px] text-[13px] leading-[1.6] text-ink-faint">
                  We use these details only to reply to your enquiry, as described in our{" "}
                  <Link href="/privacy" className="text-primary-soft underline underline-offset-[3px] hover:text-primary-pale">
                    privacy policy
                  </Link>
                  .
                </p>
                <MagneticButton type="submit" buttonClassName="h-14 px-[30px]">
                  Preview my enquiry
                </MagneticButton>
              </div>
              {tried && Object.keys(errors).length > 0 && (
                <p role="alert" className="mt-4 text-right text-sm text-[#f2a7ae]">
                  A few required answers are missing. They&apos;re marked above.
                </p>
              )}
            </form>
          )}

          {(mode === "preview" || mode === "sending") && (
            <div className="flex flex-col gap-7 border-t border-ink/10 pt-9">
              <div className="flex flex-col gap-2">
                <h3 ref={stepHeading} tabIndex={-1} className="text-2xl outline-none">
                  Check your enquiry
                </h3>
                <p className="text-[15px] text-ink-muted">This is what we&apos;ll receive. Edit anything before you send it.</p>
              </div>
              <dl className="grid grid-cols-1 border-t border-ink/10 sm:grid-cols-[minmax(160px,1fr)_minmax(0,2.4fr)]">
                {summaryRows(data).map((r) => (
                  <div key={r.k} className="contents">
                    <dt className="pt-4 text-sm font-semibold text-ink-faint sm:border-b sm:border-ink/10 sm:py-4 sm:pr-4">{r.k}</dt>
                    <dd className="whitespace-pre-line border-b border-ink/10 pb-4 pt-1 text-[15px] leading-[1.55] text-ink-strong [overflow-wrap:anywhere] sm:py-4">
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>
              {failed && (
                <p role="alert" className="rounded-2xl border border-[#e0707c]/50 bg-[#e0707c]/10 px-5 py-4 text-[15px] leading-[1.55] text-[#f2c4c9]">
                  We couldn&apos;t send your enquiry just now. Please try again, or reach us on{" "}
                  <a href={whatsappUrl("a new project")} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    WhatsApp
                  </a>{" "}
                  or at{" "}
                  <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                    {site.email}
                  </a>
                  .
                </p>
              )}
              <Turnstile key={botCheck} onToken={setBotToken} onError={() => setFailed(true)} />
              <div className="flex flex-wrap justify-between gap-3.5">
                <button type="button" onClick={() => setMode("form")} disabled={mode === "sending"} className={cn(buttonClass({ variant: "outline", size: "md" }), "h-[54px] px-[26px] disabled:opacity-50")}>
                  Edit my answers
                </button>
                <button type="button" onClick={submit} disabled={mode === "sending" || waitingForBotCheck} aria-busy={mode === "sending" || waitingForBotCheck} className={cn(buttonClass({ size: "lg" }), "h-14 px-[30px] disabled:opacity-70")}>
                  {mode === "sending" ? "Sending…" : waitingForBotCheck ? "Checking…" : "Submit enquiry"}
                  {mode !== "sending" && !waitingForBotCheck && <ArrowIcon />}
                </button>
              </div>
            </div>
          )}

          {mode === "sent" && (
            <div role="status" className="flex flex-col items-start gap-4 border-t border-ink/10 pt-10">
              <span aria-hidden className="inline-flex size-14 items-center justify-center rounded-full border border-primary-intense bg-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2cff7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              <h3 ref={stepHeading} tabIndex={-1} className="text-[28px] outline-none">
                Thanks, {firstName}. Your enquiry is with us.
              </h3>
              <p className="max-w-[560px] text-[16px] leading-[1.6] text-ink-muted">We&apos;ll review it and reply {replyBy}.</p>
              <button type="button" onClick={reset} className={cn(buttonClass({ variant: "outline", size: "md" }), "mt-2 h-[50px] px-6")}>
                Start another enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Group({
  n,
  title,
  required,
  hint,
  as = "div",
  children,
}: {
  n: string;
  title: string;
  required?: boolean;
  hint?: string;
  as?: "div" | "fieldset";
  children: React.ReactNode;
}) {
  const Tag = as;
  const Title = as === "fieldset" ? "legend" : "h3";
  return (
    <Tag className="m-0 flex flex-col gap-5 border-0 border-t border-ink/10 p-0 py-9 md:flex-row md:gap-12">
      <div className="flex flex-col gap-2 md:w-[30%] md:flex-none">
        <span className="font-display text-sm font-semibold text-primary-soft">{n}</span>
        <Title className="float-left p-0 font-display text-[21px] font-semibold leading-[1.3] text-ink-strong">
          {title} {required && <span className="text-primary-pale">*</span>}
        </Title>
        {hint && <span className="clear-both text-sm text-ink-faint">{hint}</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">{children}</div>
    </Tag>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-primary-pale">*</span>}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-[13px] text-[#f2a7ae]">
          {error}
        </span>
      )}
    </div>
  );
}

function Choice({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  layout,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  layout: "grid" | "pills";
}) {
  return (
    <fieldset data-invalid={!!error} className="m-0 flex flex-col gap-3 border-0 p-0">
      <legend className="p-0 pb-3 text-[15px] font-semibold text-ink">
        {legend} <span className="text-primary-pale">*</span>
      </legend>
      <div className={layout === "grid" ? "grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-3" : "flex flex-wrap gap-2.5"}>
        {options.map((o) => {
          const on = value === o;
          return (
            <label
              key={o}
              className={cn(optionClass(on), layout === "grid" ? "min-h-[50px] rounded-xl px-4" : "min-h-12 rounded-full px-5")}
            >
              <input type="radio" className="sr-only" name={name} value={o} checked={on} onChange={() => onChange(o)} />
              {layout === "grid" && <Ring on={on} />}
              {o}
            </label>
          );
        })}
      </div>
      <FieldError text={error} />
    </fieldset>
  );
}

function Ring({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "box-border size-4 flex-none rounded-full",
        on ? "border-[5px] border-primary-intense" : "border-[1.5px] border-ink/40",
      )}
    />
  );
}

function FieldError({ text }: { text?: string }) {
  return text ? <p className="text-sm text-[#f2a7ae]">{text}</p> : null;
}

const optionClass = (on: boolean) =>
  cn(
    "relative inline-flex cursor-pointer items-center gap-2.5 border text-[15px] font-semibold transition-colors duration-200",
    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-ink-strong",
    on ? "border-primary-intense bg-primary-intense/[0.22] text-ink-strong" : "border-ink/[0.18] bg-[#17121f] text-ink-soft hover:border-primary-soft/70",
  );

const inputClass = (bad: boolean) =>
  cn(
    "box-border h-[54px] w-full rounded-xl border bg-[#17121f] px-4 text-[16px] font-medium text-ink-strong transition-[border-color,box-shadow] duration-200",
    "placeholder:text-[#6f675f] focus:border-primary-intense focus:shadow-[0_0_0_3px_rgb(157_78_221/0.28)] focus:outline-none",
    bad ? "border-[#e0707c]" : "border-ink/[0.16]",
  );
