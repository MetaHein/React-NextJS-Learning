import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Product Management System
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Manage your products efficiently with our comprehensive system
      </p>
      <div className="space-x-4">
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Products
        </Link>
        <Link
          href="/products/create"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
}
