"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { products } from "../data/product";

type Product = (typeof products)[number] & { imageUrl?: string };

const categories = ["Ceramics", "Jewelry", "Textiles", "Woodwork", "Art"];

export default function ProductListingPage() {
  const [catalog, setCatalog] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const filteredProducts = useMemo(() => {
    const minimum = Number(minimumPrice);
    const maximum = Number(maximumPrice);

    return catalog.filter((product) => {
      const price = Number(product.price);
      const matchesCategory = selectedCategory === "All" || product.craft === selectedCategory;
      const matchesMinimum = minimumPrice === "" || price >= minimum;
      const matchesMaximum = maximumPrice === "" || price <= maximum;

      return matchesCategory && matchesMinimum && matchesMaximum;
    });
  }, [catalog, maximumPrice, minimumPrice, selectedCategory]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0];
    setImagePreview(image ? URL.createObjectURL(image) : "");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const seller = String(formData.get("seller") ?? "").trim();
    const craft = String(formData.get("category") ?? "");
    const price = String(formData.get("price") ?? "");
    const description = String(formData.get("description") ?? "").trim();

    if (!name || !seller || !craft || !price || !description) {
      setFormMessage("Please complete every product field before publishing.");
      return;
    }

    const newProduct: Product = {
      id: `local-${Date.now()}`,
      emoji: "🛍️",
      bg: "bg-rose-50",
      name,
      seller,
      craft,
      price,
      stars: 0,
      description,
      details: ["New artisan listing"],
      imageUrl: imagePreview || undefined,
    };

    setCatalog((currentCatalog) => [newProduct, ...currentCatalog]);
    event.currentTarget.reset();
    setImagePreview("");
    setFormMessage(`“${name}” is now visible in this catalog.`);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <nav className="flex items-center justify-between bg-slate-800 px-8 py-4">
        <Link href="/" className="font-merriweather text-lg text-white">
          Handcrafted <span className="text-yellow-300">Haven</span>
        </Link>
        <div className="flex gap-7 text-xs uppercase tracking-widest text-slate-400">
          <Link href="/product-listing" className="text-white transition-colors hover:text-yellow-300">
            Shop
          </Link>
          <a href="#sell" className="transition-colors hover:text-white">Sell</a>
        </div>
      </nav>

      <section className="bg-slate-800 px-8 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-yellow-300">Marketplace catalog</p>
          <h1 className="font-merriweather text-3xl md:text-4xl">Handmade goods, made to be discovered</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            Shop one-of-a-kind pieces from independent artisans, or publish your own creation for shoppers to discover.
          </p>
        </div>
      </section>

      <section id="sell" className="mx-auto max-w-6xl px-8 pt-10">
        <div className="border border-stone-200 bg-white p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-amber-700">For artisans</p>
          <h2 className="mt-2 font-merriweather text-2xl text-stone-900">List a handcrafted item</h2>
          <p className="mt-2 text-sm text-stone-500">Add the essentials now. Your new listing will appear in the catalog below for this browser session.</p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="text-sm text-stone-700">
              Product name
              <input name="name" required className="mt-2 block w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" placeholder="e.g. Handwoven wall hanging" />
            </label>
            <label className="text-sm text-stone-700">
              Artisan name
              <input name="seller" required className="mt-2 block w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" placeholder="Your shop or name" />
            </label>
            <label className="text-sm text-stone-700">
              Category
              <select name="category" required defaultValue="" className="mt-2 block w-full border border-stone-300 bg-white px-3 py-2 outline-none focus:border-amber-700">
                <option value="" disabled>Select a category</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label className="text-sm text-stone-700">
              Price (USD)
              <input name="price" type="number" min="0" step="0.01" required className="mt-2 block w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" placeholder="0.00" />
            </label>
            <label className="text-sm text-stone-700 md:col-span-2">
              Description
              <textarea name="description" required rows={4} className="mt-2 block w-full resize-y border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" placeholder="Describe the materials, process, dimensions, and story behind your item." />
            </label>
            <div className="md:col-span-2">
              <label htmlFor="image" className="text-sm text-stone-700">Product image</label>
              <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-2 block w-full text-sm text-stone-500 file:mr-4 file:border-0 file:bg-amber-700 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-white hover:file:bg-amber-800" />
              {imagePreview && (
                <Image src={imagePreview} alt="Product image preview" width={240} height={180} unoptimized className="mt-4 h-44 w-60 object-cover" />
              )}
            </div>
            <div className="md:col-span-2 flex flex-wrap items-center gap-4">
              <button type="submit" className="bg-amber-700 px-5 py-3 text-xs uppercase tracking-wider text-white transition-colors hover:bg-amber-800">
                Publish listing
              </button>
              {formMessage && <p aria-live="polite" className="text-sm text-emerald-700">{formMessage}</p>}
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-8 border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <label htmlFor="filter-category" className="text-sm text-stone-700">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500">Category</span>
              <select id="filter-category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="border border-stone-300 bg-white px-3 py-2 outline-none focus:border-amber-700">
                <option value="All">All categories</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <div className="flex gap-3">
              <label htmlFor="minimum-price" className="text-sm text-stone-700">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500">Minimum price</span>
                <input id="minimum-price" type="number" min="0" value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} placeholder="$0" className="w-28 border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" />
              </label>
              <label htmlFor="maximum-price" className="text-sm text-stone-700">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500">Maximum price</span>
                <input id="maximum-price" type="number" min="0" value={maximumPrice} onChange={(event) => setMaximumPrice(event.target.value)} placeholder="Any" className="w-28 border border-stone-300 px-3 py-2 outline-none focus:border-amber-700" />
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
                  {product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill unoptimized className="object-cover" /> : product.emoji}
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
            <button onClick={() => { setSelectedCategory("All"); setMinimumPrice(""); setMaximumPrice(""); }} className="mt-5 text-xs uppercase tracking-wider text-amber-700 underline underline-offset-4">Clear filters</button>
          </div>
        )}
      </section>
    </main>
  );
}
