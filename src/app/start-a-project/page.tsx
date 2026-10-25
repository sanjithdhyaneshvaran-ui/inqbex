import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EnquiryForm } from "@/components/start/EnquiryForm";
import { OtherRoutes } from "@/components/start/OtherRoutes";
import { StartIntro } from "@/components/start/StartIntro";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us a little about your business, what you're looking to achieve, and where you need help. We'll take it from there.",
};

// Start a project: introduction, the single-page enquiry form, and other ways to connect.
export default function StartProjectPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <StartIntro />
        <EnquiryForm />
        <OtherRoutes />
      </main>
      <SiteFooter />
    </>
  );
}
