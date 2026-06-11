import React from "react";
import { notFound, redirect } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const pid = (await params).productid;
  const rid = (await params).reviewsid;

  return { title: `Review ${rid} & Product ${pid}` };
};

function getRandomInt(count) {
  return Math.floor(Math.random() * count);
}

export default async function ProductReview({ params }) {
  const random = getRandomInt(2);
  if (random === 1) {
    throw new Error("Error loading review");
  }
  const { reviewsid, productid } = await params;
  if (parseInt(reviewsid) > 1000) {
    redirect("/products");
  }
  return (
    <div>
      Reviews {reviewsid} for product {productid}
    </div>
  );
}
