import { useCurrentFrame, interpolate, Easing } from "remotion";
import { SlideLayout } from "../shared/slide-layout";
import { AnimatedText, AnimatedBlock } from "../shared/animated-text";
import { colors } from "../shared/constants";

const days = [
  {
    label: "MONDAY",
    time: "1-2 hours",
    tasks: ["Run commands", "Create 3-5 pieces"],
    accent: true,
  },
  {
    label: "TUESDAY",
    time: "30 min",
    tasks: ["Edit + schedule"],
    accent: false,
  },
  {
    label: "REST OF WEEK",
    time: "",
    tasks: ["Engage, don't create"],
    accent: false,
  },
];

function TimelineDot({ delay, active }: { delay: number; active: boolean }) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: active ? colors.primary : colors.border,
        border: active ? `3px solid ${colors.accent}` : `3px solid ${colors.muted}`,
        flexShrink: 0,
      }}
    />
  );
}

export function WeeklyRoutineSlide() {
  const frame = useCurrentFrame();

  // Timeline line draw animation
  const lineWidth = interpolate(frame, [15, 55], [0, 100], {
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
        {/* Heading */}
        <AnimatedText
          text="Your weekly routine:"
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

        {/* Timeline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Timeline bar */}
          <div style={{ position: "relative", marginBottom: 48 }}>
            {/* Base line */}
            <div
              style={{
                height: 2,
                backgroundColor: colors.border,
                borderRadius: 1,
                width: "100%",
              }}
            />
            {/* Animated fill */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 2,
                backgroundColor: colors.primary,
                borderRadius: 1,
                width: `${lineWidth}%`,
              }}
            />
          </div>

          {/* Day blocks */}
          <div
            style={{
              display: "flex",
              gap: 32,
            }}
          >
            {days.map((day, i) => {
              const delay = 35 + i * 30;
              return (
                <AnimatedBlock
                  key={day.label}
                  delay={delay}
                  duration={22}
                  direction="up"
                  style={{ flex: 1 }}
                >
                  <div
                    style={{
                      padding: "28px 32px",
                      borderRadius: 20,
                      backgroundColor: day.accent
                        ? `${colors.primary}10`
                        : `${colors.white}05`,
                      border: `1px solid ${
                        day.accent ? `${colors.primary}25` : `${colors.white}10`
                      }`,
                      height: "100%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <TimelineDot delay={delay} active={day.accent} />
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: day.accent ? colors.primary : colors.mutedLight,
                        }}
                      >
                        {day.label}
                      </div>
                    </div>

                    {day.time && (
                      <div
                        style={{
                          fontSize: 16,
                          color: colors.muted,
                          marginBottom: 16,
                          fontWeight: 500,
                        }}
                      >
                        {day.time}
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {day.tasks.map((task) => (
                        <div
                          key={task}
                          style={{
                            fontSize: 22,
                            color: colors.white,
                            fontWeight: 500,
                          }}
                        >
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <AnimatedBlock delay={130} duration={20} direction="up">
          <div
            style={{
              fontSize: 24,
              color: colors.mutedLight,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            The system runs on{" "}
            <span style={{ color: colors.primary, fontWeight: 600, fontStyle: "normal" }}>
              commands
            </span>
            , not willpower.
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
