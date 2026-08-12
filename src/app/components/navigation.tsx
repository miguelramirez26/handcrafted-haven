"use client";

import { useState } from "react";
import type { FormEventHandler } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const searchTerm = search.trim();

        if (searchTerm) {
            router.push(`/product-listing?search=${encodeURIComponent(searchTerm)}`);
        } else {
            router.push("/product-listing");
        }
    };

    return (
        <nav className="bg-slate-800 px-8 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/" className="font-merriweather text-lg text-white">
                    Handcrafted <span className="text-yellow-300">Haven</span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:block">
                        <Link href="/product-listing" className="text-sm text-slate-200 hover:text-yellow-300 mr-6">
                            Shop
                        </Link>
                        <Link href="/about" className="text-sm text-slate-200 hover:text-yellow-300">
                            About
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products"
                            className="rounded-l-md px-3 py-2 text-sm outline-none"
                        />
                        <button type="submit" className="bg-amber-700 px-3 py-2 rounded-r-md text-white text-sm">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}