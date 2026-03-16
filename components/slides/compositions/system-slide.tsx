import { useCurrentFrame, interpolate, Easing } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { colors } from "../shared/constants";

export function SystemSlide() {
  const frame = useCurrentFrame();

  const lines = [
    { text: "AI tools exist.", start: 0 },
    { text: "But they don't stick.", start: 30 },
    { text: "Why?", start: 55 },
  ];

  // Underline animation for "SYSTEM"
  const underlineWidth = interpolate(frame, [120, 145], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const revealOpacity = interpolate(frame, [100, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const revealY = interpolate(frame, [100, 118], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <SlideLayout>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          textAlign: "center",
        }}
      >
        {/* Opening lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lines.map(({ text, start }) => {
            const opacity = interpolate(
              frame,
              [start, start + 18],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );
            const y = interpolate(
              frame,
              [start, start + 18],
              [20, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );

            return (
              <div
                key={text}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  fontSize: text === "Why?" ? 56 : 48,
                  fontWeight: text === "Why?" ? 700 : 400,
                  color: text === "Why?" ? colors.white : colors.mutedLight,
                  fontFamily:
                    text === "Why?"
                      ? "var(--font-newsreader), Georgia, serif"
                      : "var(--font-geist), system-ui, sans-serif",
                  lineHeight: 1.4,
                }}
              >
                {text}
              </div>
            );
          })}
        </div>

        {/* Spacer */}
        <div style={{ height: 48 }} />

        {/* Reveal: "You need a SYSTEM, not a prompt." */}
        <div
          style={{
            opacity: revealOpacity,
            transform: `translateY(${revealY}px)`,
            fontSize: 64,
            fontWeight: 600,
            fontFamily: "var(--font-newsreader), Georgia, serif",
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: colors.white }}>You need a </span>
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ color: colors.primary, fontWeight: 800 }}>
              SYSTEM
            </span>
            {/* Animated underline */}
            <span
              style={{
                position: "absolute",
                bottom: -4,
                left: 0,
                width: `${underlineWidth}%`,
                height: 4,
                backgroundColor: colors.primary,
                borderRadius: 2,
              }}
            />
          </span>
          <span style={{ color: colors.muted }}>,</span>
          <br />
          <span style={{ color: colors.muted }}>not a </span>
          <span
            style={{
              color: colors.muted,
              textDecoration: "line-through",
              textDecorationColor: `${colors.muted}60`,
            }}
          >
            prompt
          </span>
          <span style={{ color: colors.muted }}>.</span>
        </div>
      </div>
    </SlideLayout>
  );
}
