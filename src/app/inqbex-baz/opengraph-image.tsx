import { ImageResponse } from "next/og";
import { googleFont } from "@/lib/og/fonts";

export const alt = "Inqbex × BAZ: strategy and distribution, with production built in.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share image for Inqbex × BAZ: the hero's clash, Inqbex dark on the left and BAZ paper
// on the right, split by the torn edge.
export default async function Image() {
  const [sora, archivo] = await Promise.all([googleFont("Sora", 600), googleFont("Archivo", 900)]);
  const fonts = [
    ...(sora ? [{ name: "Sora", data: sora, weight: 600 as const }] : []),
    ...(archivo ? [{ name: "Archivo", data: archivo, weight: 900 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#13101a" }}>
        {/* The torn paper half, drawn as SVG since share images don't support clip-path */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <polygon points="696,0 1200,0 1200,630 528,630 600,391 558,365 636,189" fill="#f3f2f2" />
        </svg>
        <div style={{ position: "absolute", left: 600, top: 70, width: 90, height: 90, background: "#ffc22e", transform: "rotate(45deg)", display: "flex" }} />
        <div style={{ position: "absolute", right: 0, top: 250, width: 90, height: 150, background: "#0f9d58", display: "flex" }} />
        <div style={{ position: "absolute", right: 80, bottom: 0, width: 200, height: 70, background: "#1b34ff", display: "flex" }} />

        <div style={{ position: "absolute", left: 72, top: 72, bottom: 72, width: 520, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Archivo", fontSize: 34, color: "#faf9f6" }}>
            <span style={{ fontFamily: "Sora", fontSize: 30 }}>inqbex</span>
            <span style={{ color: "#ec3013" }}>×</span>
            <span>BAZ.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontFamily: "Sora", fontSize: 64, lineHeight: 1.04, letterSpacing: -2, color: "#faf9f6" }}>
              Strategy and distribution,
            </div>
            <div style={{ display: "flex", fontFamily: "Archivo", fontSize: 44, lineHeight: 0.95, letterSpacing: -1.5, textTransform: "uppercase", color: "#ffc22e" }}>
              with production built in.
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            top: 170,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            fontFamily: "Archivo",
            fontSize: 92,
            lineHeight: 0.86,
            letterSpacing: -4,
            textTransform: "uppercase",
            color: "#131110",
          }}
        >
          <span>Plan</span>
          <span>it quiet.</span>
          <span style={{ color: "#ec3013" }}>Make it</span>
          <span style={{ color: "#1b34ff" }}>loud.</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
