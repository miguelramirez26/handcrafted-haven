// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Successful login -> Redirect to the product listing (or dashboard later)
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-stone-200 p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="font-merriweather text-3xl text-stone-900">Sign In</h1>
          <p className="text-sm text-stone-500 mt-2">Access your artisan account dashboard</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="test@test.com" className="w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700 bg-white text-stone-950" />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700 bg-white text-stone-950" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 transition-colors disabled:bg-slate-400">
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-stone-500">
          Don't have an artisan account?{" "}
          <Link href="/signup" className="text-amber-700 underline underline-offset-4 font-medium">
            Register here
          </Link>
        </div>
      </div>
    </main>
  );
}
