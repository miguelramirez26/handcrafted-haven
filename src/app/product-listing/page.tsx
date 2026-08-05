"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "../data/product";

type Product = (typeof products)[number] & { imageUrl?: string };

const categories = ["Ceramics", "Jewelry", "Textiles", "Woodwork", "Art"];

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");

  const filteredProducts = useMemo(() => {
    const minimum = Number(minimumPrice);
    const maximum = Number(maximumPrice);

    return products.filter((product) => {
      const price = Number(product.price);
      const matchesCategory = selectedCategory === "All" || product.craft === selectedCategory;
      const matchesMinimum = minimumPrice === "" || price >= minimum;
      const matchesMaximum = maximumPrice === "" || price <= maximum;

      return matchesCategory && matchesMinimum && matchesMaximum;
    });
  }, [maximumPrice, minimumPrice, selectedCategory]);

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-slate-800 px-8 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-yellow-300">Marketplace catalog</p>
          <h1 className="font-merriweather text-3xl md:text-4xl">Handmade goods, made to be discovered</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            Shop one-of-a-kind pieces from independent artisans.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-8 border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <label htmlFor="filter-category" className="text-sm text-stone-700">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500">Category</span>
              <select id="filter-category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-stone-300 bg-white px-3 py-2 outline-none focus:border-amber-700">
                <option value="All">All categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <div className="flex gap-3">
              <label htmlFor="minimum-price" className="text-sm text-stone-700">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500">Min price</span>
                <input id="minimum-price" type="number" min="0" value={minimumPrice} onChange={(e) => setMinimumPrice(e.target.value)} placeholder="$0" className="w-28 border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" />
              </label>
              <label htmlFor="maximum-price" className="text-sm text-stone-700">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500">Max price</span>
                <input id="maximum-price" type="number" min="0" value={maximumPrice} onChange={(e) => setMaximumPrice(e.target.value)} placeholder="Any" className="w-28 border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" />
              </label>
            </div>
            <p className="text-sm text-stone-500">{filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found</p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group overflow-hidden border border-stone-200 bg-white transition-shadow hover:shadow-md">
                <div className={`relative flex h-48 items-center justify-center text-6xl ${product.bg}`}>
                  {product.emoji}
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs uppercase tracking-wider text-amber-700">{product.craft}</p>
                  <h2 className="font-merriweather text-lg text-stone-900 group-hover:text-amber-700">{product.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-wide text-stone-400">By {product.seller}</p>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-stone-500">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
                    <span className="font-merriweather text-lg text-amber-700">${product.price}</span>
                    <span className="text-xs text-stone-500">{product.stars ? `${product.stars}/5 rating` : "New listing"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
            <h2 className="font-merriweather text-xl text-stone-900">No products match those filters</h2>
            <button onClick={() => { setSelectedCategory("All"); setMinimumPrice(""); setMaximumPrice(""); }} className="mt-5 text-xs uppercase tracking-wider text-amber-700 underline underline-offset-4">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}