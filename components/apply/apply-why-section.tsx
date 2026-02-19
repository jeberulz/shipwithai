import { SolarIcon } from "@/components/ui/solar-icon";

const lookForItems = [
  "You work as a product designer, UX designer, or product manager",
  "You have at least 2 years of professional experience",
  "You can commit to 6 live sessions over 2 weeks (Mon/Wed/Fri)",
  "You want to build workflows, not just collect prompts",
];

export function ApplyWhySection() {
  return (
    <section className="lg:p-10 p-8 bg-white border-neutral-200 border rounded-[2.5rem] shadow-sm">
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist mb-6">
          Why Apply?
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight font-newsreader leading-tight">
          Small group.
          <br />
          <span className="text-neutral-400">Better results.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - paragraphs */}
        <div className="space-y-5">
          <p className="text-sm text-neutral-500 leading-relaxed font-geist">
            We cap Cohort 1 at 20 people for a reason. Every session has live
            Q&A. Every participant gets direct feedback. Every .skill you build
            gets reviewed.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed font-geist">
            Open enrollment means 200 people watching a webinar. That&apos;s not
            what this is. This is a working group where you build alongside
            other senior designers and ship real output by the end of week two.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed font-geist">
            The application takes 3 minutes. We&apos;re not looking for a
            perfect resume. We&apos;re looking for people who will actually do
            the work.
          </p>
        </div>

        {/* Right column - dark card */}
        <div className="bg-[#08090a] rounded-[2rem] p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/15" />
          <div className="relative z-10">
            <h3 className="text-xl text-white mb-6 tracking-tight font-newsreader font-light">
              What we look for
            </h3>
            <div className="space-y-5">
              {lookForItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center bg-orange-500/10 border-orange-500/20">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                  </div>
                  <p className="text-[15px] text-neutral-300 leading-relaxed font-geist">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium flex items-center gap-2 font-geist">
                <SolarIcon
                  icon="solar:arrow-right-down-linear"
                  className="text-sm text-orange-400"
                />
                Apply below &mdash; it takes 3 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
