import "./globals.css";
import Navbar from "@/components/products/Navbar";

export const metadata = {
  title: "Product Management System",
  description: "Manage your products efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
