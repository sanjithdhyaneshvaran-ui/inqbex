import { Button } from "@/components/ui/Button";

// 01 Introduction (approved ST-1): the invitation, with a plain jump to the form and a
// quiet pointer to the other ways in. The magnetic effect lives on the form's submit.
export function StartIntro() {
  return (
    <section className="bg-[radial-gradient(70%_90%_at_80%_0%,#2a1a3a_0%,#13101a_60%)]">
      <div className="mx-auto flex w-full max-w-[calc(var(--container-site)+var(--gutter)*2)] flex-wrap items-end gap-x-20 gap-y-10 px-[var(--gutter)] pb-24 pt-[clamp(150px,18vw,200px)]">
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-[26px]">
          <p className="eyebrow">Let&apos;s work together</p>
          <h1 className="max-w-[15ch] text-[clamp(42px,5.4vw,78px)] leading-[1.05] tracking-[-0.025em]">
            Let&apos;s build something that moves your business forward.
          </h1>
          <p className="text-lead max-w-[540px] text-ink-muted">
            Tell us a little about your business, what you&apos;re looking to achieve, and where you need help.
            We&apos;ll take it from there.
          </p>
        </div>
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3.5 pb-1.5">
          <Button href="#enquiry" size="lg" className="h-[54px] self-start px-7">
            Fill in the form
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </Button>
          <p className="text-sm leading-[1.55] text-ink-faint">
            Not a form person?{" "}
            <a href="#connect" className="text-primary-soft underline underline-offset-4 hover:text-primary-pale">
              WhatsApp, a call or email
            </a>{" "}
            work too.
          </p>
        </div>
      </div>
    </section>
  );
}
