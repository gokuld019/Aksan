"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.crazystory.in/api";

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok || data.status !== "success") {
    throw new Error(data.message || "Invalid email or password");
  }
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password); // stores token + user in localStorage
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel — brand / market motif */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-14 overflow-hidden bg-[#f7f4ee]">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#0b1220 1px, transparent 1px), linear-gradient(90deg, #0b1220 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-[#c5a059]/15 blur-3xl" />

        <div className="relative">
          <Image
            src="/bluelogo.webp"
            alt="AKSAN Capital Advisory"
            width={200}
            height={70}
            className="h-14 w-auto"
            priority
          />
        </div>

        <div className="relative">
          <p className="text-[#8a6d2f] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Capital Advisory Private Limited
          </p>
          <h1 className="font-serif text-[#0b1220] text-[42px] leading-[1.15] max-w-md mb-10">
            Guidance that grows wealth.
          </h1>

          <svg viewBox="0 0 400 120" className="w-full max-w-md h-28" fill="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a6d2f" />
                <stop offset="100%" stopColor="#c5a059" />
              </linearGradient>
              <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c5a059" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 95 L50 88 L100 92 L150 68 L200 74 L250 45 L300 52 L350 20 L400 12"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0 95 L50 88 L100 92 L150 68 L200 74 L250 45 L300 52 L350 20 L400 12 L400 120 L0 120 Z"
              fill="url(#fillGrad)"
            />
            <circle cx="400" cy="12" r="4.5" fill="#8a6d2f" />
            <circle cx="400" cy="12" r="9" fill="#c5a059" fillOpacity="0.3" className="animate-ping" />
          </svg>
        </div>

        <div className="relative flex items-center gap-2.5 text-[#6b6455] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          SEBI-Registered Investment Advisor · Chennai, India
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-[380px]">
          <div className="flex lg:hidden mb-10">
            <Image
              src="/bluelogo.webp"
              alt="AKSAN Capital Advisory"
              width={160}
              height={56}
              className="h-11 w-auto"
              priority
            />
          </div>

          <h2 className="text-[#0b1220] text-[26px] font-semibold mb-1.5">Welcome back</h2>
          <p className="text-[#71768a] text-sm mb-9">Sign in to manage the AKSAN site.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-2.5 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="peer w-full bg-transparent border-b border-[#d8d5cc] pt-5 pb-2 text-[#0b1220] text-[15px] outline-none focus:border-[#c5a059] transition-colors"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-5 text-[#8a8f9e] text-[15px] transition-all
                  peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#8a6d2f]
                  peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Email address
              </label>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                className="peer w-full bg-transparent border-b border-[#d8d5cc] pt-5 pb-2 pr-14 text-[#0b1220] text-[15px] outline-none focus:border-[#c5a059] transition-colors"
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-5 text-[#8a8f9e] text-[15px] transition-all
                  peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#8a6d2f]
                  peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-0 top-4 text-[#8a8f9e] text-xs font-medium hover:text-[#0b1220] transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-[#71768a] cursor-pointer">
                <input type="checkbox" className="accent-[#8a6d2f] w-3.5 h-3.5" />
                Remember me
              </label>
              <a href="#" className="text-[#8a6d2f] hover:text-[#c5a059] transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#c5a059] to-[#8a6d2f] rounded-xl text-white font-semibold text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-105 transition-all shadow-lg shadow-[#c5a059]/20"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-[#a3a7b3] text-xs text-center mt-10">
            © {new Date().getFullYear()} AKSAN Capital Advisory Private Limited
          </p>
        </div>
      </div>
    </div>
  );
}