/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import Card from "./pages/Card";

export const DataRoute = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/shop", Component: Shop },
  { path: "/card", Component: Card },
  { path: "/about", Component: About },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { index: true, Component: Product },
      { path: ":pid/edit/:uid", Component: Detail },
    ],
  },
]);
