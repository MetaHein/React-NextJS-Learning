import { getProductById, deleteProduct } from "@/repositories/product.repo";

export async function GET(req, { params }) {
  const id = Number(params.id);

  if (!id) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const product = await getProductById(id);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
