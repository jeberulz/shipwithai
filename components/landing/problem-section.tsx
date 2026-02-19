import { SolarIcon } from "@/components/ui/solar-icon";

export function ProblemSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist">
            The Problem
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-16 max-w-4xl leading-[1.05] tracking-tighter font-newsreader font-light">
          You&apos;re Not Slow.{" "}
          <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
            Your Workflow Is.
          </span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <p className="text-lg text-neutral-500 leading-relaxed font-normal font-geist">
              You spend 60% of your week on work that isn&apos;t design.
              Synthesizing research notes. Writing PRDs. Updating tickets.
              Creating presentation decks. Documenting design decisions.
              Reformatting specs for developers. Writing microcopy variations.
            </p>
            <p className="text-lg text-neutral-500 leading-relaxed font-normal font-geist">
              You know AI can help. You&apos;ve tried ChatGPT. Maybe Claude. You
              copied prompts from Twitter threads. You got a mediocre competitor
              audit back and thought:{" "}
              <span className="text-neutral-700 italic font-geist">
                I could have done this faster myself.
              </span>
            </p>
            <div className="pt-4">
              <p className="text-xl md:text-2xl text-neutral-900 leading-snug tracking-tight font-newsreader font-light">
                That&apos;s because chat prompts aren&apos;t workflows.
              </p>
              <div className="mt-4 h-1 w-16 rounded-full bg-orange-500" />
            </div>
          </div>
          <div className="relative group">
            <div className="bg-[#08090a] rounded-[2rem] p-8 lg:p-10 relative overflow-hidden min-h-full">
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/15" />
              <div className="relative z-10">
                <h3 className="text-2xl text-white mb-8 tracking-tight font-newsreader font-light">
                  What if instead&hellip;
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center bg-orange-500/10 border-orange-500/20">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                    <p className="text-[15px] text-neutral-300 leading-relaxed font-geist">
                      Your research synthesis took{" "}
                      <span className="text-white font-medium font-geist">
                        3 minutes
                      </span>
                      , not 3 hours
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center bg-orange-500/10 border-orange-500/20">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                    <p className="text-[15px] text-neutral-300 leading-relaxed font-geist">
                      Your PRDs{" "}
                      <span className="text-white font-medium font-geist">
                        wrote themselves
                      </span>{" "}
                      from your research notes
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center bg-orange-500/10 border-orange-500/20">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                    <p className="text-[15px] text-neutral-300 leading-relaxed font-geist">
                      Your Figma designs turned into{" "}
                      <span className="text-white font-medium font-geist">
                        working prototypes
                      </span>{" "}
                      without code
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center bg-orange-500/10 border-orange-500/20">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                    <p className="text-[15px] text-neutral-300 leading-relaxed font-geist">
                      Every repetitive task you do was saved as a{" "}
                      <span className="text-white font-medium font-geist">
                        reusable workflow
                      </span>{" "}
                      forever
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium flex items-center gap-2 font-geist">
                    <SolarIcon
                      icon="solar:arrow-right-down-linear"
                      className="text-sm text-orange-400"
                    />
                    This is what Ship With AI teaches you to build
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
