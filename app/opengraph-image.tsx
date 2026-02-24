import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Obsidian + Claude Code Workshop - Build Your AI Content System in 60 Minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#08090a",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(234,88,12,0.15)",
              border: "1px solid rgba(234,88,12,0.4)",
              borderRadius: "9999px",
              padding: "6px 16px",
              fontSize: "14px",
              color: "#fb923c",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Free Live Workshop - March 5, 2026
          </div>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            marginBottom: "24px",
          }}
        >
          Obsidian + Claude Code.
          <br />
          <span style={{ color: "#737373" }}>
            Build Your AI Content System.
          </span>
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#a3a3a3",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Turn one idea into a week of content across all your platforms in 60
          minutes.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#f97316" }}>
            shipwithai.com
          </div>
          <div style={{ color: "#525252" }}>|</div>
          <div style={{ fontSize: "16px", color: "#737373" }}>
            Hosted by John Iseghohi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
