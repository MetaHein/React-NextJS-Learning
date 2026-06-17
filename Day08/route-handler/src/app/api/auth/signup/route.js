import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service.js";
import { validateSignup } from "@/lib/validations/auth.js";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Signup request body:", body);

    // Validate input in the API route
    const validation = validateSignup(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(", ") },
        { status: 400 },
      );
    }

    const result = await authService.signup(body);

    // Create response with the result
    const response = NextResponse.json(result, { status: 201 });

    // Set HTTP-only cookie for middleware
    response.cookies.set({
      name: "session_id",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Signup failed" },
      { status: 400 },
    );
  }
}
