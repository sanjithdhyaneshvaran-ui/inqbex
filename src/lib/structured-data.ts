import { services } from "@/content/services";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

const url = (path: string) => new URL(path, siteUrl).toString();
const orgId = url("/#organization");

// Who Inqbex is, for Google's business details and site name. Shown on the home page.
// Add the LinkedIn company page to sameAs once it exists.
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      alternateName: "Inqbex",
      url: url("/"),
      logo: url("/brand/inqbex-icon.svg"),
      email: site.email,
      description:
        "Inqbex is a growth studio in Chennai and Bengaluru that builds websites, runs Meta ads and makes content around one business goal.",
      areaServed: [
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Bengaluru" },
        { "@type": "Country", name: "India" },
      ],
      contactPoint: site.whatsapp.map((t) => ({
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: t.display.replace(/\s/g, ""),
        areaServed: t.team,
        availableLanguage: ["English"],
      })),
      knowsAbout: ["Performance marketing", "Meta ads", "Social media marketing", "Website design", "Content production"],
      sameAs: [site.social.instagram],
    },
    {
      "@type": "WebSite",
      "@id": url("/#website"),
      name: site.name,
      alternateName: "Inqbex",
      url: url("/"),
      publisher: { "@id": orgId },
      inLanguage: "en-IN",
    },
  ],
};

// The Services page FAQ, marked up so search engines can read the questions and answers.
export const servicesFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: services.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
