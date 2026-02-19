import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";
import { TrackableLink } from "@/components/trackable-link";

export function FooterCtaSection() {
  return (
    <footer className="mt-8 w-full bg-[#050505] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-white/5">
      {/* Background glow effect */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3 bg-orange-600/10" />

      {/* CTA Section */}
      <div className="pt-24 pb-16 px-8 text-center relative z-10">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border shadow-[0_0_40px_rgba(234,88,12,0.15)] backdrop-blur-sm bg-orange-900/20 border-orange-500/20">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center border bg-orange-500/10 border-orange-500/30">
            <SolarIcon
              icon="solar:rocket-2-linear"
              className="text-2xl drop-shadow-[0_0_8px_rgba(234,88,12,0.5)] text-orange-400"
              width={24}
              height={24}
            />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tighter font-newsreader font-light">
          Ready to ship your ideas?
        </h2>
        <p className="text-neutral-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed font-normal font-geist">
          Join the next generation of product designers who build what they
          design.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <TrackableLink
            href="/apply-page"
            trackEvent="InitiateCheckout"
            trackParams={{ content_name: "Footer CTA" }}
            className="px-8 py-3 rounded-full bg-gradient-to-b from-orange-500 to-orange-700 text-white hover:brightness-110 transition-all shadow-[0_0_25px_rgba(234,88,12,0.2)] flex items-center gap-2 border border-orange-400/20 font-medium font-geist"
          >
            Apply Now
            <SolarIcon
              icon="solar:arrow-right-linear"
              className="text-lg"
              width={18}
              height={18}
            />
          </TrackableLink>
          <Link
            href="#"
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium font-geist"
          >
            Download Syllabus
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-8 opacity-50" />

      {/* Links Section */}
      <div className="px-8 md:px-16 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-3xl text-white tracking-tighter font-newsreader font-light">
            ShipWithAI
            <span className="tracking-tighter font-newsreader font-light text-orange-500">
              .
            </span>
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-sm font-normal font-geist">
            The only bootcamp bridging the gap between product design and
            engineering with AI.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-neutral-400 hover:text-white border border-white/5"
            >
              <SolarIcon
                icon="solar:camera-linear"
                className="text-lg"
                width={18}
                height={18}
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-neutral-400 hover:text-white border border-white/5"
            >
              <SolarIcon
                icon="solar:earth-linear"
                className="text-lg"
                width={18}
                height={18}
              />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-12">
          {/* Col 1 */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold font-geist">Course</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li>
                <a
                  href="/#sessions"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Mentors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Showcase
                </a>
              </li>
            </ul>
          </div>
          {/* Col 2 */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold font-geist">Resources</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Prompt Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
          {/* Col 3 */}
          <div className="space-y-6 hidden sm:block">
            <h4 className="text-white font-semibold font-geist">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li>
                <Link
                  href="/#about"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-orange-400 font-geist"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
