"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function OrderProduct() {
  const router = useRouter();
  const handleClick = () => {
    console.log("Placing Your Order");
    router.replace("/");
  };
  return (
    <div>
      <h1>Order Product</h1>
      <button onClick={handleClick}>Place order</button>
    </div>
  );
}
