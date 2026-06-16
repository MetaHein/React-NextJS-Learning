import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              User Management
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/users"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition"
            >
              Users List
            </Link>
            <Link
              href="/users/create"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition"
            >
              Add New User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
