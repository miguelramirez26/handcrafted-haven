import Link from "next/link";
import clientPromise from "../lib/mongodb";

async function getFeaturedProducts() {
  const client = await clientPromise;
  const db = client.db("handcrafted_haven");
  const products = await db.collection("products").find({}).limit(4).toArray();
  return products.map((p) => ({
    id: p._id.toString(),
    emoji: p.emoji || "📦",
    bg: p.bg || "bg-stone-50",
    name: p.name,
    seller: `${p.sellerName} · ${p.craft}`,
    price: `$${p.price}`,
    stars: p.stars ? "★".repeat(Math.round(p.stars)) + "☆".repeat(5 - Math.round(p.stars)) : "New",
  }));
}

async function getFeaturedArtisans() {
  const client = await clientPromise;
  const db = client.db("handcrafted_haven");
  const users = await db.collection("users").find({}).limit(3).toArray();
  return users.map((u) => ({
    id: u._id.toString(),
    initials: u.name.slice(0, 2).toUpperCase(),
    name: u.name,
    craft: u.shopName || "Artisan",
    bg: "bg-amber-100",
    text: "text-amber-800",
  }));
}

export default async function Home() {
  const products = await getFeaturedProducts();
  const artisans = await getFeaturedArtisans();

  return (
    <main>
      {/* HERO */}
      <section className="bg-slate-800 px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-300 text-xs uppercase tracking-widest mb-5">✦ The artisan marketplace</p>
          <h1 className="font-merriweather text-white text-4xl leading-snug max-w-lg mb-5">
            Where craft meets <em className="text-yellow-300">conscious</em> commerce
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8 font-light">
            Discover unique handmade treasures from talented artisans around the world. Every piece tells a story.
          </p>
          <div className="flex gap-3">
            <Link href="/product-listing" className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider px-7 py-3 transition-colors">
              Shop now
            </Link>
            <Link href="/signup" className="border border-slate-500 hover:border-slate-300 text-white text-xs uppercase tracking-wider px-7 py-3 transition-colors">
              Become a seller
            </Link>
          </div>
          <div className="flex gap-10 mt-12 pt-8 border-t border-slate-700">
            {[["2,400+", "Artisans"], ["18k+", "Products"], ["94%", "5-star reviews"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-merriweather text-white text-2xl mb-1">{num}</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-amber-700 py-2 overflow-hidden whitespace-nowrap">
        <span className="inline-block text-white text-xs uppercase tracking-widest animate-marquee">
          ✦ Handmade with love &nbsp;&nbsp;&nbsp; ✦ Support local artisans &nbsp;&nbsp;&nbsp; ✦ Unique pieces only &nbsp;&nbsp;&nbsp; ✦ Sustainable crafting &nbsp;&nbsp;&nbsp; ✦ Handmade with love &nbsp;&nbsp;&nbsp; ✦ Support local artisans &nbsp;&nbsp;&nbsp; ✦ Unique pieces only &nbsp;&nbsp;&nbsp; ✦ Sustainable crafting &nbsp;&nbsp;&nbsp;
        </span>
      </div>

      {/* PRODUCTS */}
      <section className="px-8 py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-700 text-xs uppercase tracking-widest mb-2">✦ Explore</p>
          <h2 className="font-merriweather text-2xl text-stone-900 mb-1">Browse by category</h2>
          <p className="text-stone-500 text-sm font-light mb-6">Find the perfect handcrafted piece</p>
          <div className="flex gap-2 flex-wrap mb-6">
            {["All", "Jewelry", "Ceramics", "Textiles", "Woodwork", "Art"].map((cat, i) => (
              <button key={cat} className={`px-4 py-1.5 text-xs uppercase tracking-wider border transition-colors ${i === 0 ? "bg-slate-800 text-white border-slate-800" : "border-stone-300 text-stone-500 hover:border-stone-500"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200 border border-stone-200">
            {products.map((p) => (
              <Link href={`/product/${p.id}`} key={p.id} className="bg-stone-50 hover:opacity-80 transition-opacity">
                <div className={`h-28 flex items-center justify-center text-4xl ${p.bg}`}>{p.emoji}</div>
                <div className="p-4 border-t border-stone-200">
                  <div className="text-sm font-medium text-stone-900 mb-0.5">{p.name}</div>
                  <div className="text-xs text-stone-400 uppercase tracking-wide mb-3">{p.seller}</div>
                  <div className="flex justify-between items-center">
                    <span className="font-merriweather text-amber-700 text-base">{p.price}</span>
                    <span className="text-amber-500 text-xs">{p.stars}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="bg-stone-100 px-8 py-10 border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-700 text-xs uppercase tracking-widest mb-2">✦ Featured</p>
          <h2 className="font-merriweather text-xl text-stone-900 mb-5">Meet our artisans</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {artisans.map((a) => (
              <Link href={`/seller/${a.id}`} key={a.id} className="flex items-center gap-3 bg-white p-4 border border-stone-200 hover:opacity-80 transition-opacity">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${a.bg} ${a.text} shrink-0`}>
                  {a.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-900">{a.name}</div>
                  <div className="text-xs text-stone-400 uppercase tracking-wide mt-0.5">{a.craft}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}