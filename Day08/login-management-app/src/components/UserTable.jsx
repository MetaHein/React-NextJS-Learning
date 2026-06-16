"use client";

import Link from "next/link";
import { useState } from "react";
import Alert from "./Alert";

export default function UserTable({ users, onDelete }) {
  const [deleteAlert, setDeleteAlert] = useState(null);

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const result = await onDelete(id);
      if (result.success) {
        setDeleteAlert({ type: "success", message: result.message });
        setTimeout(() => setDeleteAlert(null), 3000);
      } else {
        setDeleteAlert({ type: "error", message: result.message });
        setTimeout(() => setDeleteAlert(null), 3000);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {deleteAlert && (
        <Alert type={deleteAlert.type} message={deleteAlert.message} />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    href={`/users/view/${user.id}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/users/edit/${user.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
