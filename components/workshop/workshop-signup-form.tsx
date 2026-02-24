"use client";

import { useState, useEffect } from "react";
import { SolarIcon } from "@/components/ui/solar-icon";
import {
  trackMetaEvent,
  generateEventId,
  setMetaAdvancedMatching,
  getMetaCookies,
} from "@/lib/meta-pixel-client";

export function WorkshopSignupForm({
  workshopSlug = "obsidian-claude-code-workshop",
}: {
  workshopSlug?: string;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [utmParams, setUtmParams] = useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const leadEventId = generateEventId();
    const completeRegEventId = generateEventId();
    const { fbp, fbc } = getMetaCookies();

    try {
      const response = await fetch("/api/workshop-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          workshopSlug,
          ...utmParams,
          _meta: { leadEventId, completeRegEventId, fbp, fbc },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);

      trackMetaEvent(
        "Lead",
        { content_name: "Workshop Registration", content_category: "workshop" },
        leadEventId
      );
      trackMetaEvent(
        "CompleteRegistration",
        { content_name: "Free Workshop", status: true },
        completeRegEventId
      );
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md max-w-2xl">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <SolarIcon
              icon="solar:check-circle-bold"
              className="text-green-400"
              width={28}
              height={28}
            />
          </div>
          <h3 className="text-2xl font-light text-white tracking-tight font-newsreader mb-2">
            You&apos;re In!
          </h3>
          <p className="text-sm text-neutral-400 font-geist mb-4">
            Thanks, {fullName.split(" ")[0]}! Check{" "}
            <span className="font-medium text-white">{email}</span> for
            setup instructions before the workshop.
          </p>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
            <p className="text-xs text-orange-300 font-geist font-medium">
              Check your inbox (and spam folder) for a confirmation email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md max-w-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium font-geist mb-3">
            Workshop starts March 5
          </p>
          <CountdownTimer targetDate={new Date("2026-03-05T18:00:00Z")} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SolarIcon
                icon="solar:user-rounded-linear"
                className="text-neutral-500"
                width={18}
                height={18}
              />
            </div>
            <input
              type="text"
              required
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-geist text-sm"
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SolarIcon
                icon="solar:letter-linear"
                className="text-neutral-500"
                width={18}
                height={18}
              />
            </div>
            <input
              type="email"
              id="email-capture"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (email) {
                  setMetaAdvancedMatching({ em: email.toLowerCase().trim() });
                }
              }}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-geist text-sm"
            />
          </div>
        </div>

        {submitError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <p className="text-sm text-red-400 font-geist font-medium">
              {submitError}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap font-geist shadow-[0_0_20px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Registering...
            </>
          ) : (
            <>
              Reserve My Spot
              <SolarIcon
                icon="solar:arrow-right-linear"
                className="text-base"
                width={16}
                height={16}
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-neutral-600 text-2xl font-light mb-4">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-neutral-600 text-2xl font-light mb-4">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-neutral-600 text-2xl font-light mb-4">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" highlight />
    </div>
  );
}

function TimeUnit({
  value,
  label,
  highlight,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        className={`text-3xl font-newsreader font-light tabular-nums tracking-tighter ${
          highlight ? "text-orange-400" : "text-white"
        }`}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className={`text-[9px] uppercase tracking-widest font-geist mt-0.5 ${
          highlight ? "text-orange-500/50" : "text-neutral-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
