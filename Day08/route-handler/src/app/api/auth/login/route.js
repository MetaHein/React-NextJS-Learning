import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service.js";
import { validateLogin } from "@/lib/validations/auth.js";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Login request body:", body);

    // Validate input in the API route
    const validation = validateLogin(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(", ") },
        { status: 400 },
      );
    }

    const result = await authService.login(body);

    // Create response with the result
    const response = NextResponse.json(result, { status: 200 });

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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 400 },
    );
  }
}
