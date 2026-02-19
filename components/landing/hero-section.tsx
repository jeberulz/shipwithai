import Image from "next/image";
import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";
import { navItems } from "@/lib/landing-data";

export function HeroSection() {
  return (
    <section className="overflow-hidden min-h-[600px] flex flex-col shadow-neutral-200 lg:p-12 text-white bg-[#08090a] w-full rounded-[2.5rem] pt-8 pr-8 pb-8 pl-8 relative shadow-2xl gap-y-8 justify-between">
      {/* Background Abstract Image */}
      <div className="z-0 absolute top-0 right-0 bottom-0 left-0">
        <Image
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7c3ccc9e-7f0f-443b-90fb-49733c64155b_original.png"
          alt="Abstract AI"
          fill
          sizes="100vw"
          className="contrast-125 opacity-40 mix-blend-overlay w-full h-full object-cover grayscale"
        />
        <div
          className="bg-gradient-to-t from-[#08090a] via-[#08090a]/40 to-[#08090a]/90 absolute top-0 right-0 bottom-0 left-0"
          style={{ height: "110%" }}
        />
        <div className="blur-[100px] mix-blend-normal w-[500px] h-[500px] rounded-full absolute top-0 right-0 blur-none" />
      </div>

      {/* Navigation Pill */}
      <div className="z-10 flex w-full relative justify-center">
        <nav className="flex gap-6 shadow-black/20 text-sm bg-white/5 border-white/10 border rounded-full pt-2 pr-2 pb-2 pl-4 shadow-lg backdrop-blur-md gap-x-6 gap-y-6 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-white pr-4 border-r border-white/10 font-geist"
          >
            <SolarIcon
              icon="solar:ufo-3-outline"
              className="text-lg text-orange-400"
              width={18}
              height={18}
            />
            ShipWithAI
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors font-medium text-neutral-300 font-geist"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/apply-page"
            className="transition-colors hover:bg-orange-50 text-xs font-semibold text-black tracking-tight bg-white rounded-full pt-2 pr-5 pb-2 pl-5 font-geist"
          >
            Apply for Cohort I
          </Link>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl z-10 mt-auto relative space-y-4">
        <div className="inline-flex uppercase text-xs font-semibold text-orange-300 tracking-wider text-center bg-orange-500/10 border-orange-500/30 border rounded-full mb-6 pt-1 pr-3 pb-1 pl-3 backdrop-blur-sm gap-x-2 gap-y-2 items-center font-geist">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-orange-400" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          2-WEEK BOOTCAMP STARTS MARCH 17
        </div>
        <h1 className="md:text-7xl leading-[1.05] text-5xl font-light text-white tracking-tighter font-newsreader mb-6">
          Turn AI Into Your Senior
          <br className="hidden lg:block" />
          Design Partner.{" "}
          <span className="text-neutral-500 tracking-tighter font-newsreader font-light">
            Ship Real Work in Half the Time.
          </span>
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl font-normal font-geist">
          6 live sessions. 12 production-ready AI workflows. A repeatable
          system for product designers and PMs who want to stop doing busywork
          and start shipping faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link
            href="/apply-page"
            className="hover:bg-neutral-100 transition-colors shadow-white/10 text-sm font-semibold text-black tracking-tight bg-white rounded-full pt-3.5 pr-8 pb-3.5 pl-8 shadow-lg font-geist"
          >
            Join the March Bootcamp
          </Link>
          <Link
            href="/#sessions"
            className="hover:bg-white/10 transition-colors text-sm font-semibold text-white tracking-tight bg-transparent border-white/20 border rounded-full pt-3.5 pr-8 pb-3.5 pl-8 font-geist"
          >
            See How It Works
          </Link>
        </div>
        <p className="flex items-center gap-2 text-xs font-medium text-neutral-500 font-geist">
          <SolarIcon
            icon="solar:verified-check-linear"
            className="text-sm text-orange-400"
          />
          Built by a Senior Product Designer with 13+ years at Amazon,
          Booking.com, and Etisalat
        </p>
      </div>

      {/* Floating Badge */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-2 pr-5 rounded-2xl shadow-xl">
        <div className="w-12 h-16 bg-gradient-to-br rounded-xl relative shadow-lg flex items-center justify-center from-orange-500 to-orange-600">
          <SolarIcon
            icon="solar:laptop-3-outline"
            className="text-2xl text-white"
            width={24}
            height={24}
          />
        </div>
        <div>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium font-geist">
            Next Cohort
          </p>
          <p className="text-sm font-medium text-white font-geist">
            Mar 17, 2026
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-white">
            <SolarIcon icon="solar:arrow-left-linear" className="text-lg" width={18} height={18} />
          </button>
          <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center hover:bg-neutral-200 transition text-black">
            <SolarIcon icon="solar:arrow-right-linear" className="text-lg" width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
