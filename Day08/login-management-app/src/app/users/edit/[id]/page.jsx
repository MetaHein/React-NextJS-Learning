"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserForm from "@/components/UserForm";
import Alert from "@/components/Alert";

export default function EditUserPage() {
  const { id } = useParams();
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

  const handleSubmit = async (formData) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await res.json();
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <Alert type="error" message={error} />;
  if (!user) return <Alert type="error" message="User not found" />;

  return (
    <UserForm
      initialData={user}
      onSubmit={handleSubmit}
      buttonText="Update User"
      isEdit={true}
    />
  );
}
