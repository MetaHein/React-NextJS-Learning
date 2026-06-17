import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "@/components/products/Navbar";

export const metadata = {
  title: "Product Management System",
  description: "Manage your products efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
