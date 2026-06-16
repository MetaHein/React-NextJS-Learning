"use client";

import UserForm from "@/components/UserForm";

export default function CreateUserPage() {
  const handleSubmit = async (formData) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await res.json();
  };

  return (
    <UserForm onSubmit={handleSubmit} buttonText="Create User" isEdit={false} />
  );
}
