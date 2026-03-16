import { useCurrentFrame, interpolate, Easing } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedText, AnimatedBlock } from "../shared/animated-text";
import { colors } from "../shared/constants";

const oldWaySteps = [
  "Write from scratch",
  "Copy-paste to 3 platforms",
  "Edit each separately",
];

const newWaySteps = [
  "One rough draft",
  "One command",
  "Three platform-ready outputs",
];

function StepItem({
  text,
  delay,
  type,
  index,
}: {
  text: string;
  delay: number;
  type: "old" | "new";
  index: number;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const translateY = interpolate(frame, [delay, delay + 15], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const isOld = type === "old";
  const iconColor = isOld ? colors.red : colors.primary;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 24px",
        borderRadius: 16,
        backgroundColor: isOld ? `${colors.red}08` : `${colors.primary}08`,
        border: `1px solid ${isOld ? `${colors.red}20` : `${colors.primary}20`}`,
      }}
    >
      {/* Icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isOld ? (
          <>
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="9 12 11.5 14.5 15 9.5" />
          </>
        )}
      </svg>
      <span style={{ fontSize: 24, fontWeight: 500, color: colors.white }}>
        {text}
      </span>
    </div>
  );
}

function ArrowDown({ delay }: { delay: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 10], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        justifyContent: "center",
        padding: "4px 0",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.muted}
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

export function OldVsNewSlide() {
  const frame = useCurrentFrame();

  // Divider line animation
  const dividerHeight = interpolate(frame, [60, 80], [0, 100], {
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
          gap: 48,
        }}
      >
        {/* Two columns */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Old Way */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <AnimatedText
              text="THE OLD WAY"
              delay={0}
              duration={15}
              direction="up"
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: colors.red,
                marginBottom: 24,
                textTransform: "uppercase",
              }}
            />
            {oldWaySteps.map((step, i) => (
              <div key={step}>
                <StepItem
                  text={step}
                  delay={10 + i * 18}
                  type="old"
                  index={i}
                />
                {i < oldWaySteps.length - 1 && (
                  <ArrowDown delay={10 + i * 18 + 8} />
                )}
              </div>
            ))}

            {/* Time result */}
            <AnimatedBlock delay={65} duration={18} direction="up">
              <div
                style={{
                  marginTop: 24,
                  padding: "12px 20px",
                  borderRadius: 12,
                  backgroundColor: `${colors.red}12`,
                  border: `1px solid ${colors.red}30`,
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.red,
                  textAlign: "center",
                }}
              >
                6 hours, 3 pieces
              </div>
            </AnimatedBlock>
          </div>

          {/* Vertical Divider */}
          <div
            style={{
              width: 1,
              height: `${dividerHeight}%`,
              backgroundColor: colors.border,
              flexShrink: 0,
            }}
          />

          {/* New Way */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <AnimatedText
              text="THE NEW WAY"
              delay={75}
              duration={15}
              direction="up"
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: colors.primary,
                marginBottom: 24,
                textTransform: "uppercase",
              }}
            />
            {newWaySteps.map((step, i) => (
              <div key={step}>
                <StepItem
                  text={step}
                  delay={85 + i * 18}
                  type="new"
                  index={i}
                />
                {i < newWaySteps.length - 1 && (
                  <ArrowDown delay={85 + i * 18 + 8} />
                )}
              </div>
            ))}

            {/* Time result */}
            <AnimatedBlock delay={140} duration={18} direction="up">
              <div
                style={{
                  marginTop: 24,
                  padding: "12px 20px",
                  borderRadius: 12,
                  backgroundColor: `${colors.primary}12`,
                  border: `1px solid ${colors.primary}30`,
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                10 minutes, 3 pieces
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
