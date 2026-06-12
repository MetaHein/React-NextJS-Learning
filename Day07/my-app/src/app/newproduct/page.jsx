export default async function NewProductsPage() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "force-cache", // STATIC
  });

  const data = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>New Products (Static Cached)</h1>

      <div style={{ display: "grid", gap: 10 }}>
        {data.products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #ccc", padding: 10 }}
          >
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
