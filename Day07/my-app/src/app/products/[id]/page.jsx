export default async function ProductPage({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  const product = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </>
  );
}
