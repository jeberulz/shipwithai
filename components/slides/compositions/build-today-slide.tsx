import { useCurrentFrame, interpolate, Easing } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedText, AnimatedBlock } from "../shared/animated-text";
import { colors } from "../shared/constants";

const buildItems = [
  {
    icon: "folder",
    title: "3-folder vault",
    subtitle: "Ideas \u2192 Drafts \u2192 Published",
  },
  {
    icon: "pen",
    title: "Your writing rules",
    subtitle: "VOICE.md",
  },
  {
    icon: "zap",
    title: "One working skill",
    subtitle: "LinkedIn post generator",
  },
  {
    icon: "file",
    title: "One piece of content",
    subtitle: "Created with the system",
  },
];

function CheckIcon({ delay }: { delay: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: `${colors.primary}18`,
        border: `1px solid ${colors.primary}35`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

export function BuildTodaySlide() {
  return (
    <SlideLayout>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* Heading */}
        <AnimatedText
          text="Today you'll build:"
          delay={0}
          duration={20}
          direction="up"
          style={{
            fontSize: 52,
            fontWeight: 700,
            fontFamily: "var(--font-newsreader), Georgia, serif",
            color: colors.white,
          }}
        />

        {/* Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: 1,
          }}
        >
          {buildItems.map((item, i) => {
            const delay = 20 + i * 25;
            return (
              <div
                key={item.title}
                style={{ display: "flex", alignItems: "center", gap: 20 }}
              >
                <CheckIcon delay={delay} />
                <AnimatedBlock delay={delay + 5} duration={18} direction="left">
                  <div
                    style={{
                      padding: "16px 28px",
                      borderRadius: 16,
                      backgroundColor: `${colors.white}05`,
                      border: `1px solid ${colors.white}10`,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: colors.white,
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: 18, color: colors.mutedLight }}>
                      {item.subtitle}
                    </div>
                  </div>
                </AnimatedBlock>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <AnimatedBlock delay={130} duration={20} direction="up">
          <div
            style={{
              fontSize: 20,
              color: colors.muted,
              fontStyle: "italic",
              borderLeft: `3px solid ${colors.border}`,
              paddingLeft: 20,
            }}
          >
            Not my full system. That takes time.
            <br />
            <span style={{ color: colors.accent }}>
              This is your foundation.
            </span>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
