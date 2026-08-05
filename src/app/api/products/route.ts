// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { cookies } from "next/headers";

const themeMap: Record<string, { emojis: string[]; bgs: string[] }> = {
  Ceramics: {
    emojis: ["🏺", "☕", "🥣", "🍽️"],
    bgs: ["bg-amber-50", "bg-orange-50", "bg-yellow-50"]
  },
  Jewelry: {
    emojis: ["📿", "💍", "💎", "👑"],
    bgs: ["bg-purple-50", "bg-pink-50", "bg-indigo-50"]
  },
  Textiles: {
    emojis: ["🧺", "🧵", "🧶", "🧥"],
    bgs: ["bg-emerald-50", "bg-teal-50", "bg-green-50"]
  },
  Woodwork: {
    emojis: ["🪵", "🪑", "🔨", "🪓"],
    bgs: ["bg-stone-100", "bg-orange-100", "bg-amber-100"]
  },
  Art: {
    emojis: ["🎨", "🖼️", "🖌️", "✏️"],
    bgs: ["bg-sky-50", "bg-blue-50", "bg-violet-50"]
  }
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("handcrafted_haven");
    const productsCursor = await db.collection("products").find({}).toArray();

    const products = productsCursor.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      craft: doc.craft,
      price: Number(doc.price),
      description: doc.description || "",
      emoji: doc.emoji || "📦",
      bg: doc.bg || "bg-stone-50",
      stars: doc.stars || 0,
      sellerId: doc.sellerId || "",
      sellerName: doc.sellerName || "Unknown Artisan",
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal server error while loading inventory" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Verify the artisan's identity via backend cookies for secure tracking
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to list items." },
        { status: 401 }
      );
    }

    const currentArtisan = JSON.parse(sessionCookie.value);
    const { name, craft, price, description } = await request.json();

    if (!name || !craft || !price || !description) {
      return NextResponse.json(
        { error: "Missing required product specifications" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("handcrafted_haven");

    const theme = themeMap[craft] || { emojis: ["📦"], bgs: ["bg-stone-50"] };
    const randomEmoji = theme.emojis[Math.floor(Math.random() * theme.emojis.length)];
    const randomBg = theme.bgs[Math.floor(Math.random() * theme.bgs.length)];

    // 2. Build the completed data object containing explicit seller attributes
    const newProduct = {
      name,
      craft,
      price: Number(price),
      description,
      emoji: randomEmoji,
      bg: randomBg,
      stars: 0,
      sellerId: currentArtisan.id, // Linking item directly to the active user's ID
      sellerName: currentArtisan.name, // Linking item directly to the active user's name
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json(
      { message: "Product listed successfully", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Insert Error:", error);
    return NextResponse.json(
      { error: "Internal server error while publishing item" },
      { status: 500 }
    );
  }
}
