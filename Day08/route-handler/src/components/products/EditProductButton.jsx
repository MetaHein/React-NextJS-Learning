"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductButton({ product, onUpdate }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/products/edit/${product.id}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
    >
      Edit
    </button>
  );
}
