import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "User Management System",
  description: "CRUD operations with Next.js and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
