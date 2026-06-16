"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Alert from "@/components/Alert";

export default function ViewUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading)
    return <div className="text-center py-8">Loading user details...</div>;
  if (error) return <Alert type="error" message={error} />;
  if (!user) return <Alert type="error" message="User not found" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <label className="text-sm text-gray-500">ID</label>
            <p className="text-lg font-medium">{user.id}</p>
          </div>

          <div className="border-b pb-3">
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div className="border-b pb-3">
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div className="border-b pb-3">
            <label className="text-sm text-gray-500">Created At</label>
            <p className="text-lg font-medium">
              {new Date(user.created_at).toLocaleString()}
            </p>
          </div>

          <div className="border-b pb-3">
            <label className="text-sm text-gray-500">Last Updated</label>
            <p className="text-lg font-medium">
              {new Date(user.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => router.push(`/users/edit/${user.id}`)}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Edit User
          </button>
          <button
            onClick={() => router.push("/users")}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
          >
            View All Users
          </button>
        </div>
      </div>
    </div>
  );
}
