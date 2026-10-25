# Inqbex Growth Studio website

Next.js 15, Tailwind 4 and Framer Motion. Four pages: Home, Services, Start a project and Inqbex × BAZ.

```bash
npm run dev
```

Open http://localhost:3000.

## Project enquiries

The form on `/start-a-project` posts to `/api/enquiry`, which emails each enquiry to the studio through [Resend](https://resend.com).
Set these in Vercel (Project → Settings → Environment Variables), or in `.env.local` for local testing:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | In production | Resend API key. Without it, development saves enquiries to `.data/enquiries.jsonl` and production returns an error with the WhatsApp and email fallbacks. |
| `ENQUIRY_TO` | No | Inbox for enquiries. Defaults to studio@inqbex.in. |
| `ENQUIRY_FROM` | No | Sender. Defaults to Resend's shared `onboarding@resend.dev`, which only delivers to the Resend account's own email. Verify inqbex.in in Resend, then set e.g. `Inqbex website <enquiries@inqbex.in>`. |

Spam protection: a hidden honeypot field, a minimum fill time and a per-IP rate limit.

## Domain

Set `NEXT_PUBLIC_SITE_URL` (for example `https://inqbex.in`) once the domain is live. It is used for share images, the sitemap and robots.txt; until then Vercel's production URL is used.

Site-wide contact details, the booking link and navigation live in `src/content/site.ts`.
