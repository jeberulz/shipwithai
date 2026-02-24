import Image from "next/image";
import { SolarIcon } from "@/components/ui/solar-icon";
import { instructor } from "@/lib/landing-data";

export function InstructorSection() {
  return (
    <section className="pt-24 pb-24 relative" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist">
            Your Instructor
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Image */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shrink-0 shadow-xl border border-neutral-200 relative">
              <Image
                src={instructor.imageSrc}
                alt={`${instructor.name}, ${instructor.role}`}
                fill
                sizes="(max-width: 1024px) 192px, 224px"
                className="object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="uppercase text-xs font-medium text-neutral-400 tracking-widest font-geist text-center mb-2">
                Trusted experience at
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {instructor.companies.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 font-medium shadow-sm font-geist"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-[1.0] tracking-tighter font-newsreader font-light">
                {instructor.name}
              </h2>
              <p className="text-lg text-orange-500 font-medium mt-2 tracking-tight font-geist">
                {instructor.role}
              </p>
            </div>

            <div className="h-px w-16 bg-orange-500 rounded-full" />

            <div className="space-y-4">
              {instructor.bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 30)}
                  className="text-[15px] leading-relaxed font-normal text-neutral-500 font-geist"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <p className="leading-relaxed text-2xl font-light text-neutral-700 tracking-tight font-newsreader">
                {instructor.quote}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {instructor.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex bg-neutral-50 border-neutral-100 border rounded-xl py-3 px-4 gap-2 items-center"
                >
                  <SolarIcon
                    icon={stat.icon}
                    className="text-lg text-orange-500"
                    width={18}
                    height={18}
                  />
                  <div>
                    <p className="text-xs text-neutral-400 font-medium font-geist">
                      {stat.label}
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 tracking-tight font-geist">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
