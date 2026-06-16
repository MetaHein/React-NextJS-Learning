import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-12 mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to User Management System
        </h1>
        <p className="text-xl mb-6">
          Complete CRUD operations with Next.js, MySQL, and Zod validation
        </p>
        <Link
          href="/users"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
        >
          Get Started
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">📝</div>
          <h3 className="text-xl font-semibold mb-2">Create Users</h3>
          <p className="text-gray-600">Add new users with validation</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">📖</div>
          <h3 className="text-xl font-semibold mb-2">Read Users</h3>
          <p className="text-gray-600">View all users and details</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">✏️</div>
          <h3 className="text-xl font-semibold mb-2">Update/Delete</h3>
          <p className="text-gray-600">Manage user information</p>
        </div>
      </div>
    </div>
  );
}
