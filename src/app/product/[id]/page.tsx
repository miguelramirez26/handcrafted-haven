import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

async function getProduct(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("handcrafted_haven");
    
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    if (!product) return null;

    return {
      id: product._id.toString(),
      emoji: product.emoji || "📦",
      bg: product.bg || "bg-stone-50",
      name: product.name,
      seller: product.sellerName,
      craft: product.craft,
      price: `$${product.price}`,
      stars: product.stars || 5,
      description: product.description || "",
      details: product.details || [],
    };
  } catch (error) {
    return null;
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="px-8 py-12 text-center">
        <h1 className="text-xl font-bold text-stone-800">Product not found</h1>
        <p className="text-stone-500 text-sm mt-2">The ID "{id}" does not match any product.</p>
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
              {product.details.map((d: string) => (
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
    </main>
  );
}
