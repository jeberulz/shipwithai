"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { SolarIcon } from "@/components/ui/solar-icon";
import { applyFaqItems } from "@/lib/apply-data";

export function ApplyFaq() {
  return (
    <section className="lg:p-10 p-8 bg-white border-neutral-200 border rounded-[2.5rem] shadow-sm space-y-6">
      <h3 className="text-2xl font-newsreader font-light tracking-tight text-neutral-900">
        Frequently Asked Questions
      </h3>
      <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
        {applyFaqItems.map((item) => (
          <AccordionPrimitive.Item
            key={item.id}
            value={item.id}
            className="group bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="w-full flex items-center justify-between p-5 text-left cursor-pointer outline-none">
                <span className="text-sm font-semibold text-neutral-900 font-geist">
                  {item.question}
                </span>
                <SolarIcon
                  icon="solar:alt-arrow-down-linear"
                  className="text-neutral-400 transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0"
                  width={16}
                  height={16}
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
              <div className="px-5 pb-5">
                <p className="text-sm text-neutral-500 font-geist">
                  {item.answer}
                </p>
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </section>
  );
}
