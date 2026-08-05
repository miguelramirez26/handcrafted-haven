// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password, shopName, bio } = await request.json();

    // 1. Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields (Name, Email, or Password)" },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("handcrafted_haven");

    // 3. Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email address is already registered" },
        { status: 400 }
      );
    }

    // 4. Hash the password securely using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Create the new artisan user document structured according to our data model
    const newUser = {
      name,
      email,
      password: hashedPassword, // Storing the secure hash instead of plain text
      role: "artisan",
      shopName: shopName || "",
      bio: bio || "",
      createdAt: new Date().toISOString(),
    };

    // 6. Insert document into the "users" collection
    const result = await db.collection("users").insertOne(newUser);

    return NextResponse.json(
      { message: "Artisan registered successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
