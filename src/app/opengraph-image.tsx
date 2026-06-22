import { ImageResponse } from "next/og";
import { BRAND_NAME, BRAND_TAGLINE, THEME_COLOR } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${BRAND_NAME} | ${BRAND_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${THEME_COLOR} 0%, #ff9a5a 100%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
          {BRAND_NAME}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, opacity: 0.95 }}>
          {BRAND_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "12px 32px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.18)",
            fontSize: 24,
          }}
        >
          Order fresh food online — delivered to your door
        </div>
      </div>
    ),
    { ...size }
  );
}
