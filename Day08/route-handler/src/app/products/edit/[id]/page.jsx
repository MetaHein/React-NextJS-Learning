import ProductForm from "@/components/products/ProductForm";

async function getProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function EditPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ProductForm product={product} isEdit={true} />
    </div>
  );
}
