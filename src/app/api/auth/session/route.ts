// src/app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    // If no session cookie exists, the user is unauthenticated
    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Parse the stored serialized string back into a functional object
    const user = JSON.parse(sessionCookie.value);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Session Fetch Error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
