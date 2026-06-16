import { NextResponse } from "next/server";
import productService from "@/services/product.service";

// ADD THIS HELPER FUNCTION
function isAuthenticated(request) {
  const token = request.cookies.get("auth_token")?.value;
  return !!token;
}

// GET single product
export async function GET(request, { params }) {
  // ADD THIS AUTH CHECK
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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 },
    );
  }
}

// PUT update product
export async function PUT(request, { params }) {
  // ADD THIS AUTH CHECK
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const product = await productService.updateProduct(parseInt(id), body);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  // ADD THIS AUTH CHECK
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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 },
    );
  }
}
