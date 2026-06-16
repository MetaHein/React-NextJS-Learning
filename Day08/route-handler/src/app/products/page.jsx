import ProductTable from "@/components/products/ProductTable";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>
      <ProductTable />
    </div>
  );
}
