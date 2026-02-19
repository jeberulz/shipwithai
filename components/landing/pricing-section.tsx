import { SolarIcon } from "@/components/ui/solar-icon";
import { TrackableLink } from "@/components/trackable-link";
import { pricingTier } from "@/lib/landing-data";

export function PricingSection() {
  return (
    <section className="lg:p-16 overflow-hidden bg-[#08090a] rounded-[2.5rem] mt-8 p-8 relative shadow-2xl">
      {/* Large Background Text Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none w-full text-center">
        <span className="text-[12rem] lg:text-[18rem] text-white/[0.02] leading-none tracking-tighter font-newsreader font-light">
          JOIN
        </span>
      </div>

      {/* Background glows */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none bg-orange-600/10" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none bg-orange-600/[0.08]" />

      {/* Header Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-6 font-medium border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
          Limited Early Bird Pricing
        </span>
        <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tighter font-newsreader font-light">
          Join the March Bootcamp.
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-md mx-auto leading-relaxed font-normal font-geist">
          One payment. Lifetime access. No subscription.
        </p>
      </div>

      {/* Single Pricing Card */}
      <div className="relative z-10 max-w-lg mx-auto">
        {/* Glow border effect */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-orange-500/40 via-orange-500/10 to-orange-500/30 blur-[2px] pointer-events-none" />
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-orange-500/30 via-orange-500/5 to-orange-500/20 pointer-events-none" />

        <div className="relative flex flex-col p-8 md:p-10 bg-[#0d0e10] border border-white/10 rounded-3xl overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-[80px] pointer-events-none bg-orange-600/15" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-orange-600/10" />

          <div className="relative z-10">
            {/* Pricing */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-lg text-neutral-500 line-through font-geist">
                  {pricingTier.originalPrice}
                </span>
                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border-white/10 bg-white/5 text-neutral-400 font-geist">
                  Full Price
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl text-white tracking-tighter font-newsreader font-light">
                  {pricingTier.earlyBirdPrice}
                </span>
              </div>
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-orange-500/15 border-orange-500/30 text-orange-400 font-geist">
                {pricingTier.badge}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-8" />

            {/* What's included */}
            <div className="mb-8">
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-5 text-center font-geist">
                Everything included
              </p>
              <ul className="space-y-3">
                {pricingTier.highlights.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-neutral-300 font-geist"
                  >
                    <SolarIcon
                      icon="solar:check-circle-linear"
                      className="text-orange-400 shrink-0"
                      width={18}
                      height={18}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <TrackableLink
              href={pricingTier.ctaHref}
              trackEvent="InitiateCheckout"
              trackParams={{ content_name: "Pricing CTA", value: 297, currency: "GBP" }}
              className="w-full text-white py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 font-semibold bg-orange-600 hover:bg-orange-500 font-geist shadow-[0_0_30px_rgba(234,88,12,0.3)]"
            >
              {pricingTier.ctaLabel}
              <SolarIcon
                icon="solar:arrow-right-linear"
                className="text-base"
                width={16}
                height={16}
              />
            </TrackableLink>

            {/* Refund policy */}
            <p className="text-xs text-neutral-500 text-center mt-5 leading-relaxed font-normal max-w-sm mx-auto font-geist">
              {pricingTier.refundPolicy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
