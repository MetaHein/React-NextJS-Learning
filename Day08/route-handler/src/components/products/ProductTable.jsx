"use client";

export default function ProductTable({ products }) {
  const handleDelete = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("DELETE RESPONSE:", data);

    if (res.ok) {
      location.reload();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-slate-50">
              <td className="p-4">{product.id}</td>

              <td className="p-4 font-medium">{product.name}</td>

              <td className="p-4">${product.price}</td>

              <td className="p-4 flex gap-2 justify-center">
                <a
                  href={`/products/edit/${product.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-8 text-slate-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
