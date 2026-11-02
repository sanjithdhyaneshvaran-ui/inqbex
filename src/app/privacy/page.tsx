import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Inqbex Growth Studio collects when you get in touch, why, who handles it, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

const updated = "1 November 2026";

// Privacy policy written for India's IT Act (2011 data rules) and the Digital Personal Data
// Protection Act 2023. Update it before adding analytics, a Meta Pixel or any new service.
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        {site.name} (&quot;Inqbex&quot;, &quot;we&quot;) is a growth studio with teams in Chennai and Bengaluru, India. This policy covers
        inqbex.in and the ways you can contact us from it. We decide how your details are used, and you can reach us about
        anything in this policy at <Email />.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <ul>
        <li>
          <strong>When you send an enquiry:</strong> your name, email address, mobile number, and anything else you choose to
          add, such as your company, website or Instagram, budget range, timing and project details.
        </li>
        <li>
          <strong>When you message or call us:</strong> the details you share by email, WhatsApp or a booked call.
        </li>
        <li>
          <strong>Basic technical data:</strong> our hosting provider keeps short-lived server logs, including your IP address
          and browser type, to run the site securely. Our spam check reads similar signals to tell people from bots.
        </li>
      </ul>
    ),
  },
  {
    title: "What we don't collect",
    body: (
      <p>
        This site does not use cookies, analytics, advertising pixels or any other tracking. The only thing it stores in your
        browser is a note that you have already seen the opening animation, which stays on your device and is cleared when you
        close the tab.
      </p>
    ),
  },
  {
    title: "Why we use your details",
    body: (
      <p>
        Only to reply to you, discuss your project, and prepare a proposal or quote if you ask for one. We use your details
        because you chose to send them to us for that purpose. We do not sell or rent them, and we do not add you to a
        marketing list. If you become a client, we keep the details we need to run the project and meet our legal and tax
        obligations.
      </p>
    ),
  },
  {
    title: "Who handles your details for us",
    body: (
      <>
        <p>We use a few trusted services to run the site and our communication:</p>
        <ul>
          <li>
            <strong>Vercel</strong> hosts the website.
          </li>
          <li>
            <strong>Resend</strong> delivers enquiry emails to our inbox.
          </li>
          <li>
            <strong>Google Workspace</strong> runs our email.
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong> checks that enquiries come from people, not bots.
          </li>
          <li>
            <strong>WhatsApp (Meta), Calendly and Instagram</strong> handle your details under their own privacy policies when
            you choose to contact us or book a call through them.
          </li>
        </ul>
        <p>Some of these services store data on servers outside India. We only share what each service needs to do its job.</p>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        If your enquiry does not become a project, we delete it within 12 months of our last conversation. Client records are
        kept for as long as the work and Indian tax and legal rules require.
      </p>
    ),
  },
  {
    title: "How we protect it",
    body: (
      <p>
        The site runs only over HTTPS, enquiries go straight to our inbox rather than a public database, and our accounts are
        protected with two-step login. No system is perfectly secure, but if a breach ever affects your details, we will tell
        you and the authorities as the law requires.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask us what details we hold about you, ask us to correct or delete them, or withdraw your permission for us to
        use them. Email <Email /> and we will respond within 30 days. If you are not satisfied with our response, you can
        complain to the Data Protection Board of India.
      </p>
    ),
  },
  {
    title: "Children",
    body: <p>This site is meant for businesses. We don&apos;t knowingly collect details from anyone under 18.</p>,
  },
  {
    title: "Changes to this policy",
    body: <p>If we change how we use your details, we will update this page and the date below.</p>,
  },
];

function Email() {
  return (
    <a href={`mailto:${site.email}`} className="text-primary-soft underline underline-offset-4">
      {site.email}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-[760px] flex-col gap-6 px-[var(--gutter)] pb-24 pt-40">
        <p className="eyebrow">Privacy policy</p>
        <h1 className="text-h2">How we use the details you send us.</h1>
        <p className="text-lead text-ink-muted">
          The short version: we only use your details to reply to you and work on your project. No cookies, no tracking, and
          we never sell your data.
        </p>
        {sections.map((s) => (
          <section key={s.title} className="flex flex-col gap-3 border-t border-ink/10 pt-6 text-ink-muted [&_li]:pl-1 [&_strong]:text-ink [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
            <h2 className="font-display text-[21px] font-semibold text-ink-strong">{s.title}</h2>
            {s.body}
          </section>
        ))}
        <p className="text-sm text-ink-faint">Last updated {updated}.</p>
      </main>
      <SiteFooter />
    </>
  );
}
