export type NavItem = {
  label: string;
  href: string;
};

export type SkillItem = {
  icon: string;
  title: string;
  description: string;
  highlighted?: boolean;
  badge?: string;
};

export type SessionItem = {
  number: number;
  title: string;
  date: string;
  description: string;
  keyOutcome: string;
  week: 1 | 2;
  badge?: string;
  highlighted?: boolean;
};

export type IncludedItem = {
  title: string;
  description: string;
  highlighted?: boolean;
  badge?: string;
};

export type BonusItem = {
  icon: string;
  title: string;
  description: string;
  worth: string;
  highlighted?: boolean;
};

export type AudienceItem = {
  text: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type PricingTier = {
  name: string;
  originalPrice: string;
  earlyBirdPrice: string;
  currency: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
  highlights: string[];
  refundPolicy: string;
};

export type InstructorStat = {
  icon: string;
  label: string;
  value: string;
};

export type Instructor = {
  name: string;
  role: string;
  companies: string[];
  bio: string[];
  quote: string;
  stats: InstructorStat[];
  imageSrc: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  headline: string;
  imageSrc: string;
};
