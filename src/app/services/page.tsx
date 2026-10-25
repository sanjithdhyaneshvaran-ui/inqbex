import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FaqSection } from "@/components/services/FaqSection";
import { HowWeWorkSection } from "@/components/services/HowWeWorkSection";
import { IntegratedSection } from "@/components/services/IntegratedSection";
import { PerfContentSection } from "@/components/services/PerfContentSection";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ServicesHero } from "@/components/services/ServicesHero";
import { WebSection } from "@/components/services/WebSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, Meta ads and content, planned around one commercial objective. Take them together as an integrated engagement, or start with the one you need now.",
};

// Services, approved design 1B 2A 3A 4A 5B 6A 7B.
export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ServicesHero />
        <WebSection />
        <PerfContentSection />
        <IntegratedSection />
        <HowWeWorkSection />
        <FaqSection />
        <ServicesCta />
      </main>
      <SiteFooter />
    </>
  );
}
