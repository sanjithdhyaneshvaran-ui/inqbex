"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// Cloudflare Turnstile: a free bot check that is invisible for almost every visitor
// (it only shows a checkbox when it is unsure). It hands back a one-time token that
// /api/enquiry verifies with Cloudflare before sending the email.
//
// Set NEXT_PUBLIC_TURNSTILE_SITE_KEY (and TURNSTILE_SECRET_KEY on the server) in Vercel.
// Without the site key the check is skipped and the form works as before.
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function Turnstile({ onToken, onError }: { onToken: (token: string) => void; onError: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  // Keep the latest callbacks without re-rendering the widget
  const cb = useRef({ onToken, onError });
  cb.current = { onToken, onError };

  useEffect(() => {
    if (window.turnstile) setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !box.current || !window.turnstile || widget.current) return;
    widget.current = window.turnstile.render(box.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      appearance: "interaction-only",
      action: "enquiry",
      callback: (t: string) => cb.current.onToken(t),
      "expired-callback": () => cb.current.onToken(""),
      "error-callback": () => cb.current.onError(),
    });
    return () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [ready]);

  if (!turnstileSiteKey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={box} />
    </>
  );
}
