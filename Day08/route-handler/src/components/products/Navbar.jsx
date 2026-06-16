"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth status whenever cookie changes
  const checkAuthStatus = () => {
    const hasToken = document.cookie.includes("auth_token");
    setIsLoggedIn(hasToken);
    setLoading(false);
    return hasToken;
  };

  useEffect(() => {
    // Check on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuthStatus();

    //  Listen for cookie changes (when user logs in/out)
    const interval = setInterval(() => {
      const currentStatus = document.cookie.includes("auth_token");
      if (currentStatus !== isLoggedIn) {
        setIsLoggedIn(currentStatus);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Clear the cookie
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Show loading state
  if (loading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
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

            {/*Only show product links if logged in */}
            {isLoggedIn && (
              <>
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
              </>
            )}
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
