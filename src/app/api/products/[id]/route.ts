// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce active authentication session check prior to executing entity deletion
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized operation. Session expired." },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 2. Open live connection pipeline to the cloud cluster infrastructure
    const client = await clientPromise;
    const db = client.db("handcrafted_haven");

    // 3. Purge the target product document matching the parameter payload identifier
    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Target inventory listing item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Inventory listing item purged successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Delete Operation Error:", error);
    return NextResponse.json(
      { error: "Internal server error during inventory purge sequence" },
      { status: 500 }
    );
  }
}
