/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>;
      <Outlet />
    </>
  );
}
