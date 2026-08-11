// src/app/components/navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface UserSession {
  name: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserSession | null>(null);

  // Checks the active backend session without altering any layout element
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout execution error:", err);
    }
  };

  return (
    <nav className="bg-slate-800 px-8 py-4 flex justify-between items-center">
      <Link href="/" className="font-merriweather text-white text-lg">
        Handcrafted <span className="text-yellow-300">Haven</span>
      </Link>

      <div className="flex gap-7 text-slate-400 text-xs uppercase tracking-widest">
        <Link href="/product-listing" className="hover:text-white transition-colors">Shop</Link>
        <Link href="/seller" className="hover:text-white transition-colors">Artisans</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
      </div>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-700 hover:bg-red-800 text-white text-xs uppercase tracking-wider px-4 py-2 rounded transition-colors cursor-pointer"
        >
          Log Out
        </button>
      ) : (
        <Link href="/login" className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider px-4 py-2 rounded transition-colors">
          Sign in
        </Link>
      )}
    </nav>
  );
}
