"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forget Password", href: "/forget-password" },
];

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const [name, setName] = useState("");
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div>
          <input
            className="bg-amber-200 border-black"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) && link.href !== "/");
          return (
            <Link
              className={isActive ? "font-bold mr-4" : "text-blue-400 mr-4"}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          );
        })}
        {children}
        <footer className="bg-blue-400 py-4-">
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
