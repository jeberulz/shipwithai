import Image from "next/image";
import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";
import { WORKSHOP_DETAILS } from "@/lib/workshop-data";
import { WorkshopSignupForm } from "./workshop-signup-form";
import { WorkshopFaqSection } from "./workshop-faq-section";
import { ReserveSpotNavButton, ScrollToTopCta } from "./scroll-to-top-button";

export function WorkshopPage() {
  return (
    <div className="mx-auto max-w-7xl border-l border-r border-dashed border-neutral-300 min-h-screen relative bg-white/50">
      {/* Vertical Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-4 opacity-20 z-0">
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
      </div>

      <main className="z-10 md:p-6 lg:p-8 pt-4 pr-4 pb-4 pl-4 relative space-y-6">
        <HeroSection />
        <ProblemSection />
        <WhatYoullLearnSection />
        <ThreeStepsSection />
        <HostSection />
        <WorkshopFaqSection />
        <FooterSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="overflow-hidden min-h-[600px] flex flex-col shadow-neutral-200 lg:p-12 text-white bg-[#08090a] w-full rounded-[2.5rem] pt-8 pr-8 pb-8 pl-8 relative shadow-2xl gap-y-8 justify-between">
      {/* Background Abstract Image */}
      <div className="z-0 absolute top-0 right-0 bottom-0 left-0">
        <Image
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/6e2eed6d-3318-4314-b0da-7ee3e7d578f7/1600w.png"
          alt="Abstract AI-generated background pattern for the Obsidian and Claude Code workshop"
          fill
          sizes="100vw"
          className="contrast-125 opacity-40 mix-blend-overlay w-full h-full object-cover grayscale"
        />
        <div
          className="bg-gradient-to-t from-[#08090a] via-[#08090a]/40 to-[#08090a]/90 absolute top-0 right-0 bottom-0 left-0"
          style={{ height: "110%" }}
        />
        <div className="blur-[100px] mix-blend-normal w-[500px] h-[500px] rounded-full absolute top-0 right-0 bg-orange-600/10" />
      </div>

      {/* Navigation Pill */}
      <div className="z-10 flex w-full relative justify-center">
        <nav className="flex gap-6 shadow-black/20 text-sm bg-white/5 border-white/10 border rounded-full pt-2 pr-2 pb-2 pl-4 shadow-lg backdrop-blur-md gap-x-6 gap-y-6 items-center">
          <Link
            href="/"
            aria-label="ContentWorkshop home"
            className="flex items-center gap-2 font-semibold tracking-tight text-white font-geist"
          >
            <SolarIcon
              icon="solar:programming-outline"
              className="text-lg text-orange-400"
              width={18}
              height={18}
            />
            ContentWorkshop
          </Link>
          <div className="hidden md:block w-px h-4 bg-white/10" />
          <ReserveSpotNavButton />
        </nav>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl z-10 mt-12 relative space-y-4">
        <div className="inline-flex uppercase text-xs font-semibold text-orange-300 tracking-wider font-geist text-center bg-orange-500/10 border-orange-500/30 border rounded-full mb-4 pt-1 pr-3 pb-1 pl-3 backdrop-blur-sm gap-x-2 gap-y-2 items-center">
          A Free Workshop for Creators
        </div>

        <h1 className="md:text-7xl leading-[1.05] text-5xl font-light text-white tracking-tighter font-newsreader mb-6">
          Obsidian + Claude Code.
          <br className="hidden lg:block" />
          Build Your AI Content System
          <span className="text-neutral-500 tracking-tighter font-newsreader font-light block">
            in 60 Minutes.
          </span>
        </h1>

        <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-2xl font-normal font-geist">
          No coding. No complex setups. Just a system that turns one idea into
          a week of content across all your platforms.
        </p>

        <WorkshopSignupForm />
      </div>

      {/* Social Proof */}
      <div className="z-10 mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div>
          <p className="md:text-3xl text-2xl font-light text-white tracking-tighter font-newsreader">
            200+
          </p>
          <p className="text-xs font-medium text-neutral-500 font-geist mt-1">
            Students Taught
          </p>
        </div>
        <div>
          <p className="md:text-3xl text-2xl font-light text-white tracking-tighter font-newsreader">
            3k+
          </p>
          <p className="text-xs text-neutral-500 font-geist font-medium mt-1">
            LinkedIn Followers
          </p>
        </div>
        <div className="hidden md:block">
          <p className="md:text-3xl text-2xl font-light text-white tracking-tighter font-newsreader">
            6+
          </p>
          <p className="text-xs text-neutral-500 font-geist font-medium mt-1">
            Products shipped with Claude Code
          </p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist">
            The Problem
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-16 max-w-4xl leading-[1.05] tracking-tighter font-newsreader font-light">
          The way you create content is about to{" "}
          <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
            become obsolete.
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <p className="text-lg text-neutral-500 leading-relaxed font-normal font-geist">
              You&apos;re still writing every post from scratch. Still copying
              between apps. Still spending hours on what should take minutes.
            </p>
            <p className="text-lg text-neutral-500 leading-relaxed font-normal font-geist">
              AI tools exist. You&apos;ve tried them. They didn&apos;t stick.
            </p>
            <div className="pt-4">
              <p className="text-xl md:text-2xl text-neutral-900 leading-snug tracking-tight font-newsreader font-light">
                Not because you&apos;re doing it wrong. Because nobody showed
                you how to build a system.
              </p>
              <div className="mt-4 h-1 w-16 rounded-full bg-orange-500" />
            </div>
          </div>

          {/* Right Column: 3 Stages */}
          <div className="relative group">
            <div className="bg-[#08090a] rounded-[2rem] p-8 lg:p-10 relative overflow-hidden min-h-full border border-neutral-900">
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/15" />

              <div className="relative z-10 space-y-6">
                {/* Stage 1 */}
                <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] opacity-50">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-800 text-neutral-400">
                    <span className="font-newsreader text-sm">01</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1 font-geist">
                      Stage 1: Manual
                    </p>
                    <p className="text-[15px] text-neutral-400 leading-relaxed font-geist">
                      Write everything from scratch. Copy-paste between
                      platforms. Spend 2 hours on 3 posts.
                    </p>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.04] opacity-75">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-800 text-neutral-300">
                    <span className="font-newsreader text-sm">02</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1 font-geist">
                      Stage 2: Templates
                    </p>
                    <p className="text-[15px] text-neutral-300 leading-relaxed font-geist">
                      Use ChatGPT for drafts. Still editing everything. Faster
                      but still fragmented.
                    </p>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="flex gap-4 p-5 rounded-xl border border-orange-500/30 bg-orange-500/10 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <span className="font-newsreader text-sm">03</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-orange-400 uppercase tracking-widest font-semibold font-geist">
                        Stage 3: Commands
                      </p>
                      <span className="bg-orange-500/20 text-orange-300 text-[9px] px-1.5 py-0.5 rounded-full border border-orange-500/20 uppercase font-semibold">
                        The Workshop
                      </span>
                    </div>
                    <p className="text-[15px] text-white leading-relaxed font-geist font-medium">
                      One command. Multiple posts. Different platforms. Same
                      voice. This is what I&apos;ll teach you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYoullLearnSection() {
  return (
    <section className="overflow-hidden bg-neutral-100/50 border-neutral-200/60 pt-24 pb-24 relative rounded-[2.5rem]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
            The Workshop
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl text-neutral-900 max-w-3xl leading-[1.05] tracking-tighter font-newsreader font-light">
            60 minutes that change{" "}
            <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
              how you create content.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
            <div className="h-48 bg-neutral-100 relative overflow-hidden border-b border-neutral-100">
              <div className="flex group-hover:scale-105 transition-transform duration-700 bg-gradient-to-br from-neutral-200/50 to-neutral-100 absolute inset-0 items-center justify-center">
                <SolarIcon
                  icon="solar:layers-minimalistic-linear"
                  className="text-5xl text-neutral-300"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg text-neutral-900 mb-2 tracking-tight font-newsreader font-light">
                Why Obsidian + Claude Code
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-normal font-geist mt-auto">
                Most people use the wrong tools for AI content. I&apos;ll show
                you why this combo beats everything else I&apos;ve tried.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
            <div className="h-48 bg-orange-50 relative overflow-hidden border-b border-orange-100/50">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-orange-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <SolarIcon
                  icon="solar:play-circle-linear"
                  className="text-5xl text-orange-300"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg text-neutral-900 mb-2 tracking-tight font-newsreader font-light">
                Live system demo
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-normal font-geist mt-auto">
                Watch me turn one rough idea into LinkedIn posts, X threads,
                and newsletter content in real time.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col relative">
            <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[50px] pointer-events-none bg-orange-600/30 z-0" />
            <div className="h-48 bg-neutral-800/50 relative overflow-hidden border-b border-white/5 z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <SolarIcon
                  icon="solar:magic-stick-3-linear"
                  className="text-5xl text-orange-500/40"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 z-10">
              <h3 className="text-lg text-white mb-2 tracking-tight font-newsreader font-light">
                Your first working command
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal font-geist mt-auto">
                You&apos;ll leave with something that actually runs. Not
                theory. A system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeStepsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-[#08090a] to-[#111] border border-white/5 p-8 lg:p-12 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none bg-orange-600/10" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/10" />

          <div className="relative z-10 flex flex-col gap-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] mb-4 font-medium uppercase tracking-wider border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
                What You&apos;ll Build
              </span>
              <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tighter font-newsreader font-light">
                Three steps. One workshop.
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-4 relative w-full">
              {/* Step 1 */}
              <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-6 relative w-full group hover:bg-white/[0.06] transition-colors h-full">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4 bg-white/5 border-white/10">
                  <span className="text-white font-newsreader">1</span>
                </div>
                <h3 className="text-base text-white font-medium font-geist mb-2">
                  Set up your vault
                </h3>
                <p className="text-sm text-neutral-400 font-geist leading-relaxed">
                  Structure Obsidian for AI-powered content. Simple folders.
                  Clear system.
                </p>
              </div>

              <SolarIcon
                icon="solar:arrow-right-linear"
                className="text-neutral-600 text-2xl flex-shrink-0 hidden md:block"
                width={24}
                height={24}
              />

              {/* Step 2 */}
              <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-6 relative w-full group hover:bg-white/[0.06] transition-colors h-full">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4 bg-white/5 border-white/10">
                  <span className="text-white font-newsreader">2</span>
                </div>
                <h3 className="text-base text-white font-medium font-geist mb-2">
                  Install Claude Code
                </h3>
                <p className="text-sm text-neutral-400 font-geist leading-relaxed">
                  Connect Claude Code to your vault. I&apos;ll walk through
                  every step live.
                </p>
              </div>

              <SolarIcon
                icon="solar:arrow-right-linear"
                className="text-neutral-600 text-2xl flex-shrink-0 hidden md:block"
                width={24}
                height={24}
              />

              {/* Step 3 */}
              <div className="flex-1 border rounded-2xl p-6 relative w-full bg-orange-500/10 border-orange-500/30 shadow-[0_0_30px_rgba(234,88,12,0.1)] h-full">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4 bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                  <span className="font-newsreader">3</span>
                </div>
                <h3 className="text-base text-white font-medium font-geist mb-2">
                  Run your first command
                </h3>
                <p className="text-sm text-orange-200/70 font-geist leading-relaxed">
                  Build your first content skill. Watch it work. Take it home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HostSection() {
  return (
    <section className="pt-24 pb-24 relative" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs text-neutral-500 font-medium font-geist shadow-sm">
            Your Instructor
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Image & Experience */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-center gap-10">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-neutral-200/50 relative">
              <Image
                src={WORKSHOP_DETAILS.instructorImageUrl}
                alt={`${WORKSHOP_DETAILS.instructorName}, ${WORKSHOP_DETAILS.instructorJobTitle}`}
                fill
                sizes="(max-width: 1024px) 256px, 320px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-5 w-full">
              <p className="text-xs tracking-widest uppercase text-neutral-400 font-medium font-geist text-center">
                Trusted Experience At
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["Amazon", "Booking.com", "Etisalat"].map((company) => (
                  <span
                    key={company}
                    className="px-5 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 font-normal font-geist bg-white shadow-sm"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bio & Stats */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h2 className="text-7xl md:text-8xl lg:text-9xl leading-none font-light text-neutral-900 tracking-tighter font-newsreader">
                John Iseghohi
              </h2>
              <p className="text-xl md:text-2xl text-orange-500 font-normal tracking-tight font-geist">
                Senior Product Designer
              </p>
              <div className="h-px w-16 bg-orange-400 mt-6" />
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed font-light text-neutral-600 font-geist">
                14+ years designing complex products at Amazon, Booking.com,
                and Etisalat Telecoms. Led the launch of the{" "}
                <span className="font-normal text-neutral-900">
                  Amazon Insurance Store
                </span>{" "}
                and the{" "}
                <span className="font-normal text-neutral-900">
                  Global Installment Program
                </span>
                .
              </p>
              <p className="text-lg leading-relaxed font-light text-neutral-600 font-geist">
                Built multiple products using Claude Code and AI-assisted
                workflows including{" "}
                <a
                  href="https://useresumate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-neutral-900 underline decoration-neutral-300 hover:decoration-orange-500 transition-colors"
                >
                  useresumate.com
                </a>
                ,{" "}
                <span className="font-normal text-neutral-900">
                  VibeCoder
                </span>
                , and{" "}
                <span className="font-normal text-neutral-900">
                  ProductBrainBox
                </span>
                .
              </p>
            </div>

            <p className="md:text-3xl lg:text-4xl leading-relaxed text-2xl font-light text-neutral-600 tracking-tight font-newsreader">
              &ldquo;I&apos;m not an AI Engineer. I&apos;m a designer who
              figured out how to use AI to do better design work, faster.
              This bootcamp is everything I wish someone had taught me 12
              months ago.&rdquo;
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {[
                {
                  icon: "solar:buildings-linear",
                  label: "Experience",
                  value: "14+ Years",
                },
                {
                  icon: "solar:rocket-2-linear",
                  label: "Products Shipped",
                  value: "10 with AI",
                },
                {
                  icon: "solar:users-group-rounded-linear",
                  label: "Students Taught",
                  value: "200+",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 bg-neutral-50 rounded-2xl px-6 py-5 flex-1 min-w-[200px] border border-neutral-100/50"
                >
                  <SolarIcon
                    icon={stat.icon}
                    className="text-orange-500 flex-shrink-0"
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="text-xs text-neutral-400 font-normal font-geist mb-0.5">
                      {stat.label}
                    </p>
                    <p className="text-base font-semibold text-neutral-900 tracking-tight font-geist">
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

function FooterSection() {
  return (
    <footer className="mt-8 w-full bg-[#050505] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-white/5">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3 bg-orange-600/15" />

      {/* CTA Section */}
      <div className="pt-24 pb-16 px-8 text-center relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] mb-6 font-medium uppercase tracking-wider border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
          Don&apos;t Wait
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tighter font-newsreader font-light">
          In 6 months, everyone will be using this.{" "}
          <br />
          <span className="text-neutral-500">
            Right now, almost nobody is.
          </span>
        </h2>

        <p className="text-neutral-400 text-lg mb-10 leading-relaxed font-normal font-geist">
          The creators who learn this early will have an unfair advantage. The
          ones who wait will wonder how others are shipping so fast. This
          workshop is free. The system is real. The spots are limited.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ScrollToTopCta />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-8 opacity-50" />

      {/* Footer Info */}
      <div className="px-8 pb-12 text-center relative z-10">
        <p className="text-neutral-500 text-sm font-geist font-medium flex items-center justify-center gap-2 flex-wrap mb-4">
          <span className="text-neutral-300">John Iseghohi</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>March 5th, 2026</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>6:00 PM GMT</span>
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-neutral-600 font-geist">
          <Link
            href="/privacy"
            className="hover:text-orange-400 transition-colors"
          >
            Privacy
          </Link>
          <span>&middot;</span>
          <Link
            href="/terms"
            className="hover:text-orange-400 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
