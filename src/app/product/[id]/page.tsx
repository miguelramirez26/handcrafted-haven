import Navbar from '@/app/navbar';

const products = [
  {
    id: "1",
    emoji: "🏺",
    bg: "bg-amber-50",
    name: "Hand-thrown vase",
    seller: "Elena M.",
    craft: "Ceramics",
    price: "$48",
    stars: 5,
    description: "A beautifully hand-thrown ceramic vase, crafted with care using traditional techniques. Each piece is unique, with subtle variations in glaze and form that make it truly one of a kind.",
    details: ["Height: 12 inches", "Glazed stoneware", "Food safe", "Handwash recommended"],
  },
  {
    id: "2",
    emoji: "📿",
    bg: "bg-violet-50",
    name: "Silver necklace",
    seller: "Yayra K.",
    craft: "Jewelry",
    price: "$72",
    stars: 4,
    description: "A delicate handcrafted silver necklace with an elegant pendant. Made using traditional silversmithing techniques passed down through generations.",
    details: ["Sterling silver 925", "Chain length: 18 inches", "Pendant: 1.2 inches", "Comes in gift box"],
  },
  {
    id: "3",
    emoji: "🧺",
    bg: "bg-green-50",
    name: "Woven basket",
    seller: "Prayer M.",
    craft: "Textiles",
    price: "$35",
    stars: 5,
    description: "A handwoven basket made from sustainably sourced natural fibers. Perfect for storage, display, or as a thoughtful gift.",
    details: ["Natural seagrass", "Diameter: 14 inches", "Height: 10 inches", "Eco-friendly materials"],
  },
  {
    id: "4",
    emoji: "🪵",
    bg: "bg-orange-50",
    name: "Oak cutting board",
    seller: "Stephen S.",
    craft: "Woodwork",
    price: "$60",
    stars: 5,
    description: "A solid oak cutting board crafted with precision and finished with food-safe oil. Built to last a lifetime with proper care.",
    details: ["Solid white oak", "16\" x 12\" x 1\"", "Food-safe finish", "Hand wash only"],
  },
];

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) || products[0];

  return (
    <main>
      {<Navbar />}

      {/* BREADCRUMB */}
      <div className="px-8 py-3 bg-stone-100 border-b border-stone-200 text-xs text-stone-400 uppercase tracking-wider">
        <a href="/" className="hover:text-amber-700 transition-colors">Home</a>
        <span className="mx-2">→</span>
        <span>{product.craft}</span>
        <span className="mx-2">→</span>
        <span className="text-stone-600">{product.name}</span>
      </div>

      {/* PRODUCT */}
      <section className="px-8 py-12 bg-stone-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className={`${product.bg} flex items-center justify-center rounded-sm h-80 text-8xl`}>
            {product.emoji}
          </div>

          {/* INFO */}
          <div>
            <p className="text-amber-700 text-xs uppercase tracking-widest mb-2">✦ {product.craft}</p>
            <h1 className="font-merriweather text-3xl text-stone-900 mb-2">{product.name}</h1>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-4">by {product.seller}</p>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-amber-500 text-sm">{"★".repeat(product.stars)}{"☆".repeat(5 - product.stars)}</span>
              <span className="text-xs text-stone-400">({product.stars}.0)</span>
            </div>

            <p className="font-merriweather text-3xl text-amber-700 mb-6">{product.price}</p>

            <p className="text-stone-500 text-sm leading-relaxed mb-6">{product.description}</p>

            <ul className="mb-8 space-y-1">
              {product.details.map((d) => (
                <li key={d} className="text-xs text-stone-400 uppercase tracking-wide flex items-center gap-2">
                  <span className="text-amber-700">✦</span> {d}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button className="flex-1 bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider py-3 transition-colors">
                Add to cart
              </button>
              <button className="border border-stone-300 hover:border-stone-500 text-stone-600 text-xs uppercase tracking-wider px-6 py-3 transition-colors">
                ♡ Save
              </button>
            </div>
          </div>
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