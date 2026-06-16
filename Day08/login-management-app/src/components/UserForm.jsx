"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "./Alert";

export default function UserForm({
  initialData = {},
  onSubmit,
  buttonText,
  isEdit = false,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    // Don't send empty password for edit
    const submitData = { ...formData };
    if (isEdit && !submitData.password) {
      delete submitData.password;
    }

    const result = await onSubmit(submitData);

    if (result.success) {
      setAlert({ type: "success", message: result.message });
      setTimeout(() => router.push("/users"), 1500);
    } else {
      if (result.errors) {
        const formattedErrors = {};
        result.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
      setAlert({ type: "error", message: result.message });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "Edit User" : "Create New User"}
      </h2>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password {!isEdit && "*"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            required={!isEdit}
            placeholder={isEdit ? "Leave empty to keep current password" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {buttonText}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
