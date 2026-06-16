"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { productApi } from "@/lib/api";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await productApi.create(data);
      router.push("/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      alert(error.response?.data?.error || "Failed to create product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Product
      </h1>
      <div className="max-w-md">
        <ProductForm onSubmit={handleSubmit} buttonText="Create Product" />
      </div>
    </div>
  );
}
