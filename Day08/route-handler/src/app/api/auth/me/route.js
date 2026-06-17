import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service.js";

export async function GET(request) {
  try {
    // Get token from cookie
    const token = request.cookies.get("session_id")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const decoded = authService.verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get user
    const user = await authService.getCurrentUser(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive data
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get user" },
      { status: 500 },
    );
  }
}
