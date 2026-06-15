import {
  getAllProducts,
  addProduct,
  removeProduct,
} from "@/services/product.service";

export async function GET() {
  const products = await getAllProducts();

  return Response.json(products);
}

export async function POST(req) {
  const body = await req.json();

  const id = await addProduct(body);

  return Response.json({
    success: true,
    id,
  });
}
