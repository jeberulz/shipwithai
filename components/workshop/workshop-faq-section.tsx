"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const workshopFaqItems = [
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
];

export function WorkshopFaqSection() {
  return (
    <section className="pt-24 pb-24 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
            Questions
          </div>
          <h2 className="text-4xl md:text-5xl text-neutral-900 tracking-tighter font-newsreader font-light">
            Frequently asked
          </h2>
        </div>

        <Accordion className="space-y-3" collapsible type="single">
          {workshopFaqItems.map((item) => (
            <AccordionItem
              className="border border-neutral-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 px-6"
              key={item.id}
              value={item.id}
            >
              <AccordionTrigger className="text-[15px] text-neutral-900 font-semibold tracking-tight hover:no-underline font-geist py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-neutral-500 leading-relaxed font-geist pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
