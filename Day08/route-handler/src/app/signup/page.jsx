"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          // User is already logged in, redirect to products
          router.push("/products");
        }
      } catch (error) {
        // Not authenticated, show login form
        console.log("Not authenticated, showing signup form");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SignupForm />
    </div>
  );
}
