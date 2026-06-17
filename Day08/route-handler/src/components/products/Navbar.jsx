"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth status by calling the API
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      setIsLoggedIn(response.ok);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuthStatus();

    // Listen for route changes to re-check auth
    const handleRouteChange = () => {
      checkAuthStatus();
    };

    // Check auth status every 5 seconds (optional)
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear client-side cookie
      document.cookie =
        "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      setIsLoggedIn(false);
      // Clear any stored user data
      localStorage.removeItem("user");
      router.push("/login");
      router.refresh();
    }
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
              className={`flex items-center ${
                pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-900 hover:text-blue-600"
              } transition-colors`}
            >
              Home
            </Link>

            {/* Only show product links if logged in */}
            {isLoggedIn && (
              <>
                <Link
                  href="/products"
                  className={`flex items-center ${
                    pathname === "/products"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-600"
                  } transition-colors`}
                >
                  Products
                </Link>
                <Link
                  href="/products/create"
                  className={`flex items-center ${
                    pathname === "/products/create"
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-600"
                  } transition-colors`}
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
                className={`text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/login" ? "bg-blue-50" : ""
                }`}
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
