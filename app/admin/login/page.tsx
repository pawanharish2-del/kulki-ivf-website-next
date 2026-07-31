"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  // ✅ Cleaned initial states for production
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.replace("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fff0f3]/40 text-slate-900 font-sans relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#c44d68]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-rose-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fade-in">
        {/* Logo Banner */}
        <div className="text-center mb-8">
          <img
            src="/assets/images/logo.jpg"
            alt="Kulki IVF Logo"
            className="h-16 w-auto mx-auto mb-4 object-contain rounded-xl shadow-md border border-[#fde2e8] bg-white p-1"
          />
          <h1 className="text-2xl font-bold tracking-tight text-[#802336] font-display">Kulki IVF Admin Portal</h1>
          <p className="text-sm text-[#c44d68] mt-1 font-semibold italic">&quot;Magic Password to Childbirth...&quot;</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#fde2e8] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c44d68] mb-6 pb-4 border-b border-[#fde2e8] font-display">
            <ShieldCheck className="w-4 h-4 text-[#c44d68]" /> Secure CMS Authentication
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-[#c44d68] text-sm font-semibold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-display">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#c44d68]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kulkiivf.com"
                  autoComplete="off"
                  className="w-full bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl pl-10 pr-4 py-3 text-sm text-[#802336] font-medium placeholder-slate-400 focus:outline-none focus:border-[#c44d68] focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-display">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#c44d68]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl pl-10 pr-4 py-3 text-sm text-[#802336] font-medium placeholder-slate-400 focus:outline-none focus:border-[#c44d68] focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#e0667e] to-[#c44d68] hover:from-[#c44d68] hover:to-[#a83a52] text-white font-bold py-3 rounded-full text-sm shadow-md shadow-[#c44d68]/25 hover:shadow-lg hover:shadow-[#c44d68]/35 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Kulki IVF Fertility & ART Centre. All rights reserved.
        </div>
      </div>
    </div>
  );
}