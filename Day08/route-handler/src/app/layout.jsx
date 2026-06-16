import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Product Management System",
  description: "Manage your products efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className="flex items-center text-gray-900 hover:text-blue-600"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="flex items-center text-gray-900 hover:text-blue-600"
                >
                  Products
                </Link>
                <Link
                  href="/products/create"
                  className="flex items-center text-gray-900 hover:text-blue-600"
                >
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
