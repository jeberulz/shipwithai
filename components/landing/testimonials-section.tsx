import Image from "next/image";
import { SolarIcon } from "@/components/ui/solar-icon";
import { testimonials } from "@/lib/landing-data";

export function TestimonialsSection() {
  const testimonial = testimonials[0];

  return (
    <section className="overflow-hidden bg-neutral-50 border-neutral-200/60 border-b pt-24 pb-24 relative">
      <div className="lg:px-8 max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 max-w-4xl leading-[1.05] tracking-tighter font-newsreader font-light">
            Helping designers{" "}
            <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
              break free from the constraints of static tools.
            </span>
          </h2>
          <a
            href="#"
            className="group inline-flex items-center text-sm text-neutral-900 transition-colors border-b border-neutral-900 pb-0.5 whitespace-nowrap font-medium hover:text-orange-600 hover:border-orange-600 font-geist"
          >
            View Alumni Work
            <SolarIcon
              icon="solar:arrow-right-up-linear"
              className="ml-1 text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Testimonial */}
          <div className="bg-white p-8 min-h-[520px] flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-shadow duration-500 group rounded-[2rem]">
            <div>
              <h3 className="text-xl text-neutral-900 mb-6 leading-snug tracking-tighter font-newsreader font-light">
                &ldquo;{testimonial.headline}&rdquo;
              </h3>
              <p className="text-neutral-500 leading-relaxed text-[15px] font-normal font-geist">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-neutral-100 mt-auto">
              <Image
                src={testimonial.imageSrc}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover bg-neutral-100 grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div>
                <p className="text-sm text-neutral-900 font-medium font-geist">
                  {testimonial.name}
                </p>
                <p className="text-xs text-neutral-500 font-geist">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Visual Brand */}
          <div className="relative min-h-[520px] bg-neutral-900 overflow-hidden group rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
              alt="Abstract"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 opacity-70 object-cover mix-blend-overlay"
            />
            <div className="bg-gradient-to-t from-black/80 via-transparent to-orange-900/20 absolute inset-0" />
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
              <span className="text-white text-lg tracking-tight mix-blend-overlay font-medium font-geist">
                Ship With AI &copy;
              </span>
            </div>
            <div className="absolute bottom-8 right-8 z-10">
              <span className="text-white/60 text-xs uppercase tracking-widest font-medium font-geist">
                San Francisco
              </span>
            </div>
          </div>

          {/* Card 3: Metric */}
          <div className="min-h-[520px] flex flex-col overflow-hidden group text-center bg-white p-8 relative items-center justify-between rounded-[2rem]">
            <p className="text-neutral-500 text-lg mt-8 font-medium font-geist">
              Average salary increase
              <br />
              post-graduation
            </p>
            <div className="relative flex items-center justify-center w-56 h-56 my-8">
              <svg
                className="w-full h-full transform -rotate-90 drop-shadow-xl"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="#f3f4f6"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="565"
                  strokeDashoffset="200"
                  className="transition-all duration-1000 ease-out group-hover:stroke-[3]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl text-neutral-900 tracking-tighter font-newsreader font-light">
                  +$45k
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Contact */}
          <div className="min-h-[520px] flex flex-col group overflow-hidden text-white bg-[#08090a] p-8 relative justify-between rounded-[2rem]">
            <div className="flex justify-between items-start z-10">
              <span className="text-xl tracking-tighter font-newsreader font-light">
                Admissions
              </span>
              <SolarIcon
                icon="solar:arrow-right-up-linear"
                className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              />
            </div>
            <div className="z-10 relative">
              <p className="text-neutral-400 leading-relaxed mb-12 max-w-[260px] text-[15px] font-normal font-geist">
                Not sure if this is right for you? Book a 15-min chat with a
                mentor to review your portfolio and goals.
              </p>
              <div className="space-y-2 text-sm text-neutral-400">
                <a
                  href="#"
                  className="block transition-colors font-medium hover:text-orange-400 font-geist"
                >
                  hello@shipwithai.com
                </a>
                <a
                  href="#"
                  className="block transition-colors font-medium hover:text-orange-400 font-geist"
                >
                  Join Discord Server
                </a>
                <a
                  href="#"
                  className="block transition-colors font-medium hover:text-orange-400 font-geist"
                >
                  Download Brochure
                </a>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[80px] transition-all duration-700 pointer-events-none bg-orange-600/20 group-hover:bg-orange-600/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
