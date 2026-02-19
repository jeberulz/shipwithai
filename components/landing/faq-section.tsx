"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/landing-data";

export function FaqSection() {
  return (
    <section className="pt-24 pb-24 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl text-neutral-900 tracking-tighter font-newsreader font-light">
            Common Questions
          </h2>
        </div>

        <Accordion className="space-y-3" collapsible type="single">
          {faqItems.map((item) => (
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
