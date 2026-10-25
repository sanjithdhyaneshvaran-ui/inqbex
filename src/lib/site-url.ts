// Canonical origin for metadata, the sitemap and share images. Set NEXT_PUBLIC_SITE_URL
// once the domain is live; on Vercel the production URL is used automatically until then.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
