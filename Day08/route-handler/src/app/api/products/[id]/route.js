import { NextResponse } from "next/server";
import productService from "@/services/product.service";

export async function GET(request, { params }) {
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

export async function PUT(request, { params }) {
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

export async function DELETE(request, { params }) {
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
