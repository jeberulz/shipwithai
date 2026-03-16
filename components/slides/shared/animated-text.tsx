import { useCurrentFrame, interpolate, Easing } from "remotion";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
}

export function AnimatedText({
  text,
  delay = 0,
  duration = 20,
  direction = "up",
  className,
  style,
  as: Component = "div",
}: AnimatedTextProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const translateMap = {
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x: startX, y: startY } = translateMap[direction];

  const translateX = interpolate(
    frame,
    [delay, delay + duration],
    [startX, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [startY, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <Component
      className={className}
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        ...style,
      }}
    >
      {text}
    </Component>
  );
}

interface AnimatedBlockProps {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function AnimatedBlock({
  delay = 0,
  duration = 20,
  direction = "up",
  style,
  children,
}: AnimatedBlockProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const translateMap = {
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x: startX, y: startY } = translateMap[direction];

  const translateX = interpolate(
    frame,
    [delay, delay + duration],
    [startX, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [startY, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
