import { useCurrentFrame, interpolate, Easing, Img } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedText, AnimatedBlock } from "../shared/animated-text";
import { colors } from "../shared/constants";

export function TitleSlide() {
  const frame = useCurrentFrame();

  // Profile photo scale animation
  const profileScale = interpolate(frame, [45, 75], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const profileOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
          gap: 32,
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <AnimatedBlock delay={0} duration={18} direction="up">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 100,
              border: `1px solid ${colors.primary}40`,
              backgroundColor: `${colors.primary}15`,
              fontSize: 16,
              color: colors.accent,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: colors.primary,
              }}
            />
            Free Workshop for Content Operators
          </div>
        </AnimatedBlock>

        {/* Main Title */}
        <AnimatedText
          text="Obsidian + Claude Code"
          delay={15}
          duration={25}
          direction="up"
          style={{
            fontSize: 92,
            fontWeight: 700,
            fontFamily: "var(--font-newsreader), Georgia, serif",
            lineHeight: 1.1,
            color: colors.white,
            letterSpacing: "-0.02em",
          }}
        />

        {/* Subtitle */}
        <AnimatedText
          text="for Content Operators"
          delay={35}
          duration={20}
          direction="up"
          style={{
            fontSize: 42,
            color: colors.mutedLight,
            fontWeight: 300,
            marginTop: -12,
          }}
        />

        {/* Tagline */}
        <AnimatedBlock delay={55} duration={20} direction="up">
          <div
            style={{
              fontSize: 24,
              color: colors.primary,
              fontWeight: 500,
              marginTop: 8,
              letterSpacing: "0.02em",
            }}
          >
            60 minutes to a working system
          </div>
        </AnimatedBlock>

        {/* Profile + Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 40,
            opacity: profileOpacity,
            transform: `scale(${profileScale})`,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `3px solid ${colors.primary}`,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Img
              src="/profile.png"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: colors.white,
              }}
            >
              John Iseghohi
            </div>
            <div style={{ fontSize: 16, color: colors.muted }}>
              March 19, 2026
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
