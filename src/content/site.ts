// Site-wide contact details and navigation. Content is maintained in code for the first release.

export const site = {
  name: "Inqbex Growth Studio",
  email: "studio@inqbex.in",
  locations: ["Chennai", "Bengaluru"],
  // One number per team for launch; swap when the separate work numbers are ready.
  // WhatsApp buttons link to the first team and open a chooser (see WhatsAppChooser).
  whatsapp: [
    { team: "Chennai", number: "918122938221", display: "+91 81229 38221" }, // digits only for wa.me
    { team: "Bengaluru", number: "918095342658", display: "+91 80953 42658" },
  ],
  // Discovery-call booking page (Calendly or similar). null hides the "Book a call" route.
  bookingUrl: "https://calendly.com/studio-inqbex/30min" as string | null,
  social: {
    instagram: "https://www.instagram.com/inqbex.in/",
  },
  partner: {
    name: "BAZ",
    website: "https://www.thebaz.in/",
    instagram: "https://www.instagram.com/brandarchitechz/",
  },
} as const;

// Launch scope is four pages: Home, Services, Inqbex × BAZ and Start a project.
// The logo links Home and the primary CTA links Start a project.
export const nav = [
  { label: "Services", href: "/services" },
  { label: "Inqbex × BAZ", href: "/inqbex-baz" },
] as const;

export const pages = [
  { label: "Home", href: "/" },
  ...nav,
  { label: "Start a project", href: "/start-a-project" },
] as const;

export const primaryCta = { label: "Start a project", href: "/start-a-project" } as const;

// Prefilled WhatsApp message from the brief, with the page or service filled in.
// Defaults to the first team; the chooser swaps in the team the visitor picks.
export function whatsappUrl(context = "your services", number: string = site.whatsapp[0].number) {
  const text = `Hi Inqbex, I'm enquiring from the website about ${context}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
