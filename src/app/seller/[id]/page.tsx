import Navbar from '@/app/navbar';

const sellers = [
    {
        id: "1",
        initials: "EM",
        name: "Elena M.",
        craft: "Ceramics",
        since: "2022",
        bio: "I'm a ceramic artist based in Portland, OR. I create hand-thrown stoneware pieces inspired by nature and everyday life. Each piece is made with love and fired in my backyard kiln.",
        stats: { products: 24, rating: 4.9, sales: 142 },
        products: [
            { emoji: "🏺", name: "Hand-thrown vase", price: "$48" },
            { emoji: "🫙", name: "Ceramic jar", price: "$35" },
            { emoji: "🍵", name: "Tea mug set", price: "$62" },
            { emoji: "🥣", name: "Serving bowl", price: "$55" },
        ],
        reviews: [
            { author: "Sarah K.", stars: 5, text: "Absolutely stunning vase — the glaze is even more beautiful in person. Arrived perfectly packaged. Will definitely order again!" },
            { author: "James R.", stars: 5, text: "The tea mug set is gorgeous. You can really feel the craftsmanship in every piece. A wonderful gift." },
        ],
        bg: "bg-amber-50",
        color: "text-amber-700",
    },
    {
        id: "2",
        initials: "SS",
        name: "Stephen S.",
        craft: "Woodwork",
        since: "2021",
        bio: "Woodworker and furniture maker from Austin, TX. I craft functional pieces using sustainably sourced hardwoods, blending traditional joinery with modern design.",
        stats: { products: 18, rating: 4.8, sales: 98 },
        products: [
            { emoji: "🪵", name: "Oak cutting board", price: "$60" },
            { emoji: "🪑", name: "Walnut stool", price: "$180" },
            { emoji: "🖼️", name: "Picture frame", price: "$45" },
            { emoji: "📦", name: "Keepsake box", price: "$75" },
        ],
        reviews: [
            { author: "Mike T.", stars: 5, text: "The cutting board is incredible quality. Super heavy and well finished. Best one I've ever owned." },
            { author: "Laura P.", stars: 5, text: "Bought the keepsake box as a gift — it was a huge hit. Beautiful craftsmanship." },
        ],
        bg: "bg-orange-50",
        color: "text-orange-700",
    },
    {
        id: "3",
        initials: "DK",
        name: "Dennis K.",
        craft: "Woodwork",
        since: "2023",
        bio: "Woodworker and craftsman from Ghana. I create handcrafted wooden pieces inspired by traditional African designs, blending heritage techniques with contemporary aesthetics.",
        stats: { products: 8, rating: 4.8, sales: 32 },
        products: [
            { emoji: "🪵", name: "Carved bowl", price: "$45" },
            { emoji: "📦", name: "Keepsake box", price: "$60" },
            { emoji: "🖼️", name: "Picture frame", price: "$38" },
            { emoji: "🪑", name: "Wooden stool", price: "$120" },
        ],
        reviews: [
            { author: "Mark T.", stars: 5, text: "The carved bowl is absolutely beautiful. You can feel the craftsmanship in every detail." },
            { author: "Lisa M.", stars: 5, text: "Stunning keepsake box, perfect as a gift. Great communication from the seller too!" },
        ],
        bg: "bg-green-50",
        color: "text-green-700",
    },
];

export default async function SellerProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const seller = sellers.find((s) => s.id === id) || sellers[0];

    return (
        <main>
            {<Navbar />}

            {/* BREADCRUMB */}
            <div className="px-8 py-3 bg-stone-100 border-b border-stone-200 text-xs text-stone-400 uppercase tracking-wider">
                <a href="/" className="hover:text-amber-700 transition-colors">Home</a>
                <span className="mx-2">→</span>
                <span>Artisans</span>
                <span className="mx-2">→</span>
                <span className="text-stone-600">{seller.name}</span>
            </div>

            {/* HERO */}
            <div className="bg-slate-800 px-8 pt-10 pb-20">
                <p className="text-yellow-300 text-xs uppercase tracking-widest mb-2">✦ Artisan profile</p>
                <h1 className="font-merriweather text-3xl text-white mb-1">{seller.name}</h1>
                <p className="text-slate-400 text-xs uppercase tracking-wider">{seller.craft} · Member since {seller.since}</p>
            </div>

            {/* PROFILE CARD */}
            <div className="mx-8 -mt-12 bg-white border border-stone-200 rounded-xl p-6 flex gap-6 items-start relative z-10">
                <div className={`w-20 h-20 rounded-full ${seller.bg} flex items-center justify-center font-merriweather text-2xl ${seller.color} shrink-0 border-4 border-white`}>
                    {seller.initials}
                </div>
                <div className="flex-1">
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 font-light">{seller.bio}</p>
                    <div className="flex gap-6">
                        {[
                            [seller.stats.products, "Products"],
                            [seller.stats.rating, "Rating"],
                            [seller.stats.sales, "Sales"],
                        ].map(([num, label]) => (
                            <div key={label as string} className="text-center">
                                <div className="font-merriweather text-lg text-stone-900">{num}</div>
                                <div className="text-xs text-stone-400 uppercase tracking-wider mt-0.5">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider px-5 py-2 transition-colors shrink-0 self-center">
                    Follow
                </button>
            </div>

            {/* PRODUCTS */}
            <section className="px-8 py-10">
                <p className="text-amber-700 text-xs uppercase tracking-widest mb-2">✦ Shop</p>
                <h2 className="font-merriweather text-xl text-stone-900 mb-5">{seller.name.split(" ")[0]}'s products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200 border border-stone-200">
                    {seller.products.map((p) => (
                        <div key={p.name} className="bg-stone-50">
                            <div className={`h-24 flex items-center justify-center text-4xl ${seller.bg}`}>{p.emoji}</div>
                            <div className="p-3 border-t border-stone-200">
                                <div className="text-xs font-medium text-stone-900 mb-1">{p.name}</div>
                                <div className="font-merriweather text-amber-700 text-sm">{p.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section className="px-8 pb-10">
                <p className="text-amber-700 text-xs uppercase tracking-widest mb-2">✦ Feedback</p>
                <h2 className="font-merriweather text-xl text-stone-900 mb-5">Customer reviews</h2>
                <div className="flex flex-col gap-3">
                    {seller.reviews.map((r) => (
                        <div key={r.author} className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-stone-900">{r.author}</span>
                                <span className="text-amber-500 text-xs">{"★".repeat(r.stars)}</span>
                            </div>
                            <p className="text-stone-500 text-sm leading-relaxed font-light">{r.text}</p>
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