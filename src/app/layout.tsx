import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, Sora } from "next/font/google";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { introScript } from "@/components/intro/intro-script";
import { TearTransition } from "@/components/baz/TearTransition";
import { WhatsAppChooser } from "@/components/layout/WhatsAppChooser";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Sora for headlines, Manrope for everything else (approved Draft 2 type pairing)
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Archivo carries the BAZ voice on the Inqbex × BAZ page only
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Inqbex Growth Studio",
    template: "%s · Inqbex Growth Studio",
  },
  description:
    "Inqbex is an integrated growth studio connecting strategy, web, content and performance marketing around one commercial objective.",
  openGraph: {
    type: "website",
    siteName: "Inqbex Growth Studio",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#13101a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.intro-loader{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-primary-intense px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <IntroProvider>
            {children}
            <TearTransition />
            <WhatsAppChooser />
          </IntroProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
