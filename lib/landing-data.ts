import type {
  AudienceItem,
  BonusItem,
  FaqItem,
  IncludedItem,
  Instructor,
  NavItem,
  PricingTier,
  SessionItem,
  SkillItem,
  Testimonial,
} from "@/types/landing";

export const navItems: NavItem[] = [
  { label: "Curriculum", href: "/#sessions" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export const skillItems: SkillItem[] = [
  {
    icon: "solar:document-text-linear",
    title: "Design Brief Generator",
    description: "Turn messy requirements into structured briefs",
  },
  {
    icon: "solar:user-speak-linear",
    title: "User Interview Analyzer",
    description:
      "Extract themes, pain points, and opportunities from transcripts",
  },
  {
    icon: "solar:chart-square-linear",
    title: "Competitive Audit Generator",
    description: "Structured competitor comparisons, not walls of text",
  },
  {
    icon: "solar:filter-linear",
    title: "Stakeholder Brief Distiller",
    description: "Turn rambling requirements into clear problem statements",
  },
  {
    icon: "solar:clipboard-text-linear",
    title: "PRD Generator",
    description: "Research-to-requirements in your company's format",
  },
  {
    icon: "solar:target-linear",
    title: "Design Criteria Builder",
    description: "Create testable success metrics for your designs",
  },
  {
    icon: "solar:user-check-linear",
    title: "JTBD Extractor",
    description: "Pull Jobs-to-be-Done statements from raw research",
  },
  {
    icon: "solar:notebook-linear",
    title: "Design Decision Logger",
    description: "Document your design rationale as you work",
  },
  {
    icon: "solar:hand-shake-linear",
    title: "Handoff Spec Generator",
    description: "Developer-ready specs from your Figma files",
  },
  {
    icon: "solar:text-field-focus-linear",
    title: "Microcopy Variation Generator",
    description: "UX writing options on demand",
  },
  {
    icon: "solar:accessibility-linear",
    title: "Accessibility Audit Checker",
    description: "Catch accessibility issues before handoff",
  },
  {
    icon: "solar:code-square-linear",
    title: "Prototype Scaffolder",
    description: "Turn designs into working code prototypes",
    highlighted: true,
    badge: "New",
  },
];

export const sessionItems: SessionItem[] = [
  {
    number: 1,
    title: "Your AI Design Setup",
    date: "Monday, Apr 6",
    description:
      "Go from zero to working AI design partner. Set up Claude Desktop with Cowork, connect your tools, configure your design voice, and install your first .skill.",
    keyOutcome:
      "You'll generate a structured design brief from a messy Slack thread in under 3 minutes.",
    week: 1,
  },
  {
    number: 2,
    title: "Research & Discovery on Autopilot",
    date: "Wednesday, Apr 8",
    description:
      "Build .skills that analyze user interview transcripts, run competitive audits, and distill stakeholder briefs into clear problem statements.",
    keyOutcome:
      "You'll synthesize 6 interview transcripts into a research deck in under 10 minutes.",
    week: 1,
  },
  {
    number: 3,
    title: "From Research to Requirements",
    date: "Friday, Apr 10",
    description:
      "Build .skills that turn research outputs into PRDs, design criteria, and Jobs-to-be-Done statements. Learn to chain workflows so the output from one feeds into the next.",
    keyOutcome:
      "You'll generate a complete PRD with acceptance criteria and edge cases from your research.",
    week: 1,
  },
  {
    number: 4,
    title: "Design Documentation That Writes Itself",
    date: "Monday, Apr 13",
    description:
      "Build .skills for design decision logs, developer handoff specs, microcopy variations, and accessibility audits. Connect Figma via MCP for the first time.",
    keyOutcome:
      "You'll generate a complete handoff document from a Figma file in 6 minutes.",
    week: 2,
    badge: "First Figma MCP Connection",
  },
  {
    number: 5,
    title: "Build Working Prototypes Without Code",
    date: "Wednesday, Apr 15",
    description:
      "Use Claude Code and Figma MCP to turn your designs into functional HTML and React prototypes. No coding experience needed. We walk through everything step by step.",
    keyOutcome:
      "You'll build a working interactive prototype from a Figma design in 20 minutes.",
    week: 2,
    badge: "No coding experience needed",
  },
  {
    number: 6,
    title: "Your Personal AI Design System",
    date: "Friday, Apr 17",
    description:
      "Learn the Skill Maker meta-framework to build any .skill from scratch in under 15 minutes. Set up your personal skill library and team sharing.",
    keyOutcome:
      "You'll build a custom .skill from scratch, live, for any task you choose.",
    week: 2,
    badge: "Skill Maker Meta-Framework",
    highlighted: true,
  },
];

export const includedItems: IncludedItem[] = [
  {
    title: "6 Live Sessions",
    description:
      "90 minutes each with live demos, hands-on building, and Q&A",
  },
  {
    title: "Session Recordings",
    description:
      "Lifetime access. Watch, rewatch, and build along at your own pace",
  },
  {
    title: "12 Pre-built .skills",
    description:
      "Production-ready workflows for research, PRDs, specs, prototypes, and more",
  },
  {
    title: "6 Action Guides",
    description: "Downloadable PDF for each session to track your progress",
  },
  {
    title: "The Skill Anatomy Framework",
    description: "Understand how every great .skill is structured",
  },
  {
    title: "The Prompt Lego Method",
    description: "Construct reliable prompts that produce consistent results",
  },
  {
    title: "The Skill Maker",
    description:
      "A meta-skill for building new .skills from scratch in under 15 minutes",
    highlighted: true,
    badge: "Core",
  },
  {
    title: "The Figma-to-Code Guide",
    description:
      "Step-by-step workflow connecting Figma MCP to Claude Code",
    highlighted: true,
    badge: "Core",
  },
];

export const audienceForItems: AudienceItem[] = [
  {
    text: "You're a product designer or PM spending hours on documentation, research synthesis, or specs",
  },
  {
    text: "You've tried AI but it felt like more work than it saved",
  },
  {
    text: "You want to prototype faster without depending on engineering",
  },
  {
    text: "You're a design lead who wants to bring AI workflows to your team",
  },
  {
    text: "You want a structured system, not random prompt tips from Twitter",
  },
];

export const audienceNotForItems: AudienceItem[] = [
  { text: "You're looking for a ChatGPT prompt library" },
  { text: "You want a coding bootcamp" },
  {
    text: "You think AI will replace designers (it won't, but it will replace designers who don't use it)",
  },
  {
    text: "You're not willing to put in 2 weeks of focused practice",
  },
];

export const bonusItems: BonusItem[] = [
  {
    icon: "solar:map-linear",
    title: "The AI Tools Landscape for Designers",
    description:
      "A no-fluff guide to the best AI tools for product designers as of April 2026. Claude, Figma Make, Figma MCP, Weavy AI, Google Stitch, Cursor, v0, and how they fit together.",
    worth: "£79",
  },
  {
    icon: "solar:case-round-linear",
    title: "The Design Portfolio Accelerator .skill",
    description:
      "Takes your raw project notes, screenshots, and outcomes data and generates portfolio-ready case studies. Includes templates for Notion, personal sites, and PDF portfolios.",
    worth: "£149",
  },
  {
    icon: "solar:widget-linear",
    title: "The PM Toolkit: 5 Extra .skills",
    description:
      "Sprint planning assistant, feature prioritization framework, stakeholder update generator, release notes writer, and metrics dashboard summarizer.",
    worth: "£149",
  },
  {
    icon: "solar:pen-linear",
    title: "The Design Voice Lab .skill",
    description:
      "Crystallize your design thinking into a reusable .skill. Claude won't write like a generic designer. It will write like you.",
    worth: "£99",
  },
  {
    icon: "solar:users-group-rounded-linear",
    title: "Private Community Access",
    description:
      "A private community channel for bootcamp members. Share .skills, get feedback, troubleshoot together. Ongoing access after the bootcamp ends.",
    worth: "£197",
    highlighted: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    headline: "I built my MVP in a weekend.",
    name: "Elena R.",
    role: "Product Designer @ Stripe",
    quote:
      "Before this bootcamp, I was stuck in Figma files. Ship With AI gave me the confidence to spin up a Next.js app, hook up a database, and launch on Vercel.",
    imageSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need Claude Max ($100/month)?",
    answer:
      "No. Claude Cowork works on all paid plans, including the $20/month Pro plan. You'll need at least Pro to follow along.",
  },
  {
    id: "faq-2",
    question: "Do I need to know how to code?",
    answer:
      "No. Sessions 1\u20134 and Session 6 are completely no-code. Session 5 introduces Claude Code, but we walk you through everything step by step. You don't need to write or understand code.",
  },
  {
    id: "faq-3",
    question: "Does this work on Windows?",
    answer:
      "Yes. Claude Cowork is available on both Mac and Windows desktop apps. You'll need a laptop or desktop.",
  },
  {
    id: "faq-4",
    question: "I already use AI. Will I learn anything new?",
    answer:
      "If you're copy-pasting prompts into a chat window, yes. This bootcamp teaches you to build reusable, persistent workflows that improve over time. That's a different skill entirely.",
  },
  {
    id: "faq-5",
    question: "Is this live or self-paced?",
    answer:
      "Both. 6 live sessions over 2 weeks plus recordings with lifetime access.",
  },
  {
    id: "faq-6",
    question: "What if I miss a live session?",
    answer:
      "Every session is recorded and uploaded within 24 hours. Lifetime access to all recordings.",
  },
  {
    id: "faq-7",
    question: "What tools do I need?",
    answer:
      "Claude Pro or Max subscription ($20\u2013200/month), Claude Desktop app (free), Figma account (free tier works), and a laptop running macOS 11+ or Windows 10+.",
  },
  {
    id: "faq-8",
    question: "Can my company pay for this?",
    answer:
      "Yes. We provide invoices for expense reports. Many companies cover this under L&D budgets.",
  },
  {
    id: "faq-9",
    question: "Do you have a refund policy?",
    answer:
      "Yes. Complete the first week's assignments. Still not for you? Email within 7 days of the start date for a full refund. No questions asked.",
  },
];

export const instructor: Instructor = {
  name: "John",
  role: "Senior Product Designer",
  companies: ["Amazon", "Booking.com", "Etisalat"],
  bio: [
    "14+ years designing complex products at Amazon, Booking.com, and Etisalat Telecoms. Led the launch of the <strong>Amazon Insurance Store</strong> and the <strong>Global Installment Program</strong>.",
    "Built multiple products using Claude Code and AI-assisted workflows including <strong>useresumate.com</strong>, <strong>ViceCoder</strong>, and <strong>ProductBrainBox</strong>.",
  ],
  quote:
    "\u201CI\u2019m not an AI researcher. I\u2019m a working designer who figured out how to use AI to do better design work, faster. This bootcamp is everything I wish someone had taught me 12 months ago.\u201D",
  stats: [
    {
      icon: "solar:buildings-2-linear",
      label: "Experience",
      value: "14+ Years",
    },
    {
      icon: "solar:rocket-2-linear",
      label: "Products Shipped",
      value: "10 with AI",
    },
    {
      icon: "solar:users-group-rounded-linear",
      label: "Students Taught",
      value: "200+",
    },
  ],
};

export const pricingTier: PricingTier = {
  name: "Cohort Access",
  originalPrice: "£397",
  earlyBirdPrice: "£297",
  currency: "£",
  badge: "Early Bird \u2014 Limited Time",
  ctaLabel: "Join the Bootcamp \u2014 £297",
  ctaHref: "/apply-page",
  highlights: [
    "6 live sessions (90 min each)",
    "Session recordings with lifetime access",
    "12 pre-built .skills",
  ],
  refundPolicy:
    "7-day refund policy. Complete the first week\u2019s assignments. Still not for you? Full refund, no questions.",
};
