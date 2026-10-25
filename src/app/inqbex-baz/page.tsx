import type { Metadata, Viewport } from "next";
import { BazCta } from "@/components/baz/BazCta";
import { BazFits } from "@/components/baz/BazFits";
import { BazHeader } from "@/components/baz/BazHeader";
import { BazHero } from "@/components/baz/BazHero";
import { BazModel } from "@/components/baz/BazModel";
import { BazPartnership } from "@/components/baz/BazPartnership";
import { BazReceive } from "@/components/baz/BazReceive";
import { BazWork } from "@/components/baz/BazWork";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Inqbex × BAZ",
  description:
    "Inqbex and BAZ work as one team on selected engagements: growth strategy and paid distribution from Inqbex, content production and publishing from BAZ, run from a single plan.",
};

export const viewport: Viewport = { themeColor: "#13101a" };

// Inqbex × BAZ: a deliberate clash of Inqbex's dark editorial style with BAZ's paper,
// Archivo capitals and primary colours. Links into and out of this page use the
// tear transition (see TearTransition).
export default function InqbexBazPage() {
  return (
    <div className="relative">
      <BazHeader />
      <main id="main">
        <BazHero />
        <BazPartnership />
        <BazWork />
        <BazModel />
        <BazReceive />
        <BazFits />
        <BazCta />
      </main>
      <SiteFooter />
    </div>
  );
}
