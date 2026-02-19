"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SolarIcon } from "@/components/ui/solar-icon";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <SolarIcon
            icon="solar:ufo-3-outline"
            className="text-orange-400"
            width={28}
            height={28}
          />
          <span className="text-lg font-semibold text-white font-geist tracking-tight">
            ShipWithAI
          </span>
          <span className="text-xs text-neutral-500 font-geist">Admin</span>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white font-geist mb-1 text-center">
            Admin Login
          </h2>
          <p className="text-sm text-neutral-400 font-geist mb-6 text-center">
            Sign in with your admin credentials
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-400 mb-1.5 block font-geist">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shipwithai.com"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-400 mb-1.5 block font-geist">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-geist">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold tracking-tight transition-all font-geist flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
