import { NextResponse } from "next/server";
import productService from "@/services/product.service";
import { productSchema } from "@/lib/validations/product";

function isAuthenticated(request) {
  // Debug: Log all cookies
  console.log("All cookies in API:", request.cookies.getAll());

  // Check for session_id cookie
  const token = request.cookies.get("session_id")?.value;
  console.log("Token found:", token ? "Yes" : "No");

  // Also check Authorization header as fallback
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const isAuth = !!(token || tokenFromHeader);
  console.log("Is authenticated:", isAuth);

  return isAuth;
}

export async function GET(request, { params }) {
  // Check authentication
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const product = await productService.getProductById(parseInt(id));
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 },
    );
  }
}

export async function PUT(request, { params }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const validationResult = productSchema.partial().safeParse(body);

    if (!validationResult.success) {
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

    const product = await productService.updateProduct(
      parseInt(id),
      validationResult.data,
    );
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    await productService.deleteProduct(parseInt(id));
    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 },
    );
  }
}
