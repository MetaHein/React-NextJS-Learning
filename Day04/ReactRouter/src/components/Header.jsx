/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, NavLink } from "react-router";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="bg-sky-600 p-4 text-white">
        <nav className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">
            Fashion Shop
          </Link>
          <button className="block text-xl lg:hidden" onClick={toogleMenu}>
            &#8801;
          </button>
          <ul className="hidden gap-6 lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/card"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
              >
                Card
              </NavLink>
            </li>
          </ul>

          <div
            className={`bg-opacity-10 fixed inset-0 z-50 transform bg-sky-600 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              <Link to="/" className="text-2xl" onClick={toogleMenu}>
                Home
              </Link>
              <Link to="/shop" className="text-2xl" onClick={toogleMenu}>
                Shop
              </Link>
              <Link to="/card" className="text-2xl" onClick={toogleMenu}>
                Card
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
