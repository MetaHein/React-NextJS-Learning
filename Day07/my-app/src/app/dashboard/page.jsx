export default async function Dashboard() {
  const res = await fetch("https://dummyjson.com/products");

  const data = await res.json();

  const stats = {
    revenue: data.total * 100,
    products: data.total,
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Revenue: ${stats.revenue}</p>
        <p>Products: {stats.products}</p>
      </div>
    </>
  );
}
