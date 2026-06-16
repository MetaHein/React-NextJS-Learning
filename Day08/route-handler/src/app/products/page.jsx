"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "@/components/products/ProductTable";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      //  Check if cookie exists before making API call
      const hasCookie = document.cookie.includes("auth_token");
      console.log("Has auth_token cookie?", hasCookie);
      console.log("All cookies:", document.cookie);

      if (!hasCookie) {
        console.log(" No auth_token cookie found, redirecting to login");
        router.push("/login");
        return;
      }

      const response = await fetch("/api/products", {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(" Response status:", response.status);

      if (response.status === 401) {
        // If API returns 401, redirect to login
        console.log("API returned 401");
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.error || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
        <button
          onClick={fetchProducts}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

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
      <ProductTable
        products={products}
        loading={loading}
        onUpdate={fetchProducts}
      />
    </div>
  );
}
