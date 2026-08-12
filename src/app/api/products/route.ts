import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import type { Document } from "mongodb";

export async function GET() {
    try {
        const db = await getDB();
        const products = await db.collection("products").find({}).toArray();

        const serialized = products.map((p: { _id: unknown; [k: string]: unknown }) => {
            const { _id, ...rest } = p;
            return { id: String(_id), ...(rest as Record<string, unknown>) };
        });

        return NextResponse.json(serialized);
    } catch (error) {
        console.error("/api/products error", error);
        return new Response("Database error", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const db = await getDB();

        const newProduct = {
            name: body.name,
            seller: body.seller,
            craft: body.craft,
            price: Number(body.price),
            stars: Number(body.stars ?? 0),
            description: body.description,
            details: body.details || [],
            emoji: body.emoji || "",
            bg: body.bg || "",
            imageUrl: body.imageUrl || null,
        };

        const result = await db.collection("products").insertOne(newProduct as unknown as Document);

        return NextResponse.json({ id: result.insertedId.toString(), ...newProduct }, { status: 201 });
    } catch (error) {
        console.error("/api/products POST error", error);
        return new Response("Database error", { status: 500 });
    }
}