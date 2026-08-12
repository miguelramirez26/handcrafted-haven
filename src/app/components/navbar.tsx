"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface UserSession {
  name: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserSession | null>(null);
  
  // State to handle the local input value for the search bar
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Keeps the input value sync'd if the search parameter changes from outside
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Checks the active backend session and listens to local login events
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

    const handleLocalLogin = (e: Event) => {
      const customEvent = e as CustomEvent;
      setUser(customEvent.detail);
    };

    checkAuth();
    window.addEventListener("local-login", handleLocalLogin);
    return () => window.removeEventListener("local-login", handleLocalLogin);
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

  // Handles search submissions, routing securely to your catalog parameters
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      router.push(`/product-listing?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/product-listing");
    }
  };

  return (
    <nav className="bg-slate-800 px-8 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
      <Link href="/" className="font-merriweather text-white text-lg shrink-0">
        Handcrafted <span className="text-yellow-300">Haven</span>
      </Link>

      {/* Embedded Navigation Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex items-center w-full max-w-sm mx-4">
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-slate-700 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-l border border-slate-600 outline-none focus:border-amber-700 transition-colors"
        />
        <button 
          type="submit" 
          className="bg-amber-700 hover:bg-amber-800 text-white text-xs px-4 py-2 rounded-r uppercase tracking-wider font-medium transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      <div className="flex gap-7 text-slate-400 text-xs uppercase tracking-widest items-center">
        <Link href="/product-listing" className="hover:text-white transition-colors">Shop</Link>
        <Link href="/seller" className="hover:text-white transition-colors">Artisans</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        
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
      </div>
    </nav>
  );
}
