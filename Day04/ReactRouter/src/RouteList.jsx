/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Shop from "./pages/Shop";
import Card from "./pages/Card";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

export default function RouteList() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="card" element={<Card />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Product />} />
          <Route path=":pid/edit/:uid?" element={<Detail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
