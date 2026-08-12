import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

async function getSellerWithProducts(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("handcrafted_haven");

    const seller = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!seller) return null;

    const products = await db.collection("products").find({ sellerId: id }).toArray();

    return {
      id: seller._id.toString(),
      initials: seller.name.slice(0, 2).toUpperCase(),
      name: seller.name,
      craft: seller.shopName || "Artisan",
      since: seller.createdAt ? new Date(seller.createdAt).getFullYear().toString() : "2024",
      bio: seller.bio || "No biography available yet.",
      stats: {
        products: products.length,
        rating: seller.rating || "No ratings",
        sales: seller.salesCount || 0,
      },
      products: products.map((p) => ({
        name: p.name,
        emoji: p.emoji || "📦",
        price: `$${p.price}`,
        bg: p.bg || "bg-stone-50",
      })),
      reviews: seller.reviews || [],
      bg: seller.bg || "bg-amber-50",
      color: seller.color || "text-amber-700",
    };
  } catch (error) {
    return null;
  }
}

export default async function SellerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = await getSellerWithProducts(id);

  if (!seller) {
    return (
      <main className="px-8 py-12 text-center">
        <h1 className="text-xl font-bold text-stone-800">Artisan not found</h1>
        <p className="text-stone-500 text-sm mt-2">The ID "{id}" does not match any registered artisan.</p>
        <a href="/" className="text-amber-700 underline text-sm mt-4 inline-block">Back to home</a>
      </main>
    );
  }

  return (
    <main>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seller.products.map((p) => (
            <div key={p.name} className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between hover:opacity-90 transition-opacity">
              <div className={`h-32 flex items-center justify-center text-4xl ${p.bg}`}>
                {p.emoji}
              </div>
              <div className="p-4 border-t border-stone-100 bg-stone-50/50">
                <div className="text-sm font-medium text-stone-900 mb-1">{p.name}</div>
                <div className="font-merriweather text-amber-700 text-base">{p.price}</div>
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
          {seller.reviews.length > 0 ? (
            seller.reviews.map((r: any) => (
              <div key={r.author} className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-stone-900">{r.author}</span>
                  <span className="text-amber-500 text-xs">{"★".repeat(r.stars)}</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed font-light">{r.text}</p>
              </div>
            ))
          ) : (
            <p className="text-stone-400 text-sm italic font-light">No reviews yet for this artisan.</p>
          )}
        </div>
      </section>
    </main>
  );
}
