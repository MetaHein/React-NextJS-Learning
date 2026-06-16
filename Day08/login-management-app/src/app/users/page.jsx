"use client";

import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";
import Alert from "@/components/Alert";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchUsers(); // Refresh list
      }
      return data;
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users List</h1>
        <div className="text-sm text-gray-500">Total: {users.length} users</div>
      </div>

      {error && <Alert type="error" message={error} />}

      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <UserTable users={users} onDelete={handleDelete} />
      )}
    </div>
  );
}
