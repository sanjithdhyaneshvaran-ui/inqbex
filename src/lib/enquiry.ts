// Project enquiry: options, field rules and the email summary. Shared by the form on
// /start-a-project and the /api/enquiry route so both check exactly the same things.

export const serviceOptions = [
  "Website development",
  "Meta ads & performance marketing",
  "Content & creative (Inqbex × BAZ)",
  "Integrated growth",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹2,50,000",
  "₹2,50,000+",
  "Not sure yet — I'd like guidance",
] as const;

export const timingOptions = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring for now"] as const;

export const reachOptions = ["Email", "WhatsApp"] as const;

export type Enquiry = {
  services: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
  site: string;
  budget: string;
  timing: string;
  details: string;
  reach: string;
};

export const emptyEnquiry: Enquiry = {
  services: [],
  name: "",
  email: "",
  phone: "",
  company: "",
  site: "",
  budget: "",
  timing: "",
  details: "",
  reach: "",
};

export type EnquiryErrors = Partial<Record<"services" | "name" | "email" | "phone" | "budget" | "timing", string>>;

const limits = { name: 120, email: 200, phone: 32, company: 160, site: 200, details: 4000 } as const;

export const errorText: Required<EnquiryErrors> = {
  services: 'Choose at least one option, or "Not sure yet".',
  name: "Please add your name.",
  email: "Enter an email address like name@company.com.",
  phone: "Enter a mobile number with at least 10 digits.",
  budget: 'Pick a range, or "Not sure yet" if you\'d like guidance.',
  timing: "Let us know your timing.",
};

const oneOf = (list: readonly string[], v: string) => list.includes(v);

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.services.length === 0 || !e.services.every((s) => oneOf(serviceOptions, s))) errors.services = errorText.services;
  if (!e.name.trim()) errors.name = errorText.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim())) errors.email = errorText.email;
  if (e.phone.replace(/\D/g, "").length < 10) errors.phone = errorText.phone;
  if (!oneOf(budgetOptions, e.budget)) errors.budget = errorText.budget;
  if (!oneOf(timingOptions, e.timing)) errors.timing = errorText.timing;
  return errors;
}

// Coerces an untrusted request body into an Enquiry: strings only, trimmed, length-capped.
export function parseEnquiry(body: unknown): Enquiry | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const str = (k: keyof typeof limits) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, limits[k]) : "");
  const pick = (k: string) => (typeof b[k] === "string" ? (b[k] as string) : "");
  const services = Array.isArray(b.services) ? b.services.filter((s): s is string => typeof s === "string").slice(0, 10) : [];
  const reach = pick("reach");
  return {
    services,
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    company: str("company"),
    site: str("site"),
    budget: pick("budget"),
    timing: pick("timing"),
    details: str("details"),
    reach: oneOf(reachOptions, reach) ? reach : "",
  };
}

export function summaryRows(e: Enquiry): { k: string; v: string }[] {
  const dash = "—";
  return [
    { k: "Help with", v: e.services.join("\n") || dash },
    { k: "Name", v: e.name || dash },
    { k: "Email", v: e.email || dash },
    { k: "Mobile", v: e.phone || dash },
    { k: "Company or brand", v: e.company || dash },
    { k: "Website or Instagram", v: e.site || dash },
    { k: "Investment range", v: e.budget || dash },
    { k: "Start", v: e.timing || dash },
    { k: "What you need", v: e.details || dash },
    { k: "Reach me by", v: e.reach || "Either is fine" },
  ];
}
