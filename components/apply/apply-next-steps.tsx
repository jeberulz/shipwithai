import { SolarIcon } from "@/components/ui/solar-icon";
import { nextStepCards } from "@/lib/apply-data";

export function ApplyNextSteps() {
  return (
    <section className="lg:p-10 p-8 bg-white border-neutral-200 border rounded-[2.5rem] shadow-sm">
      <h3 className="text-2xl md:text-3xl font-light font-newsreader tracking-tight text-neutral-900 mb-8">
        After you apply
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nextStepCards.map((card) => (
          <div
            key={card.step}
            className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-4 right-5 text-4xl font-light text-neutral-200 font-newsreader select-none">
              {card.step}
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                <SolarIcon
                  icon={card.icon}
                  className="text-orange-500"
                  width={20}
                  height={20}
                />
              </div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 font-geist">
                {card.title}
              </h4>
              <p className="text-xs text-neutral-500 font-geist leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
