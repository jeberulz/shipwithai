"use client";

import { useState } from "react";
import { SolarIcon } from "@/components/ui/solar-icon";
import { cn } from "@/lib/utils";
import {
  roleOptions,
  yearsOfExperienceOptions,
  claudeExperienceOptions,
  attendanceOptions,
} from "@/lib/apply-data";
import type { RadioCardOption } from "@/types/apply";

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-10">
      <div className="grow border-t border-neutral-200" />
      <span className="shrink-0 text-xs uppercase tracking-wider font-semibold text-neutral-400 font-geist">
        {label}
      </span>
      <div className="grow border-t border-neutral-200" />
    </div>
  );
}

function RadioCardGroup({
  name,
  options,
  value,
  onChange,
  columns = 2,
}: {
  name: string;
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: number;
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1"
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.id;
        return (
          <label key={option.id} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={isSelected}
              onChange={() => onChange(option.id)}
              className="sr-only"
            />
            <div
              className={cn(
                "border rounded-xl p-3 transition-all text-sm font-medium font-geist",
                isSelected
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-orange-300"
              )}
            >
              {option.label}
            </div>
          </label>
        );
      })}
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist";

export function ApplyForm() {
  // About You
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [company, setCompany] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  // Your AI Experience
  const [aiUsage, setAiUsage] = useState("");
  const [claudeExperience, setClaudeExperience] = useState("");

  // Commitment
  const [attendance, setAttendance] = useState("");
  const [bootcampGoals, setBootcampGoals] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section>
      {/* Section header */}
      <div className="mb-6">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist mb-6">
          Your Application
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight font-newsreader mb-2">
          Tell us about yourself.
        </h2>
        <p className="text-sm text-neutral-500 font-geist">
          Takes about 3 minutes. We review applications within 48 hours.
        </p>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 lg:p-10 shadow-sm">
          {/* ── About You ── */}
          <SectionDivider label="About You" />

          <div className="space-y-6">
            {/* Full Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                LinkedIn Profile URL <span className="text-orange-500">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://linkedin.com/in/yourname"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={inputClassName}
              />
              <p className="text-xs text-neutral-400 mt-1.5 font-geist">
                So we can learn more about your background
              </p>
            </div>

            {/* Current Role - radio card grid with icons */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                Current Role <span className="text-orange-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {roleOptions.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <label key={role.id} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={isSelected}
                        onChange={() => setSelectedRole(role.id)}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          "border rounded-2xl p-4 transition-all flex flex-col gap-3 h-full",
                          isSelected
                            ? "border-orange-500 bg-orange-50"
                            : "border-neutral-200 bg-neutral-50 hover:border-orange-300"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <SolarIcon
                            icon={role.icon}
                            className={cn(
                              "text-xl",
                              isSelected
                                ? "text-orange-500"
                                : "text-neutral-400"
                            )}
                            width={20}
                            height={20}
                          />
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border transition-all",
                              isSelected
                                ? "border-orange-500 border-[5px]"
                                : "border-neutral-300"
                            )}
                          />
                        </div>
                        <span className="text-sm font-medium text-neutral-900 font-geist">
                          {role.label}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Company + Years of Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Where you work now"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClassName}
                />
                <p className="text-xs text-neutral-400 mt-1.5 font-geist">
                  Or &lsquo;Freelance&rsquo; if independent
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                  Years of Experience <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    className={cn(inputClassName, "appearance-none cursor-pointer")}
                  >
                    {yearsOfExperienceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <SolarIcon
                    icon="solar:alt-arrow-down-linear"
                    className="absolute right-4 top-3.5 text-neutral-400 pointer-events-none"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Your AI Experience ── */}
          <SectionDivider label="Your AI Experience" />

          <div className="space-y-6">
            {/* AI Usage */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                How do you currently use AI in your design work?{" "}
                <span className="text-orange-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us what tools you use and how. Even if the answer is 'I don't really use it yet' — that's fine."
                value={aiUsage}
                onChange={(e) => setAiUsage(e.target.value)}
                className={cn(inputClassName, "resize-none")}
              />
              <p className="text-xs text-neutral-400 mt-1.5 font-geist">
                There&apos;s no wrong answer. We want to understand your
                starting point.
              </p>
            </div>

            {/* Claude Experience */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                Have you used Claude, Claude Desktop, or Claude Cowork before?{" "}
                <span className="text-orange-500">*</span>
              </label>
              <RadioCardGroup
                name="claudeExperience"
                options={claudeExperienceOptions}
                value={claudeExperience}
                onChange={setClaudeExperience}
                columns={2}
              />
            </div>
          </div>

          {/* ── Commitment ── */}
          <SectionDivider label="Commitment" />

          <div className="space-y-6">
            {/* Attendance */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                Can you attend 6 live sessions? (Mon/Wed/Fri, March 17-28, time
                TBD &mdash; likely 6pm GMT){" "}
                <span className="text-orange-500">*</span>
              </label>
              <RadioCardGroup
                name="attendance"
                options={attendanceOptions}
                value={attendance}
                onChange={setAttendance}
                columns={1}
              />
            </div>

            {/* Bootcamp Goals */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                What do you most want to get out of this bootcamp?{" "}
                <span className="text-orange-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Be specific. For example: 'I want to stop spending 4 hours writing PRDs every sprint' or 'I want to prototype without waiting for engineering'"
                value={bootcampGoals}
                onChange={(e) => setBootcampGoals(e.target.value)}
                className={cn(inputClassName, "resize-none")}
              />
            </div>

            {/* Anything Else */}
            <div>
              <label className="text-sm font-semibold text-neutral-900 mb-2 block font-geist">
                Anything else you want us to know?
              </label>
              <textarea
                rows={2}
                placeholder="Optional. Tell us about a side project, a skill you want to build, or why this bootcamp caught your eye."
                value={anythingElse}
                onChange={(e) => setAnythingElse(e.target.value)}
                className={cn(inputClassName, "resize-none")}
              />
            </div>
          </div>

          {/* ── Pricing Acknowledgment ── */}
          <SectionDivider label="Pricing Acknowledgment" />

          <div className="bg-[#08090a] rounded-2xl p-6 mb-8">
            <div className="h-1 w-12 bg-orange-500 rounded-full mb-4" />
            <h3 className="text-sm font-semibold text-white mb-2 font-geist">
              Pricing for Cohort 1
            </h3>
            <p className="text-sm text-neutral-400 font-geist leading-relaxed">
              Early bird: &pound;297 (first 48 hours after acceptance). Full
              price: &pound;397. One payment. Lifetime access.
            </p>
            <p className="text-sm text-neutral-400 font-geist mt-2">
              Accepted applicants receive a payment link via email. You
              don&apos;t pay anything today.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full sm:w-auto sm:mx-auto sm:flex bg-orange-600 hover:bg-orange-500 text-white py-4 px-10 rounded-xl text-sm font-semibold tracking-tight shadow-xl shadow-orange-500/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 font-geist"
          >
            Submit Application
            <SolarIcon
              icon="solar:arrow-right-linear"
              className="text-lg"
              width={18}
              height={18}
            />
          </button>
          <p className="text-xs text-neutral-400 text-center mt-4 font-geist">
            We review applications within 48 hours. Check your email for next
            steps.
          </p>
        </div>
      </form>
    </section>
  );
}
