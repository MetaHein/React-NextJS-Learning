"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const response = await authApi.getCurrentUser();
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    localStorage.setItem("auth_token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response;
  };

  const signup = async (userData) => {
    const response = await authApi.signup(userData);
    // Auto-login after signup
    const loginResponse = await authApi.login({
      email: userData.email,
      password: userData.password,
    });
    localStorage.setItem("auth_token", loginResponse.data.token);
    localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
    setUser(loginResponse.data.user);
    return response;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
