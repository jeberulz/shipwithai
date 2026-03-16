export const SLIDE_FPS = 30;
export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
export const FRAMES_PER_SLIDE = 180; // 6 seconds
export const TRANSITION_FRAMES = 15; // 0.5s cross-fade
export const TOTAL_SLIDES = 7;
export const TOTAL_DURATION =
  FRAMES_PER_SLIDE * TOTAL_SLIDES; // 1260 frames = 42s

export const colors = {
  primary: "#ff6b2c",
  accent: "#ff8a50",
  lightOrange: "#ffad85",
  dark: "#08090a",
  darkAlt: "#111214",
  foreground: "#111827",
  muted: "#6b7280",
  mutedLight: "#9ca3af",
  border: "#1f2937",
  white: "#ffffff",
  red: "#ef4444",
  redMuted: "#991b1b",
  green: "#22c55e",
} as const;
