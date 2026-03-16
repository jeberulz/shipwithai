import { useCurrentFrame, interpolate, Easing } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedBlock } from "../shared/animated-text";
import { colors } from "../shared/constants";

function ToolBlock({
  title,
  description,
  delay,
  direction,
  icon,
}: {
  title: string;
  description: string;
  delay: number;
  direction: "left" | "right" | "up";
  icon: React.ReactNode;
}) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const dirMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 40 },
  };

  const translateX = interpolate(
    frame,
    [delay, delay + 25],
    [dirMap[direction].x, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const translateY = interpolate(
    frame,
    [delay, delay + 25],
    [dirMap[direction].y, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: 40,
        borderRadius: 24,
        backgroundColor: `${colors.white}06`,
        border: `1px solid ${colors.white}12`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          backgroundColor: `${colors.primary}15`,
          border: `1px solid ${colors.primary}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.white,
          fontFamily: "var(--font-newsreader), Georgia, serif",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 20,
          color: colors.mutedLight,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
}

function ConnectorSymbol({ symbol, delay }: { symbol: string; delay: number }) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [delay, delay + 15], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        fontSize: 48,
        fontWeight: 300,
        color: colors.primary,
        flexShrink: 0,
        width: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {symbol}
    </div>
  );
}

// Inline SVG icons
function VaultIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function CombinedIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

export function ObsidianClaudeSlide() {
  return (
    <SlideLayout>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 48,
        }}
      >
        {/* Top row: Obsidian + Claude */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <ToolBlock
            title="OBSIDIAN"
            description="Local files. One source of truth."
            delay={0}
            direction="left"
            icon={<VaultIcon />}
          />
          <ConnectorSymbol symbol="+" delay={30} />
          <ToolBlock
            title="CLAUDE CODE"
            description="Commands > chat. Repeatable."
            delay={45}
            direction="right"
            icon={<TerminalIcon />}
          />
        </div>

        {/* Equals connector */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ConnectorSymbol symbol="=" delay={90} />
        </div>

        {/* Bottom: Together */}
        <AnimatedBlock delay={105} duration={25} direction="up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "32px 48px",
              borderRadius: 24,
              backgroundColor: `${colors.primary}10`,
              border: `1px solid ${colors.primary}25`,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: `${colors.primary}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CombinedIcon />
            </div>
            <div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.primary,
                  fontFamily: "var(--font-newsreader), Georgia, serif",
                  marginBottom: 8,
                }}
              >
                TOGETHER
              </div>
              <div style={{ fontSize: 20, color: colors.mutedLight, lineHeight: 1.5 }}>
                Claude reads your vault. Your content lives in one place. Your system scales.
              </div>
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
