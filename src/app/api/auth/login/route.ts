// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("handcrafted_haven");

    // 3. Find the user by email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Verify the password hash securely using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 5. Create a secure session payload (excluding the password)
    const sessionData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      shopName: user.shopName || ""
    };

    // 6. Set the encrypted/serialized cookie using Next.js cookies API
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true, // Prevents client-side JS scripts from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Forces HTTPS in production builds
      maxAge: 60 * 60 * 24 * 7, // Cookie expiration timeline set to 1 week (in seconds)
      path: "/", // Available across all routing blocks of the application
    });

    return NextResponse.json(
      { message: "Login successful", user: sessionData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
