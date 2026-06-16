// middleware.js - Create this NEW file in your project root
import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the path the user is trying to visit
  const path = request.nextUrl.pathname;

  // Check if user is logged in (has a token in cookies)
  const token = request.cookies.get("auth_token")?.value;

  // Define which routes need authentication
  const isProtectedRoute = path.startsWith("/products");
  const isApiRoute = path.startsWith("/api/products");

  // CASE 1: User tries to access products without login
  if (isProtectedRoute && !token) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // CASE 2: User tries to access API without login
  if (isApiRoute && !token) {
    // Return 401 Unauthorized
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Authentication required",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  // CASE 3: Everything is fine - continue
  return NextResponse.next();
}

// Configuration: Which routes to run middleware on
export const config = {
  matcher: [
    "/products/:path*", // All product routes
    "/api/products/:path*", // All product API routes
  ],
};
