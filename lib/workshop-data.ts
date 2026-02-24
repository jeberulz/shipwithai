export const WORKSHOP_DETAILS = {
  name: "Obsidian + Claude Code Workshop - Build Your AI Content System",
  description:
    "Free live workshop: Build an AI content system with Obsidian + Claude Code. Turn one idea into a week of content across all your platforms in 60 minutes.",
  startDate: "2026-03-05T18:00:00+00:00",
  endDate: "2026-03-05T19:00:00+00:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  locationName: "Online (Zoom)",
  price: "0",
  currency: "USD",
  organizerName: "Ship With AI",
  instructorName: "John Iseghohi",
  instructorJobTitle: "Senior Product Designer",
  instructorDescription:
    "14+ years designing complex products at Amazon, Booking.com, and Etisalat Telecoms. Built multiple products using Claude Code and AI-assisted workflows.",
  instructorEmployers: ["Amazon", "Booking.com", "Etisalat"],
} as const;

export const WORKSHOP_FAQ_ITEMS = [
  {
    id: "coding",
    question: "Do I need coding experience?",
    answer:
      "No. I don't have any. Everything I'll show you is command-based, not code-based.",
  },
  {
    id: "free",
    question: "Is this actually free?",
    answer:
      "Yes. No credit card. No hidden upsell for 55 minutes. I'll mention a paid course at the end for people who want to go deeper.",
  },
  {
    id: "setup",
    question: "What do I need installed?",
    answer:
      "Obsidian (free) and Claude Code. I'll send setup instructions before the workshop.",
  },
  {
    id: "live",
    question: "What if I can't make it live?",
    answer:
      "Register anyway. I'll send the replay to everyone who signs up.",
  },
  {
    id: "different",
    question: "How is this different from YouTube tutorials?",
    answer:
      "You'll leave with a working system, not just information. We build it together.",
  },
] as const;
