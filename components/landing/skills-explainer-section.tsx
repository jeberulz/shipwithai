import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";

export function SkillsExplainerSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-12">
      {/* Col 1: Text */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-12 py-4">
        <div className="flex border-neutral-200 border-b pb-4 justify-between">
          <span className="text-sm text-black font-medium font-geist">
            Beyond the Chat Window
          </span>
          <div className="flex gap-2 text-neutral-400 text-xs">
            <span className="font-geist">.skills</span>
            <span className="font-geist">Workflows</span>
          </div>
        </div>

        <div>
          <h3 className="text-3xl lg:text-4xl text-neutral-900 leading-[1.1] mb-6 tracking-tighter font-newsreader font-light">
            What are{" "}
            <span className="tracking-tighter font-newsreader font-light text-orange-500">
              .skills
            </span>
            <br />
            <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
              and why should
            </span>
            <br />
            you care?
          </h3>
          <p className="text-lg text-neutral-500 leading-relaxed mb-8 font-normal font-geist">
            A{" "}
            <span className="text-neutral-700 font-medium font-geist">
              .skill
            </span>{" "}
            is a reusable AI workflow you build once and use forever. It
            connects to the tools you already use. It follows your process,
            writes in your voice, and delivers finished output. Not generic AI
            slop. Real work, done your way.
          </p>

          <button className="group flex items-center gap-3 bg-neutral-900 text-white pl-5 pr-2 py-2 rounded-full text-base font-medium hover:bg-neutral-800 transition-all">
            <span className="text-sm font-geist">Explore .skills Library</span>
            <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
              <SolarIcon
                icon="solar:arrow-right-linear"
                className="text-lg"
                width={18}
                height={18}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Col 2: Card Light — Chat Prompt */}
      <div className="lg:col-span-4 relative group cursor-pointer">
        <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-200">
          {/* Content Visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[70%] bg-white rounded-xl shadow-xl border border-neutral-200/50 transform rotate-[-6deg] transition-transform duration-700 group-hover:rotate-0 flex flex-col overflow-hidden">
              <div className="h-8 bg-neutral-50 border-b border-neutral-100 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div className="p-4 space-y-3">
                {/* Chat bubble simulation */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 shrink-0" />
                  <div className="bg-neutral-50 rounded-lg rounded-tl-none p-3 flex-1">
                    <div className="h-2 w-full bg-neutral-200 rounded-full mb-1.5" />
                    <div className="h-2 w-3/4 bg-neutral-200 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="rounded-lg rounded-tr-none p-3 max-w-[75%] bg-orange-50">
                    <div className="h-2 w-full rounded-full mb-1.5 bg-orange-100" />
                    <div className="h-2 w-2/3 rounded-full bg-orange-100" />
                  </div>
                  <div className="w-8 h-8 rounded-full shrink-0 bg-orange-100" />
                </div>
                {/* Rewrite indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <SolarIcon
                    icon="solar:refresh-linear"
                    className="text-neutral-300 text-sm"
                    width={14}
                    height={14}
                  />
                  <div className="h-1.5 w-16 bg-neutral-100 rounded-full" />
                  <div className="h-1.5 w-10 bg-neutral-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-transparent via-transparent to-white/90 absolute inset-0" />

          <div className="absolute top-6 left-6 text-neutral-900">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] text-neutral-500 mb-3 font-medium uppercase tracking-wider font-geist">
              What most designers do
            </span>
            <p className="text-lg tracking-tight font-semibold font-geist">
              Chat Prompt
            </p>
          </div>

          <div className="absolute bottom-6 w-full px-6 flex justify-between items-end text-neutral-900">
            <div>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-[85%] font-normal font-geist">
                You type a question. You get a generic answer. You rewrite it
                anyway. Every. Single. Time.
              </p>
            </div>
            <span className="text-5xl opacity-20 tracking-tighter font-newsreader font-light">
              01
            </span>
          </div>
        </div>
      </div>

      {/* Col 3: Card Dark — .skill Workflow */}
      <div className="lg:col-span-4 relative group cursor-pointer">
        <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden bg-[#111]">
          {/* Workflow Background */}
          <div className="absolute inset-0 opacity-30 p-6">
            <div className="flex flex-col gap-3 pt-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center bg-orange-500/20 border-orange-500/30">
                  <SolarIcon
                    icon="solar:file-text-linear"
                    className="text-sm text-orange-400"
                    width={14}
                    height={14}
                  />
                </div>
                <div className="h-px flex-1 bg-orange-500/20" />
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center bg-orange-500/20 border-orange-500/30">
                  <SolarIcon
                    icon="solar:magic-stick-3-linear"
                    className="text-sm text-orange-400"
                    width={14}
                    height={14}
                  />
                </div>
                <div className="h-px flex-1 bg-orange-500/20" />
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center bg-orange-500/20 border-orange-500/30">
                  <SolarIcon
                    icon="solar:check-circle-linear"
                    className="text-sm text-orange-400"
                    width={14}
                    height={14}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 ml-6 mt-4">
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center bg-orange-500/20 border-orange-500/30">
                  <SolarIcon
                    icon="solar:database-linear"
                    className="text-sm text-orange-400"
                    width={14}
                    height={14}
                  />
                </div>
                <div className="h-px flex-1 bg-orange-500/20" />
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center bg-orange-500/20 border-orange-500/30">
                  <SolarIcon
                    icon="solar:code-linear"
                    className="text-sm text-orange-400"
                    width={14}
                    height={14}
                  />
                </div>
                <div className="h-px flex-1 bg-orange-500/20" />
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center bg-orange-500/20 border-orange-500/30">
                  <SolarIcon
                    icon="solar:rocket-2-linear"
                    className="text-sm text-orange-400"
                    width={14}
                    height={14}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 ml-12 mt-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <SolarIcon
                    icon="solar:document-text-linear"
                    className="text-cyan-400 text-sm"
                    width={14}
                    height={14}
                  />
                </div>
                <div className="h-px flex-1 bg-cyan-500/20" />
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <SolarIcon
                    icon="solar:layers-minimalistic-linear"
                    className="text-cyan-400 text-sm"
                    width={14}
                    height={14}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-black/20 via-black/40 to-black/90 absolute inset-0" />

          <div className="absolute top-6 left-6 text-white z-10">
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] mb-3 font-medium uppercase tracking-wider border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
              What you&apos;ll learn here
            </span>
            <p className="text-lg tracking-tight font-semibold font-geist">
              .skill Workflow
            </p>
          </div>

          <div className="absolute bottom-6 w-full px-6 flex justify-between items-end text-white z-10">
            <div className="max-w-[75%]">
              <p className="text-sm text-neutral-400 leading-relaxed font-normal font-geist">
                You run a workflow. It pulls from your files, follows your
                process, and delivers production-ready output. You approve and
                move on.
              </p>
              <Link
                href="/#sessions"
                className="mt-4 flex items-center gap-2 text-white px-4 py-2 rounded-full text-xs transition font-medium bg-orange-600 hover:bg-orange-500 font-geist w-fit"
              >
                See How It Works
                <SolarIcon
                  icon="solar:arrow-right-linear"
                  className="text-sm"
                  width={14}
                  height={14}
                />
              </Link>
            </div>
            <span className="text-5xl opacity-30 tracking-tighter font-newsreader font-light">
              02
            </span>
          </div>
        </div>

        {/* Navigation Below Grid */}
        <div className="flex justify-end mt-4 gap-3">
          <button className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 transition text-neutral-500 hover:text-neutral-900">
            <SolarIcon
              icon="solar:arrow-left-linear"
              className="text-lg"
              width={18}
              height={18}
            />
          </button>
          <button className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-black transition">
            <SolarIcon
              icon="solar:arrow-right-linear"
              className="text-lg"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>

      {/* Full Width Card: Chained .skills */}
      <div className="lg:col-span-12 relative group cursor-pointer">
        <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#08090a] to-[#111] border border-white/5 p-8 lg:p-10">
          {/* Background glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none bg-orange-600/10" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/10" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            {/* Left: Label + Title */}
            <div className="shrink-0 lg:max-w-md">
              <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] mb-4 font-medium uppercase tracking-wider border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
                Where the real leverage is
              </span>
              <h4 className="text-2xl text-white mb-3 tracking-tighter font-newsreader font-light">
                Chained .skills
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal font-geist">
                One workflow feeds into the next. Research becomes requirements.
                Requirements become specs. Specs become prototypes.
                Automatically.
              </p>
            </div>

            {/* Right: Chain Visualization */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar py-2">
                {/* Step 1 */}
                <div className="shrink-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 min-w-[140px] group-hover:bg-white/[0.06] transition-colors">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-2 bg-orange-500/15 border-orange-500/20">
                    <SolarIcon
                      icon="solar:magnifer-linear"
                      className="text-sm text-orange-400"
                      width={14}
                      height={14}
                    />
                  </div>
                  <p className="text-xs text-white font-medium font-geist">
                    Research
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-geist">
                    Synthesize data
                  </p>
                </div>

                <SolarIcon
                  icon="solar:arrow-right-linear"
                  className="text-neutral-600 shrink-0"
                  width={18}
                  height={18}
                />

                {/* Step 2 */}
                <div className="shrink-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 min-w-[140px] group-hover:bg-white/[0.06] transition-colors">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-2 bg-orange-500/15 border-orange-500/20">
                    <SolarIcon
                      icon="solar:document-text-linear"
                      className="text-sm text-orange-400"
                      width={14}
                      height={14}
                    />
                  </div>
                  <p className="text-xs text-white font-medium font-geist">
                    Requirements
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-geist">
                    Auto-generate PRD
                  </p>
                </div>

                <SolarIcon
                  icon="solar:arrow-right-linear"
                  className="text-neutral-600 shrink-0"
                  width={18}
                  height={18}
                />

                {/* Step 3 */}
                <div className="shrink-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 min-w-[140px] group-hover:bg-white/[0.06] transition-colors">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-2 bg-orange-500/15 border-orange-500/20">
                    <SolarIcon
                      icon="solar:layers-minimalistic-linear"
                      className="text-sm text-orange-400"
                      width={14}
                      height={14}
                    />
                  </div>
                  <p className="text-xs text-white font-medium font-geist">
                    Specs
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-geist">
                    Design tokens &amp; docs
                  </p>
                </div>

                <SolarIcon
                  icon="solar:arrow-right-linear"
                  className="text-neutral-600 shrink-0"
                  width={18}
                  height={18}
                />

                {/* Step 4 */}
                <div className="shrink-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 min-w-[140px] group-hover:bg-white/[0.06] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center mb-2">
                    <SolarIcon
                      icon="solar:code-linear"
                      className="text-cyan-400 text-sm"
                      width={14}
                      height={14}
                    />
                  </div>
                  <p className="text-xs text-white font-medium font-geist">
                    Prototype
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-geist">
                    Working code output
                  </p>
                </div>

                <SolarIcon
                  icon="solar:arrow-right-linear"
                  className="text-neutral-600 shrink-0"
                  width={18}
                  height={18}
                />

                {/* Step 5: Shipped */}
                <div className="shrink-0 border rounded-xl px-4 py-3 min-w-[140px] shadow-[0_0_25px_rgba(99,102,241,0.1)] bg-orange-500/10 border-orange-500/20">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-2 bg-orange-500/20 border-orange-500/30">
                    <SolarIcon
                      icon="solar:rocket-2-linear"
                      className="text-sm text-orange-400"
                      width={14}
                      height={14}
                    />
                  </div>
                  <p className="text-xs text-white font-medium font-geist">
                    Shipped
                  </p>
                  <p className="text-[10px] mt-0.5 text-orange-400 font-geist">
                    Live in production
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent number */}
          <span className="absolute bottom-6 right-8 text-5xl opacity-20 text-white tracking-tighter font-newsreader font-light">
            03
          </span>
        </div>
      </div>
    </section>
  );
}
