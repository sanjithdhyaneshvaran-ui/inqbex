import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { parseEnquiry, summaryRows, validateEnquiry, type Enquiry } from "@/lib/enquiry";

// Receives project enquiries from /start-a-project and emails them to the studio.
//
// Environment (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  required in production. Without it, development saves enquiries to
//                   .data/enquiries.jsonl instead, and production answers 503.
//   ENQUIRY_TO      inbox that receives enquiries (default studio@inqbex.in)
//   ENQUIRY_FROM    sender (default Resend's shared onboarding address, which only
//                   delivers to the Resend account's own email until inqbex.in is verified)
//   TURNSTILE_SECRET_KEY  Cloudflare Turnstile secret. When set, every enquiry must carry a
//                   valid bot-check token (the form gets it with NEXT_PUBLIC_TURNSTILE_SITE_KEY).

export const runtime = "nodejs";

const TO = process.env.ENQUIRY_TO || site.email;
const FROM = process.env.ENQUIRY_FROM || "Inqbex website <onboarding@resend.dev>";
const MIN_FILL_MS = 3000; // faster than this is a bot
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort per-IP rate limit (5 requests per 10 minutes). Resets when the serverless
// instance recycles, which is fine as a speed bump alongside the honeypot and timing checks.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries in a short time. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam traps: a hidden field people never see, and a minimum time on the form.
  // Bots get a normal-looking success so they don't learn to adapt.
  const startedAt = Number(body.startedAt);
  if (body.company_url || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = parseEnquiry(body);
  if (!enquiry) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  if (!(await passedBotCheck(body.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "Spam check failed. Please try again." }, { status: 403 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      console.error("[enquiry] RESEND_API_KEY is not set; enquiry not delivered");
      return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
    }
    await saveLocally(enquiry);
    return NextResponse.json({ ok: true, delivered: "local" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: enquiry.email,
      subject: `New enquiry: ${enquiry.name}${enquiry.company ? `, ${enquiry.company}` : ""}`,
      text: emailText(enquiry),
      html: emailHtml(enquiry),
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] Resend rejected the email", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

// Asks Cloudflare whether the Turnstile token is genuine and unused. Skipped until the
// secret is configured, so the form keeps working before the keys are added.
async function passedBotCheck(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const result = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!result.success) console.warn("[enquiry] Turnstile rejected the token", result["error-codes"]);
    return result.success === true;
  } catch (err) {
    console.error("[enquiry] Turnstile verification failed", err);
    return false;
  }
}

async function saveLocally(enquiry: Enquiry) {
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify({ at: new Date().toISOString(), ...enquiry }) + "\n");
  console.log(`[enquiry] No RESEND_API_KEY; saved ${enquiry.name}'s enquiry to .data/enquiries.jsonl`);
}

function emailText(e: Enquiry) {
  return (
    summaryRows(e)
      .map((r) => `${r.k}:\n${r.v}`)
      .join("\n\n") + "\n\nReply to this email to answer the enquirer directly."
  );
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function emailHtml(e: Enquiry) {
  const rows = summaryRows(e)
    .map(
      (r) =>
        `<tr><td style="padding:10px 16px 10px 0;color:#6b6470;vertical-align:top;white-space:nowrap">${escape(r.k)}</td>` +
        `<td style="padding:10px 0;color:#13101a;white-space:pre-line">${escape(r.v)}</td></tr>`,
    )
    .join("");
  return (
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">` +
    `<p style="margin:0 0 16px;font-size:18px;font-weight:bold">New project enquiry from the website</p>` +
    `<table style="border-collapse:collapse">${rows}</table>` +
    `<p style="margin:20px 0 0;color:#6b6470">Reply to this email to answer ${escape(e.name)} directly.</p></div>`
  );
}
