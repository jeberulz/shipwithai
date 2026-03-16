import { AbsoluteFill } from "remotion";
import { colors, SLIDE_WIDTH, SLIDE_HEIGHT } from "./constants";

export function SlideLayout({ children }: { children: React.ReactNode }) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dark,
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        color: colors.white,
        overflow: "hidden",
      }}
    >
      {/* Subtle orange gradient glow in top-right corner */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}12 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle glow in bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -300,
          left: -200,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Content area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          padding: 96,
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Bottom branding */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 96,
          fontSize: 14,
          color: colors.muted,
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          letterSpacing: "0.05em",
          zIndex: 2,
        }}
      >
        Obsidian + Claude Code Workshop
      </div>
    </AbsoluteFill>
  );
}
