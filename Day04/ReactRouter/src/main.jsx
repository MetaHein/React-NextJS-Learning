import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouteList from "./RouteList";
//import { DataRoute } from "./DataRoute";
//import { RouterProvider } from "react-router/dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouteList />
    {/* <RouterProvider router={DataRoute} />, */}
  </StrictMode>,
);
