export default function Home() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="bg-slate-800 px-8 py-4 flex justify-between items-center">
        <span className="font-merriweather text-white text-lg">
          Handcrafted <span className="text-yellow-300">Haven</span>
        </span>
        <div className="flex gap-7 text-slate-400 text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Shop</a>
          <a href="#" className="hover:text-white transition-colors">Artisans</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
        <button className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider px-4 py-2 rounded transition-colors">
          Sign in
        </button>
      </nav>

      {/* HERO */}
      <section className="bg-slate-800 px-8 py-16">
        <p className="text-yellow-300 text-xs uppercase tracking-widest mb-5">✦ The artisan marketplace</p>
        <h1 className="font-merriweather text-white text-4xl leading-snug max-w-lg mb-5">
          Where craft meets <em className="text-yellow-300">conscious</em> commerce
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8 font-light">
          Discover unique handmade treasures from talented artisans around the world. Every piece tells a story.
        </p>
        <div className="flex gap-3">
          <button className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider px-7 py-3 transition-colors">
            Shop now
          </button>
          <button className="border border-slate-500 hover:border-slate-300 text-white text-xs uppercase tracking-wider px-7 py-3 transition-colors">
            Become a seller
          </button>
        </div>
        <div className="flex gap-10 mt-12 pt-8 border-t border-slate-700">
          {[["2,400+", "Artisans"], ["18k+", "Products"], ["94%", "5-star reviews"]].map(([num, label]) => (
            <div key={label}>
              <div className="font-merriweather text-white text-2xl mb-1">{num}</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest">{label}</div>
            </div>
          ))}
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
          {[
            { emoji: "🏺", bg: "bg-amber-50", name: "Hand-thrown vase", seller: "Elena M. · Ceramics", price: "$48", stars: "★★★★★" },
            { emoji: "📿", bg: "bg-violet-50", name: "Silver necklace", seller: "Yayra K. · Jewelry", price: "$72", stars: "★★★★☆" },
            { emoji: "🧺", bg: "bg-green-50", name: "Woven basket", seller: "Prayer M. · Textiles", price: "$35", stars: "★★★★★" },
            { emoji: "🪵", bg: "bg-orange-50", name: "Oak cutting board", seller: "Stephen S. · Woodwork", price: "$60", stars: "★★★★★" },
          ].map((p) => (
            <div key={p.name} className="bg-stone-50">
              <div className={`h-28 flex items-center justify-center text-4xl ${p.bg}`}>{p.emoji}</div>
              <div className="p-4 border-t border-stone-200">
                <div className="text-sm font-medium text-stone-900 mb-0.5">{p.name}</div>
                <div className="text-xs text-stone-400 uppercase tracking-wide mb-3">{p.seller}</div>
                <div className="flex justify-between items-center">
                  <span className="font-merriweather text-amber-700 text-base">{p.price}</span>
                  <span className="text-amber-500 text-xs">{p.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTISANS */}
      <section className="bg-stone-100 px-8 py-10 border-t border-b border-stone-200">
        <p className="text-amber-700 text-xs uppercase tracking-widest mb-2">✦ Featured</p>
        <h2 className="font-merriweather text-xl text-stone-900 mb-5">Meet our artisans</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { initials: "EM", name: "Elena M.", craft: "Ceramics", bg: "bg-amber-100", text: "text-amber-800" },
            { initials: "YK", name: "Yayra K.", craft: "Jewelry", bg: "bg-violet-100", text: "text-violet-800" },
            { initials: "PM", name: "Prayer M.", craft: "Textiles", bg: "bg-green-100", text: "text-green-800" },
            { initials: "SS", name: "Stephen S.", craft: "Woodwork", bg: "bg-orange-100", text: "text-orange-800" },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-3 bg-white p-4 border border-stone-200">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${a.bg} ${a.text} shrink-0`}>
                {a.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-stone-900">{a.name}</div>
                <div className="text-xs text-stone-400 uppercase tracking-wide mt-0.5">{a.craft}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-800 px-8 py-6 flex justify-between items-center">
        <span className="font-merriweather text-white text-sm">
          Handcrafted <span className="text-yellow-300">Haven</span>
        </span>
        <span className="text-slate-500 text-xs tracking-wide">© 2026 Team 14 · WDD 430</span>
      </footer>
    </main>
  );
}