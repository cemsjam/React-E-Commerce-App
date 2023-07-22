import React from "react";
import Navbar from "./Header/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ScrollUp from "@/layout/ScrollUp";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Toaster />
      <ScrollUp />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
