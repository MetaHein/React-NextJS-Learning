import React from "react";

export const generateMetadata = async ({ params }) => {
  const id = (await params).productid;

  return { title: `Product ${id}` };
};
export default async function page({ params }) {
  const { productid } = await params;
  return <div>Product Details {productid}</div>;
}
