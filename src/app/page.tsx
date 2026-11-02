import type { Metadata } from "next";
import { BazTeaser } from "@/components/home/BazTeaser";
import { Hero } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { StartProject } from "@/components/home/StartProject";
import { System } from "@/components/home/System";
import { Work } from "@/components/home/Work";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeStructuredData } from "@/lib/structured-data";

// Title and description come from the root layout; this sets the main address for Google.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Home, approved Draft 2: hero, proof, the Inqbex system, selected work,
// Inqbex × BAZ and start a project.
export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Proof />
        <System />
        <Work />
        <BazTeaser />
        <StartProject />
      </main>
      <SiteFooter />
    </>
  );
}
