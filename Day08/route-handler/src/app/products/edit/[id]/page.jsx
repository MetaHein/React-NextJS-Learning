"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { productApi } from "@/lib/api";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const handleSubmit = async (data) => {
    try {
      await productApi.update(id, data);
      router.push("/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert(error.response?.data?.error || "Failed to update product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        Edit Product
      </h1>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        buttonText="Update Product"
      />
    </div>
  );
}
