import { ImageResponse } from "next/og";
import { googleFont } from "@/lib/og/fonts";

export const alt = "Inqbex Growth Studio: Growth is a system. Build it like one.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share image for every Inqbex page: the Home headline on the plum ground,
// with the purple tint on the keywords.
export default async function Image() {
  const [sora, manrope] = await Promise.all([googleFont("Sora", 600), googleFont("Manrope", 600)]);
  const fonts = [
    ...(sora ? [{ name: "Sora", data: sora, weight: 600 as const }] : []),
    ...(manrope ? [{ name: "Manrope", data: manrope, weight: 600 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 75% 20%, #3a2353 0%, #261732 30%, #13101a 70%)",
          color: "#faf9f6",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#b9a6cf" }}>
          Inqbex Growth Studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Sora", fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>
          <div style={{ display: "flex" }}>
            Growth is a&nbsp;<span style={{ color: "#c9a3f2" }}>system.</span>
          </div>
          <div style={{ display: "flex" }}>
            Build it like&nbsp;<span style={{ color: "#c9a3f2" }}>one.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#aba196" }}>
          <span>Strategy · Web · Content · Performance</span>
          <span style={{ display: "flex", padding: "14px 28px", borderRadius: 999, background: "#9d4edd", color: "#ffffff" }}>
            Start a project
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
