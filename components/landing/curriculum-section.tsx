import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";
import { TrackableLink } from "@/components/trackable-link";
import { sessionItems, includedItems } from "@/lib/landing-data";

export function CurriculumSection() {
  const week1Sessions = sessionItems.filter((s) => s.week === 1);
  const week2Sessions = sessionItems.filter((s) => s.week === 2);

  return (
    <section
      id="sessions"
      className="overflow-hidden bg-white/50 border-neutral-200/60 border-b pt-24 pb-24 relative"
    >
      {/* Grain Texture Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light pointer-events-none" />

      <div className="lg:px-8 z-10 max-w-7xl mx-auto px-6 relative">
        {/* ─── Part 1: Curriculum Header ─── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
            The Curriculum
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 max-w-4xl mx-auto leading-[1.05] tracking-tighter font-newsreader font-light">
            6 Sessions. 2 Weeks.{" "}
            <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
              A Complete AI Design System.
            </span>
          </h2>
          <p className="text-lg text-neutral-500 leading-relaxed mt-6 max-w-2xl mx-auto font-normal font-geist">
            Each session builds on the last. By the end, you&apos;ll have a
            library of production-ready .skills and the meta-framework to create
            new ones whenever you need them.
          </p>
        </div>

        {/* ─── Part 2: Stats Bar ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-4xl mx-auto">
          {[
            { value: "6", label: "Live Sessions" },
            { value: "2", label: "Weeks" },
            { value: "12+", label: ".skills Built" },
            { value: "\u221E", label: "Yours Forever" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-neutral-200/60 p-5 text-center shadow-sm"
            >
              <p className="text-2xl font-light text-neutral-900 tracking-tight font-newsreader">
                {stat.value}
              </p>
              <p className="text-xs text-neutral-500 mt-1 font-medium font-geist">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Part 3: Timeline ─── */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200" />

          {/* Week 1 Label */}
          <div className="relative flex items-center justify-start md:justify-center mb-12">
            <div className="relative z-10 inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg font-geist">
              <SolarIcon
                icon="solar:calendar-linear"
                className="text-orange-400"
                width={16}
                height={16}
              />
              Week 1: Foundation
            </div>
          </div>

          {/* Week 1 Sessions */}
          {week1Sessions.map((session) => (
            <SessionCard key={session.number} session={session} />
          ))}

          {/* Week 2 Label */}
          <div className="relative flex items-center justify-start md:justify-center mb-12 mt-4">
            <div className="relative z-10 inline-flex items-center gap-2 bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg font-geist">
              <SolarIcon
                icon="solar:calendar-linear"
                className="text-orange-200"
                width={16}
                height={16}
              />
              Week 2: Production
            </div>
          </div>

          {/* Week 2 Sessions */}
          {week2Sessions.map((session) => (
            <SessionCard key={session.number} session={session} />
          ))}

          {/* Terminal Dot */}
          <div className="relative flex items-center justify-start md:justify-center mt-4 mb-4">
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <SolarIcon
                  icon="solar:check-circle-bold"
                  className="text-white"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-sm font-medium text-neutral-900 font-geist">
                You&apos;re ready to ship.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4 mt-16">
          <TrackableLink
            href="/apply-page"
            trackEvent="InitiateCheckout"
            trackParams={{ content_name: "Curriculum CTA" }}
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 transition-colors text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-lg font-geist"
          >
            Apply for the March Cohort
            <SolarIcon
              icon="solar:arrow-right-linear"
              className="text-white"
              width={16}
              height={16}
            />
          </TrackableLink>
          <Link
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors font-medium underline underline-offset-4 font-geist"
          >
            Download Full Syllabus
          </Link>
        </div>

        {/* ─── Part 4: Everything You Get ─── */}
        <div className="relative mt-32">
          {/* Gradient Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mb-16" />

          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
              What&apos;s Included
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 max-w-4xl mx-auto leading-[1.05] tracking-tighter font-newsreader font-light">
              Everything You Get
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {includedItems.map((item) =>
              item.highlighted ? (
                <div
                  key={item.title}
                  className="bg-neutral-900 rounded-2xl p-6 relative overflow-hidden border border-neutral-800 shadow-lg"
                >
                  {/* Orange glow */}
                  <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none bg-orange-600/20" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                        <SolarIcon
                          icon="solar:check-circle-bold"
                          className="text-orange-400"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-medium text-white font-geist">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded-full font-geist">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed font-geist">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-neutral-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <SolarIcon
                        icon="solar:check-circle-bold"
                        className="text-orange-500"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-neutral-900 font-geist">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed mt-0.5 font-geist">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Bottom Summary */}
          <p className="text-center text-sm text-neutral-400 mt-8 font-medium font-geist">
            8 deliverables &middot; Lifetime access &middot; No subscriptions
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Session Card Sub-Component ─── */

function SessionCard({ session }: { session: (typeof sessionItems)[number] }) {
  const isOdd = session.number % 2 !== 0;
  const isHighlighted = session.highlighted;

  return (
    <div
      className={`relative flex items-start mb-12 ${
        isOdd
          ? "md:justify-start"
          : "md:justify-end"
      }`}
    >
      {/* Timeline Dot */}
      <div
        className={`absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-sm z-10 -translate-x-1/2`}
      />

      {/* Card */}
      <div
        className={`ml-12 md:ml-0 ${
          isOdd
            ? "md:w-1/2 md:pr-12 md:text-right"
            : "md:w-1/2 md:pl-12"
        }`}
      >
        {isHighlighted ? (
          /* Session 6 — Dark / Highlighted Card */
          <div className="bg-neutral-900 border-neutral-800 rounded-2xl shadow-xl p-6 relative overflow-hidden border">
            {/* Orange glow in corner */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none bg-orange-600/20" />
            <div className="relative z-10">
              {/* Badge */}
              <div
                className={`flex items-center gap-2 mb-3 ${
                  isOdd ? "md:justify-end" : ""
                }`}
              >
                <span className="text-xs font-semibold text-orange-400 bg-orange-500/15 px-2.5 py-1 rounded-full font-geist">
                  Session {session.number} &mdash; Finale
                </span>
                <span className="text-[11px] text-neutral-500 font-geist">
                  {session.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl text-white tracking-tight mb-2 font-newsreader font-light">
                {session.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-400 leading-relaxed mb-3 font-geist">
                {session.description}
              </p>

              {/* Badge Tag */}
              {session.badge && (
                <div
                  className={`flex mb-3 ${
                    isOdd ? "md:justify-end" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full font-geist">
                    <SolarIcon
                      icon="solar:star-bold"
                      className="text-orange-400"
                      width={12}
                      height={12}
                    />
                    {session.badge}
                  </span>
                </div>
              )}

              {/* Key Outcome */}
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mt-2">
                <p
                  className={`text-xs uppercase tracking-wider text-orange-400 font-semibold mb-1 font-geist ${
                    isOdd ? "md:text-right" : ""
                  }`}
                >
                  Key Outcome
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed font-geist">
                  {session.keyOutcome}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Regular Session Card */
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Badge */}
            <div
              className={`flex items-center gap-2 mb-3 ${
                isOdd ? "md:justify-end" : ""
              }`}
            >
              <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-full font-geist">
                Session {session.number}
              </span>
              <span className="text-[11px] text-neutral-400 font-geist">
                {session.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl text-neutral-900 tracking-tight mb-2 font-newsreader font-light">
              {session.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-500 leading-relaxed mb-3 font-geist">
              {session.description}
            </p>

            {/* Optional Badge */}
            {session.badge && (
              <div
                className={`flex mb-3 ${
                  isOdd ? "md:justify-end" : ""
                }`}
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-orange-600 bg-orange-50 border border-orange-200/60 px-2.5 py-1 rounded-full font-geist">
                  <SolarIcon
                    icon="solar:star-bold"
                    className="text-orange-500"
                    width={12}
                    height={12}
                  />
                  {session.badge}
                </span>
              </div>
            )}

            {/* Key Outcome */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/40 rounded-xl p-4 mt-2">
              <p
                className={`text-xs uppercase tracking-wider text-orange-600 font-semibold mb-1 font-geist ${
                  isOdd ? "md:text-right" : ""
                }`}
              >
                Key Outcome
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed font-geist">
                {session.keyOutcome}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
