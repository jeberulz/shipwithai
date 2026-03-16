import { useCurrentFrame, interpolate, Easing } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedText, AnimatedBlock } from "../shared/animated-text";
import { colors } from "../shared/constants";

const takeaways = [
  {
    title: "Starter kit ZIP",
    subtitle: "Download link in chat",
  },
  {
    title: "5 detailed examples",
    subtitle: "See it work",
  },
  {
    title: "Week-by-week expansion guide",
    subtitle: "Where to go next",
  },
  {
    title: "Recording",
    subtitle: "Tomorrow morning",
  },
];

function AnimatedCheck({ delay }: { delay: number }) {
  const frame = useCurrentFrame();

  const pathLength = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const circleOpacity = interpolate(frame, [delay - 3, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: circleOpacity,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: `${colors.primary}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline
          points="20 6 9 17 4 12"
          strokeDasharray="30"
          strokeDashoffset={30 - 30 * pathLength}
        />
      </svg>
    </div>
  );
}

export function TakeawaysSlide() {
  return (
    <SlideLayout>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        {/* Heading */}
        <AnimatedText
          text="What you'll get:"
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

        {/* Takeaway items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: 1,
          }}
        >
          {takeaways.map((item, i) => {
            const delay = 20 + i * 20;
            return (
              <div
                key={item.title}
                style={{ display: "flex", alignItems: "center", gap: 20 }}
              >
                <AnimatedCheck delay={delay} />
                <AnimatedBlock delay={delay + 5} duration={16} direction="left">
                  <div>
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 600,
                        color: colors.white,
                        marginBottom: 2,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: colors.mutedLight,
                      }}
                    >
                      ({item.subtitle})
                    </div>
                  </div>
                </AnimatedBlock>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <AnimatedBlock delay={110} duration={22} direction="up">
          <div
            style={{
              padding: "28px 40px",
              borderRadius: 20,
              background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.accent}10 100%)`,
              border: `1px solid ${colors.primary}30`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: colors.mutedLight,
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              Your Week 1 Challenge:
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: colors.white,
                fontFamily: "var(--font-newsreader), Georgia, serif",
                marginBottom: 12,
              }}
            >
              Ship 3 pieces by March 26th
            </div>
            <div
              style={{
                fontSize: 22,
                color: colors.primary,
                fontWeight: 600,
              }}
            >
              Tag me when you post.
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
