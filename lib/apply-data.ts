import type {
  RoleOption,
  ApplyFaqItem,
  StatCard,
  SidebarInfoItem,
  DropdownOption,
  RadioCardOption,
  NextStepCard,
} from "@/types/apply";

export const heroStats: StatCard[] = [
  { value: "20", label: "Spots" },
  { value: "6", label: "Sessions" },
  { value: "2", label: "Weeks" },
];

export const roleOptions: RoleOption[] = [
  { id: "product-designer", label: "Product Designer", icon: "solar:pen-new-square-linear" },
  { id: "senior-product-designer", label: "Senior Product Designer", icon: "solar:crown-star-linear" },
  { id: "staff-principal-designer", label: "Staff/Principal Designer", icon: "solar:star-shine-linear" },
  { id: "ux-designer", label: "UX Designer", icon: "solar:pallete-2-linear" },
  { id: "ux-researcher", label: "UX Researcher", icon: "solar:magnifer-linear" },
  { id: "product-manager", label: "Product Manager", icon: "solar:case-minimalistic-linear" },
  { id: "senior-product-manager", label: "Senior Product Manager", icon: "solar:case-round-linear" },
  { id: "design-lead-manager", label: "Design Lead / Manager", icon: "solar:users-group-rounded-linear" },
  { id: "head-of-design", label: "Head of Design", icon: "solar:crown-linear" },
  { id: "freelance-independent", label: "Freelance / Independent", icon: "solar:laptop-minimalistic-linear" },
  { id: "other", label: "Other", icon: "solar:asteroid-linear" },
];

export const yearsOfExperienceOptions: DropdownOption[] = [
  { value: "", label: "Select years of experience..." },
  { value: "1-2", label: "1-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-8", label: "5-8 years" },
  { value: "8-12", label: "8-12 years" },
  { value: "12+", label: "12+ years" },
];

export const claudeExperienceOptions: RadioCardOption[] = [
  { id: "use-regularly", label: "Yes, I use it regularly" },
  { id: "tried-few-times", label: "I\u2019ve tried it a few times" },
  { id: "want-to-learn", label: "No, but I want to learn" },
  { id: "not-heard", label: "I haven\u2019t heard of Claude Cowork" },
];

export const attendanceOptions: RadioCardOption[] = [
  { id: "all-6-live", label: "Yes, I can attend all 6 live" },
  { id: "most-recordings", label: "I can attend most \u2014 I\u2019ll watch recordings for any I miss" },
  { id: "1-2-live", label: "I can only attend 1-2 live, but I\u2019ll complete recordings" },
];

export const nextStepCards: NextStepCard[] = [
  {
    step: "01",
    icon: "solar:document-text-linear",
    title: "We review your application",
    description: "Within 48 hours of submission",
  },
  {
    step: "02",
    icon: "solar:letter-linear",
    title: "You get an email",
    description: "Accepted, waitlisted, or feedback on fit",
  },
  {
    step: "03",
    icon: "solar:rocket-2-linear",
    title: "You\u2019re in",
    description: "Payment link + onboarding guide + community access",
  },
];

export const applyFaqItems: ApplyFaqItem[] = [
  {
    id: "apply-faq-1",
    question: "Is there a fee to apply?",
    answer: "No. The application is free. You only pay after being accepted.",
  },
  {
    id: "apply-faq-2",
    question: "What if I don\u2019t get accepted?",
    answer: "We\u2019ll let you know within 48 hours. If Cohort 1 isn\u2019t the right fit, we\u2019ll offer priority access to Cohort 2.",
  },
  {
    id: "apply-faq-3",
    question: "When will I find out?",
    answer: "Within 48 hours of submitting. Check your email (and spam folder).",
  },
  {
    id: "apply-faq-4",
    question: "I have more questions before applying.",
    answer: "Email hello@shipwithai.com. We respond within 24 hours.",
  },
];

export const sidebarInfo: SidebarInfoItem[] = [
  { icon: "solar:calendar-date-linear", label: "Timeline", value: "April 6 \u2013 17, 2026" },
  { icon: "solar:clock-circle-linear", label: "Commitment", value: "4 hours / week" },
  { icon: "solar:tag-price-linear", label: "Investment", value: "\u00A3297", badge: "Early Bird" },
];
