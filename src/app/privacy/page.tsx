import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false }, // placeholder until Inqbex supplies the final policy
};

// Short interim privacy note so the enquiry form's link resolves. Replace with the
// full policy once Inqbex has one.
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex min-h-[70svh] w-full max-w-[760px] flex-col gap-6 px-[var(--gutter)] pb-24 pt-40">
        <p className="eyebrow">Privacy policy</p>
        <h1 className="text-h2">How we use the details you send us.</h1>
        <p className="text-lead text-ink-muted">
          When you send an enquiry, we use your name,
          contact details and project information only to reply to you and discuss your project. We do not sell
          your details.
        </p>
        <p className="text-ink-muted">
          Questions about your data? Email{" "}
          <a href={`mailto:${site.email}`} className="text-primary-soft underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
