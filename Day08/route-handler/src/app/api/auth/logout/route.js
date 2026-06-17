import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Create response with success message
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Method 1: Clear with maxAge: 0
    response.cookies.set({
      name: "session_id",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    // Method 2: Also set an expired date
    response.cookies.set({
      name: "session_id",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // Expired date
      path: "/",
    });

    // Method 3: Clear without httpOnly (for client-side)
    response.cookies.set({
      name: "session_id",
      value: "",
      httpOnly: false, // Allow client to see it's cleared
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: error.message || "Logout failed" },
      { status: 500 },
    );
  }
}
