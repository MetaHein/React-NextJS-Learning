"use client";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    setLoading(true);

    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(product),
    });

    setLoading(false);
  }
  return (
    <button onClick={handleAddToCart}>
      {loading ? "Adding.." : "Add To Cart"}
    </button>
  );
}
