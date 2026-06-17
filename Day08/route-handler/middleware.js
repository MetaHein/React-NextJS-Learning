import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Debug: Log all cookies
  console.log("All cookies in API:", request.cookies.getAll());

  // Check for 'session_id' cookie
  const token = request.cookies.get("session_id")?.value;
  console.log("Token found:", token ? "Yes" : "No");

  // Store token in request headers for API routes
  if (token && pathname.startsWith("/api")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${token}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const isProtectedRoute =
    pathname.startsWith("/posts") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/products") ||
    pathname.startsWith("/api/posts") ||
    pathname.startsWith("/api/auth/me");

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (isProtectedRoute && !token) {
    console.log(`401 - No auth token for ${pathname}`);
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    console.log(`Redirecting from ${pathname} to /posts (already logged in)`);
    const postUrl = new URL("/posts", request.url);
    return NextResponse.redirect(postUrl);
  }

  console.log(`Route ${pathname} - Allowed`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/posts/:path*",
    "/dashboard/:path*",
    "/api/:path*",
    "/login",
    "/register",
  ],
};
