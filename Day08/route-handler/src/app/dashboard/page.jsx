"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "../../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to fetch the user data - cookie is sent automatically
        const response = await authApi.getCurrentUser();
        setUser(response.data.user);
        // Only store user data in localStorage for display purposes, not for auth
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.error("Error fetching user:", error);
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          router.push("/login");
        } else {
          // For other errors, still redirect to login
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  // app/dashboard/page.js (updated logout)
  const handleLogout = async () => {
    try {
      // Call logout API - this will clear the HTTP-only cookie on the server
      const response = await authApi.logout();
      console.log("Logout response:", response.data);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear cookie on client side as well (just in case)
      document.cookie =
        "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "session_id=; path=/; max-age=0";

      // Clear any client-side storage
      localStorage.removeItem("user");

      // Redirect to login page
      router.push("/login");
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
            >
              Logout
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-gray-700">
              Welcome, <strong className="text-blue-700">{user.name}</strong>!
            </p>
            <p className="text-gray-500 text-sm">Email: {user.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/products"
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100 hover:border-blue-200"
            >
              <h3 className="font-semibold text-blue-700">📦 Products</h3>
              <p className="text-sm text-gray-600">View and manage products</p>
            </Link>
            <Link
              href="/products/create"
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-100 hover:border-green-200"
            >
              <h3 className="font-semibold text-green-700">
                ➕ Create Product
              </h3>
              <p className="text-sm text-gray-600">Add a new product</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
