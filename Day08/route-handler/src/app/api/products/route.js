import { NextResponse } from "next/server";
import productService from "@/services/product.service";
import { productSchema } from "@/lib/validations/product";

function isAuthenticated(request) {
  // Debug: Log all cookies
  console.log("All cookies in API:", request.cookies.getAll());

  // FIX: Check for 'session_id' instead of 'auth_token'
  const token = request.cookies.get("session_id")?.value;
  console.log("Token found:", token ? "Yes" : "No");

  // Also check Authorization header as fallback
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  return !!(token || tokenFromHeader);
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

    // Validate the request body with Zod
    const validationResult = productSchema.safeParse(body);

    if (!validationResult.success) {
      // Return validation errors
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    // Use the validated data
    const product = await productService.createProduct(validationResult.data);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
