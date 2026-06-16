import { NextResponse } from "next/server";
import productService from "@/services/product.service";

function isAuthenticated(request) {
  // Debug: Log all cookies
  console.log("All cookies in API:", request.cookies.getAll());

  const token = request.cookies.get("auth_token")?.value;
  console.log("Token found:", token ? "Yes" : "No");

  return !!token;
}

export async function GET(request) {
  // Check authentication
  if (!isAuthenticated(request)) {
    console.log("401 - No auth token");
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const products = await productService.getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const product = await productService.createProduct(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
