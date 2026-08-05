// src/app/dashboard/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Client-side mapping to display a matching preview emoji when category changes
const defaultEmojis: Record<string, string> = {
  Ceramics: "🏺",
  Jewelry: "📿",
  Textiles: "🧺",
  Woodwork: "🪵",
  Art: "🎨",
};

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    craft: "Ceramics",
    emoji: "🏺",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Automatically update the preview emoji whenever the craft category changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      emoji: defaultEmojis[prev.craft] || "📦",
    }));
  }, [formData.craft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 px-8 py-12 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white border border-stone-200 p-8 shadow-sm">
        <div className="mb-8 border-b border-stone-100 pb-4">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-medium">Inventory Management</span>
          <h1 className="font-merriweather text-2xl text-stone-900 mt-1">List a New Product</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Product Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Hand-carved wooden bowl" className="w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700 bg-white text-stone-950" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Item Emoji</label>
              <div className="w-full border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xl text-stone-800 select-none">
                {formData.emoji}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Craft Category *</label>
            <select name="craft" value={formData.craft} onChange={handleChange} className="w-full border border-stone-300 bg-white px-3 py-2 outline-none focus:border-amber-700 text-stone-950">
              <option value="Ceramics">Ceramics</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Textiles">Textiles</option>
              <option value="Woodwork">Woodwork</option>
              <option value="Art">Art</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Price (USD) *</label>
            <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700 bg-white text-stone-950" />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Full Description *</label>
            <textarea name="description" required rows={5} value={formData.description} onChange={handleChange} placeholder="Describe the materials used, your crafting technique, size, and care instructions..." className="w-full border border-stone-300 px-3 py-2 outline-none focus:border-amber-700 bg-white text-stone-950 resize-none" />
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={() => router.push("/dashboard")} className="w-1/2 border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium py-2 transition-colors text-sm text-center">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="w-1/2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 transition-colors disabled:bg-slate-400 text-sm">
              {loading ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
